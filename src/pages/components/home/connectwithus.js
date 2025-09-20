"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import PhoneIcon from "@/animation/Call.json";

export default function ConnectWith() {
  const phone = "+91 911 91 73 733";
  const connectHref = "/contact";
  const tel = `tel:${phone.replace(/\s+/g, "")}`;

  return (
    <section className="relative bg-[#3490CC] text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] items-center gap-8 md:gap-12">
          
          {/* LEFT IMAGE - hide on mobile */}
          <motion.div
            className="hidden md:flex relative order-2 md:order-1 justify-center md:justify-start"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/agent-woman.png"
              alt="Prospective health agent holding a laptop"
              width={350}
              height={350}
              priority
              className="object-contain"
            />
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            className="order-1 md:order-2 text-center md:text-left py-5 sm:py-5 lg:py-0"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm md:text-base text-white/85">
              LOOKING FOR HONEST AND RELIABLE SERVICES?
            </p>

            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
              DIGIBIMA – Best Digital Insurance Partner
            </h2>

            <p className="mt-3 text-sm md:text-base text-white/85">
              Get in touch with us, we’ll be pleased to assist you!
            </p>

            {/* BUTTONS inline */}
            <div className="mt-7 flex flex-row items-center justify-center md:justify-start gap-4">
              {/* Connect */}
              <Link href={connectHref}>
                <button className="px-6 h-14 inline-flex items-center justify-center rounded-lg border border-white/60 bg-white/10 text-sm font-semibold text-white hover:bg-white/20 transition">
                  CONNECT WITH US <span className="ml-1">›</span>
                </button>
              </Link>

              {/* Call */}
              <Link
                href={tel}
                className="inline-flex items-center gap-3 bg-white rounded-[16px] px-5 py-3 shadow-[0_6px_14px_rgba(16,24,40,0.06)]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#ECF3FA]">
                  <Lottie animationData={PhoneIcon} loop autoplay className="h-6 w-6" />
                </span>
                <span className="text-left leading-tight">
                  <span className="block text-[11px] font-semibold text-slate-500">
                    CALL US NOW
                  </span>
                  <span className="block text-[16px] font-extrabold text-slate-900 mt-0.5">
                    {phone}
                  </span>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
