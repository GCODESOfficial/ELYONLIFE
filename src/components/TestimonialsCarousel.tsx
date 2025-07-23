"use client"

import React, { useRef, useEffect, useState } from "react";
import { DM_Sans, Great_Vibes } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['500', '600'],
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
});

const testimonials = [
    {
        text: "Since I joined this commission, God has been really faithful to me and my family. I thank God notably for healing me from severe chest pain in one of the deliverance services with the man of God. I don’t feel any pains anymore. I return all the glory to the God of this commission.",
        author: "Mrs Maria John Ubuoh",
    },
    {
        text: "I thank God for His goodness and faithfulness in my life and family. A few months ago, my sister and I applied for a NELFUND scholarship, and after the man of God at Elyon Life Ministry declared blessings during a service, we began receiving the payments. I’m especially grateful for how God has continued to show up in my academics. Glory be to God forever!",
        author: "Evangelist Lillian Ubuoh",
    },
        {
        text: "Some Sundays ago, I suddenly slumped on my way to church, became unconscious, and was too weak to move. I was rushed to Elyon Life Ministry, where the man of God laid hands on me and ministered in the Name of Jesus. Miraculously, I regained my strength and was able to walk again. May the name of the Lord be praised forever!",
        author: "Sis. Adehma A.",
    },
        {
        text: "During my son’s internship in Lagos, he fell into the hands of ritualists who enslaved and manipulated him using charms, starving him and extorting money from us. Through fervent prayers and a family deliverance service at Elyon Life Ministry, where he joined online secretly, God miraculously set him free. He later escaped safely and completed his internship with secure accommodation. Praise God! ",
        author: "Evangelist Beatrice Iyaji",
    },
];

function TestimonialCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;
        const scrollStep = 1;
        const scrollInterval = 20;
        let interval: NodeJS.Timeout | null = null;

        function startScroll() {
            if (interval) return;
            interval = setInterval(() => {
                if (!containerRef.current || isPaused) return;
                let currentScroll = containerRef.current.scrollLeft;
                currentScroll += scrollStep;
                if (
                    currentScroll >=
                    containerRef.current.scrollWidth - containerRef.current.clientWidth
                ) {
                    currentScroll = 0;
                }
                containerRef.current.scrollLeft = currentScroll;
            }, scrollInterval);
        }

        function stopScroll() {
            if (interval) clearInterval(interval);
            interval = null;
        }

        if (!isPaused) startScroll();
        else stopScroll();

        return () => stopScroll();
    }, [isPaused]);

    return (
        <div
            ref={containerRef}
            className="overflow-x-hidden w-full"
            style={{ width: "100%", cursor: "pointer" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="flex">
                {testimonials.map((t, i) => (
                    <div
                        key={i}
                        className="min-w-[260px] max-w-[320px] md:min-w-[500px] md:max-w-[700px] bg-[#FFFFFF] md:bg-[#F5F5F5] rounded-xl shadow py-8 px-4 mx-6"
                        style={{ display: "inline-block" }}
                    >
                        <p className={`text-[#3C4A5A] leading-relaxed font-medium text-base md:text-xl mb-4 ${dmSans.className}`}>{t.text}</p>
                        <p className={`text-[#2E2E2E] text-2xl md:text-[32px] ${greatVibes.className}`}>{t.author}</p>
                    </div>
                ))}
                {/* Duplicate for seamless loop */}
                {testimonials.map((t, i) => (
                    <div
                        key={i + testimonials.length}
                        className="min-w-[260px] max-w-[320px] md:min-w-[500px] md:max-w-[700px] bg-[#FFFFFF] md:bg-[#F5F5F5] rounded-lg shadow py-8 px-4 mx-6"
                        style={{ display: "inline-block" }}
                    >
                        <p className={`text-[#3C4A5A] leading-relaxed font-medium text-base md:text-xl mb-4 ${dmSans.className}`}>{t.text}</p>
                        <p className={`text-[#2E2E2E] text-2xl md:text-[32px] ${greatVibes.className}`}>{t.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TestimonialCarousel;