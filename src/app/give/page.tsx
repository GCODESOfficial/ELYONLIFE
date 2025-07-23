"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Merriweather, DM_Sans } from 'next/font/google';
import { Button } from "@/components/ui/button";

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['500', '600'],
});


export default function GivePage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative h-64 md:h-[440px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/give-hero.png')`,
          }}
        ></div>
        <div className="absolute z-20 left-0 md:left-14 bottom-20 md:bottom-40 p-4 md:p-8">
          <h1 className={`${merriweather.className} text-xl md:text-[40px] mb-4 font-bold`}>Give</h1>
          <div className={`${dmSans.className}flex text-xs md:text-lg space-x-2 font-medium`}>
            <Link href="/" className="hover:text-[#CFA83C]">
              Home
            </Link>
            <span>›</span>
            <span className="text-[#8E8E8E]">Give</span>
          </div>
        </div>
      </section>

      {/* Give Online Section */}
      <section className="relative z-30">
        <div className="absolute left-1/2 -translate-x-1/2 -top-16 md:-top-28 w-full max-w-[996.67px] px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 md:p-12 text-center shadow-xl">
            <h2 className={`${merriweather.className} text-xl md:text-[44px] font-bold text-[#1A1A1A] mb-3`}>Give Online</h2>
            <p className={`${dmSans.className} max-w-[214px] md:max-w-[349px] mx-auto font-medium text-[#3C4A5A] text-xs md:text-lg mb-12`}>Every gift is a seed of faith, sown in love, grown by grace.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* United Bank for Africa */}
              <div className="bg-[#F5F5F5] rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Image src="/icons/uba.png" alt="UBA Logo" width={32} height={32} className="w-8 h-8 mr-3" />
                  <h3 className={`${dmSans.className} text-sm md:text-2xl font-bold text-[#1A1A1A]`}>United Bank for Africa</h3>
                </div>
                <div className="text-left space-y-2">
                  <p className={`${dmSans.className} text-xs md:text-lg text-[#3C4A5A] font-medium`}>Prince Esshiett</p>
                  <div className="flex items-center justify-between">
                    <p className={`${dmSans.className} text-base md:text-xl font-semibold text-[#1A1A1A]`}>2163691943</p>
                    <button className="p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={() => handleCopy("2163691943")}>
                      {copied === "2163691943" ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-[#1A1A1A]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Moniepoint MFB */}
              <div className="bg-[#F5F5F5] rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Image src="/icons/monie.png" alt="Moniepoint Logo" width={32} height={32} className="w-8 h-8 mr-3" />
                  <h3 className={`${dmSans.className} text-sm md:text-2xl font-bold text-[#1A1A1A]`}>Moniepoint MFB</h3>
                </div>
                <div className="text-left space-y-2">
                  <p className={`${dmSans.className} text-xs md:text-lg text-[#3C4A5A] font-medium`}>Elyon Life Ministry</p>
                  <div className="flex items-center justify-between">
                    <p className={`${dmSans.className} text-base md:text-xl font-semibold text-[#1A1A1A]`}>8038128101</p>
                    <button className="p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={() => handleCopy("8038128101")}>
                      {copied === "8038128101" ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-[#1A1A1A]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Zenith Bank */}
              <div className="bg-[#F5F5F5] rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Image src="/icons/zenith.png" alt="UBA Logo" width={32} height={32} className="w-8 h-8 mr-3" />
                  <h3 className={`${dmSans.className} text-sm md:text-2xl font-bold text-[#1A1A1A]`}>Zenith Bank</h3>
                </div>
                <div className="text-left space-y-2">
                  <p className={`${dmSans.className} text-xs md:text-lg text-[#3C4A5A] font-medium`}>Prince Inyang Esshiet</p>
                  <div className="flex items-center justify-between">
                    <p className={`${dmSans.className} text-base md:text-xl font-semibold text-[#1A1A1A]`}>2432204975</p>
                    <button className="p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={() => handleCopy("2432204975")}>
                      {copied === "2432204975" ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-[#1A1A1A]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Zenith Bank */}
              <div className="bg-[#F5F5F5] rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Image src="/icons/zenith.png" alt="UBA Logo" width={32} height={32} className="w-8 h-8 mr-3" />
                  <h3 className={`${dmSans.className} text-sm md:text-2xl font-bold text-[#1A1A1A]`}>Zenith Bank</h3>
                </div>
                <div className="text-left space-y-2">
                  <p className={`${dmSans.className} text-xs md:text-lg text-[#3C4A5A] font-medium`}>Prince Inyang Esshiet</p>
                  <div className="flex items-center justify-between">
                    <p className={`${dmSans.className} text-base md:text-xl font-semibold text-[#1A1A1A]`}>2432205350</p>
                    <button className="p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={() => handleCopy("2432205350")}>
                      {copied === "2432205350" ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-[#1A1A1A]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[920px] md:h-[600px]"></div>
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

        {/* Fave Quote */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 w-full flex justify-center pointer-events-none">
          <div className="relative max-w-4xl mx-auto px-4 pointer-events-auto">
            <div className={`${dmSans.className} text-[#F5F5F5] text-xs md:text-base font-medium uppercase tracking-wide mt-6 mb-5 md:mt-12 md:mb-10`}>Favourite Quote</div>
            <blockquote className={`${dmSans.className} text-[#F5F5F5] text-xl md:text-3xl font-semibold mb-8`}>
              “One moment in God&apos;s presence <br />can change everything.”
            </blockquote>
          </div>
        </div>

        {/* sunday time card*/}
        <div className="absolute left-1/2 -translate-x-1/2 translate-y-1/2 -bottom-10 md:-bottom-24 z-20 w-full px-4 flex justify-center pointer-events-none">
          <div className="bg-[#FFFFFF] max-w-[1120px] w-full mx-auto px-4 rounded-xl shadow-lg pointer-events-auto py-10 md:py-20">
            <h2 className={`text-[#1A1A1A] text-2xl md:text-[44px] font-bold mb-6 ${merriweather.className}`}>See You This Sunday</h2>
            <p className={`text-[#3C4A5A] text-sm md:text-lg mb-8 ${dmSans.className} max-w-[572px] mx-auto`}>Grow stronger in your walk with God and connect with a loving church family.</p>

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
            <Link
              href="mailto:elyonlifeministry@gmail.com"
            >
              <Button className={`w-full cursor-pointer max-w-[403px] mx-auto bg-[#B33A3A] text-white py-4 rounded-xl hover:bg-[#B33A3A]/90 transition-colors font-semibold`}>Contact us</Button>
            </Link>
          </div>
        </div>
        <div className="h-12 md:h-[350px]"></div>
      </section>
    </div>
  )
}