import Link from "next/link"
import Image from "next/image"
import { Merriweather, DM_Sans, Great_Vibes } from 'next/font/google';
import { Button } from "@/components/ui/button";
import TestimonialCarousel from "@/components/TestimonialsCarousel";
import EventsCarousel from "@/components/EventsCarousel";
import MemoriesGallery from "@/components/MemoriesGallery";

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['500', '600'],
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/80 z-10"></div>
        {/* Desktop background */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden md:block"
          style={{ backgroundImage: `url('/images/hero.png')` }}
        ></div>
        {/* Mobile background */}
        <div
          className="absolute inset-0 bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url('/images/hero.png')` }}
        ></div>
        <div className="relative z-20 max-w-4xl mx-auto px-4">
          <p className={`text-4xl md:text-[64px] mb-6 ${greatVibes.className}`}>Welcome to</p>
          <h1 className={`text-4xl text-[#CFA83C] md:text-6xl font-bold mb-6 ${merriweather.className}`}>Elyon Life Ministry</h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-8 ${dmSans.className}`}>
            A place to worship, grow, and experience God&apos;s transforming love in community.
          </p>
        </div>
      </section>

      {/* Sharing God's Love Section */}
      <section className="pt-16 md:pt-28">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="order-2 md:order-1 flex-1">
              <div className="relative w-full h-full md:max-w-[475px] max-h-[480px]">
                <Image
                  src="/images/mission.jpg"
                  alt="Worship service"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6 flex-1">
              <div className={`text-[#3C4A5A] text-xs md:text-[16px] font-medium uppercase tracking-wide ${dmSans.className}`}>Our Mission</div>
              <h2 className={`text-2xl md:text-[44px] font-bold text-[#1A1A1A] ${merriweather.className}`}>Sharing God&apos;s Love and Changing Lives</h2>
              <p className={`text-[#1A1A1A] text-sm md:text-xl leading-relaxed ${dmSans.className}`}>
                Since 2017, God has been the author of our journey as we seek to be ready for His Kingdom. We believe in
                the power of community, worship, and spiritual growth to transform lives and bring hope to our world.
              </p>
              <Link href="/about">
                <Button className={`bg-[#C83737] text-white px-6 py-6 rounded-full font-medium text-sm md:text-lg cursor-pointer ${dmSans.className} hover:bg-[#C83737]/90 transition-colors`}>
                  Read More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="pt-16 md:pt-28 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <blockquote className={`text-base md:text-[28px] font-semibold ${dmSans.className}`}>
            &quot;And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of
            many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in.&quot;
          </blockquote>
          <cite className={`text-[#C83737] mb-10 md:mb-0 text-sm md:text-2xl font-semibold ${dmSans.className}`}>- Isaiah 58:12 (KJV)</cite>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="md:mt-20 py-10 md:py-20 max-w-[1120px] rounded-xl mx-auto bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`text-[#3C4A5A] text-xs md:text-base font-medium uppercase tracking-wide mb-5 md:mb-10 ${dmSans.className}`}>Fellowship with us</div>
          <h2 className={`text-2xl md:text-[44px] mx-auto max-w-[571px] font-bold text-[#1A1A1A] mb-10 md:mb-20 ${merriweather.className}`}>
            Join Us for Worship, Fellowship, and Growth
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[936px] mx-auto">
            {/* Card 1: Sunday Worship Service */}
            <div className="relative group w-full overflow-hidden rounded-xl">
              <Image
                src="/images/worship.jpg"
                alt="Sunday Worship Service"
                width={400}
                height={300}
                className="w-full h-[340px] rounded-xl object-cover md:max-h-[357px] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden md:block absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl"></div>
              <div className="absolute bottom-0 w-full py-4 flex flex-col items-center md:w-[288px] z-20 transition-all duration-300 group-hover:-translate-y-20">
                <span className={`text-[#CFA83C] text-sm md:text-2xl font-semibold ${dmSans.className} group-hover:mb-6`}>Sunday <br />Worship Service</span>
              </div>
              <div className="absolute bottom-0 w-full py-4 flex flex-col items-center md:w-[288px] z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-20">
                <hr className="hidden md:block w-40 border-t-2 border-white my-2" />
                <span className={`text-[#CFA83C] text-xs md:text-lg font-medium ${dmSans.className}`}>Timezone: GMT +1<br />1st Service: 6:30am<br />2nd Service: 8:00am</span>
              </div>
            </div>

            {/* Card 2: Healing and Deliverance Service */}
            <div className="relative group w-full overflow-hidden rounded-xl">
              <Image
                src="/images/healing.jpg"
                alt="Healing and Deliverance Service"
                width={400}
                height={300}
                className="w-full h-[340px] rounded-xl object-cover md:max-h-[357px] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden md:block absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl"></div>
              <div className="absolute bottom-0 w-full py-4 flex flex-col items-center md:w-[288px] z-20 transition-all duration-300 group-hover:-translate-y-20">
                <span className={`text-white text-sm md:text-2xl font-semibold ${dmSans.className}`}>Healing and <br />Deliverance Service</span>
              </div>
              <div className="absolute bottom-0 w-full py-4 flex flex-col items-center md:w-[288px] z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-20">
                <hr className="hidden md:block w-40 border-t-2 border-white my-2" />
                <span className={`text-white text-xs md:text-lg font-medium ${dmSans.className}`}>Timezone: GMT +1<br />Every Tuesday: 8:30am</span>
              </div>
            </div>

            {/* Card 3: Communion Service */}
            <div className="relative group w-full overflow-hidden rounded-xl">
              <Image
                src="/images/communion.jpg"
                alt="Communion Service"
                width={400}
                height={300}
                className="w-full h-[340px] rounded-xl object-cover md:max-h-[357px] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="hidden md:block absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-xl"></div>
              <div className="absolute bottom-0 w-full py-4 flex flex-col items-center md:w-[288px] z-20 transition-all duration-300 group-hover:-translate-y-20">
                <span className={`text-white text-sm md:text-2xl font-semibold ${dmSans.className}`}>Communion <br />Service</span>
              </div>
              <div className="absolute bottom-0 w-full py-4 flex flex-col items-center md:w-[288px] z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0 translate-y-20">
                <hr className="hidden md:block w-40 border-t-2 border-white my-2" />
                <span className={`text-white text-xs md:text-lg font-medium ${dmSans.className}`}>Timezone: GMT +1<br />Every Friday: 6:30am</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimony Section */}
      <section className="py-10 md:py-20 bg-[#F5F5F5] md:bg-[#FFFFFF]">
        <div className="py-10 rounded-xl max-w-[1120px] bg-[#F5F5F5] md:bg-[#FFFFFF] mx-auto px-1 text-center">
          <div className={`text-[#3C4A5A] text-xs md:text-base font-medium uppercase tracking-wide mb-3 md:mb-6 ${dmSans.className}`}>Our stories</div>
          <h2 className={`max-w-[408px] mx-auto text-lg md:text-2xl font-semibold text-[#1A1A1A] mb-10 md:20 ${dmSans.className}`}>
            Every testimony is a reminder that God is still working.
          </h2>
          {/* testimonials carousel */}
          <TestimonialCarousel />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full max-w-[708px]">
            <h2 className={`text-2xl md:text-[40px] mb-5 md:mb-10 font-bold text-[#1A1A1A] ${merriweather.className}`}>Upcoming Events</h2>
            <EventsCarousel />
          </div>
          <div className="relative group">
            <h1 className={`text-[#3C4A5A] mt-10 md:mt-0 mb-5 md:mb-10 font-medium text-sm md:text-lg ${dmSans.className}`}>Hear God’s Word <br />Spoken to Your Heart.</h1>
            <Image
              src="/images/mission.jpg"
              alt="Sunday Worship Service"
              width={400}
              height={300}
              className="w-full md:max-w-[296px] h-full rounded-xl md:max-h-[400px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-10">
              <div className={`text-white text-xs mb-2 uppercase ${dmSans.className}`}>Sermons</div>
              <div className={`text-white text-2xl md:text-3xl font-bold mb-6 ${merriweather.className}`}>God’s Word</div>
              <Link href="/sermons">
                <button className="bg-[#C83737] text-white cursor-pointer px-6 py-3 rounded-lg font-semibold text-base hover:bg-[#B33A3A] transition-colors w-fit">
                  Watch Now
                </button>
              </Link>
            </div>
          </div>
          <div>
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
