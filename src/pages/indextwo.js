"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";


const rightImages = ["/imgone.png", "/imgtwo.png", "/imgone.png"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % rightImages.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-12 sm:pb-16 md:pb-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src="/imgthree.svg"
          alt="Insurance Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/60" />
      </div>

      {/* <div className="pointer-events-none absolute inset-0 overflow-visible z-50">
  <div className="pointer-events-auto absolute right-4 sm:right-12 top-[150px]">
    <motion.div
      initial={{ opacity: 0, rotate: -12, scale: 0.9 }}
      animate={{ opacity: 1, rotate: -12, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ rotate: -6, scale: 1.04 }}
    >


    </motion.div>
  </div>
</div> */}

      <motion.img
        src="/images/homepage/health.png"
        alt="health"
        className="absolute w-12 sm:w-14 bottom-20 sm:bottom-24 right-10 sm:right-16"
        animate={{ y: ["0px", "-10px", "0px"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        src="/images/homepage/bike.png"
        alt="bike"
        className="absolute w-8 sm:w-10 top-1/3 sm:top-1/2 right-6 sm:right-10"
        animate={{ y: ["0px", "-14px", "0px"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Left */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-[#0F1F3B]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Your Digital{" "}
            <span className="text-[#1D4ED8]">Insurance Partner</span>
          </motion.h1>

          <TypeAnimation
            sequence={[
              "Health Insurance",
              2000,
              "Life Insurance",
              2000,
              "Travel Insurance",
              2000,
              "Motor Insurance",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0F1F3B] mb-6 sm:mb-8 block"
          />

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 max-w-7xl ">
            {[
              {
                name: "Health ",
                img: "/images/homepage/health.png",
                color: "from-blue-200 to-blue-100",
              },
              {
                name: "Life ",
                img: "/images/homepage/health.png",
                color: "from-green-200 to-green-100",
              },
              {
                name: "2 Wheeler",
                img: "/images/homepage/bike.png",
                color: "from-yellow-200 to-yellow-100",
              },
              {
                name: "4 Wheeler",
                img: "/images/homepage/car.png",
                color: "from-purple-200 to-purple-100",
              },
              {
                name: "Travel",
                img: "/images/homepage/commercial.png",
                color: "from-pink-200 to-pink-100",
              },
              {
                name: "Other",
                img: "/images/health/health-two.png",
                color: "from-indigo-200 to-indigo-100",
              },
            ].map((item, index) => (
              <motion.button
                key={item.name}
                className="group relative flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl
                           bg-white/30 backdrop-blur-md text-[#0F1F3B] font-medium
                           shadow-md border border-[#0F1F3B]/20
                           hover:border-[#1D4ED8] hover:shadow-lg hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`w-12 sm:w-16 h-12 sm:h-16 rounded-full flex items-center justify-center shadow-md 
                              bg-gradient-to-tr ${item.color} transform transition-transform duration-300 
                              group-hover:rotate-12 group-hover:scale-110`}
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    className="w-8 sm:w-10 h-8 sm:h-10 object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm">{item.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center relative">

          <div className="relative w-64 sm:w-80 md:w-full h-64 sm:h-80 md:h-[400px] overflow-hidden  ">
            <Image
              src={rightImages[current]}
              alt="Insurance Illustration"
              fill
              className="object-cover transition-all duration-700"
            />
          </div>
          <div className="flex gap-2 mt-4">
            {rightImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index ? "bg-blue-600 scale-110" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
