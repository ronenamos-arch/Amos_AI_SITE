-- Academy: User Content Progress Tracking
-- Tracks which content items each user has started/completed.
-- Used for "Continue Learning" and progress bars on learning paths.

CREATE TABLE IF NOT EXISTS user_content_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('guide', 'resource', 'lesson', 'prompt', 'blog')),
  content_slug TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_type, content_slug)
);

-- Index for fast lookups by user
CREATE INDEX IF NOT EXISTS idx_user_content_progress_user
  ON user_content_progress(user_id);

-- Index for aggregation queries (e.g. "how many completed items does user X have?")
CREATE INDEX IF NOT EXISTS idx_user_content_progress_status
  ON user_content_progress(user_id, status);

-- RLS: Users can only read/write their own progress
ALTER TABLE user_content_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_content_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_content_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_content_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role can do anything (for admin/cron)
CREATE POLICY "Service role full access"
  ON user_content_progress FOR ALL
  USING (auth.role() = 'service_role');
