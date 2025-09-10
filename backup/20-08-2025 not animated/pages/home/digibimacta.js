// components/DigiBimaCta.jsx
export default function DigiBimaCta({
  kicker = "LOOKING FOR HONEST AND RELIABLE SERVICES?",
  heading = "DIGI BIMA – Best Digital Insurance Partner",
  sub = "Get in touch with us, we’ll be pleased to assist you!",
  phone = "+91 911 91 73 733",
  connectHref = "#",
}) {
  return (
    <section className="relative w-full ">
      <div className="bg-[#1E5183]">
        <div className="mx-auto max-w-7xl px-20 py-6 md:py-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left copy */}
            <div className="text-white">
              <p className="text-[12px] md:text-sm font-semibold tracking-wide greentext uppercase">
                {kicker}
              </p>
              <h2 className="mt-1 text-2xl md:text-[28px] font-extrabold leading-snug">
                {heading}
              </h2>
              <p className="mt-1 text-sm md:text-base greentext">
                {sub}
              </p>
            </div>

            {/* Right actions */}
            <div className="flex w-full md:w-auto items-center gap-4">
              {/* Call pill */}
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex-1 md:flex-none inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-md"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F5F9]">
                  {/* phone icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1F4F78"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.18a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="text-left ">
                  <span className="block text-[11px] font-semibold text-slate-500 leading-none">
                    CALL US NOW
                  </span>
                  <span className="block text-[15px] md:text-[16px] font-extrabold text-slate-800 mt-1">
                    {phone}
                  </span>
                </span>
              </a>

              {/* Connect button */}
              <a
                href={connectHref}
                className="inline-flex items-center justify-center  rounded-2xl border-2 border-white px-6 md:px-7 py-4 text-[13px] md:text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                CONNECT WITH US
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
