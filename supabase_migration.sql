-- Supabase migration SQL for ELYON app
-- Tables: events, live_videos, sermons
-- Storage buckets: events-images, live-videos-images, sermons-images

-- EVENTS TABLE
CREATE TABLE public.events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_title text NOT NULL,
    event_date date NOT NULL,
    description text,
    is_visible boolean DEFAULT true,
    images jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now()
);

-- LIVE VIDEOS TABLE
CREATE TABLE public.live_videos (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    youtube_url text NOT NULL,
    title text NOT NULL,
    description text,
    is_live boolean DEFAULT false,
    scheduled_time timestamptz,
    is_visible boolean DEFAULT true,
    images jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now()
);

-- SERMONS TABLE
CREATE TABLE public.sermons (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    youtube_url text NOT NULL,
    title text NOT NULL,
    description text,
    is_visible boolean DEFAULT true,
    images jsonb DEFAULT '[]',
    created_at timestamptz DEFAULT now()
);

-- STORAGE BUCKETS (run in Supabase dashboard)
-- events-images
-- live-videos-images
-- sermons-images

-- RLS POLICIES
-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert/select/update/delete
CREATE POLICY "Allow authenticated CRUD" ON public.events
  FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated CRUD" ON public.live_videos
  FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated CRUD" ON public.sermons
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Allow select for everyone (optional)
CREATE POLICY "Allow public select" ON public.events
  FOR SELECT
  USING (true);
CREATE POLICY "Allow public select" ON public.live_videos
  FOR SELECT
  USING (true);
CREATE POLICY "Allow public select" ON public.sermons
  FOR SELECT
  USING (true);
