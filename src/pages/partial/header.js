"use client";
import Link from "next/link";
import Lottie from "lottie-react";
import { useEffect, useRef, useState, useCallback } from "react";
import PhoneIcon from "@/animation/Call.json";
import {
  Mail,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  Shield,
  FileText,
  HeartPulse,
  PiggyBank,
  Landmark,
  Baby,
  Users,
  User,
  Accessibility,
  Activity,
  Plane,
  ShieldAlert,
  Bike,
  CarFront as Car,
  Truck,
  Home,
  Ship,
  Store,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { logo } from "@/images/Image";
import Image from "next/image";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { CallApi } from "@/api";

const pop = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.16, ease: "easeOut" },
};

const DESK = {
  ABOUT: "about",
  SERVICES: "services",
  LIFE: "services_life",
  HEALTH: "services_health",
  GENERAL: "services_general",
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDesk, setOpenDesk] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [accountOpen, setAccountOpen] = useState(false);
const [userName, setUserName] = useState("My Account");
const [loggingOut, setLoggingOut] = useState(false);
const [authReady, setAuthReady] = useState(false);

const BASE_PROFILE_URL = "https://uat.digibima.com/userpnlx/user-dashboard";
const [profileHref, setProfileHref] = useState(BASE_PROFILE_URL);

