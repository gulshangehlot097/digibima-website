"use client";
import Link from "next/link";
import { motion } from "framer-motion";


export default function ContactSection() {
  return (
    <section className="relative bg-[#3490CC] py-10 px-4 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center justify-evenly max-w-6xl w-full text-center md:text-left"
      >
        {/* Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
            We make sure to protect you from any uncertainty
          </h2>
          <p className="text-base text-white text-right md:text-left sm:text-right">
            Get in touch with us, we’ll be pleased to assist you!
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 md:mt-0"
        >
        <Link href="/contact">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 border border-white rounded-md text-white font-medium hover:bg-white hover:text-[#1f4c7d] transition"
      >
        CONNECT WITH US
      </motion.button>
    </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
