"use client";
import { useEffect, useMemo, useState } from "react";

export default function CustomerLogin() {
  // --- Captcha (dummy) ---
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [mobile, setMobile] = useState("");
  const [sending, setSending] = useState(false);

  const generateCaptcha = () => {
    const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
    let str = "";
    for (let i = 0; i < 6; i++) str += chars[Math.floor(Math.random() * chars.length)];
    setCaptcha(str);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const isCaptchaValid = useMemo(
    () => captchaInput.trim().toLowerCase() === captcha.toLowerCase(),
    [captcha, captchaInput]
  );
  const isMobileValid = useMemo(() => /^[6-9]\d{9}$/.test(mobile), [mobile]);

  const handleSendOtp = async () => {
    if (!isMobileValid || !isCaptchaValid) return;
    setSending(true);
    // TODO: integrate your OTP API here
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    alert("OTP sent (demo). Integrate your API.");
  };

  // --- Carousel ---
  const slides = [
    { id: 1, img: "/banners/policyx-1.png", alt: "24x7 Customer Support" },
    { id: 2, img: "/banners/policyx-2.png", alt: "Claim Assistance" },
    { id: 3, img: "/banners/policyx-3.png", alt: "Renewal & New Policy" },
    { id: 4, img: "/banners/policyx-4.png", alt: "Talk to Advisor" },
  ];
  const [active, setActive] = useState(0);
  const next = () => setActive((p) => (p + 1) % slides.length);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="w-full bg-[#f4f8ff] pt-36">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* LEFT CARD */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-3xl font-semibold text-slate-900">Customer Login</h2>
            <p className="mt-2 text-sm text-slate-600">Please fill the policy Details</p>

            <div className="mt-6 rounded-xl border border-slate-200 p-4">
              {/* Mobile */}
              <label className="block text-sm font-medium text-slate-700">Enter Your Mobile</label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter Your Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              />

              {/* Captcha Row */}
              <div className="mt-4 grid grid-cols-12 gap-3 items-center">
                {/* Captcha image mock */}
                <div className="col-span-5">
                  <div className="relative flex h-11 items-center justify-center rounded-md bg-black/90 text-white font-bold tracking-wider">
                    <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(45deg,_rgba(255,255,255,0.07)_0_8px,_transparent_8px_16px)] rounded-md" />
                    <span className="relative z-10 text-xl select-none">{captcha}</span>
                  </div>
                </div>

                {/* Captcha input */}
                <div className="col-span-7">
                  <input
                    type="text"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Captcha"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                  />
                </div>
              </div>

              {/* Refresh link */}
              <p className="mt-2 text-sm text-slate-600">
                Can&apos;t read the image? click{" "}
                <button
                  type="button"
                  className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                  onClick={generateCaptcha}
                >
                  here
                </button>{" "}
                to refresh.
              </p>

              {/* Send OTP */}
              <div className="mt-5">
                <button
                  onClick={handleSendOtp}
                  disabled={!isMobileValid || !isCaptchaValid || sending}
                  className="w-36 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Send OTP"}
                </button>
              </div>
            </div>

            {/* Employee Login */}
            <div className="mt-6 flex items-center gap-2 text-blue-700">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4Zm0 2c-3.33 0-6 2.24-6 5v1h12v-1c0-2.76-2.67-5-6-5Z" />
              </svg>
              <a href="#" className="font-medium hover:underline">
                Employee Login
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: CTA + SLIDER */}
          <div className="relative">
            {/* Talk to Advisor */}
            <div className="mb-4 flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700 ring-1 ring-blue-200 hover:bg-blue-200">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.62 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.18a2 2 0 0 1 2.11-.45c.83.29 1.7.5 2.6.62A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                Talk to Advisor
              </button>
            </div>

            {/* Slider */}
            <div className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${active * 100}%)`, width: `${slides.length * 100}%` }}
              >
                {slides.map((s) => (
                  <div key={s.id} className="w-full shrink-0 md:h-[320px] h-[220px] p-3">
                    <div className="h-full w-full overflow-hidden rounded-xl bg-slate-50">
                      <img
                        src={s.img}
                        alt={s.alt}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop";
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <button
                aria-label="Previous"
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow ring-1 ring-slate-200 hover:bg-slate-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                aria-label="Next"
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow ring-1 ring-slate-200 hover:bg-slate-50"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex items-center justify-center gap-3 py-3">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(i)}
                    className={`h-2 w-2 rounded-full ${i === active ? "bg-slate-900" : "bg-slate-300"}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
