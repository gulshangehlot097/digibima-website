"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image";

const partners = [
  { name: "Care Health", logo: "/images/ourpartners/carehealth.png" },
  {
    name: "Shriram",
    logo: "/images/ourpartners/shriram.png",
  },
  { name: "Digit", logo: "/images/ourpartners/digit.png" },
  { name: "Tata Aig", logo: "/images/ourpartners/tata-aig.png" },
  { name: "Royal Sundaram", logo: "/images/ourpartners/royalsundaram.jpg" },
  { name: "HDFC", logo: "/images/ourpartners/hdfc.png" },
  { name: "Future", logo: "/images/ourpartners/future.png" },
  { name: "Bandhan Life", logo: "/images/ourpartners/bandhanlife.jpg" },
  // add more logos here…
];

export default function InsurancePartners() {
  return (
    <section className="py-20 bg-white  ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h4 className="text-blue-800 font-semibold uppercase tracking-wide">
          Partners
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold text-black-700 dark:text-black-300 mt-2">
          Our Partners
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-3">
          We&apos;re associated with India&apos;s most trusted insurance
          companies
        </p>
      </div>

      <div className="mt-12 w-full   select-none">
        <Marquee
          gradient={false}
          autoFill
          speed={36} 
          pauseOnHover={false}
          pauseOnClick={false}
          play 
        >
          {partners.map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="
                shrink-0 px-6 flex items-center justify-center h-24
                w-36 sm:w-44 md:w-52 lg:w-[220px]
              "
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={220}
                height={90}
                className="object-contain h-16 sm:h-18 md:h-20 w-auto"
                draggable={false}
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 180px, 144px"
                priority={i === 0}
              />
            </div>
          ))}
        </Marquee>
      </div>

      {false && (
        <div className="w-full bg-gray-50 dark:bg-gray-800 mt-2 select-none">
          <Marquee
            gradient={false}
            autoFill
            speed={30}
            direction="right"
            pauseOnHover={false}
            pauseOnClick={false}
            play
          >
            {partners.map((p, i) => (
              <div
                key={`row2-${p.name}-${i}`}
                className="shrink-0 px-6 flex items-center justify-center h-20 w-32 sm:w-40 md:w-48 lg:w-[200px]"
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={200}
                  height={80}
                  className="object-contain h-14 sm:h-16 md:h-18 w-auto"
                  draggable={false}
                  sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 128px"
                />
              </div>
            ))}
          </Marquee>
        </div>
      )}
    </section>
  );
}
