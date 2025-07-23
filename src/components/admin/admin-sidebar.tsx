"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Video,
  Calendar,
  Camera,
  Radio,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface AdminSidebarProps {
  activeTab: "sermons" | "events" | "live" | "moments";
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function AdminSidebar({
  activeTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isCollapsed,
  setIsCollapsed,
}: AdminSidebarProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data?.user?.email || null);
    };
    getUser();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobileMenuOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/cpanel";
  };

  const tabs = [
    {
      id: "sermons",
      label: "Sermons",
      icon: Video,
      description: "Manage video content",
      href: "/admin/sermons",
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      description: "Manage event photos",
      href: "/admin/events",
    },
    {
      id: "moments",
      label: "Moments",
      icon: Camera,
      description: "Manage favorite moments photos",
      href: "/admin/moments",
    },
    {
      id: "live",
      label: "Live Videos",
      icon: Radio,
      description: "Manage live streams",
      href: "/admin/live-videos",
    },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-slate-100">
      {/* Header */}
      <div className={`p-6 border-b border-slate-100 ${isCollapsed ? "px-4" : ""}`}>
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-3 ${isCollapsed ? "justify-center" : ""}`}>
            <div className="w-10 h-10 bg-[#CFA83C] rounded-full flex items-center justify-center flex-shrink-0">
              <Image src="/images/logo.svg" alt="Elyon Ministry Logo" width={100} height={100} />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-[#0D1B2A]">Admin Panel</h2>
                <p className="text-xs text-[#1A1A1A]">Content Management</p>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#1A1A1A]" />
          </button>
        </div>
      </div>

      {/* Collapse toggle */}
      <div className="hidden md:block">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 bg-white cursor-pointer border border-slate-100 rounded-full p-1 hover:bg-[#F5F5F5] transition-colors z-10"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#1A1A1A]" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#1A1A1A]" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              aria-current={isActive ? "page" : undefined}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                transition-all duration-200 ease-in-out group focus:outline-none
                ${isCollapsed ? "justify-center px-2" : ""}
                ${
                  isActive
                    ? "bg-[#CFA83C]/10 text-[#CFA83C] border border-[#CFA83C]/20"
                    : "text-[#1A1A1A] hover:bg-[#F5F5F5] hover:text-[#CFA83C] hover:cursor-pointer hover:scale-[1.01]"
                }
              `}
              title={isCollapsed ? tab.label : ""}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && (
                <div>
                  <div className="font-semibold">{tab.label}</div>
                  <div className="text-xs opacity-70">{tab.description}</div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User & logout */}
      <div className={`p-6 border-t border-slate-100 ${isCollapsed ? "px-4" : ""}`}>
        {!isCollapsed && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 text-[#1A1A1A] mb-2">
              <div className="w-8 h-8 bg-[#CFA83C]/20 rounded-full flex items-center justify-center">
                <span className="text-[#CFA83C] text-xs font-bold">
                  {userEmail?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{userEmail}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center cursor-pointer space-x-2 bg-[#B33A3A] text-white px-4 py-3 rounded-full hover:bg-[#B33A3A]/90 transition-colors font-semibold ${
            isCollapsed ? "justify-center px-2" : ""
          }`}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`
          hidden md:block fixed left-0 top-0 h-full z-30
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        <div className="relative w-80 max-w-[85vw] h-full">{sidebarContent}</div>
      </div>
    </>
  );
}
