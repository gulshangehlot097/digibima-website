"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, MapPin, Menu, Search, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { logo } from "@/images/Image";
import Image from "next/image";

import {
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-40">
        <div
          className={`bg-gray-900 text-gray-200 text-sm transition-all duration-500 ease-in-out 
        ${
          isScrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }
      `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10 ">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <span>info@digibima.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline">Follow us:</span>
              <Link href="#">
                <FaTwitter className="hover:text-blue-400" />
              </Link>
              <Link href="#">
                <FaFacebookF className="hover:text-blue-600" />
              </Link>
              <Link href="#">
                <FaPinterestP className="hover:text-red-500" />
              </Link>
              <Link href="#">
                <FaInstagram className="hover:text-pink-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 right-0   transition-all duration-500 z-[60]
    ${
      isScrolled
        ? "mt-0 mx-0 lg:mx-20 w-full lg:w-[89%] bg-white shadow-md rounded-full px-10"
        : "mt-10 w-full"
    }
  `}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative z-999">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold whitespace-nowrap">
            <Image
              src={logo}
              alt="Digibima Logo"
              width={125} // fix width
              height={45} // fix height
              priority
              className="h-auto w-auto"
            />
          </Link>

          {/* Menu for Desktop */}
          <nav className="hidden md:flex space-x-3 lg:space-x-6 font-medium text-gray-700">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <Link href="/about" className="hover:text-green-600">
              About Us
            </Link>
            <Link href="/solutions" className="hover:text-green-600">
              Services
            </Link>

            <Link href="/blog" className="hover:text-green-600">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-green-600">
              Contact
            </Link>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            <div className="flex items-center space-x-3 text-gray-700">
              <motion.div
                animate={{ rotate: [-15, 15, -15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              >
                <Phone size={28} className="text-green-500" />
              </motion.div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-500">CALL US NOW</span>
                <a
                  href="tel:+919119173733"
                  className="font-semibold text-gray-900 hover:text-green-600"
                >
                  +91 911 91 73 733
                </a>
              </div>
            </div>

            <Link
              href="/login"
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 relative z-[61]"
            onClick={() => setIsOpen((o) => !o)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute left-0 right-0 top-full bg-white border-t shadow-lg
        overflow-hidden grid transition-[grid-template-rows,opacity] duration-300 ease-in-out
        ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
      `}
        >
          <nav className="px-4 py-3 space-y-2">
            <Link href="/" className="block hover:text-green-600">
              Home
            </Link>
            <Link href="/about" className="block hover:text-green-600">
              About
            </Link>
            <Link href="/solutions" className="block hover:text-green-600">
              Solutions
            </Link>
            <Link href="/pages" className="block hover:text-green-600">
              Pages
            </Link>
            <Link href="/blog" className="block hover:text-green-600">
              Blog
            </Link>
            <Link href="/contact" className="block hover:text-green-600">
              Contact
            </Link>
            <Link
              href="/get-started"
              className="block px-4 py-2 bg-green-500 text-white rounded-lg text-center hover:bg-green-600"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
