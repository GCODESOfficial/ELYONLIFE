"use client"

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const aboutImages = [
  {
    src: "/images/about/carousel1.jpg",
    alt: "Carousel 1",
  },
  {
    src: "/images/about/carousel2.jpg",
    alt: "Carousel 2",
  },
  {
    src: "/images/about/carousel3.jpg",
    alt: "Carousel 3",
  },
    {
    src: "/images/about/carousel4.jpg",
    alt: "Carousel 4",
  },
  {
    src: "/images/about/carousel5.jpg",
    alt: "Carousel 5",
  },
  {
    src: "/images/about/carousel6.jpg",
    alt: "Carousel 6",
  },
  {
    src: "/images/about/carousel7.jpg",
    alt: "Carousel 7",
  },
  {
    src: "/images/about/carousel8.jpg",
    alt: "Carousel 8",
  },
  {
    src: "/images/about/carousel9.jpg",
    alt: "Carousel 9",
  },
  {
    src: "/images/about/carousel10.jpg",
    alt: "Carousel 10",
  },
  {
    src: "/images/about/carousel11.jpg",
    alt: "Carousel 11",
  },
  {
    src: "/images/about/carousel12.jpg",
    alt: "Carousel 12",
  },
  {
    src: "/images/about/carousel13.jpg",
    alt: "Carousel 13",
  },
  {
    src: "/images/about/carousel14.jpg",
    alt: "Carousel 14",
  },
];

interface AboutCarouselProps {
  width?: string;
  height?: string;
  className?: string;
}

const AboutCarousel: React.FC<AboutCarouselProps> = ({ className = "" }) => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current]);

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden bg-black ${className}`}
    >
      {/* Vertical scroll on md+, horizontal on sm */}
      <div className="relative w-full h-full flex md:flex-col flex-row items-center justify-center transition-all duration-500">
        {aboutImages.map((img, idx) => (
          <div
            key={img.src}
            className={`absolute transition-all duration-700 ease-in-out w-full h-full flex-shrink-0 ${
              idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover w-full h-full"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
      {/* Dots */}
      {/* <div className="absolute md:right-4 md:top-1/2 md:transform md:-translate-y-1/2 md:flex-col md:space-y-2 bottom-4 left-0 w-full flex justify-center gap-2 z-10 md:w-auto md:justify-end md:left-auto md:bottom-auto">
        {aboutImages.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border border-white transition-all duration-200 ${
              idx === current ? "bg-white" : "bg-transparent"
            }`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default AboutCarousel;
