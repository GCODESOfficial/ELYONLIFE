"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/admin/protected-route";
import { supabase } from "@/lib/supabaseClient";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SermonsPage() {
  const [sermons, setSermons] = useState<{ id: string; youtube_url: string; title?: string; sermon_date?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to extract YouTube video ID
  const extractVideoId = (url: string) => {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    // Fetch archived sermons only
    const { data: sermonData } = await supabase.from("sermons").select("id, youtube_url, title, sermon_date").order("id", { ascending: false });
    setSermons(sermonData || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("sermons").delete().eq("id", id);
    if (error) {
      toast.error("Delete failed");
    } else {
      toast.success("Sermon deleted");
      fetchData();
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-10">
        {/* Archived Sermons Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-6">Archived Sermon Videos</h2>
          {loading ? (
            <div className="text-center py-12 text-[#CFA83C]">Loading...</div>
          ) : sermons.length === 0 ? (
            <div className="text-center py-12 text-[#CFA83C]">No archived sermons found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sermons.map((sermon) => (
                <div key={sermon.id} className="bg-white rounded-lg shadow p-4 relative flex flex-col">
                  <div className="aspect-video w-full mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                    {sermon.youtube_url && extractVideoId(sermon.youtube_url) ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${extractVideoId(sermon.youtube_url)}`}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                        title={sermon.title || "Sermon Video"}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No video
                      </div>
                    )}
                  </div>
                  <div className="font-semibold text-[#1A1A1A] mb-1">{sermon.title || "Untitled Sermon"}</div>
                  <div className="text-xs text-[#3C4A5A] mb-2">{sermon.sermon_date || ""}</div>
                  <button
                    className="w-full flex items-center cursor-pointer justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition mt-2"
                    onClick={() => handleDelete(sermon.id)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