function getValidToken() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("db_auth_token");
  if (!raw) return null;
  const t = String(raw).trim();

  if (!t || t === "null" || t === "undefined") return null;
  return t;
}
useEffect(() => {
  const sync = () => {
    const t = getValidToken();
    setIsLoggedIn(!!t);
    try {
      const raw = localStorage.getItem("db_auth_user");
      const u = raw ? JSON.parse(raw) : {};
      setUserName(u?.name || "My Account");
    } catch {
      setUserName("My Account");
    }
    setAuthReady(true);
  };

  sync();
  window.addEventListener("auth-change", sync);
  const onStorage = (e) => {
    if (["db_auth_token","db_auth_user","auth:logout_at","auth:login_at"].includes(e.key)) sync();
  };
  window.addEventListener("storage", onStorage);

  let bc;
  try { bc = new BroadcastChannel("auth"); bc.onmessage = sync; } catch {}

  return () => {
    window.removeEventListener("auth-change", sync);
    window.removeEventListener("storage", onStorage);
    if (bc) bc.close();
  };
}, []);

  // --- hover-intent timer ---
  const hoverTimer = useRef(null);
  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);
  const openMenu = (id) => {
    clearHoverTimer();
    setOpenDesk(id);
  };
  const closeMenu = (fallback = null) => {
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => setOpenDesk(fallback), 120);
  };

  // mobile accordions
  const [mOpen, setMOpen] = useState({
    about: false,
    services: false,
    services_life: false,
    services_health: false,
    services_general: false,
  });

  // scroll shrink header
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);


  useEffect(() => {
    return () => clearHoverTimer();
  }, [clearHoverTimer]);


  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpenDesk(null);
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);



  useEffect(() => {
  const read = () => {
    const t = typeof window !== "undefined" ? localStorage.getItem("db_auth_token") : null;
    setIsLoggedIn(!!t);
    try {
      const raw = localStorage.getItem("db_auth_user");
      const u = raw ? JSON.parse(raw) : {};
      setUserName(u?.name || "My Account");
    } catch {
      setUserName("My Account");
    }
  };
  read();
  const onStorage = (e) => { if (e.key === "db_auth_token" || e.key === "db_auth_user") read(); };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, []);

// logout
const handleLogout = useCallback(async () => {
  if (loggingOut) return;
  setLoggingOut(true);
  try {
    const response = await CallApi("/api/logout", "POST", ""); 
    if (response?.status) {
      try {
        localStorage.removeItem("db_auth_token");
        localStorage.removeItem("db_auth_user");
      } catch {}
      document.cookie = "db_auth_token=; Max-Age=0; path=/; samesite=lax; secure";

    window.dispatchEvent(new Event("auth-change"));
try {
  const bc = new BroadcastChannel("auth");
  bc.postMessage({ type: "logout" });
  bc.close();
} catch {}
try {
  localStorage.setItem("auth:logout_at", String(Date.now()));
} catch {}
      try {
        localStorage.setItem("auth:logout_at", String(Date.now()));
      } catch {}

      setIsLoggedIn(false);
      setAccountOpen(false);
    } else {
      console.warn("Logout failed:", response);
    }
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    setLoggingOut(false);
  }
}, [loggingOut, setIsLoggedIn, setAccountOpen]);



useEffect(() => {
  if (typeof window === "undefined") return;

  const t = localStorage.getItem("db_auth_token");
  const raw = localStorage.getItem("db_auth_user");

  let nextHref = BASE_PROFILE_URL;

  if (t && raw) {
    try {
      const u = JSON.parse(raw) || {};
      const uid =
        String(u?.id ?? u?.user_id ?? u?._id ?? u?.ID ?? "").trim();
      const type =
        String(u?.type ?? u?.role ?? "customer").trim();

      const qs = new URLSearchParams();
      if (uid) qs.set("user_id", uid);
      qs.set("token", t);        
      qs.set("type", type);

      nextHref = `${BASE_PROFILE_URL}?${qs.toString()}`;
    } catch {

    }
  }

  setProfileHref(nextHref);
}, [isLoggedIn]); 

useEffect(() => {
const syncFromStorage = () => {
  const t = getValidToken();
  setIsLoggedIn(!!t);

  try {
    const raw = localStorage.getItem("db_auth_user");
    const u = raw ? JSON.parse(raw) : {};
    setUserName(u?.name || "My Account");
  } catch {
    setUserName("My Account");
  }
};



  syncFromStorage();

  const onAuthChange = () => syncFromStorage();
  window.addEventListener("auth-change", onAuthChange);

  let bc;
  try {
    bc = new BroadcastChannel("auth");
    bc.onmessage = (ev) => {
      if (ev?.data?.type === "logout" || ev?.data?.type === "login") {
        syncFromStorage();
      }
    };
  } catch {}

  const onStorage = (e) => {
    if (
      e.key === "db_auth_token" ||
      e.key === "db_auth_user" ||
      e.key === "auth:logout_at" ||
      e.key === "auth:login_at"
    ) {
      syncFromStorage();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener("auth-change", onAuthChange);
    window.removeEventListener("storage", onStorage);
    if (bc) bc.close();
  };
}, []);



  return (
    <>
      {/* Top info bar */}
      <div className="fixed top-0 left-0 w-full z-40">
        <div
          className={`text-gray-200 text-sm transition-all duration-500 ease-in-out ${
            isScrolled
              ? "bg-gray-900 -translate-y-full opacity-0"
              : "bg-gradient-to-r from-[#28A7E4] to-[#4C609A] text-white translate-y-0 opacity-100"
          }`}
        >
          <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between items-center h-10">
            <div className="flex items-center space-x-4 sm:space-x-6 min-w-0">
              <div className="flex items-center space-x-2 min-w-0">
                <Mail size={20} className="text-white shrink-0" />
                <span className="truncate">info@digibima.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline">Follow us:</span>

              <Link
                href="https://www.facebook.com/DigiBima-103666025676333/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF className="hover:text-black transition-colors" />
              </Link>
              <Link
                href="https://instagram.com/digibima?igshid=YmMyMTA2M2Y="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="hover:text-black transition-colors" />
              </Link>
              <Link
                href="https://twitter.com/Digi_Bima"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="hover:text-black transition-colors" />
              </Link>
              <Link
                href="https://in.linkedin.com/company/digibima/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="hover:text-black transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`fixed left-0 right-0 transition-all duration-500 z-[60] ${
          isScrolled
            ? "mt-0 mx-0 lg:mx-20 w-full lg:w-[89%] bg-white/95 backdrop-blur shadow-md rounded-full px-4 sm:px-6 md:px-8"
            : "mt-10 w-full bg-[#f0f8ff]   translate-y-0 opacity-100 "
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 py-3 flex justify-between items-center relative z-[61]">
          {/* Logo */}
<Link
  href="/"
  className="text-2xl font-bold whitespace-nowrap shrink-0 relative z-[62] backdrop-blur-none"
>
  <Image
    src={logo}
    alt="Digibima Logo"
    width={160} 
    height={50}
    priority
    quality={75} 
    sizes="160px" 
    className="h-[40px] w-auto sm:h-[50px]"
  />
</Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3 lg:gap-6 font-medium text-gray-700">
            <Link href="/" className="link-underline">
              Home
            </Link>

            {/* About Us */}
            <div
              className="relative"
              onMouseEnter={() => openMenu(DESK.ABOUT)}
              onMouseLeave={() => closeMenu(null)}
            >
              <button
                id="about-trigger"
                className="menu-item flex items-center gap-1 hover:text-green-600 transition-colors"
                aria-haspopup="menu"
                aria-expanded={openDesk === DESK.ABOUT}
                aria-controls="about-menu"
              >
                <span className="link-underline flex items-center gap-2">About Us</span>
                {openDesk === DESK.ABOUT ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              <AnimatePresence>
                {openDesk === DESK.ABOUT && (
                  <motion.div
                    {...pop}
                    id="about-menu"
                    role="menu"
                    aria-labelledby="about-trigger"
                    className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg border p-2 will-change-transform sm:max-w-sm"
                  >
                    <Link href="/about/aboutdigibima" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                      <Info size={16} /> About Digibima
                    </Link>
                    <Link href="/about/privacypolicy" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                      <Shield size={16} /> Privacy Policy
                    </Link>
                    <Link href="/about/termandcondition" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                      <FileText size={16} /> Terms & Conditions
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services (nested) */}
            <div
              className="relative"
              onMouseEnter={() => openMenu(DESK.SERVICES)}
              onMouseLeave={() => closeMenu(null)}
            >
              <button
                id="services-trigger"
                className="menu-item flex items-center gap-1 hover:text-green-600 transition-colors"
                aria-haspopup="menu"
                aria-expanded={
                  openDesk === DESK.SERVICES ||
                  openDesk === DESK.LIFE ||
                  openDesk === DESK.HEALTH ||
                  openDesk === DESK.GENERAL
                }
                aria-controls="services-menu"
              >
                <span className="link-underline flex items-center gap-2">Services</span>
                {openDesk === DESK.SERVICES || openDesk === DESK.LIFE || openDesk === DESK.HEALTH || openDesk === DESK.GENERAL ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              {/* Level-1 */}
              <AnimatePresence>
                {(openDesk === DESK.SERVICES ||
                  openDesk === DESK.LIFE ||
                  openDesk === DESK.HEALTH ||
                  openDesk === DESK.GENERAL) && (
                  <motion.div
                    {...pop}
                    id="services-menu"
                    role="menu"
                    aria-labelledby="services-trigger"
                    className="absolute left-0 top-full mt-2 w-64 bg-white shadow-lg rounded-lg border p-2 will-change-transform md:max-w-md"
                  >
                    {/* Life */}
                    <div
                      className="relative"
                      onMouseEnter={() => openMenu(DESK.LIFE)}
                      onMouseLeave={() => closeMenu(DESK.SERVICES)}
                    >
                      <button
                        className="menu-item w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-50"
                        aria-haspopup="menu"
                        aria-expanded={openDesk === DESK.LIFE}
                      >
                        <span className="flex items-center gap-2">
                          <HeartPulse size={16} /> Life Insurance
                        </span>
                        {openDesk === DESK.LIFE ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      <AnimatePresence>
                        {openDesk === DESK.LIFE && (
                          <motion.div
                            {...pop}
                            className="absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-lg border p-2 max-h-[200px] overflow-y-auto will-change-transform"
                          >
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Shield size={16} /> Term Life Insurance Plan
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <PiggyBank size={16} /> Savings/Investment Plan
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Landmark size={16} /> Pension/Retirement Benefit Plan
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Baby size={16} /> Child Savings Plan
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Health */}
                    <div
                      className="relative"
                      onMouseEnter={() => openMenu(DESK.HEALTH)}
                      onMouseLeave={() => closeMenu(DESK.SERVICES)}
                    >
                      <button
                        className="menu-item w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-50"
                        aria-haspopup="menu"
                        aria-expanded={openDesk === DESK.HEALTH}
                      >
                        <span className="flex items-center gap-2">
                          <Users size={16} /> Health Insurance
                        </span>
                        {openDesk === DESK.HEALTH ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      <AnimatePresence>
                        {openDesk === DESK.HEALTH && (
                          <motion.div
                            {...pop}
                            className="absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-lg border p-2 max-h-[200px] overflow-y-auto will-change-transform"
                          >
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <User size={16} /> Individual Health Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Users size={16} /> Family Health Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Accessibility size={16} /> Senior Citizen Health Plan
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Baby size={16} /> Maternity Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Plane size={16} /> Travel Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <ShieldAlert size={16} /> Personal Accident Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Activity size={16} /> Critical Illness Insurance
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* General */}
                    <div
                      className="relative"
                      onMouseEnter={() => openMenu(DESK.GENERAL)}
                      onMouseLeave={() => closeMenu(DESK.SERVICES)}
                    >
                      <button
                        className="menu-item w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-50"
                        aria-haspopup="menu"
                        aria-expanded={openDesk === DESK.GENERAL}
                      >
                        <span className="flex items-center gap-2">
                          <Shield size={16} /> General Insurance
                        </span>
                        {openDesk === DESK.GENERAL ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      <AnimatePresence>
                        {openDesk === DESK.GENERAL && (
                          <motion.div
                            {...pop}
                            className="absolute left-full top-0 ml-2 w-64 bg-white shadow-lg rounded-lg border p-2 max-h-[200px] overflow-y-auto will-change-transform"
                          >
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Bike size={16} /> 2 Wheeler Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Car size={16} /> 4 Wheeler Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Truck size={16} /> Commercial Vehicle Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Shield size={16} /> Third Party Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Home size={16} /> Home Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Ship size={16} /> Marine Insurance
                            </Link>
                            <Link href="/contact" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50">
                              <Store size={16} /> Shop Insurance
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/blog" className="link-underline">Blog</Link>
            <Link href="/contact" className="link-underline">Contact</Link>
          </nav>

          {/* Right Side — desktop */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-5">
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="flex ">
                <div className="w-10 h-10">
                  <Lottie animationData={PhoneIcon} loop autoplay />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-gray-500">CALL US NOW</span>
                  <a href="tel:+919119173733" className="font-semibold text-gray-900 hover:text-green-600">
                    +91 911 91 73 733
                  </a>
                </div>
              </div>
            </div>
           {authReady && (
  !isLoggedIn ? (
  <Link
    href="/login"
    className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
  >
    Log In
  </Link>
) : (
  <div className="relative">
    <button
      onClick={() => setAccountOpen((o) => !o)}
      className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center gap-2"
      aria-haspopup="menu"
      aria-expanded={accountOpen}
    >
      {userName}
      {accountOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </button>

    <AnimatePresence>
      {accountOpen && (
        <motion.div
          {...pop}
          role="menu"
          className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg border p-2 z-[70]"
          onMouseLeave={() => setAccountOpen(false)}
        >
          <Link href={profileHref} target="_blank" role="menuitem" className="block px-3 py-2 rounded hover:bg-gray-50">
  Profile
</Link>

          <button
            role="menuitem"
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded hover:bg-gray-50"
          >
            Logout
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
))}

          </div>

          {/* Mobile Toggle */}
          <button
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 relative z-[62]"
            onClick={() => setIsOpen((o) => !o)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          id="mobile-menu"
          className={`lg:hidden absolute left-0 right-0 top-full bg-white border-t shadow-lg
            overflow-hidden grid transition-[grid-template-rows,opacity] duration-300 ease-in-out
            ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <nav className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto overscroll-contain">
            <Link href="/" className="block py-2 hover:text-green-600 transition-colors">Home</Link>

            {/* About accordion */}
            <button
              className="w-full flex items-center justify-between py-2 hover:text-green-600 transition-colors"
              onClick={() => setMOpen((s) => ({ ...s, about: !s.about }))}
              aria-expanded={mOpen.about}
              aria-controls="m-about"
            >
              <span className="flex items-center gap-2"> About Us</span>
              {mOpen.about ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            <div id="m-about" className={`overflow-hidden transition-[grid-template-rows] grid ${mOpen.about ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="min-h-0">
                <Link href="/about/aboutdigibima" className="flex items-center gap-2 pl-4 py-2 hover:text-green-600">
                  <Info size={16} /> About Digibima
                </Link>
                <Link href="/about/privacypolicy" className="flex items-center gap-2 pl-4 py-2 hover:text-green-600">
                  <Shield size={16} /> Privacy Policy
                </Link>
                <Link href="/about/termandcondition" className="flex items-center gap-2 pl-4 py-2 hover:text-green-600">
                  <FileText size={16} /> Terms & Conditions
                </Link>
              </div>
            </div>

            {/* Services accordion + nested */}
            <button
              className="w-full flex items-center justify-between py-2 hover:text-green-600 transition-colors"
              onClick={() => setMOpen((s) => ({ ...s, services: !s.services }))}
              aria-expanded={mOpen.services}
              aria-controls="m-services"
            >
              <span className="flex items-center gap-2"> Services</span>
              {mOpen.services ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            <div id="m-services" className={`overflow-hidden transition-[grid-template-rows] grid ${mOpen.services ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="min-h-0">
                {/* Life */}
                <button
                  className="w-full flex items-center justify-between pl-4 py-2 hover:text-green-600 transition-colors"
                  onClick={() => setMOpen((s) => ({ ...s, services_life: !s.services_life }))}
                  aria-expanded={mOpen.services_life}
                  aria-controls="m-services-life"
                >
                  <span className="flex items-center gap-2">
                    <HeartPulse size={16} /> Life Insurance
                  </span>
                  {mOpen.services_life ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <div id="m-services-life" className={`overflow-hidden transition-[grid-template-rows] grid ${mOpen.services_life ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0">
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Shield size={16} /> Term Life Insurance Plan
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <PiggyBank size={16} /> Savings/Investment Plan
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Landmark size={16} /> Pension/Retirement Benefit Plan
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Baby size={16} /> Child Savings Plan
                    </Link>
                  </div>
                </div>

                {/* Health */}
                <button
                  className="w-full flex items-center justify-between pl-4 py-2 hover:text-green-600 transition-colors"
                  onClick={() => setMOpen((s) => ({ ...s, services_health: !s.services_health }))}
                  aria-expanded={mOpen.services_health}
                  aria-controls="m-services-health"
                >
                  <span className="flex items-center gap-2">
                    <Users size={16} /> Health Insurance
                  </span>
                  {mOpen.services_health ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <div id="m-services-health" className={`overflow-hidden transition-[grid-template-rows] grid ${mOpen.services_health ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0">
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <User size={16} /> Individual Health Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Users size={16} /> Family Health Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Accessibility size={16} /> Senior Citizen Health Plan
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Baby size={16} /> Maternity Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Plane size={16} /> Travel Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <ShieldAlert size={16} /> Personal Accident Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Activity size={16} /> Critical Illness Insurance
                    </Link>
                  </div>
                </div>

                {/* General */}
                <button
                  className="w-full flex items-center justify-between pl-4 py-2 hover:text-green-600 transition-colors"
                  onClick={() => setMOpen((s) => ({ ...s, services_general: !s.services_general }))}
                  aria-expanded={mOpen.services_general}
                  aria-controls="m-services-general"
                >
                  <span className="flex items-center gap-2">
                    <Shield size={16} /> General Insurance
                  </span>
                  {mOpen.services_general ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <div id="m-services-general" className={`overflow-hidden transition-[grid-template-rows] grid ${mOpen.services_general ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0">
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Bike size={16} /> 2 Wheeler Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Car size={16} /> 4 Wheeler Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Truck size={16} /> Commercial Vehicle Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Shield size={16} /> Third Party Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Home size={16} /> Home Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Ship size={16} /> Marine Insurance
                    </Link>
                    <Link href="/contact" className="flex items-center gap-2 pl-8 py-2 hover:text-green-600">
                      <Store size={16} /> Shop Insurance
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/blog" className="block py-2 hover:text-green-600 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="block py-2 hover:text-green-600 transition-colors">
              Contact
            </Link>

{authReady && (
  !isLoggedIn ? (
  <Link
    href="/login"
    className="px-4 py-2 bg-green-700 text-white rounded-full hover:bg-green-800 transition-colors"
  >
    Log In
  </Link>
) : (
  <div className="flex items-center gap-3 pt-2">
   <Link href={profileHref} className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
  Profile
</Link>
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  </div>
))}


          </nav>
        </div>
      </header>
    </>
  );
}
