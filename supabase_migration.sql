-- EVENTS TABLE

-- Drop the old events table if it exists
DROP TABLE IF EXISTS public.events;

-- create events table with only the desired columns
CREATE TABLE public.events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    images jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow authenticated users to insert/select/update/delete
CREATE POLICY "Allow authenticated CRUD" ON public.events
  FOR ALL
  USING (auth.role() = 'authenticated');

-- RLS Policy: Allow public to select (optional)
CREATE POLICY "Allow public select" ON public.events
  FOR SELECT
  USING (true);


--MOMENTS TABLE

-- Drop the old moments table if it exists 
DROP TABLE IF EXISTS public.moments;

-- create moments table with desired columns
CREATE TABLE public.moments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    video_url text NOT NULL,
    moment_date date NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.moments ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow authenticated users to insert/select/update/delete
CREATE POLICY "Allow authenticated CRUD" ON public.moments
  FOR ALL
  USING (auth.role() = 'authenticated');

-- RLS Policy: Allow public to select (optional)
CREATE POLICY "Allow public select" ON public.moments
  FOR SELECT
  USING (true);


-- LIVE VIDEOS TABLE

-- Drop table if it already exists (be careful)
DROP TABLE IF EXISTS public.live_videos;

-- Create table
CREATE TABLE public.live_videos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    youtube_url text NOT NULL,
    title text,
    live_date date NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.live_videos ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow authenticated users to insert/select/update/delete
CREATE POLICY "Allow authenticated CRUD" ON public.live_videos
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Optional: Allow public users to select (view) live videos
CREATE POLICY "Allow public select" ON public.live_videos
  FOR SELECT
  USING (true);


-- SERMONS TABLE

-- Drop the old sermons table if it exists
DROP TABLE IF EXISTS public.sermons;

-- Create the sermons table
CREATE TABLE public.sermons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    youtube_url text NOT NULL,
    title text,
    sermon_date date,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow full access to authenticated users
CREATE POLICY "Allow authenticated CRUD" ON public.sermons
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Optional: Allow public read access
CREATE POLICY "Allow public select" ON public.sermons
  FOR SELECT
  USING (true);


-- The policy below is for storage bucket RLS
-- bucket_id = 'name of storage here' AND auth.role() = 'authenticated'