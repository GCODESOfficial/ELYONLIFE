import { supabase } from "./supabaseClient"

export async function uploadImage(file: File, bucket: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
  const { error } = await supabase.storage.from(bucket).upload(fileName, file)
  if (error) throw error
  const url = supabase.storage.from(bucket).getPublicUrl(fileName).data.publicUrl
  return url
}
