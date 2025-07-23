"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

function EventsCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase.from("events").select("images");
      if (data && Array.isArray(data)) {
        const allImages = data.flatMap((event) =>
          Array.isArray(event.images) ? event.images : []
        );
        setImages(allImages);
      } else {
        setImages([]);
      }
      setLoading(false);
    };
    
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!images.length) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, images.length]);

  if (loading) return null;
  if (!images.length) {
    return (
      <div className="w-full text-center py-12 text-xl text-[#CFA83C]">
        Coming soon
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-black">
      <div className="relative h-[240px] md:h-[400px] flex items-center justify-center">
        <Image
          src={images[current]}
          alt={`Event Image ${current + 1}`}
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border border-white transition-all duration-200 ${
              idx === current ? "bg-white" : "bg-transparent"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to event image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default EventsCarousel;
