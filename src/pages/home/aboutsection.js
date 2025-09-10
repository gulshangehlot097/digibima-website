"use client";
import { FiPhoneCall } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import PhoneIcon from "@/animation/Call.json";

export default function AboutSection() {
  const router = useRouter();

  return (
    <section className="relative bg-[#C3ECFE] py-10 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12">
        {/* Left Image with Animation */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          <div className="w-full h-auto relative max-w-md sm:max-w-lg lg:max-w-none">
            <motion.img
              src="/images/homepage/aboutimg.png"
              alt="About DigiBima"
              className="w-full h-full object-cover"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {/* Floating shapes */}
            <motion.div
              className="absolute -top-6 -left-6 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-blue-200 rounded-full opacity-50"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 -right-6 w-10 sm:w-14 md:w-16 h-10 sm:h-14 md:h-16 bg-yellow-200 rounded-full opacity-60"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Get To Know <span className="text-blue-700">Us</span>
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            DigiBima is an Insurance Brokerage/Aggregator and Risk Management
            Company. We offer a wide range of services to help you find the
            right insurance plan for your needs, whether you need to protect
            yourself from the costs of medical bills, or find a way to pay off
            those credit card bills before they become unmanageable.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            We work with dozens of insurance carriers, so we can help you get
            the best deal on your policy. If we can’t find what you’re looking
            for in our list of available plans, we’ll do some research and find
            something that works for you—and if we can, we’ll even help you
            design a custom plan just for your needs!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-center lg:justify-start">
            {/* Left Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-[#7998F4] text-white font-semibold px-6 py-3 sm:py-4 rounded-lg shadow-md transition text-sm sm:text-base"
               onClick={() => router.push("/about/aboutdigibima")} 
            >
              VIEW MORE
            </motion.button>

            {/* Call Button */}
         <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  className="w-full sm:w-auto flex items-center  bg-white px-4 sm:px-5 py-3 rounded-lg shadow-md cursor-pointer"
  onClick={() => (window.location.href = "tel:+919119173733")}
>
  {/* <FiPhoneCall size={18} /> */}
    <div className="w-10 h-10">
          <Lottie animationData={PhoneIcon} loop={true} autoplay={true} />
        </div>
  <div className="flex flex-col leading-tight text-left">
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
