import Link from "next/link"
import Image from "next/image"
import { Merriweather, DM_Sans } from 'next/font/google';
import { Button } from "@/components/ui/button";
import MemoriesGallery from "@/components/MemoriesGallery";
import AboutCarousel from "@/components/AboutCarousel";


const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['500', '600'],
});



export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative h-64 md:h-[440px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/about/about-hero.png')`,
          }}
        ></div>
        <div className="absolute z-20 left-0 md:left-14 bottom-0 p-4 md:p-8">
          <h1 className={`${merriweather.className} text-xl md:text-[40px] mb-4 font-bold text-[#CFA83C]`}>About Us</h1>
          <div className={`${dmSans.className}flex text-xs md:text-lg space-x-2 font-medium`}>
            <Link href="/" className="hover:text-[#CFA83C]">
              Home
            </Link>
            <span>›</span>
            <span className="text-[#8E8E8E]">About us</span>
          </div>
        </div>
      </section>

      {/* Meet Our Pastor Section */}
      <section className="py-16 md:py-24 w-full md:max-w-[1120px] mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="">
              <div className={`text-[#3C4A5A] mb-4 md:mb-10 text-xs md:text-base font-medium uppercase tracking-wide ${dmSans.className}`}>Meet Our Pastor</div>
              <h2 className={`text-2xl md:text-[44px] font-bold text-[#1A1A1A] ${merriweather.className}`}>PRINCE ESSHIETT</h2>
              <p className={`${dmSans.className} mb-4 md:mb-10 text-[#3C4A5A] text-base md:text-2xl font-semibold`}>General Overseer</p>
              <div className={`${dmSans.className} text-sm md:textlg text-[#3C4A5A] leading-relaxed`}>
                <p>
                  Prince Esshiett is a servant of God who has been in the ministry for a couple of years.
                  He spends his time being used by God to minister to people of all works of life irrespective of age, color, or race etc., in order to effect positive changes in their lives by the power of the Holy Ghost.
                  Being one who has dedicated his life solely to the things of God, he believes in the total positive transformation of man by the power of God, and is passionate about touching lives through charitable works like Jesus did.
                  Apart from being a servant of God, he&apos;s also a husband and a father of two. </p>
              </div>
            </div>
            <div className="">
              <div className="bg-[#0D1B2A] rounded-lg overflow-hidden">
                <Image
                  src="/images/about/eshiett.png"
                  alt="Prince Esshiett"
                  width={400}
                  height={500}
                  className="w-full h-full max-h-[480px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white w-full md:max-w-[1120px] mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className={`text-[#3C4A5A] text-xs md:text-base font-medium uppercase tracking-wide ${dmSans.className}`}>Who We Are</div>
              <h2 className={`${merriweather.className} text-2xl md:text-[44px] font-bold text-[#1A1A1A]`}>Our Story</h2>
              <div className={`space-y-4 text-sm md:text-lg text-[#3C4A5A] leading-relaxed ${dmSans.className}`}>
                <p>
                  A divine movement began in May 2017, geared towards the spiritual emancipation, restoration, and divine awakening of God&apos;s people. This movement, also known as Light and Fire Renaissance Commission  (LFRC), was used mightily by God to touch lives, save souls, and liberate God&apos;s people from all forms of darkness and spiritual captivity.
                </p>
                <p>
                  Today, Light and Fire Renaissance Commission has metamorphosed into Elyon Life Ministry, a vision with a greater mandate from God, to take the glorious gospel of Jesus Christ to the ends of the earth and transform lives positively through the victorious light of God.
                </p>
                <p>
                  Welcome to Elyon Life Ministry, a place where God lives, a place where the Spirit of God reigns, a place of Power and divine authority, a place of favour, grace and blessings, a place where God&apos;s love takes centre stage, and a place of God&apos;s light, where darkness is annihilated and the peace of God is enthroned in every aspect of our lives.
                </p>
              </div>
            </div>
            {/* About Carousel Section */}
            <div className="w-full max-w-5xl mx-auto py-8">
              <AboutCarousel className="h-[320px] md:h-[657px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Come Experience Section */}
      <section className="py-5 md:py-10 text-center">
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${dmSans.className}text-[#3C4A5A] text-xs md:text-base font-medium uppercase tracking-wide mb-4 md:mb-6`}>locate us</div>
          <h2 className={`${merriweather.className} font-bold text-2xl md:text-[44px] text-[#1A1A1A] mb-12`}>Come Experience <br />Elyon Life Ministry</h2>

          <div className="rounded-lg overflow-hidden mb-12">
            <Image
              src="/images/about/church.png"
              alt="Aerial view of Elyon Life Ministry building"
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Need Help Finding Us */}
      <section className="py-5 bg-[#F5F5F5]">
        <div className="max-w-[1120px] flex flex-col md:flex-row md:justify-between md:items-center mx-auto px-4 lg:px-0">
          <div className="max-w-[472px]">
            <div className={`${dmSans.className}text-[#3C4A5A] text-xs md:text-base font-medium uppercase tracking-wide mb-4 md:mb-6`}>get directions</div>
            <h2 className={`${merriweather.className} text-2xl md:text-[40px] font-bold text-[#1A1A1A] mb-3 md:mb-5`}>Need help finding us?</h2>
            <p className={`${dmSans.className} font-medium text-sm md:text-base text-[#3C4A5A] mb-12`}>
              Use the map to find your way. We&apos;d love to welcome you when you arrive!
            </p>
          </div>

          <div className="w-full md:w-[605px] h-[280px] md:h-[464px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3974.2983501567373!2d7.95502507368158!3d5.055305338484146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwMDMnMTkuMSJOIDfCsDU3JzI3LjQiRQ!5e0!3m2!1sen!2sng!4v1751973377559!5m2!1sen!2sng"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elyon Life Ministries"
            ></iframe>
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
