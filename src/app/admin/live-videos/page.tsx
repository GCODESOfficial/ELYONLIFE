"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/admin/protected-route"
import { supabase } from "@/lib/supabaseClient"
import { Trash2, Archive, Plus } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { toast } from "sonner"
import VideoForm from "@/components/admin/video-form"

const extractVideoId = (url: string) => {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default function AdminLiveVideosPage() {
  const [liveVideos, setLiveVideos] = useState<{
    id: string;
    youtube_url: string;
    title?: string;
    live_date?: string;
  }[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchLiveVideos()
  }, [])

  const fetchLiveVideos = async () => {
    setLoading(true)
    const today = new Date().toISOString().split("T")[0]
    const { data, error } = await supabase
      .from("live_videos")
      .select("id, youtube_url, title, live_date")
      .gte("live_date", today)
      .order("live_date", { ascending: true })
    if (error) {
      toast.error("Failed to fetch live videos")
    } else {
      setLiveVideos(data || [])
    }
    setLoading(false)
  }

  // Move video to sermons and remove from live-videos
  const handleArchive = async (video: { id: string; youtube_url: string; title?: string; live_date?: string }) => {
    const { error: insertError } = await supabase.from("sermons").insert({
      youtube_url: video.youtube_url,
      title: video.title,
      sermon_date: video.live_date,
    });
    if (insertError) {
      toast.error("Failed to archive video");
      return;
    }
    const { error: deleteError } = await supabase.from("live_videos").delete().eq("id", video.id);
    if (deleteError) {
      toast.error("Failed to remove from live videos");
    } else {
      toast.success("Video archived successfully! 🎉");
      fetchLiveVideos();
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("live_videos").delete().eq("id", id);
    if (error) {
      toast.error("Delete failed")
    } else {
      toast.success("Live video deleted successfully! 🗑️")
      fetchLiveVideos()
    }
  }

  // Find the currently streaming live video (today's date)
  const today = new Date().toISOString().split("T")[0];
  const currentLive = liveVideos.find(v => v.live_date === today);

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Featured Live Video */}
        {currentLive && extractVideoId(currentLive.youtube_url) && (
          <div className="max-w-3xl mx-auto px-4">
            <div className="relative rounded-xl overflow-hidden mb-6 aspect-video bg-black flex items-center justify-center">
              <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded font-bold text-xs z-10">LIVE NOW</span>
              <iframe
                src={`https://www.youtube.com/embed/${extractVideoId(currentLive.youtube_url)}`}
                className="w-full h-full"
                allowFullScreen
                title={currentLive.title || "Live Video"}
              />
            </div>
            <div className="text-center text-lg font-bold mb-2">{currentLive.title}</div>
            <div className="text-center text-sm text-[#3C4A5A] mb-4">{currentLive.live_date}</div>
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0D1B2A]">Live Videos</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center cursor-pointer gap-2 bg-[#CFA83C] text-white px-4 py-2 rounded-full font-semibold">
                <Plus className="w-4 h-4" /> Add Live Video
              </button>
            </DialogTrigger>
            <DialogContent>
              <VideoForm />
            </DialogContent>
          </Dialog>
        </div>
        {loading ? (
          <div className="text-center py-12 text-[#CFA83C]">Loading...</div>
        ) : liveVideos.length === 0 ? (
          <div className="text-center py-12 text-[#CFA83C]">No live videos found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveVideos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow p-4 relative flex flex-col">
                <div className="aspect-video w-full mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                  {video.youtube_url && extractVideoId(video.youtube_url) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${extractVideoId(video.youtube_url)}`}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                      title={video.title || "Live Video"}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No video
                    </div>
                  )}
                </div>
                <div className="font-semibold text-[#1A1A1A] mb-1">{video.title || "Untitled Live Video"}</div>
                <div className="text-xs text-[#3C4A5A] mb-4">{video.live_date || ""}</div>
                <div className="flex flex-col gap-4 mt-2">
                  <button
                    className="w-full flex items-center cursor-pointer justify-center gap-2 bg-[#CFA83C] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#b38c2c] transition"
                    onClick={() => handleArchive(video)}
                    title="Archive to Sermons"
                  >
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                  <button
                    className="w-full flex items-center cursor-pointer justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition"
                    onClick={() => handleDelete(video.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
