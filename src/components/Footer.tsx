 import Link from "next/link"
import { FaWhatsapp } from "react-icons/fa";
import { CgFacebook } from "react-icons/cg";
import { SiTelegram, SiYoutube } from "react-icons/si"
import { BiLogoGmail } from "react-icons/bi";
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['500', '600'],
});


export default function Footer() {
  return (
  // <footer className="2xl:max-w-[1090px] 2xl:mx-auto bg-[#060606] text-white pt-[300px] md:pt-[450px]">
    //   <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <footer className="bg-[#060606] text-white pt-[300px] md:pt-[450px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-6 md:mb-0">
            <div className="relative w-16 h-16 md:w-36 md:h-36">
               <video
    src="/ELYON (1).webm"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-contain"
  />
            </div>
          </Link>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className={`font-bold ${dmSans.className} text-sm text-[#FFFFFF] md:text-lg mb-4`}>Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className={`block ${dmSans.className} font-medium text-xs md:text-base text-[#F8FFF8] hover:text-[#CFA83C] transition-colors`}>
                Home
              </Link>
              <Link href="/about" className={`block ${dmSans.className} font-medium text-xs md:text-base text-[#F8FFF8] hover:text-[#CFA83C] transition-colors`}>
                About us
              </Link>
              <Link href="/give" className={`block ${dmSans.className} font-medium text-xs md:text-base text-[#F8FFF8] hover:text-[#CFA83C] transition-colors`}>
                Give
              </Link>
              <Link href="/sermons" className={`block ${dmSans.className} font-medium text-xs md:text-base text-[#F8FFF8] hover:text-[#CFA83C] transition-colors`}>
                Sermons
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="relative">
            <h4 className={`font-bold ${dmSans.className} text-sm text-[#FFFFFF] md:text-lg mb-4`}>Contact</h4>
            <div className="space-y-2 text-sm">
              <p className={`block ${dmSans.className} font-medium text-xs md:text-base text-[#F8FFF8] md:mb-4`}>+2348038128101, +2348028157170</p>
              <p className={`block ${dmSans.className} font-medium text-xs md:text-base text-[#F8FFF8]`}>4 Ikot Udowot, Shelter Afrique Extension,</p>
              <p className={`block ${dmSans.className} font-medium text-xs md:text-base text-[#F8FFF8]`}>Oron road, Uyo, Akwa Ibom - Nigeria</p>
            </div>
            <div className="absolute -bottom-14 flex space-x-4">
              <Link href="https://wa.me/2348038128101" target="_blank" title="WhatsApp">
                <FaWhatsapp className="w-8 h-8 md:w-10 md:h-10 hover:text-[#CFA83C] border border-[#292929] hover:border-[#CFA83C] p-[6px] rounded-full cursor-pointer" />
              </Link>

              <Link href="mailto:elyonlifeministry@gmail.com" title="Gmail">
                <BiLogoGmail className="w-8 h-8 md:w-10 md:h-10 hover:text-[#CFA83C] border border-[#292929] hover:border-[#CFA83C] p-[6px] rounded-full cursor-pointer" />
              </Link>

              <Link href="https://web.facebook.com/profile.php?id=61552813367120" target="_blank" title="Facebook">
                <CgFacebook className="w-8 h-8 md:w-10 md:h-10 hover:text-[#CFA83C] border border-[#292929] hover:border-[#CFA83C] p-[6px] rounded-full cursor-pointer" />
              </Link>

              <Link href="https://t.me/elyonlifeministry" target="_blank" title="Telegram">
                <SiTelegram className="w-8 h-8 md:w-10 md:h-10 hover:text-[#CFA83C] border border-[#292929] hover:border-[#CFA83C] p-[6px] rounded-full cursor-pointer" />
              </Link>

              <Link href="https://youtube.com/@elyonlifeministry" target="_blank" title="Youtube">
                <SiYoutube className="w-8 h-8 md:w-10 md:h-10 hover:text-[#CFA83C] border border-[#292929] hover:border-[#CFA83C] p-[6px] rounded-full cursor-pointer" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#3C4A5A] mt-20 py-3 md:py-6 text-center text-sm">
          <p className={`${dmSans.className} text-[#F8FFF8] text-xs md:text-base font-medium`}>© 2025 - Elyon Life Ministry | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
