"use client";
import { logo } from "@/images/Image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaHeartbeat,
  FaCarSide,
  FaMotorcycle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <footer className="bg-[#4C6991] pt-12 pb-6 px-4 sm:px-6 md:px-10 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
        
        {/* Logo & Address */}
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-start gap-2 bg-white rounded-2xl py-2 px-3">
            <Image 
              src={logo} 
              alt="Company Logo" 
              width={140}   
              height={50}  
              className="object-contain"
            />
          </div>
          <p className="text-sm text-gray-200 leading-relaxed flex items-start gap-2 justify-start max-w-xs sm:max-w-none">
            <span className="text-green-300 mt-1"><FaMapMarkerAlt /></span> 
            706, Lane No. 6, New Sanganer Road, Devi Nagar, Jaipur, Rajasthan 302019
          </p>

          {/* Social Links */}
          <div className="flex justify-start space-x-3 pt-4 flex-wrap gap-y-2">
            <Link href="https://www.facebook.com/DigiBima-103666025676333/" target="_blank"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition">
              <FaFacebookF />
            </Link>
            <Link href="https://instagram.com/digibima?igshid=YmMyMTA2M2Y=" target="_blank"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition">
              <FaInstagram />
            </Link>
            <Link href="https://twitter.com/Digi_Bima" target="_blank"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition">
              <FaTwitter />
            </Link>
            <Link href="https://in.linkedin.com/company/digibima/" target="_blank"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition">
              <FaLinkedinIn />
            </Link>
          </div>
        </div>

        {/* Footer Columns */}
        <FooterCol
          title="About Us"
          links={[
            { label: "+91 911 91 73 733", icon: <FaPhoneAlt />, href: "tel:+919119173733" },
            { label: "info@digibima.com", icon: <FaEnvelope />, href: "mailto:info@digibima.com" },
            { label: "Terms and Conditions", icon: <FaCheckCircle />, href: "/terms" },
          ]}
        />
        <FooterCol
          title="Life Insurance"
          links={[
            { label: "Term Life Plan", icon: <FaCheckCircle />, href: "/life/term-life" },
            { label: "Savings/Investment Plan", icon: <FaCheckCircle />, href: "/life/savings-plan" },
            { label: "Pension/Retirement Benefit Plan", icon: <FaCheckCircle />, href: "/life/pension-plan" },
            { label: "Child Savings Plan", icon: <FaCheckCircle />, href: "/life/child-savings" },
          ]}
        />
        <FooterCol
          title="Health Insurance"
          links={[
            { label: "Individual Health Insurance", icon: <FaHeartbeat />, href: "/health/individual" },
            { label: "Family Health Insurance", icon: <FaHeartbeat />, href: "/health/family" },
            { label: "Senior Citizen Health Plan", icon: <FaHeartbeat />, href: "/health/senior" },
            { label: "Maternity Insurance", icon: <FaHeartbeat />, href: "/health/maternity" },
          ]}
        />
        <FooterCol
          title="General Insurance"
          links={[
            { label: "2 Wheeler Insurance", icon: <FaMotorcycle />, href: "/general/2wheeler" },
            { label: "4 Wheeler Insurance", icon: <FaCarSide />, href: "/general/4wheeler" },
          ]}
        />
      </div>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto mt-10 text-xs text-gray-200 leading-relaxed border-t border-white/50 pt-4">
        {/* Mobile Toggle */}
        <div className="md:hidden text-left">
          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="text-green-300 font-medium underline"
          >
            {showDisclaimer ? "Hide Disclaimer" : "Read Disclaimer"}
          </button>
        </div>

        {/* Disclaimer Text */}
        <div className={`space-y-3 text-sm mt-4 ${showDisclaimer ? "block" : "hidden md:block"}`}>
          <p>
            <strong>Digibima Insurance Web Aggregators Private Limited</strong> | 
            CIN: U67110RJ2022PTC080500 | IRDAI License No.: 
            <strong> IRDAI/INT/WBA/76/2023</strong> Valid till: <strong>09/08/2026</strong>
          </p>
          <p>
            Insurance is the subject matter of solicitation. Information available on this portal 
            is of the partner insurer with whom we have an agreement. The information displayed is 
            solely based on the information received from the respective insurer.
          </p>
          <p>
            The information provided on this website/page is for information purpose only. Digibima 
            does not endorse the information so provided and strives to provide factual and unbiased 
            information to assist in making informed insurance choices.
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 border-t border-white/50 pt-3 text-left text-sm text-gray-200">
        © {new Date().getFullYear()} Digibima. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="font-semibold text-white mb-4 text-left">{title}</h3>
      <ul className="space-y-2 text-sm text-left">
        {links.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href || "#"}
              className="flex items-center justify-start gap-2 text-gray-200 hover:text-green-300 transition"
            >
              <span className="text-green-300">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
