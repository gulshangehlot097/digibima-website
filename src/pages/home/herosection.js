"use client";

import React, { isValidElement, cloneElement } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { heroImg } from "@/images/Image";

export default function InsuranceCategoriesSection({
  items = defaultItems,
  onCardClick,
  bgImage = heroImg,
  title = "Your Digital Insurance Partner",
  subtitle = "Get The Best Insurance Plan",
}) {
  const CardInner = (card) => (
    <>
      <motion.div
        whileHover={{ rotate: [0, -3, 3, 0], transition: { duration: 0.4 } }}
        className="mx-auto rounded-2xl flex items-center justify-center overflow-hidden h-16 w-16 sm:h-20 sm:w-20"
      >
        {renderNodeOrImage(
          card.icon,
          "h-full w-full object-contain drop-shadow-sm select-none",
          80
        )}
      </motion.div>

      <div className="mt-2 sm:mt-3 text-center">
        <div className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-slate-900 leading-snug">
          {card.title}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl group-hover:ring-2 group-hover:ring-blue-400/60 group-hover:shadow-[0_10px_25px_rgba(30,64,175,0.25)] transition-all" />
    </>
  );

  return (
    <section className="relative w-full overflow-hidden pt-28 sm:pt-32 md:pt-48">
      <Image
        src={bgImage}
        alt="Hero Background"
        fill
        priority                     
        placeholder="blur"
        sizes="100vw"                 
        quality={70}
        decoding="async"             
        className="object-cover -z-10"
      />

      {/* overlays */}
      <div className="absolute inset-0 -z-10 bg-[#D9F3FF]/40" />
      <div className="pointer-events-none absolute -inset-x-20 -top-24 -bottom-24 -z-10 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.15),transparent_70%)] animate-pulse-slow" />

      <div className="mx-auto w-full max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex justify-center px-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-3/2 lg:w-3/6 rounded-[100px] bg-[#1E5183]  px-8 sm:px-10 py-5 shadow-xl"
          >
            <h2 className="text-center text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 leading-tight tracking-tight">
              {title}
            </h2>
            <p className="mt-1 text-center greentext text-lg sm:text-xl ">
              {subtitle}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="mt-6 sm:mt-8 md:mt-12"
        >
          <div
            className="
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
              gap-3 sm:gap-4 md:gap-6
              px-2 sm:px-4 md:px-16 mb-10
              max-sm:grid max-sm:auto-cols-[70%] max-sm:grid-flow-col
              max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory
              max-sm:px-2 max-sm:scroll-px-4
              max-sm:[scrollbar-width:none] max-sm:[-ms-overflow-style:none]
            "
          >
            {items.map((card, idx) => {
              const classCard =
                "relative group rounded-2xl bg-white/95 p-2.5 sm:p-3 md:p-4 shadow-sm ring-1 ring-black/5 transition-all duration-200 text-left focus:outline-none hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 backdrop-blur-sm max-sm:snap-center";

              const handleCardClick = () => onCardClick?.(card);

              return (
                <motion.div
                  key={card.title}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={classCard}
                >
                  {card.link ? (
                    <Link
                      href={card.link}
                      target="_blank"
                      onClick={handleCardClick}
                      aria-label={card.title}
                    >
                      {CardInner(card)}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCardClick}
                      aria-label={card.title}
                      className="w-full h-full text-left"
                    >
                      {CardInner(card)}
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function renderNodeOrImage(nodeOrType, className, size = 80) {
  if (!nodeOrType) return null;

  if (typeof nodeOrType === "string") {
    return (
      <Image
        src={nodeOrType}
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        className={className}
        loading="lazy"      
        decoding="async"
        draggable={false}
      />
    );
  }

  if (isValidElement(nodeOrType)) {
    return cloneElement(nodeOrType, {
      className: [nodeOrType.props?.className, className]
        .filter(Boolean)
        .join(" "),
      draggable: false,
      focusable: false,
      "aria-hidden": true,
    });
  }

  const Comp = nodeOrType;
  try {
    return (
      <Comp
        className={className}
        draggable={false}
        focusable={false}
        aria-hidden
      />
    );
  } catch {
    return null;
  }
}

const defaultItems = [
  { title: "Health", icon: "/images/homepage/health.png", link: "https://insurance.digibima.com/login?type=motor" },
  { title: "Term Life", icon: "/images/homepage/health.png", link: "https://insurance.digibima.com/login?type=motor" },
  { title: "2 Wheeler", icon: "/images/homepage/bike.png", link: "https://insurance.digibima.com" },
  { title: "4 Wheeler", icon: "/images/homepage/car.png", link: "https://insurance.digibima.com/login?type=motor" },
  { title: "Travel", icon: "/images/homepage/commercial.png", link: "https://insurance.digibima.com/login?type=motor" },
  { title: "Others", icon: "/images/health/health-two.png", link: "https://insurance.digibima.com/login?type=motor" },
];
