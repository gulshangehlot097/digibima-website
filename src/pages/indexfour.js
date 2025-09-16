"use client";

import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function QuoteHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20">
      {/* LEFT-SIDE GRADIENT/LAYERS (VISIBLE) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full md:w-2/3">
        {/* Base soft gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100"
        />
        {/* Animated subtle shift */}
        <motion.div
          animate={{
            transform: [
              "translate3d(0,0,0)",
              "translate3d(-3%, -2%, 0)",
              "translate3d(0,0,0)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 20% 30%, rgba(56,189,248,0.28), transparent 60%)",
          }}
        />
        {/* Highlight blobs */}
        <div className="absolute -left-16 top-10 h-80 w-80 rounded-full bg-sky-300/35 blur-3xl" />
        <div className="absolute left-64 top-64 h-64 w-64 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute left-20 bottom-8 h-56 w-56 rounded-full bg-purple-300/25 blur-3xl" />
        {/* Light grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(15,31,59,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,31,59,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* RIGHT-SIDE BACKGROUND IMAGE */}
      <div className="absolute inset-y-0 right-0 z-0 w-full md:w-1/3">
        <Image
          src="/one.jpg"
          alt="Family at breakfast table"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        {/* Dark overlay ONLY on small screens to keep text readable */}
        <div className="absolute inset-0 md:hidden bg-black/40" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-2 sm:px-6 lg:px-12 py-12 md:py-20">
        <div className="max-w-5xl">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-white md:text-[#0F1F3B]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Digital <span className="text-white md:text-[#1D4ED8]">Insurance Partner</span>
          </motion.h1>

        <span className="block text-white md:text-[#0F1F3B]">
  <TypeAnimation
    sequence={[
      "Health Insurance", 2000,
      "Life Insurance", 2000,
      "Travel Insurance", 2000,
      "Motor Insurance", 2000,
    ]}
    wrapper="span"
    speed={50}
    repeat={Infinity}
    className="text-lg sm:text-xl md:text-2xl font-semibold text-[inherit] mb-6 sm:mb-8 block"
    style={{ color: "inherit" }}
    cursorClassName="text-[inherit]"
  />
</span>
        </div>

        {/* Main card */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur shadow-xl ring-1 ring-black/5">
          <div className="p-5 sm:p-6 md:p-8">
            <p className="mb-4 text-sm font-semibold text-gray-700">
              Get The Best Insurance Plan
            </p>

            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Tile
                label="Health"
                sub="Cashless hospitals, pre & post hospitalization"
                badge={{ text: "POPULAR", tone: "sky" }}
                imageSrc="/images/homepage/health.png"
                highlight
                link="/health-insurance"
              />

              <Tile
                label="Term Life"
                sub="High cover, low premium, tax benefits*"
                badge={{ text: "VALUE", tone: "emerald" }}
                imageSrc="/images/homepage/health.png"
                link="/life-insurance"
              />

              <Tile
                label="2 Wheeler"
                sub="Instant renewal, zero paperwork"
                badge={{ text: "RENEWALS", tone: "violet" }}
                imageSrc="/images/homepage/bike.png"
                link="/two-wheeler-insurance"
              />

              <Tile
                label="4 Wheeler"
                sub="Comprehensive, third-party & add-ons"
                imageSrc="/images/homepage/car.png"
                link="/car-insurance"
              />

              <Tile
                label="Travel"
                sub="Medical cover, baggage, trip delays"
                imageSrc="/images/homepage/commercial.png"
                link="/travel-insurance"
              />

              <Tile
                label="Other"
                sub="Home, personal accident & more"
                imageSrc="/images/health/health-two.png"
                link="/other-insurance"
              />
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-secondary">Or, see all 30+ products</button>
              <button className="btn-ghost">Continue previous quote</button>
              <button className="btn-ghost">Find an agent</button>
            </div>
          </div>
        </div>
      </div>

      {/* Button styles */}
      <style jsx global>{`
        .btn-secondary {
          @apply inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50;
        }
        .btn-ghost {
          @apply inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100;
        }
      `}</style>
    </section>
  );
}

/* ---- Tile (card) ---- */
function Tile({
  label,
  sub,
  badge,
  imageSrc,
  highlight = false,
  link = "#",
}) {
  const tone =
    badge?.tone === "sky"
      ? "bg-sky-100 text-sky-700"
      : badge?.tone === "emerald"
      ? "bg-emerald-100 text-emerald-700"
      : badge?.tone === "violet"
      ? "bg-violet-100 text-violet-700"
      : "bg-gray-100 text-gray-700";

  return (
    <li
      className={[
        "group relative rounded-xl border bg-white p-4 sm:p-5 shadow-sm transition",
        "hover:shadow-md hover:border-gray-300",
        highlight ? "ring-1 ring-sky-100" : "",
      ].join(" ")}
    >
      {/* Whole card clickable */}
      <Link href={link} className="block focus:outline-none">
        {badge?.text && (
          <span
            className={[
              "absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold",
              tone,
            ].join(" ")}
          >
            {badge.text}
          </span>
        )}

        <div className="flex items-start gap-3 cursor-pointer">
          <div className="flex h-12 w-12 items-center justify-center">
            <Image
              src={imageSrc}
              alt={label}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900">
              {label} <span aria-hidden>›</span>
            </p>
            <p className="mt-1 text-sm text-gray-600">{sub}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}
