"use client"

import { useEffect, useState } from "react"
import ProtectedRoute from "@/components/admin/protected-route"
import { supabase } from "@/lib/supabaseClient"
import { Trash2, Plus } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { toast } from "sonner"
import MomentsForm from "@/components/admin/moments-form"

export default function AdminMomentsPage() {
  const [moments, setMoments] = useState<
    { id: string; video_url: string; moment_date: string; is_visible: boolean }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchMoments()
  }, [])

  const fetchMoments = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("moments")
      .select("id, video_url, moment_date, is_visible")
      .order("moment_date", { ascending: false })

    if (error) {
      toast.error("Failed to fetch moments")
    } else {
      setMoments(data || [])
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("moments").delete().eq("id", id)
    if (error) {
      toast.error("Delete failed")
    } else {
      toast.success("Moment deleted")
      fetchMoments()
    }
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#0D1B2A]">Moments</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center cursor-pointer gap-2 bg-[#CFA83C] text-white px-4 py-2 rounded-full font-semibold">
              <Plus className="w-4 h-4" /> Add Video
            </button>
          </DialogTrigger>
          <DialogContent>
            <MomentsForm />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#CFA83C]">Loading...</div>
      ) : moments.length === 0 ? (
        <div className="text-center py-12 text-[#CFA83C]">No moments videos found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moments.map((moment) => (
            <div key={moment.id} className="bg-white rounded-lg shadow p-4 relative flex flex-col">
              <div className="aspect-video rounded-lg overflow-hidden mb-2">
                <video controls className="w-full h-full object-cover">
                  <source src={moment.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-sm text-gray-500">
                Date: {new Date(moment.moment_date).toLocaleDateString()}
              </p>
              <button
                className="w-full flex items-center cursor-pointer justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition mt-2"
                onClick={() => handleDelete(moment.id)}
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
    </ProtectedRoute>
  )
}
