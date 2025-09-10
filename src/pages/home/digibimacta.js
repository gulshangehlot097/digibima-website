// components/DigiBimaCta.jsx
import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";
import Lottie from "lottie-react";
import PhoneIcon from "@/animation/Call.json";

export default function DigiBimaCta({
  kicker = "LOOKING FOR HONEST AND RELIABLE SERVICES?",
  heading = "DIGI BIMA – Best Digital Insurance Partner",
  sub = "Get in touch with us, we’ll be pleased to assist you!",
  phone = "+91 911 91 73 733",
  connectHref = "/contact",
}) {
  const tel = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <section className="relative w-full">
      <div className="bg-[#3490CC]">
        <div className="mx-auto max-w-7xl px-5 lg:px-20 py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Left copy */}
            <div className="text-white">
              <p className="uppercase text-[13px] font-semibold tracking-[0.08em] text-white">
                {kicker}
              </p>
              <h2 className="mt-1 text-[28px] leading-tight font-extrabold">
                {heading}
              </h2>
              <p className="mt-1 text-[16px] text-white">
                {sub}
              </p>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              {/* Call pill */}
              <a
                href={tel}
                className="inline-flex items-center gap-3 bg-white rounded-[16px] px-5 py-3 shadow-[0_6px_14px_rgba(16,24,40,0.06)]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ECF3FA]">
                   {/* <FiPhoneCall size={18} /> */}
                   <Lottie animationData={PhoneIcon} loop={true} autoplay={true} />
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-[11px] font-semibold text-slate-500">
                    CALL US NOW
                  </span>
                  <span className="block text-[16px] font-extrabold text-slate-900 mt-0.5">
                    {phone}
                  </span>
                </span>
              </a>

              {/* Outline button */}
              
          <Link
            href={connectHref} // example: "/contact-us"
            className="inline-flex items-center justify-center rounded-[16px] border border-white px-7 py-4 text-[13px] font-semibold text-white hover:bg-white hover:text-black transition"
          >
            CONNECT WITH US
          </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
