"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      const session = data?.session

      if (session) {
        setIsAuthenticated(true)
      } else {
        router.replace("/cpanel")
      }

      setLoading(false)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
      if (!session) {
        router.replace("/cpanel")
      }
    })

    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-[#CFA83C] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Image
              src="/images/logo.svg"
              alt="Elyon Ministry's Logo"
              width={50}
              height={50}
            />
          </div>
          <p className="text-[#1A1A1A]">Loading...</p>
        </div>
      </div>
    )
  }

  if (!loading && isAuthenticated) {
    return <>{children}</>
  }

  return null
}
