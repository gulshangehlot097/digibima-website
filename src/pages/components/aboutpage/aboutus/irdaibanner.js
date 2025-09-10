// src/pages/components/aboutpage/IrdaiBanner.js
import Link from "next/link";

export default function IrdaiBanner({
  text = `Life, health, and general insurance are just a few of the products we offer. 
We also recommend specialized plans tailored to specific client groups—for example, 
young professionals or college students just starting out.`,
  ctaLabel = "VIEW IRDAI CERTIFICATE",
  ctaHref = "/irdaipdf/irdaicertificate.pdf",
  className = "",
}) {
  return (
    <section className={`w-full bg-[#C3ECFE] ${className} mb-5`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 py-6 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Text */}
          <p className="text-slate-800 text-base sm:text-lg leading-relaxed lg:max-w-4xl">
            {text}
          </p>

          {/* Button */}
          <div className="lg:shrink-0">
            <Link
              href={ctaHref}
              target="_blank"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-2xl bg-[#7998F4] px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-semibold tracking-wide text-white transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1F4C7A]"
              aria-label={ctaLabel}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
