-- Only keep images column in events table
CREATE TABLE public.events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    images jsonb DEFAULT '[]'
);

-- Admin dashboard nested routes
-- /admin/events, /admin/sermons, /admin/live-videos
-- Each page fetches all records, displays grid/list, edit/delete, modal form
-- Use shadcn/ui dialog for modals and sonner for notifications
