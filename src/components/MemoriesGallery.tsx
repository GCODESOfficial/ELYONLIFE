"use client"

import Image from "next/image";

const images = [
  "/images/memories/memories1.jpg",
  "/images/memories/memories2.jpg",
  "/images/memories/memories3.jpg",
  "/images/memories/memories4.jpg",
  "/images/memories/memories5.jpg",
  "/images/memories/memories6.jpg",
  "/images/memories/memories7.jpg",
  "/images/memories/memories8.jpg",
  "/images/memories/memories9.jpg",
  "/images/memories/memories10.jpg",
];

export default function MemoriesGallery() {
  return (
    <div className="w-full">
      {/* Desktop: 5 columns, 2 rows */}
      <div className="hidden md:grid grid-cols-5 grid-rows-2 gap-4">
        {images.slice(0, 10).map((src, i) => (
          <div key={i} className="aspect-square bg-black rounded-lg overflow-hidden">
            <Image
              src={src}
              alt={`Memory ${i + 1}`}
              width={400}
              height={400}
              className="w-full h-full object-cover"
              priority={i < 5}
            />
          </div>
        ))}
      </div>
      {/* Mobile: Custom 3-column vertical gallery for new images only */}
      <div className="grid grid-cols-3 gap-3 md:hidden">
        {/* First column */}
        <div className="flex flex-col">
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image src="/images/memories/memories-m-1.png" alt="Memories" fill className=" object-contain" />
          </div>
          <div className="relative aspect-[2/4] w-full overflow-hidden">
            <Image src="/images/memories/memories-m-2.png" alt="Memories" fill className=" object-contain" />
          </div>
          <div className="relative aspect-[1/1] w-full overflow-hidden">
            <Image src="/images/memories/memories-m-3.png" alt="Memories" fill className=" object-contain" />
          </div>
        </div>
        {/* Second column */}
        <div className="flex flex-col mt-[2px]">
          <div className="relative aspect-[1/1] w-full overflow-hidden">
            <Image src="/images/memories/memories-m-4.png" alt="Memories" fill className=" object-contain" />
          </div>
          <div className="relative aspect-[2/4] w-full overflow-hidden">
            <Image src="/images/memories/memories-m-5.png" alt="Memories" fill className=" object-contain" />
          </div>
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image src="/images/memories/memories-m-6.png" alt="Memories" fill className=" object-contain" />
          </div>
        </div>
        {/* Third column */}
        <div className="flex flex-col -mt-2">
          <div className="relative aspect-[2/4] w-full overflow-hidden">
            <Image src="/images/memories/memories-m-7.png" alt="Memories" fill className=" object-contain" />
          </div>
          <div className="relative aspect-[2/3] mb-2 w-full overflow-hidden">
            <Image src="/images/memories/memories-m-8.png" alt="Memories" fill className=" object-contain" />
          </div>
          <div className="relative aspect-[1/1] w-full overflow-hidden">
            <Image src="/images/memories/memories-m-9.png" alt="Memories" fill className=" object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}