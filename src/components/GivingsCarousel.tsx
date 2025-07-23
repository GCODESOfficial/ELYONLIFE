"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const givingImages = [
  { src: "/images/memories/memories-m-1.png", alt: "Image 1" },
  { src: "/images/memories/memories-m-2.png", alt: "Image 2" },
  { src: "/images/memories/memories-m-8.png", alt: "Image 3" },
];

interface GivingsCarouselProps {
  width?: string;
  height?: string;
  className?: string;
}

const GivingsCarousel: React.FC<GivingsCarouselProps> = ({
  className = "",
}) => {
  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const numImages = givingImages.length;
  const images = [givingImages[numImages - 1], ...givingImages, givingImages[0]];

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsTransitioning(true);
      setIndex((prev) => prev + 1);
    }, 4000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (index === images.length - 1) {
      setIndex(1);
    } else if (index === 0) {
      setIndex(images.length - 2);
    }
  };

  return (
    <div
      className={`relative w-full h-[300px] md:h-[600px] overflow-hidden bg-black rounded-xl ${className}`}
    >
      {/* Mobile view - horizontal (rtl) scroll */}
      <div className="block md:hidden w-full h-full">
        <div
          className="flex flex-row-reverse w-full h-full"
          style={{
            width: `${images.length * 100}%`,
            transform: `translateX(-${index * (100 / images.length)}%)`,
            transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {images.map((img, idx) => (
            <div
              key={idx + img.src}
              className="w-full h-full flex-shrink-0 relative"
              style={{ width: `${100 / images.length}%` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                priority={idx === 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop view - vertical scroll (top to bottom) */}
      <div className="hidden md:block w-full h-full">
        <div
          className="flex flex-col w-full h-full"
          style={{
            height: `${images.length * 100}%`,
            transform: `translateY(-${index * (100 / images.length)}%)`,
            transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {images.map((img, idx) => (
            <div
              key={idx + img.src}
              className="w-full h-full flex-shrink-0 relative"
              style={{ height: `${100 / images.length}%` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                priority={idx === 1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GivingsCarousel;