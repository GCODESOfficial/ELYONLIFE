"use client"

import AdminSidebar from "@/components/admin/admin-sidebar"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false) // sidebar collapsed state

  let pageTitle = "Admin Dashboard"
  let pageDesc = "Manage your church content and events"

  if (pathname.includes("sermons")) {
    pageTitle = "Sermons & Videos"
    pageDesc = "Manage your church content and events"
  } else if (pathname.includes("events")) {
    pageTitle = "Event Images"
    pageDesc = "Manage event photos"
  } else if (pathname.includes("moments")) {
    pageTitle = "Moments"
    pageDesc = "Manage favorite moments"
  } else if (pathname.includes("live-videos")) {
    pageTitle = "Live Videos"
    pageDesc = "Manage live streams"
  }

  // compute left margin for content area
  const contentMarginLeft = isCollapsed ? "md:ml-20" : "md:ml-64"

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={
          pathname.includes("sermons")
            ? "sermons"
            : pathname.includes("events")
            ? "events"
            : pathname.includes("moments")
            ? "moments"
            : "live"
        }
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${contentMarginLeft}`}
      >
        {/* Header */}
        <div className="border-b px-6 py-4 flex items-center justify-between bg-white">
          <div>
            <h1 className="text-2xl font-bold text-[#0D1B2A]">{pageTitle}</h1>
            <p className="text-[#3C4A5A] text-sm">{pageDesc}</p>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-[#0D1B2A] border-[#0D1B2A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open sidebar menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Main content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
