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
import { FaShield,FaFileLines } from "react-icons/fa6";

export default function Footer() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <footer className="relative">
      {/* ---------- MAIN FOOTER ---------- */}
      <div className="bg-[#4C6991] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-14 pb-5">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {/* Logo & Address */}
            <div className="space-y-5">
              <div className="flex items-center justify-start gap-2 bg-white rounded-2xl py-3 px-4 shadow-lg">
                <Image
                  src={logo}
                  alt="Company Logo"
                  width={140}
                  height={50}
                  className="object-contain"
                />
              </div>
              <p className="text-sm text-gray-200 leading-relaxed flex items-start gap-2 max-w-xs">
                <span className="text-green-300 mt-1">
                  <FaMapMarkerAlt />
                </span>
                706, Lane No. 6, New Sanganer Road, Devi Nagar, Jaipur,
                Rajasthan 302019
              </p>

              {/* Social Links */}
              <div className="flex space-x-3 pt-4">
                {[
                  {
                    href: "https://www.facebook.com/DigiBima-103666025676333/",
                    icon: <FaFacebookF />,
                  },
                  {
                    href: "https://instagram.com/digibima?igshid=YmMyMTA2M2Y=",
                    icon: <FaInstagram />,
                  },
                  {
                    href: "https://twitter.com/Digi_Bima",
                    icon: <FaTwitter />,
                  },
                  {
                    href: "https://in.linkedin.com/company/digibima/",
                    icon: <FaLinkedinIn />,
                  },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    target="_blank"
                    className="p-2 bg-white/10 rounded-full hover:bg-green-400 hover:text-black transition transform hover:scale-110"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Columns */}
            <FooterCol
              title="About Us"
              links={[
                {
                  label: "+91 911 91 73 733",
                  icon: <FaPhoneAlt />,
                  href: "tel:+919119173733",
                },
                {
                  label: "info@digibima.com",
                  icon: <FaEnvelope />,
                  href: "mailto:info@digibima.com",
                },
                {
                  label: "Privacy Policy",
                  icon: <FaShield />,
                  href: "/about/privacypolicy",
                },
                {
                  label: "Terms and Conditions",
                  icon: <FaFileLines />,
                  href: "/about/termandcondition",
                },
              ]}
            />
            <FooterCol
              title="Life Insurance"
              links={[
                {
                  label: "Term Life Plan",
                  icon: <FaCheckCircle />,
                  href: "/life-insurance/term-life",
                },
                {
                  label: "Savings/Investment Plan",
                  icon: <FaCheckCircle />,
                  href: "/life-insurance/savings",
                },
                {
                  label: "Pension/Retirement Benefit Plan",
                  icon: <FaCheckCircle />,
                  href: "/life-insurance/pension",
                },
                {
                  label: "Child Savings Plan",
                  icon: <FaCheckCircle />,
                  href: "/life-insurance/child",
                },
              ]}
            />
            <FooterCol
              title="Health Insurance"
              links={[
                {
                  label: "Individual Health Insurance",
                  icon: <FaHeartbeat />,
                  href: "/health-insurance/individual",
                },
                {
                  label: "Family Health Insurance",
                  icon: <FaHeartbeat />,
                  href: "/health-insurance/family",
                },
                {
                  label: "Senior Citizen Health Plan",
                  icon: <FaHeartbeat />,
                  href: "/health-insurance/senior-citizen",
                },
                {
                  label: "Maternity Insurance",
                  icon: <FaHeartbeat />,
                  href: "/health-insurance/maternity",
                },
              ]}
            />

            <FooterCol
              title="General Insurance"
              links={[
                {
                  label: "2 Wheeler Insurance",
                  icon: <FaMotorcycle />,
                  href: "/motor-insurance/two-wheeler",
                },
                {
                  label: "4 Wheeler Insurance",
                  icon: <FaCarSide />,
                  href: "/motor-insurance/four-wheeler",
                },
              ]}
            />
          </div>

          {/* Disclaimer Section */}
          {/* Disclaimer Section */}
          <div className="mt-12 border-t border-b border-white/20 pt-4 pb-4">
            {/* Mobile Button */}
            <div className="md:hidden text-center">
              <button
                onClick={() => setShowDisclaimer(!showDisclaimer)}
                className="text-green-300 font-medium underline"
              >
                {showDisclaimer ? "Hide Disclaimer" : "Read Disclaimer"}
              </button>
            </div>

            {/* Disclaimer in 3 Columns (Visible on md+, toggle on mobile) */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-200 leading-relaxed mt-8 ${
                showDisclaimer ? "block" : "hidden md:grid"
              }`}
            >
              {[
                {
                  title: "Company",
                  content: (
                    <>
                      <strong className="text-white">
                        Digibima Insurance Web Aggregators Private Limited
                      </strong>{" "}
                      | CIN: U67110RJ2022PTC080500 | IRDAI License No.{" "}
                      <strong className="text-green-200">
                        IRDAI/INT/WBA/76/2023
                      </strong>{" "}
                      <br />
                      Valid till:{" "}
                      <strong className="text-green-200">09/08/2026</strong>
                    </>
                  ),
                },
                {
                  title: "Disclaimer",
                  content: (
                    <>
                      Insurance is the subject matter of solicitation.
                      Information available on this portal is of the partner
                      insurer with whom we have an agreement. The information
                      displayed is solely based on the information received from
                      the respective insurer.
                    </>
                  ),
                },
                {
                  title: "Note",
                  content: (
                    <>
                      The information provided on this website/page is for
                      information purpose only. Digibima does not endorse the
                      information so provided and strives to provide factual and
                      unbiased information to assist in making informed
                      insurance choices.
                    </>
                  ),
                },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="text-white-300 font-semibold text-lg relative pb-2 mb-3">
                    {item.title}
                    <span className="absolute left-0 bottom-0 w-12 h-0.5 bg-green-400 rounded"></span>
                  </h4>
                  <p className="text-gray-100 text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- SECONDARY FOOTER ---------- */}
      <div className="bg-[#4C6991] text-gray-200 py-5 text-center text-sm">
        © {new Date().getFullYear()} Digibima. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-5 relative inline-block">
        {title}
        <span className="absolute left-0 -bottom-1 w-12 h-[2px] bg-green-400 rounded"></span>
      </h3>
      <ul className="space-y-3 text-sm">
        {links.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href || "#"}
              className="group flex items-center gap-2 text-gray-200 hover:text-green-300 transition duration-300"
            >
              <span className="text-green-300 group-hover:scale-110 transition duration-300">
                {item.icon}
              </span>
              <span className="relative">
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-green-300 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
