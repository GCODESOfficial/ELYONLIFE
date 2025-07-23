"use client";

import { useState, useEffect } from "react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"
import { Upload, X, Save } from "lucide-react"

export default function EventsForm() {
  const [localPreviews, setLocalPreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      const u = data?.session?.user
      if (u && u.id && u.email) {
        setUser({ id: u.id, email: u.email ?? "" })
      } else {
        setUser(null)
      }
    }
    getSession()
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles = Array.from(files)
    setImageFiles((prev) => [...prev, ...newFiles])
    setLocalPreviews((prev) => [...prev, ...newFiles.map((file) => URL.createObjectURL(file))])
  }

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setLocalPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert("You must be logged in to upload files.")
      return
    }
    if (isSubmitting) return
    setIsSubmitting(true)

    const uploadedImageUrls: string[] = []

    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      const filePath = `images/${fileName}`

      const { error } = await supabase.storage.from("events").upload(filePath, file)
      if (error) {
        alert("Image upload failed: " + error.message)
        setIsSubmitting(false)
        return
      }

      const { data } = supabase.storage.from("events").getPublicUrl(filePath)
      uploadedImageUrls.push(data.publicUrl)
    }

    // Store only images in events table
    const { error } = await supabase.from("events").insert([{ images: uploadedImageUrls }])
    setIsSubmitting(false)

    if (error) {
      alert("Error saving event: " + error.message)
    } else {
      alert("Images saved successfully!")
      setImageFiles([])
      setLocalPreviews([])
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-[#0D1B2A] mb-6">Upload Event Images</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Input */}
          <div>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Event Photos</label>
            <div className="border-2 border-dashed border-[#3C4A5A] rounded-lg p-6 text-center hover:border-[#CFA83C]">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-[#3C4A5A]" />
                <p className="text-[#1A1A1A] font-semibold mb-2">Upload Event Photos</p>
                <p className="text-sm text-gray-500">Click to select multiple images</p>
              </label>
            </div>
          </div>

          {/* Image Previews */}
          {localPreviews.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[#1A1A1A] mb-3">
                Image Previews ({localPreviews.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {localPreviews.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image}
                      alt={`Image ${index + 1}`}
                      width={400}
                      height={400}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#3C4A5A]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center space-x-2 bg-[#CFA83C] text-white px-6 py-3 rounded-full hover:bg-[#CFA83C]/90 cursor-pointer transition-colors font-semibold disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSubmitting ? "Saving..." : "Save Images"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
