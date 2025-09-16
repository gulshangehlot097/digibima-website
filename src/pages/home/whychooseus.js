import {
  FaHandHoldingHeart,
  FaSyncAlt,
  FaHeadset,
  FaUserTie,
  FaWallet,
  FaHandshake,
  FaHands,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyChooseUsSection() {
  const featuresLeft = [
    {
      title: "PERSONALIZED PLANS",
      desc: "Tailored coverage that fits your life and budget.",
      icon: <FaHandHoldingHeart className="text-lg sm:text-xl" />,
    },
    {
      title: "FLEXIBILITY",
      desc: "Adjust policies easily as your needs change.",
      icon: <FaSyncAlt className="text-lg sm:text-xl" />,
    },
    {
      title: "24*7 SUPPORT",
      desc: "We’re here for you 24/7, whenever you need us.",
      icon: <FaHeadset className="text-lg sm:text-xl" />,
    },
  ];

  const featuresRight = [
    {
      title: "Expert Advice",
      desc: "Get the right guidance for smarter insurance choices.",
      icon: <FaUserTie className="text-lg sm:text-xl" />,
    },
    {
      title: "Affordable Premiums",
      desc: "Maximum protection at a cost you can manage.",
      icon: <FaWallet className="text-lg sm:text-xl" />,
    },
    {
      title: "Trusted Partner",
      desc: "Securing lives with reliability and confidence.",
      icon: <FaHandshake className="text-lg sm:text-xl" />,
    },
  ];

  const Card = ({ title, desc, shift = "", side, icon }) => (
    <div
      className={`relative w-full
        max-w-full sm:max-w-[360px] md:max-w-[420px] lg:max-w-[280px]
        mb-4 sm:mb-6 md:mb-8 ${shift}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div
          className={`flex bg-white shadow-md rounded-2xl border relative overflow-visible
          ${side === "left" ? "rounded-br-none" : ""}
          ${side === "right" ? "rounded-bl-none" : ""}
        `}
        >
          {/* Icon Container */}
          <div
            className={`absolute top-[-8px] sm:top-[-10px] md:top-[-16px] ${
              side === "left"
                ? "-right-3 sm:-right-4 md:-right-6"
                : "-left-3 sm:-left-4 md:-left-6"
            }`}
          >
            <div
              className={`bg-[#0E649A] p-2 sm:p-3 rounded-2xl flex items-center justify-center shadow-md ${
                side === "left"
                  ? "rounded-br-none rounded-tl-none"
                  : "rounded-bl-none rounded-tr-none"
              }`}
            >
              <span className="text-white text-base sm:text-lg md:text-xl p-2 sm:p-2">
  {icon || <FaHands />}
</span>

            </div>
          </div>

          {/* Text */}
          <div
            className={`p-3 sm:p-4 ${
              side === "left" ? "pr-10 sm:pr-12 md:pr-14" : "pl-10 sm:pl-12 md:pl-14"
            } text-left`}
          >
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800">
              {title}
            </h3>
            <p className="text-xs sm:text-sm md:text-[15px] text-gray-500">{desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <section
      className="relative py-10 sm:py-14 lg:py-20 px-4 sm:px-6 md:px-12 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/images/homepage/whychoosebgimg.jpg')" }}
    >
      <div className="absolute inset-0 bg-[#C3ECFE]/80"></div>

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          {/* <p className="text-xs sm:text-sm md:text-base lg:text-xl text-[#1D4ED8] font-semibold uppercase mb-1">
            Why Choose Us
          </p> */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Reasons to Choose <span className="text-[#1D4ED8]">DigiBima</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
          {/* Left cards */}
          <div className="flex flex-col justify-between items-center lg:items-end w-full lg:w-1/3 gap-4 sm:gap-6">
            {featuresLeft.map((item, idx) => (
              <Card
                key={idx}
                {...item}
                side="left"
                shift={idx === 1 ? "lg:-translate-x-6" : "lg:translate-x-4"}
              />
            ))}
          </div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <Image
              src="/images/homepage/whychoose.png"
              alt="Center People"
              width={420}
              height={420}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] object-cover"
              priority={false}
            />
          </motion.div>

          {/* Right cards */}
          <div className="flex flex-col justify-between items-center lg:items-start w-full lg:w-1/3 gap-4 sm:gap-6">
            {featuresRight.map((item, idx) => (
              <Card
                key={idx}
                {...item}
                side="right"
                shift={idx === 1 ? "lg:translate-x-6" : "lg:-translate-x-6"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
