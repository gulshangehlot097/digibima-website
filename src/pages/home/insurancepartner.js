"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import "swiper/css";

const partners = [
  { name: "Care Health", logo: "/images/ourpartners/carehealth.png" },
  { name: "Shriram", logo: "/images/ourpartners/shriram.png" },
  { name: "Digit", logo: "/images/ourpartners/digit.png" },
  { name: "Tata Aig", logo: "/images/ourpartners/tata-aig.png" },
  { name: "Royal Sundaram", logo: "/images/ourpartners/royalsundaram.jpg" },
  { name: "HDFC", logo: "/images/ourpartners/hdfc.png" },
  { name: "Future", logo: "/images/ourpartners/future.png" },
  { name: "Bandhan Life", logo: "/images/ourpartners/bandhanlife.jpg" },
  { name: "Zuno", logo: "/images/ourpartners/zuno.jpg" },
  { name: "Bajaj", logo: "/images/ourpartners/bajaj.jpg" },
];

export default function InsurancePartners() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h4 className="text-[#0c4c8d] font-semibold uppercase tracking-wide">
          Partners
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold text-black-700 dark:text-black-300 mt-2">
          Our Partners
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-3">
          We&apos;re associated with India&apos;s most trusted insurance companies
        </p>
      </div>


      <div
        className="relative w-full px-4 mt-12 select-none carousel-mask"

      >
        <Swiper
          modules={[Autoplay, Mousewheel]}
          slidesPerView={"auto"}
          spaceBetween={24}
          loop
          speed={5000}
          autoplay={{
            delay: 0,                
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          mousewheel={{
            forceToAxis: true,       
            sensitivity: 0.5,
            releaseOnEdges: true,
          }}
        >
          {partners.map((p, i) => (
            <SwiperSlide key={`${p.name}-${i}`} className="!w-auto">
              <div className="shrink-0 px-6 flex items-center justify-center h-24 w-36 sm:w-44 md:w-52 lg:w-[220px]">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={220}
                  height={90}
                  className="object-contain h-16 sm:h-20 md:h-24 w-auto hover:grayscale-0 transition duration-1000 ease-in-out"
                  draggable={false}
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 180px, 144px"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-24 lg:w-24 fade-left" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-24 lg:w-24 fade-right" />
      </div>
    </section>
  );
}
