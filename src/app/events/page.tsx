"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Merriweather, DM_Sans } from 'next/font/google';
import MemoriesGallery from "@/components/MemoriesGallery";
import EventsCarousel from "@/components/EventsCarousel";
import GivingsCarousel from "@/components/GivingsCarousel";
import { supabase } from "@/lib/supabaseClient";

const merriweather = Merriweather({ subsets: ['latin'], weight: ['700'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['500', '600'] });

export default function EventsPage() {
  const [moments, setMoments] = useState<
    { id: string; video_url: string; moment_date: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoments = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("moments")
        .select("id, video_url, moment_date")
        .eq("is_visible", true)
        .order("moment_date", { ascending: false });

      if (!error && data) {
        setMoments(data);
      }
      setLoading(false);
    };

    fetchMoments();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative h-64 md:h-[440px] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/events-hero.jpg')` }}
        ></div>
        <div className="absolute z-20 left-0 bottom-0 p-4 md:p-8">
          <h1 className={`${merriweather.className} text-xl md:text-[40px] mb-4 font-bold text-[#CFA83C]`}>Events</h1>
        </div>
      </section>

      {/* Moments of Impact Section */}
      <section className="py-6 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 md:text-center">
          <h2 className={`text-2xl md:text-[40px] font-bold text-[#1A1A1A] mb-2 ${merriweather.className}`}>Moments of Impact</h2>
          <p className={`text-[#3C4A5A] text-sm md:text-lg mb-8 ${dmSans.className}`}>
            You shouldn’t have to serve or love alone. Look at past moments.
          </p>

          {loading ? (
            <p className="text-[#CFA83C] text-center">Loading moments...</p>
          ) : moments.length === 0 ? (
            <p className="text-[#CFA83C] text-center">No moments available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {moments.slice(0, 6).map((moment) => (
                <div key={moment.id} className="flex flex-col items-center">
                  <div className="w-full aspect-video rounded-lg overflow-hidden mb-2">
                    <video controls className="w-full h-full object-cover rounded-lg">
                      <source src={moment.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="text-sm text-[#3C4A5A]">
                    {new Date(moment.moment_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="pt-6 pb-12 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-2xl md:text-[32px] font-bold text-[#1A1A1A] mb-8 ${merriweather.className}`}>Upcoming Events</h2>
          <EventsCarousel />
        </div>
      </section>

      {/* Give from the Heart Section */}
      <section className="pt-6 pb-8 md:py-0 bg-white w-full md:max-w-[1120px] mx-auto">
        <div className="px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 md:items-center md:gap-0">
          <div className="order-last md:order-first w-full max-w-[400px]">
            <GivingsCarousel className="h-[320px] md:h-[450px]" />
          </div>
          <div className="mb-8 md:mb-0 flex-1 md:max-w-[500px] md:mx-auto">
            <h1 className={`${dmSans.className} text-xs md:text-base font-bold text-[#3C4A5A] mb-6`}>Giving</h1>
            <h2 className={`${merriweather.className} text-2xl md:text-[44px] font-bold text-[#1A1A1A] mb-3`}>Give from the Heart</h2>
            <p className={`${dmSans.className} font-medium text-[#3C4A5A] text-sm md:text-xl mb-8`}>
              Every gift makes a difference. <br />
              Show love, bring a smile to a charity heart, and build lives that make a noticeable impact. Together, we can do more. Thank you!
            </p>
            <Button className="bg-[#C83737] text-white px-8 py-3 rounded-full font-medium text-sm md:text-lg cursor-pointer hover:bg-[#C83737]/90 transition-colors">
              Donate
            </Button>
          </div>
        </div>
      </section>

      {/* Memories Gallery */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] text-center mb-12">Memories</h2>
          <MemoriesGallery />
        </div>
      </section>

      {/* See You This Sunday */}
      <section className="relative py-40 md:py-24 text-white text-center">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/footer-hero.png')`,
          }}
        ></div>

        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 w-full flex justify-center pointer-events-none">
          <div className="relative max-w-4xl mx-auto px-4 pointer-events-auto">
            <div className={`${dmSans.className} text-[#F5F5F5] text-xs md:text-base font-medium uppercase tracking-wide mt-6 mb-5 md:mt-12 md:mb-10`}>Favourite Quote</div>
            <blockquote className={`${dmSans.className} text-[#F5F5F5] text-xl md:text-3xl font-semibold mb-8`}>
              “One moment in God&apos;s presence <br />can change everything.”
            </blockquote>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 -bottom-10 md:-bottom-24 z-20 w-full px-4 flex justify-center pointer-events-none">
          <div className="bg-[#FFFFFF] max-w-[1120px] w-full mx-auto px-4 rounded-xl shadow-lg pointer-events-auto py-10 md:py-20">
            <h2 className={`text-[#1A1A1A] text-2xl md:text-[44px] font-bold mb-6 ${merriweather.className}`}>See You This Sunday</h2>
            <p className={`text-[#3C4A5A] text-sm md:text-lg mb-8 ${dmSans.className} max-w-[572px] mx-auto`}>
              Grow stronger in your walk with God and connect with a loving church family.
            </p>

            <div className="bg-[#1A1A1A] mb-4 flex flex-col md:max-w-[403px] mx-auto rounded-xl">
              <div className="pt-2 px-2 flex justify-between items-center">
                <div className={`${dmSans.className} px-4 md:px-8 py-3 bg-[#FFFFFF] text-[#3C4A5A] font-bold border-2 border-[#1A1A1A] rounded-xl`}>
                  6:30am
                </div>
                <div className={`${dmSans.className} px-4 md:px-8 py-3 bg-[#FFFFFF] text-[#3C4A5A] font-bold border-2 border-[#1A1A1A] rounded-xl`}>
                  8:00am
                </div>
                <div className={`${dmSans.className} px-4 md:px-8 py-3 bg-[#FFFFFF] text-[#3C4A5A] font-bold border-2 border-[#1A1A1A] rounded-xl`}>
                  9:30am
                </div>
              </div>
              <div className="text-white py-4">(GMT +1)</div>
            </div>
            <Link href="mailto:elyonlifeministry@gmail.com">
              <Button className={`w-full cursor-pointer max-w-[403px] mx-auto bg-[#B33A3A] text-white py-4 rounded-xl hover:bg-[#B33A3A]/90 transition-colors font-semibold`}>
                Contact us
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-12 md:h-[350px]"></div>
      </section>
    </div>
  );
}
