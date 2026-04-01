-- Add optional SEO meta title to articles
-- Used to override the <title> tag independently of the article heading.
-- Max recommended length: 60 characters.
ALTER TABLE articles ADD COLUMN IF NOT EXISTS meta_title TEXT;
