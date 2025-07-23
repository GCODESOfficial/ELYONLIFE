"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Save } from "lucide-react";

type Moment = {
  id: string;
  video_url: string;
  file_path: string;
  moment_date: string;
};

export default function MomentsForm({
  onSuccess,
  addMoment,
}: {
  onSuccess: () => void;
  addMoment: (moment: Moment) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!file || !date) {
      toast.error("Please select a file and date.");
      setIsSubmitting(false);
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
      setIsSubmitting(false);
      return;
    }

    const { data: publicURL } = supabase.storage
      .from("moments")
      .getPublicUrl(filePath);

    const { data: inserted, error: insertError } = await supabase
      .from("moments")
      .insert([
        {
          video_url: publicURL?.publicUrl,
          file_path: fileName,
          moment_date: date,
        },
      ])
      .select("id, video_url, file_path, moment_date")
      .single();

    if (insertError) {
      toast.error("Failed to save moment.");
    } else {
      toast.success("Moment uploaded!");
      setFile(null);
      setDate("");
      if (inserted) {
        addMoment(inserted); // Optimistic update
      }
      onSuccess(); // Close modal
    }

    setIsSubmitting(false);
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
        disabled={isSubmitting}
        className="cursor-pointer w-full flex items-center justify-center gap-2 bg-[#CFA83C] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#b89632] transition disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        <span>{isSubmitting ? "Uploading..." : "Upload Moment"}</span>
      </button>
    </form>
  );
}
