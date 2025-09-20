"use client";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import PhoneIcon from "@/animation/Call.json";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

export default function AboutSection() {
  const router = useRouter();

  return (
    <section className="relative bg-[#C3ECFE] py-10 sm:py-12 md:py-10 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          <div className="w-full h-auto relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none">
            <MotionImage
              src="/images/homepage/aboutimg.png"
              alt="About DigiBima"
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-xl"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              priority
            />

            <motion.div
              className="absolute -top-6 -left-6 w-10 sm:w-14 md:w-20 h-10 sm:h-14 md:h-20 bg-blue-200 rounded-full opacity-50"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 -right-6 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-yellow-200 rounded-full opacity-60"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Get To Know <span className="text-[#0c4c8d]">Us</span>
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-justify">
            DigiBima is an Insurance Brokerage/Aggregator and Risk Management
            Company. We offer a wide range of services to help you find the
            right insurance plan for your needs, whether you need to protect
            yourself from the costs of medical bills, or find a way to pay off
            those credit card bills before they become unmanageable.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-justify">
            We work with dozens of insurance carriers, so we can help you get
            the best deal on your policy. If we can’t find what you’re looking
            for in our list of available plans, we’ll do some research and find
            something that works for you—and if we can, we’ll even help you
            design a custom plan just for your needs!
          </p>

          {/* BUTTONS */}
          <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-auto bg-[#7998F4] text-white font-semibold px-6 py-3 sm:py-4 rounded-lg shadow-md transition text-sm sm:text-base"
              onClick={() => router.push("/about/aboutdigibima")}
            >
              VIEW MORE
            </motion.button>

            {/* Call Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="w-auto flex items-center bg-white px-4 sm:px-5 py-3 rounded-lg shadow-md cursor-pointer"
              onClick={() => (window.location.href = "tel:+919119173733")}
            >
              <div className="w-10 h-10">
                <Lottie animationData={PhoneIcon} loop={true} autoplay={true} />
              </div>
              <div className="flex flex-col leading-tight text-left ml-2">
                <span className="text-xs sm:text-sm text-gray-500 font-semibold">
                  CALL US NOW
                </span>
                <span className="text-gray-900 font-bold text-sm sm:text-base">
                  +91 911 91 73 733
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
