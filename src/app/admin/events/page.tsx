"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import { Trash2, Plus } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { toast } from "sonner"
import EventsForm from "@/components/admin/events-form"
import ProtectedRoute from "@/components/admin/protected-route"

export default function AdminEventsPage() {
  const [events, setEvents] = useState<{ id: string; images: string[] }[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("events").select("id, images")
    if (error) {
      toast.error("Failed to fetch events")
    } else {
      setEvents(data || [])
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) {
      toast.error("Delete failed")
    } else {
      toast.success("Event deleted")
      fetchEvents()
    }
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#0D1B2A]">Event Images</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="flex items-center rounded-full cursor-pointer gap-2 bg-[#CFA83C] text-white px-4 py-2 font-semibold">
                <Plus className="w-4 h-4" /> Add Images
              </button>
            </DialogTrigger>
            <DialogContent>
              <EventsForm />
            </DialogContent>
          </Dialog>
        </div>
        {loading ? (
          <div className="text-center py-12 text-[#CFA83C]">Loading...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-[#CFA83C]">No event images found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow p-4 pb-10 relative flex flex-col">
                <div className="grid grid-cols-1 gap-2 mb-2">
                  {event.images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
                      <Image src={img} alt={`Event ${idx + 1}`} fill sizes="100vw" className="object-cover" />
                    </div>
                  ))}
                </div>
                <button
                  className="w-full flex items-center cursor-pointer justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition mt-2"
                  onClick={() => handleDelete(event.id)}
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
