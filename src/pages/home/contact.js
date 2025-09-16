"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PerfectPlanSection() {
  return (
    <section className="relative bg-[#3490CC] text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8  ">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-snug">
              We make sure to protect you from any uncertainty
            </h2>
            <p className="mt-3 text-base text-gray-200">
              Get in touch with us, we’ll be pleased to assist you!
            </p>

            <Link href="/contact">
              <button className="mt-6 inline-flex items-center rounded-md bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/30 transition">
                CONNECT WITH US <span className="ml-1">›</span>
              </button>
            </Link>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="relative flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Image
              src="/contanctusgirl.png"
              alt="Smiling woman pointing"
              width={270}
              height={300}
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
