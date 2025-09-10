"use client";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCheckCircle,
  FaHeartbeat,
  FaShieldAlt,
  FaCarSide,
  FaMotorcycle,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <footer className="bg-[#1E5183] pt-12 pb-6 px-6 sm:px-10 lg:px-20 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 sm:grid-cols-2 gap-10">

        <div className="md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
              <FaShieldAlt className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">Digibima</h1>
          </div>
          <p className="text-sm text-gray-200 leading-relaxed">
            706, Lane No. 6, New Sanganer Road, Devi Nagar, Jaipur, Rajasthan
            302019
          </p>
          <div className="flex space-x-4 pt-4">
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-green-500 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <FooterCol
          title="About Us"
          links={[
            { label: "+91 911 91 73 733", icon: <FaPhoneAlt /> },
            { label: "info@digibima.com", icon: <FaEnvelope /> },
            { label: "Terms and Conditions", icon: <FaCheckCircle /> },
          ]}
        />
        <FooterCol
          title="Life Insurance"
          links={[
            { label: "Term Life Plan", icon: <FaCheckCircle /> },
            { label: "Savings/Investment Plan", icon: <FaCheckCircle /> },
            {
              label: "Pension/Retirement Benefit Plan",
              icon: <FaCheckCircle />,
            },
            { label: "Child Savings Plan", icon: <FaCheckCircle /> },
          ]}
        />
        <FooterCol
          title="Health Insurance"
          links={[
            { label: "Individual Health Insurance", icon: <FaHeartbeat /> },
            { label: "Family Health Insurance", icon: <FaHeartbeat /> },
            { label: "Senior Citizen Health Plan", icon: <FaHeartbeat /> },
            { label: "Maternity Insurance", icon: <FaHeartbeat /> },
          ]}
        />
        <FooterCol
          title="General Insurance"
          links={[
            { label: "2 Wheeler Insurance", icon: <FaMotorcycle /> },
            { label: "4 Wheeler Insurance", icon: <FaCarSide /> },
          ]}
        />
      </div>

      {/* Company Info & Disclaimer */}
      <div className="max-w-7xl mx-auto mt-10 text-xs text-gray-200 leading-relaxed border-t border-white/80 pt-4">
        <div className="md:hidden text-center">
          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="text-green-300 font-medium underline"
          >
            {showDisclaimer ? "Hide Disclaimer" : "Read Disclaimer"}
          </button>
        </div>

        {/* Disclaimer Text */}
        <div
          className={`space-y-3 text-sm text-center mt-4 ${
            showDisclaimer ? "block" : "hidden md:block"
          }`}
        >
          <p>
            <strong>Digibima Insurance Web Aggregators Private Limited</strong>{" "}
            | CIN: U67110RJ2022PTC080500 | IRDAI License No.:{" "}
            <strong>IRDAI/INT/WBA/76/2023</strong> Valid till:{" "}
            <strong>09/08/2026</strong>
          </p>
          <p>
            Registered Office - 706 Gali no 6, New Sanganer Road, Jaipur,
            Rajasthan - 302019. Email:{" "}
            <a
              href="mailto:info@digibima.com"
              className="text-green-300 hover:underline"
            >
              info@digibima.com
            </a>
          </p>
          <p>
            Insurance is the subject matter of solicitation. Information
            available on this portal is of the partner insurer with whom we have
            an agreement. The information displayed is solely based on the
            information received from the respective insurer. The
            visitors/prospects details may be shared with partner insurers.
          </p>
          <p>
            The information provided on this website/page is for information
            purpose only. Digibima does not in any form or manner endorse the
            information so provided on the website and strives to provide
            factual and unbiased information to customers to assist in making
            informed insurance choices.
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-whitw-400/80 pt-3 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} Digibima. All rights reserved.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="font-semibold text-white mb-4">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map((item, i) => (
          <li key={i}>
            <a
              href="#"
              className="flex items-center gap-2 text-gray-200 hover:text-green-300 transition"
            >
              <span className="text-green-300">{item.icon}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
