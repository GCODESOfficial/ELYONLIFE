/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Merriweather, DM_Sans, Great_Vibes } from "next/font/google";


const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
});


export default function MinistryPartnershipPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    nationality: "",
    residence: "",
    email: "",
    phone: "",
    channels: [] as string[],
    category: "",
    prayers: ["", "", "", "", ""],
  })

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckbox = (field: string, value: string) => {
    const checked = form[field as keyof typeof form] as string[]
    setForm((prev) => ({
      ...prev,
      [field]: checked.includes(value)
        ? checked.filter((v) => v !== value)
        : [...checked, value],
    }))
  }

  const handlePrayerChange = (index: number, value: string) => {
    const prayers = [...form.prayers]
    prayers[index] = value
    setForm((prev) => ({ ...prev, prayers }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("/api/send-partnership-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    alert("Thank you for partnering with us! Check your email for confirmation.")
    setModalOpen(false)
  }

  return (
    <div className="relative ">
      {modalOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />}

      {/* Main Content */}
      <section className={`relative z-10 px-6 py-20 max-w-6xl mx-auto transition-all ${modalOpen ? "opacity-20 pointer-events-none" : ""}`}>
        <div className="bg-white text-black p-10 pt-28 rounded-2xl shadow-xl space-y-14">
          <h1 className="text-5xl font-bold text-center mb-24">Ministry Partnership</h1>

          {/* Giving Principles */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img src="/images/giving.jpg" alt="Giving" className="rounded-xl w-full" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Giving Principles</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li><strong>Covenanted:</strong> Psalm 50:5, Mal 3:10–12</li>
                <li><strong>Willingly:</strong> Deut 16:17, 2 Cor 8:12</li>
                <li><strong>Cheerfully:</strong> 2 Cor 9:7</li>
                <li><strong>Sacrificially:</strong> 2 Sam 24:24</li>
              </ul>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Benefits of Partnership</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Financial prosperity</li>
                <li>Answered prayers</li>
                <li>Divine healing</li>
                <li>Protection and favor</li>
              </ul>
            </div>
            <img src="/images/benefits.jpg" alt="Benefits" className="rounded-xl w-full" />
          </div>

          {/* Call to Action + Info */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img src="/images/partner-action.jpg" alt="Partnership" className="rounded-xl w-full" />
            <div className="space-y-4">
              <p><strong>Ministry Partnership Day:</strong> 1st Sunday of every month.</p>
              <p>To send donations or make a commitment,</p>
             
             <p className="text-[#CFA83C]">Fill the form below:</p>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#CFA83C] text-black px-6 py-3 font-semibold rounded hover:brightness-90 transition block mt-4"
              >
                Partner with Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
          <div className="relative bg-white text-black rounded-xl p-6 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center text-black">Partnership Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input placeholder="First Name" required className="input" onChange={e => handleChange("firstName", e.target.value)} />
                <input placeholder="Middle Name" className="input" onChange={e => handleChange("middleName", e.target.value)} />
                <input placeholder="Surname" required className="input" onChange={e => handleChange("surname", e.target.value)} />
                <input placeholder="Nationality" required className="input" onChange={e => handleChange("nationality", e.target.value)} />
                <input placeholder="Country of Residence" required className="input" onChange={e => handleChange("residence", e.target.value)} />
                <input type="email" placeholder="Email" required className="input" onChange={e => handleChange("email", e.target.value)} />
                <input placeholder="Phone Number" required className="input" onChange={e => handleChange("phone", e.target.value)} />
              </div>

              <fieldset className="border p-3 rounded">
                <legend className="text-sm font-semibold text-black mb-1">Areas of Partnership</legend>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {["RURAL MISSIONS", "ELYON LIFE TV", "MEDICAL MISSIONS", "FEEDING THE POOR", "EDUCATIONAL CHARITY"].map((label) => (
                    <label key={label} className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckbox("channels", label)}
                        className="mr-2"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="border p-3 rounded">
                <legend className="text-sm font-semibold text-black mb-1">Partnership Category</legend>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    "DIAMOND: $1000+",
                    "PLATINUM: $500+",
                    "GOLD: $350+",
                    "SILVER: $200",
                    "BRONZE: $100"
                  ].map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        onChange={e => handleChange("category", e.target.value)}
                        className="mr-2"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </fieldset>

             <div className="space-y-4">
  <p className="text-sm font-semibold">Special Prayer Requests</p>
  {form.prayers.map((prayer, i) => (
    <div key={i} className="space-y-1">
      <label className="block text-xs font-medium text-gray-600">
        Request {i + 1}
      </label>
      <input
        type="text"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CFA83C]"
        placeholder={`Type prayer request ${i + 1}`}
        onChange={e => handlePrayerChange(i, e.target.value)}
      />
    </div>
  ))}
</div>


              <button
                type="submit"
                className="w-full mt-4 bg-[#CFA83C] text-black py-2 rounded font-semibold hover:brightness-90"
              >
                Submit Partnership Form
              </button>
            </form>
          </div>
        </div>
      )}


      {/* See You This Sunday */}
      <section className="relative py-40 md:py-24 text-white text-center">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/footer-hero.png')`,
          }}
        ></div>

        {/* Fave Quote */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 w-full flex justify-center pointer-events-none">
          <div className="relative max-w-4xl mx-auto px-4 pointer-events-auto">
            <div
              className={`${dmSans.className} text-[#F5F5F5] text-xs md:text-base font-medium uppercase tracking-wide mt-6 mb-5 md:mt-12 md:mb-10`}
            >
              Favourite Quote
            </div>
            <blockquote
              className={`${dmSans.className} text-[#F5F5F5] text-xl md:text-3xl font-semibold mb-8`}
            >
              “One moment in God&apos;s presence <br />
              can change everything.”
            </blockquote>
          </div>
        </div>

        {/* sunday time card*/}
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 -bottom-10 md:-bottom-24 z-20 w-full px-4 flex justify-center pointer-events-none">
          <div className="bg-[#FFFFFF] max-w-[1120px] w-full mx-auto px-4 rounded-xl shadow-lg pointer-events-auto py-10 md:py-20">
            <h2
              className={`text-[#1A1A1A] text-2xl md:text-[44px] font-bold mb-6 ${merriweather.className}`}
            >
              See You This Sunday
            </h2>
            <p
              className={`text-[#3C4A5A] text-sm md:text-lg mb-8 ${dmSans.className} max-w-[572px] mx-auto`}
            >
              Grow stronger in your walk with God and connect with a loving
              church family.
            </p>

            <div className="bg-[#1A1A1A] mb-4 flex flex-col md:max-w-[403px] mx-auto rounded-xl">
              <div className="pt-2 px-2 flex justify-between items-center">
                <div
                  className={`${dmSans.className} px-4 md:px-8 py-3 bg-[#FFFFFF] text-[#3C4A5A] font-bold border-2 border-[#1A1A1A] rounded-xl`}
                >
                  6:30am
                </div>
                <div
                  className={`${dmSans.className} px-4 md:px-8 py-3 bg-[#FFFFFF] text-[#3C4A5A] font-bold border-2 border-[#1A1A1A] rounded-xl`}
                >
                  8:00am
                </div>
                <div
                  className={`${dmSans.className} px-4 md:px-8 py-3 bg-[#FFFFFF] text-[#3C4A5A] font-bold border-2 border-[#1A1A1A] rounded-xl`}
                >
                  9:30am
                </div>
              </div>
              <div className="text-white py-4">(GMT +1)</div>
            </div>
            <Link href="mailto:elyonlifeministry@gmail.com">
              <Button
                className={`w-full cursor-pointer max-w-[403px] mx-auto bg-[#B33A3A] text-white py-4 rounded-xl hover:bg-[#B33A3A]/90 transition-colors font-semibold`}
              >
                Contact us
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-12 md:h-[350px]"></div>
      </section>
    </div>
  )
}

const input = "w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#CFA83C]"
