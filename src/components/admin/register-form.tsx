"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import Image from "next/image"
import { useRouter } from "next/navigation"


export default function RegisterForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    const { error: supaError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (supaError) {
      setError(supaError.message)
      setIsLoading(false)
      return
    }

    setSuccess("Registration successful!.")
    setIsLoading(false)
    setEmail("")
    setPassword("")
    router.push("/cpanel")
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#CFA83C] rounded-full flex items-center justify-center">
              <Image src="/images/logo.svg" alt="Elyon Ministry Logo" width={200} height={200} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#0D1B2A] mb-2">Register Admin</h1>
          <p className="text-[#1A1A1A] text-sm">Create a new admin account</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">{error}</div>
            )}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">{success}</div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-[#3C4A5A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFA83C] focus:border-transparent transition-colors"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-[#3C4A5A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CFA83C] focus:border-transparent transition-colors"
                placeholder="Enter a strong password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#B33A3A] text-white py-3 px-4 rounded-lg hover:bg-[#B33A3A]/90 focus:outline-none focus:ring-2 focus:ring-[#B33A3A] focus:ring-offset-2 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
