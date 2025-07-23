/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const images = [
  { src: "/images/upcoming-placeholder.jpg", alt: "Upcoming Event 1" },
  { src: "/images/upcoming-placeholder.jpg", alt: "Upcoming Event 2" },
  { src: "/images/upcoming-placeholder.jpg", alt: "Upcoming Event 3" },
  { src: "/images/upcoming-placeholder.jpg", alt: "Upcoming Event 4" },
];

export default function EventsGalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const visibleCount = typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  // Responsive visible count
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [count, setCount] = useState(getVisibleCount());
  useEffect(() => {
    const handleResize = () => setCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get visible images
  const visibleImages = [];
  for (let i = 0; i < count; i++) {
    visibleImages.push(images[(current + i) % images.length]);
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black">
      <div className="flex transition-all duration-500 gap-4 justify-center">
        {visibleImages.map((img, idx) => (
          <div key={idx} className="relative w-full max-w-xs aspect-[16/9] rounded-xl overflow-hidden">
            <Image src={img.src} alt={img.alt} fill className="object-cover w-full h-full" />
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border border-[#C83737] transition-all duration-200 ${idx === current ? "bg-[#C83737]" : "bg-transparent"}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to event ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

