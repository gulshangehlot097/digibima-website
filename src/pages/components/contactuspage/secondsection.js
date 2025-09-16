"use client";
import { useMemo, useState, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Copy, Check } from "lucide-react";

function SecondSection() {
  const address =
    "706, Lane No. 6, New Sanganer Road, Devi Nagar, Jaipur, Rajasthan 302019";
  const email = "info@digibima.com";
  const phone = "+91 911 91 73 733";

  // Cards config memoized so objects aren’t recreated on every render
  const cards = useMemo(
    () => [
      {
        key: "address",
        ribbon: "Visit",
        icon: (
          <BadgeIcon>
            <div className="relative h-[40px] w-[40px]">
              <Image
                src="/images/contactus/home.png"
                alt="Home"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
          </BadgeIcon>
        ),
        title: "Address",
        subtitle: "Visit our office",
        content: (
          <p className="mt-4 text-sm leading-6 text-slate-800">{address}</p>
        ),
      },
      {
        key: "email",
        ribbon: "Fast Reply",
        ribbonClass: "from-emerald-400 to-teal-500",
        icon: (
          <BadgeIcon glow>
            <div className="relative h-[40px] w-[40px]">
              <Image
                src="/images/contactus/mail.png"
                alt="Mail"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
          </BadgeIcon>
        ),
        title: "Email",
        subtitle: "We reply fast",
        content: (
          <>
            <CopyRow text={email}>
              <a
                className="truncate text-sm font-medium text-slate-900 hover:underline"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </CopyRow>
            <p className="mt-3 text-xs text-slate-700">
              For quotes, partnerships, or support.
            </p>
          </>
        ),
        spotlight: true,
      },
      {
        key: "phone",
        ribbon: "Call",
        ribbonClass: "from-sky-400 to-indigo-500",
        icon: (
          <BadgeIcon>
            <div className="relative h-[40px] w-[40px]">
              <Image
                src="/images/contactus/telephone.png"
                alt="Telephone"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
          </BadgeIcon>
        ),
        title: "Phone",
        subtitle: "Mon–Sat, 10am–7pm",
        content: (
          <>
            <CopyRow text={phone}>
              <a
                className="truncate text-sm font-medium text-slate-900 hover:underline"
                href={`tel:${phone.replace(/\s+/g, "")}`}
              >
                {phone}
              </a>
            </CopyRow>
            <div className="mt-4 flex flex-wrap gap-3">
              <SmartLink
                href={`https://wa.me/${phone.replace(/[^\d]/g, "")}`}
                label="WhatsApp"
              />
              <SmartLink
                href={`tel:${phone.replace(/\s+/g, "")}`}
                label="Call Now"
              />
            </div>
          </>
        ),
      },
    ],
    [address, email, phone]
  );

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-15 sm:py-24 lg:py-16 mb-16">
        {/* Heading */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/70 bg-white/90 px-4 py-1 text-xs font-semibold text-slate-700 shadow backdrop-blur">
            <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />{" "}
            Contact Details
          </span>
          <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Let’s Connect
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-700/80">
            Reach us by address, email, or phone — whichever works best for you.
          </p>
        </motion.header>

        {/* Cards */}
        <div className="grid items-stretch gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
              viewport={{ once: true }} 
              className="h-full"
            >
              <Card spotlight={card.spotlight} className="flex h-full flex-col">
                <Ribbon className={card.ribbonClass}>{card.ribbon}</Ribbon>
                <CardHeader
                  icon={card.icon}
                  title={card.title}
                  subtitle={card.subtitle}
                />
                <div className="flex-1">{card.content}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- UI bits (unchanged) ---------- */

function Card({ children, className = "", spotlight = false }) {
  return (
    <div
      className={`group relative rounded-2xl transition-transform duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] ${className}`}
    >
      {spotlight && (
        <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-tr from-sky-200/40 via-indigo-200/30 to-emerald-200/40 blur-2xl opacity-70 group-hover:opacity-100 transition duration-500 ease-out" />
      )}

      {/* Card Background with Gradient + Waves */}
      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-sky-200/70 bg-gradient-to-br from-white/90 via-sky-50/80 to-indigo-50/90 p-6 shadow-md backdrop-blur-sm transition-shadow duration-500 ease-out hover:shadow-xl">
        {/* Decorative waves */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 400"
            className="h-full w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 C150,100 350,300 500,200 C650,100 800,300 800,200 L800,400 L0,400 Z"
              fill="url(#grad1)"
            />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {children}
      </div>
    </div>
  );
}

function Ribbon({ children, className = "from-sky-400 to-blue-500" }) {
  return (
    <div className="pointer-events-none absolute -left-2 top-3 z-10">
      <div
        className={`-rotate-2 rounded-md bg-gradient-to-r ${className} px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow`}
      >
        {children}
      </div>
    </div>
  );
}

function CardHeader({ icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3">
      {icon}
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-600">{subtitle}</p>}
      </div>
    </div>
  );
}

function BadgeIcon({ children, glow = false }) {
  return (
    <div className="relative">
      {glow && (
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-sky-400/40 to-indigo-400/30 blur-md opacity-70 animate-pulse" />
      )}
      <div className="relative flex h-[56px] w-[56px] items-center justify-center rounded-xl bg-white text-sky-700 ring-1 ring-sky-200 shadow">
        {children}
      </div>
    </div>
  );
}

function SmartLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white/80 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {label}
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current opacity-70">
        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3Z" />
      </svg>
    </a>
  );
}

function CopyRow({ text, children }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  return (
    <div className="mt-3 flex items-center justify-between gap-2">
      <div className="min-w-0 flex-1">{children}</div>
      <button
        onClick={onCopy}
        className="inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-sky-200 bg-white/80 px-2 text-xs text-slate-700 shadow-sm backdrop-blur transition hover:bg-white active:scale-95"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

export default memo(SecondSection);
