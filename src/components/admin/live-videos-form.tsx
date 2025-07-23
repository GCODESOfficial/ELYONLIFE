"use client"

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Save } from "lucide-react";

export default function LiveVideosForm() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to extract YouTube video ID
  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) {
      alert("Please enter a YouTube video URL.");
      return;
    }
    setIsSubmitting(true);
    // Save the YouTube URL to the live_videos table
    const { error } = await supabase.from("live_videos").insert([{ youtube_url: youtubeUrl }]);
    setIsSubmitting(false);
    if (error) {
      alert("Error saving live video: " + error.message);
    } else {
      alert("Live video saved successfully!");
      setYoutubeUrl("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-[#0D1B2A] mb-6">Add Live Video (YouTube URL)</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">YouTube Video URL</label>
            <input
              type="text"
              value={youtubeUrl}
              onChange={e => setYoutubeUrl(e.target.value)}
              className="w-full px-4 py-3 border border-[#3C4A5A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFA83C] focus:border-transparent transition-colors"
              placeholder="https://youtube.com/watch?v=..."
              required
            />
          </div>
          {youtubeUrl && extractVideoId(youtubeUrl) && (
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Preview</label>
              <div className="aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center">
                <iframe
                  src={`https://www.youtube.com/embed/${extractVideoId(youtubeUrl)}`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title="Live Video Preview"
                />
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#3C4A5A]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center space-x-2 bg-[#B33A3A] text-white px-6 py-3 rounded-full hover:bg-[#B33A3A]/90 transition-colors font-semibold disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? "Saving..." : "Save Live Video"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
