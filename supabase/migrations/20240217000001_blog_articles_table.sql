-- Create articles table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    tags TEXT[] DEFAULT '{}',
    author_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Articles Policies
CREATE POLICY "Public can view articles" ON public.articles
    FOR SELECT USING (TRUE);

CREATE POLICY "Admins can manage articles" ON public.articles
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'ronenamos@gmail.com' -- Simple admin check
    );

-- Index for performance
CREATE INDEX IF NOT EXISTS articles_slug_idx ON public.articles (slug);
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON public.articles (published_at DESC);
