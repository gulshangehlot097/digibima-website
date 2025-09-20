"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function PerfectPlanSection() {
  return (
    <section className="relative bg-[#3490CC] text-white py-12 sm:py-16 md:py-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
              We make sure to protect you from any uncertainty
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-200">
              Get in touch with us, we’ll be pleased to assist you!
            </p>

            <Link href="/contact">
              <button className="mt-6 inline-flex items-center justify-center rounded-md bg-white/20 px-6 py-3 text-sm sm:text-base font-semibold text-white backdrop-blur hover:bg-white/30 transition">
                CONNECT WITH US <span className="ml-1">›</span>
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="relative hidden md:flex justify-center md:justify-end"
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
              className="object-contain w-48 sm:w-64 md:w-[270px] h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
