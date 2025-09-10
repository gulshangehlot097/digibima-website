"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Mail,
  Menu,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Shield,
  ShieldCheck,
  PiggyBank,
  Wallet,
  Heart,
  User,
  Users,
  Plane,
  Bike,
  Car,
  Truck,
  Home as HomeIcon,
  Ship,
  Store,
  Info,
} from "lucide-react";
import { FaTwitter, FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { logo } from "@/images/Image";
import Image from "next/image";

/* ---------- Small helpers (no TS, safe icons) ---------- */
function MenuLink({ href, icon, label }) {
  return (
    <Link href={href} className="group/item flex items-center gap-3 px-4 py-2 hover:bg-gray-50">
      <span className="text-gray-700">{icon}</span>
      <span className="text-sm text-gray-800">{label}</span>
      <ChevronRight
        size={14}
        className="ml-auto opacity-0 -translate-x-1 transition-all duration-150 text-emerald-600 group-hover/item:opacity-100 group-hover/item:translate-x-0"
      />
    </Link>
  );
}

function MobileLink({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center gap-2 py-1 text-xs text-gray-600">
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

function FileIcon(props) {
  const size = props?.size || 18;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="text-gray-700"
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top strip */}
      <div className="fixed top-0 left-0 w-full z-[70]">
        <div
          className={`bg-gray-900 text-gray-200 text-sm transition-all duration-500 ease-in-out ${
            isScrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-10">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <span>info@digibima.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline">Follow us:</span>
              <Link href="#" aria-label="Twitter"><FaTwitter className="hover:text-blue-400" /></Link>
              <Link href="#" aria-label="Facebook"><FaFacebookF className="hover:text-blue-600" /></Link>
              <Link href="#" aria-label="Pinterest"><FaPinterestP className="hover:text-red-500" /></Link>
              <Link href="#" aria-label="Instagram"><FaInstagram className="hover:text-pink-500" /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`fixed left-0 right-0 bg-white shadow-md transition-all duration-500 z-[80] ${
          isScrolled
            ? "mt-0 mx-0 lg:mx-20 w-full lg:w-[89%] rounded-full px-4 lg:px-10"
            : "mt-10 w-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative z-[90]">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold whitespace-nowrap">
             <Image
    src={logo}
    alt="Digibima Logo"
   width={220}
    height={55}       // ✅ adjust as per your design
    priority          // ✅ ensures logo loads fast
    className="h-auto w-auto"
  />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 font-medium text-gray-700">
            <Link href="/" className="px-2 py-2 hover:text-green-600">Home</Link>

            {/* About with submenu (icons) */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 px-2 py-2 hover:text-green-600"
                aria-haspopup="menu"
                aria-expanded="false"
              >
                About Us
                <ChevronDown size={16} className="mt-[1px] transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 pt-2 z-[1000]" role="menu" aria-label="About submenu">
                <div
                  className="w-72 rounded-2xl border bg-white shadow-xl p-2
                             opacity-0 scale-95 translate-y-1
                             transition-all duration-150 ease-out
                             group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                             group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-y-0"
                >
                  <div className="px-3 pt-2 pb-1">
                    <span className="text-[11px] uppercase tracking-wider text-gray-500">
                      About Digibima
                    </span>
                  </div>

                  <nav className="px-1 pb-2 space-y-1">
                    <Link
                      href="/about"
                      className="group/item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                      <span className="grid place-items-center h-9 w-9 rounded-lg bg-gray-100 text-gray-700">
                        <Info size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-gray-800">About Digibima</span>
                        <span className="block text-xs text-gray-500 truncate">Who we are & what we do</span>
                      </span>
                      <ChevronRight size={16} className="ml-auto opacity-0 -translate-x-1 transition-all duration-150 text-emerald-600 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                    </Link>

                    <Link
                      href="/privacy-policy"
                      className="group/item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                      <span className="grid place-items-center h-9 w-9 rounded-lg bg-gray-100 text-gray-700">
                        <ShieldCheck size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-gray-800">Privacy Policy</span>
                        <span className="block text-xs text-gray-500 truncate">Your data, our responsibility</span>
                      </span>
                      <ChevronRight size={16} className="ml-auto opacity-0 -translate-x-1 transition-all duration-150 text-emerald-600 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                    </Link>

                    <Link
                      href="/terms-and-conditions"
                      className="group/item flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                      <span className="grid place-items-center h-9 w-9 rounded-lg bg-gray-100 text-gray-700">
                        <FileIcon />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium text-gray-800">Terms & Conditions</span>
                        <span className="block text-xs text-gray-500 truncate">Rules of using our services</span>
                      </span>
                      <ChevronRight size={16} className="ml-auto opacity-0 -translate-x-1 transition-all duration-150 text-emerald-600 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                    </Link>
                  </nav>
                </div>
              </div>
            </div>

            {/* Services with nested submenu + safe icons */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 px-2 py-2 hover:text-green-600"
                aria-haspopup="menu"
                aria-expanded="false"
              >
                Services
                <ChevronDown size={16} className="mt-[1px] transition-transform group-hover:rotate-180" />
              </button>

              {/* Level 1 panel */}
              <div className="absolute top-full left-0 pt-2 z-[1000]" role="menu" aria-label="Services submenu">
                <div
                  className="w-[340px] rounded-xl border bg-white shadow-lg p-1 pr-2
                             opacity-0 scale-95 translate-y-1 overflow-visible
                             transition-all duration-150 ease-out
                             group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0
                             group-focus-within:opacity-100 group-focus-within:scale-100 group-focus-within:translate-y-0"
                >
                  <nav className="py-1 space-y-1">
                    {/* Life Insurance */}
                    <div className="relative group/item">
                      <Link
                        href="/solutions/life-insurance"
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50"
                      >
                        <span className="flex items-center gap-2">
                          <Shield size={18} className="text-emerald-600" />
                          Life Insurance
                        </span>
                        <ChevronRight size={16} className="transition-transform group-hover/item:translate-x-0.5" />
                      </Link>

                      <div className="absolute top-0 left-full pl-2 z-[1100]">
                        <div
                          className="w-80 rounded-xl border bg-white shadow-lg
                                     opacity-0 scale-95 translate-y-1 pointer-events-none overflow-visible
                                     transition-all duration-150 ease-out
                                     group-hover/item:opacity-100 group-hover/item:scale-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto"
                        >
                          <nav className="py-2">
                            <MenuLink href="/solutions/life-insurance/term-life" icon={<Shield size={16} />} label="Term Life Insurance Plan" />
                            <MenuLink href="/solutions/life-insurance/savings-investment" icon={<PiggyBank size={16} />} label="Savings/Investment Plan" />
                            <MenuLink href="/solutions/life-insurance/pension-retirement" icon={<Wallet size={16} />} label="Pension/Retirement Benefit Plan" />
                            <MenuLink href="/solutions/life-insurance/child-savings" icon={<User size={16} />} label="Child Savings Plan" />
                          </nav>
                        </div>
                      </div>
                    </div>

                    {/* Health Insurance */}
                    <div className="relative group/item">
                      <Link
                        href="/solutions/health-insurance"
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50"
                      >
                        <span className="flex items-center gap-2">
                          <Heart size={18} className="text-emerald-600" />
                          Health Insurance
                        </span>
                        <ChevronRight size={16} className="transition-transform group-hover/item:translate-x-0.5" />
                      </Link>

                      <div className="absolute top-0 left-full pl-2 z-[1100]">
                        <div
                          className="w-96 rounded-xl border bg-white shadow-lg
                                     opacity-0 scale-95 translate-y-1 pointer-events-none overflow-visible
                                     transition-all duration-150 ease-out
                                     group-hover/item:opacity-100 group-hover/item:scale-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto"
                        >
                          <nav className="py-2">
                            <MenuLink href="/solutions/health-insurance/individual" icon={<User size={16} />} label="Individual Health Insurance" />
                            <MenuLink href="/solutions/health-insurance/family" icon={<Users size={16} />} label="Family Health Insurance" />
                            <MenuLink href="/solutions/health-insurance/senior-citizen" icon={<User size={16} />} label="Senior Citizen Health Plan" />
                            <MenuLink href="/solutions/health-insurance/maternity" icon={<Heart size={16} />} label="Maternity Insurance" />
                            <MenuLink href="/solutions/health-insurance/travel" icon={<Plane size={16} />} label="Travel Insurance" />
                            <MenuLink href="/solutions/health-insurance/personal-accident" icon={<Shield size={16} />} label="Personal Accident Insurance" />
                            <MenuLink href="/solutions/health-insurance/critical-illness" icon={<Heart size={16} />} label="Critical Illness Insurance" />
                          </nav>
                        </div>
                      </div>
                    </div>

                    {/* General Insurance */}
                    <div className="relative group/item">
                      <Link
                        href="/solutions/general-insurance"
                        className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-50"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck size={18} className="text-emerald-600" />
                          General Insurance
                        </span>
                        <ChevronRight size={16} className="transition-transform group-hover/item:translate-x-0.5" />
                      </Link>

                      <div className="absolute top-0 left-full pl-2 z-[1100]">
                        <div
                          className="w-96 rounded-xl border bg-white shadow-lg
                                     opacity-0 scale-95 translate-y-1 pointer-events-none overflow-visible
                                     transition-all duration-150 ease-out
                                     group-hover/item:opacity-100 group-hover/item:scale-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto"
                        >
                          <nav className="py-2">
                            <MenuLink href="/solutions/general-insurance/2-wheeler" icon={<Bike size={16} />} label="2 Wheeler Insurance" />
                            <MenuLink href="/solutions/general-insurance/4-wheeler" icon={<Car size={16} />} label="4 Wheeler Insurance" />
                            <MenuLink href="/solutions/general-insurance/commercial-vehicle" icon={<Truck size={16} />} label="Commercial Vehicle Insurance" />
                            <MenuLink href="/solutions/general-insurance/third-party" icon={<ShieldCheck size={16} />} label="Third Party Insurance" />
                            <MenuLink href="/solutions/general-insurance/home" icon={<HomeIcon size={16} />} label="Home Insurance" />
                            <MenuLink href="/solutions/general-insurance/marine" icon={<Ship size={16} />} label="Marine Insurance" />
                            <MenuLink href="/solutions/general-insurance/shop" icon={<Store size={16} />} label="Shop Insurance" />
                          </nav>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            <Link href="/blog" className="px-2 py-2 hover:text-green-600">Blog</Link>
            <Link href="/contact" className="px-2 py-2 hover:text-green-600">Contact</Link>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <button aria-label="Search" className="p-2 rounded-md hover:bg-gray-100">
              <Search className="text-gray-600" size={20} />
            </button>
            <Link href="/login" className="hover:text-green-600 font-medium px-2 py-2">
              Log In
            </Link>
            <Link
              href="/get-started"
              className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 relative z-[91]"
            onClick={() => setIsOpen(o => !o)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden absolute left-0 right-0 top-full bg-white border-t shadow-lg
                      overflow-hidden grid transition-[grid-template-rows,opacity] duration-300 ease-in-out
                      ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <nav className="px-4 py-3 space-y-2">
            <Link href="/" className="block px-2 py-2 rounded hover:bg-gray-50">Home</Link>

            {/* About accordion */}
            <button
              className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-50"
              onClick={() => setOpenAbout(v => !v)}
              aria-expanded={openAbout}
            >
              <span>About</span>
              <ChevronDown size={18} className={`transition-transform ${openAbout ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`overflow-hidden transition-[grid-template-rows,opacity] grid ${
                openAbout ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 pl-4 space-y-1 pb-2">
                <Link href="/about" className="flex items-center gap-2 py-1 text-sm text-gray-700"><Info size={14}/> About Digibima</Link>
                <Link href="/privacy-policy" className="flex items-center gap-2 py-1 text-sm text-gray-700"><ShieldCheck size={14}/> Privacy Policy</Link>
                <Link href="/terms-and-conditions" className="flex items-center gap-2 py-1 text-sm text-gray-700"><FileIcon size={14}/> Terms & Conditions</Link>
              </div>
            </div>

            {/* Services accordion */}
            <button
              className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-50"
              onClick={() => setOpenServices(v => !v)}
              aria-expanded={openServices}
            >
              <span>Services</span>
              <ChevronDown size={18} className={`transition-transform ${openServices ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`overflow-hidden transition-[grid-template-rows,opacity] grid ${
                openServices ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0 pl-4 space-y-3 pb-2">
                {/* Life */}
                <div>
                  <Link href="/solutions/life-insurance" className="block py-1 text-sm text-gray-800 font-medium flex items-center gap-2">
                    <Shield size={16} className="text-emerald-600" /> Life Insurance
                  </Link>
                  <div className="pl-3 space-y-1">
                    <MobileLink href="/solutions/life-insurance/term-life" label="Term Life Insurance Plan" icon={<Shield size={14}/>}/>
                    <MobileLink href="/solutions/life-insurance/savings-investment" label="Savings/Investment Plan" icon={<PiggyBank size={14}/>}/>
                    <MobileLink href="/solutions/life-insurance/pension-retirement" label="Pension/Retirement Benefit Plan" icon={<Wallet size={14}/>}/>
                    <MobileLink href="/solutions/life-insurance/child-savings" label="Child Savings Plan" icon={<User size={14}/>}/>
                  </div>
                </div>

                {/* Health */}
                <div>
                  <Link href="/solutions/health-insurance" className="block py-1 text-sm text-gray-800 font-medium flex items-center gap-2">
                    <Heart size={16} className="text-emerald-600" /> Health Insurance
                  </Link>
                  <div className="pl-3 space-y-1">
                    <MobileLink href="/solutions/health-insurance/individual" label="Individual Health Insurance" icon={<User size={14}/>}/>
                    <MobileLink href="/solutions/health-insurance/family" label="Family Health Insurance" icon={<Users size={14}/>}/>
                    <MobileLink href="/solutions/health-insurance/senior-citizen" label="Senior Citizen Health Plan" icon={<User size={14}/>}/>
                    <MobileLink href="/solutions/health-insurance/maternity" label="Maternity Insurance" icon={<Heart size={14}/>}/>
                    <MobileLink href="/solutions/health-insurance/travel" label="Travel Insurance" icon={<Plane size={14}/>}/>
                    <MobileLink href="/solutions/health-insurance/personal-accident" label="Personal Accident Insurance" icon={<Shield size={14}/>}/>
                    <MobileLink href="/solutions/health-insurance/critical-illness" label="Critical Illness Insurance" icon={<Heart size={14}/>}/>
                  </div>
                </div>

                {/* General */}
                <div>
                  <Link href="/solutions/general-insurance" className="block py-1 text-sm text-gray-800 font-medium flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-600" /> General Insurance
                  </Link>
                  <div className="pl-3 space-y-1">
                    <MobileLink href="/solutions/general-insurance/2-wheeler" label="2 Wheeler Insurance" icon={<Bike size={14}/>}/>
                    <MobileLink href="/solutions/general-insurance/4-wheeler" label="4 Wheeler Insurance" icon={<Car size={14}/>}/>
                    <MobileLink href="/solutions/general-insurance/commercial-vehicle" label="Commercial Vehicle Insurance" icon={<Truck size={14}/>}/>
                    <MobileLink href="/solutions/general-insurance/third-party" label="Third Party Insurance" icon={<ShieldCheck size={14}/>}/>
                    <MobileLink href="/solutions/general-insurance/home" label="Home Insurance" icon={<HomeIcon size={14}/>}/>
                    <MobileLink href="/solutions/general-insurance/marine" label="Marine Insurance" icon={<Ship size={14}/>}/>
                    <MobileLink href="/solutions/general-insurance/shop" label="Shop Insurance" icon={<Store size={14}/>}/>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/blog" className="block px-2 py-2 rounded hover:bg-gray-50">Blog</Link>
            <Link href="/contact" className="block px-2 py-2 rounded hover:bg-gray-50">Contact</Link>

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
