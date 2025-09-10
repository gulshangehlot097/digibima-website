'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CARDS = [
  {
    title: 'Life Insurance',
    image: '/images/about/insuresectionimg1.jpg',
    colorBar: 'bg-[#3490CC]',
    href: '/insurance/life',
  },
  {
    title: 'Medical Insurance',
    image: '/images/about/insuresectionimg2.jpg',
    colorBar: 'bg-[#CF5DCD]',
    href: '/insurance/medical',
  },
  {
    title: 'General Insurance',
    image: '/images/about/insuresectionimg3.jpg',
    colorBar: 'bg-[#88C948]',
    href: '/insurance/general',
  },
];

// Framer Motion variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 140, damping: 18 },
  },
};

const pillVariant = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.05 },
  },
};

export default function InsuranceSection() {
  return (
    <section className="bg-[#C3ECFE] py-10 sm:py-14 lg:py-20 mb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3">
            {CARDS.map((card, idx) => {
              const CardInner = (
                <motion.div
                  variants={cardVariant}
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full aspect-[4/3] sm:aspect-[1/1] rounded-[32px] sm:rounded-[48px] md:rounded-[64px] lg:rounded-[80px] overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={idx === 0}
                  />

                  {/* Bottom pill */}
                  <motion.div
                    variants={pillVariant}
                    className={`${card.colorBar} absolute inset-x-0 bottom-0 h-12 sm:h-14 md:h-16 flex items-center justify-center rounded-t-[999px]`}
                  >
                    <span className="text-white font-semibold tracking-wide text-sm sm:text-base md:text-lg">
                      {card.title}
                    </span>
                  </motion.div>
                </motion.div>
              );

              return card.href ? (
                <Link key={card.title} href={card.href} className="block">
                  {CardInner}
                </Link>
              ) : (
                <div key={card.title}>{CardInner}</div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
