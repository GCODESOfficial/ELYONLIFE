"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function MomentsForm() {
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState("");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !date) {
      toast.error("Please select a file and date.");
      return;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("moments")
      .upload(filePath, file);

    if (uploadError) {
      toast.error("Upload failed.");
      return;
    }

    const { data: publicURL } = supabase.storage
      .from("moments")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("moments").insert([
      {
        video_url: publicURL?.publicUrl,
        moment_date: date,
        is_visible: true,
      },
    ]);

    if (insertError) {
      toast.error("Failed to save moment.");
    } else {
      toast.success("Moment uploaded!");
      setFile(null);
      setDate("");
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          Choose Video File
        </label>
        <input
          type="file"
          accept="video/mp4"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          Moment Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center cursor-pointer justify-center gap-2 bg-[#CFA83C] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#b89632] transition"
      >
        <Save className="w-4 h-4" />
        Upload Moment
      </button>
    </form>
  );
}
