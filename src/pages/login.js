"use client";
import Seo from "@/pages/components/seo";
import { useEffect, useMemo, useRef, useState, useCallback, memo } from "react";
import Image from "next/image";
import { cardone, cardtwo, cardthree } from "@/images/Image";
import { showSuccess, showError } from "@/layouts/toaster";
import { CallApi } from "@/api";
import constant from "@/env";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiPhoneCall, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ---- OTP 6-Box Input (helper) ---- */
function OTPBoxes({ value = "", onChange = () => {}, length = 6 }) {
  const refs = useRef([]);

  const handleChange = (idx, e) => {
    const raw = e.target.value || "";
    const onlyDigits = raw.replace(/\D/g, "");

    // If user pastes multiple digits
    if (onlyDigits.length > 1) {
      const prefix = value.slice(0, idx);
      const suffix = value.slice(idx + onlyDigits.length);
      const merged = (prefix + onlyDigits + suffix).slice(0, length);

      onChange(merged);
      const focusIndex = Math.min(idx + onlyDigits.length, length - 1);
      refs.current[focusIndex]?.focus();
      return;
    }

    // Single character typing
    const chars = value.split("");
    chars[idx] = onlyDigits.charAt(0) || "";
    const next = chars.join("").slice(0, length);
    onChange(next);

    if (onlyDigits && idx < length - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace") {
      if ((value[idx] ?? "") === "" && idx > 0) {
        refs.current[idx - 1]?.focus();
      } else {
        const chars = value.split("");
        chars[idx] = "";
        onChange(chars.join(""));
      }
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      refs.current[idx - 1]?.focus();
      e.preventDefault();
    }
    if (e.key === "ArrowRight" && idx < length - 1) {
      refs.current[idx + 1]?.focus();
      e.preventDefault();
    }
  };

  return (
    <div className="mt-2 grid grid-cols-6 gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="h-11 w-full rounded-lg border border-slate-300 text-center text-lg tracking-widest outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onFocus={(e) => e.target.select()}
          placeholder="•"
        />
      ))}
    </div>
  );
}

function CustomerLogin() {
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [mobile, setMobile] = useState("");
  const [sending, setSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(true);

  // --- Captcha ---
  const generateCaptcha = useCallback(() => {
    const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
    let str = "";
    for (let i = 0; i < 6; i++) str += chars[Math.floor(Math.random() * chars.length)];
    setCaptcha(str);
    setCaptchaInput("");
  }, []);
  useEffect(() => generateCaptcha(), [generateCaptcha]);

  const isCaptchaValid = useMemo(() => {
    return captchaInput.trim().normalize("NFKC") === captcha.normalize("NFKC");
  }, [captcha, captchaInput]);
  const isMobileValid = useMemo(() => /^[6-9]\d{9}$/.test(mobile), [mobile]);

  // --- Send OTP ---
  const resendTimerRef = useRef(null);
  const handleSendOtp = useCallback(async () => {
    if (!isMobileValid) return;
    setSending(true);
    try {
      const res = await CallApi(constant.API.USER.SENDOTP, "POST", { mobile });
      if (res.status) {
        setOtpSent(true);
        setCanResend(false);
        setResendTimer(30);
        showSuccess(res.message || "OTP sent successfully");

        if (resendTimerRef.current) clearInterval(resendTimerRef.current);
        resendTimerRef.current = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(resendTimerRef.current);
              resendTimerRef.current = null;
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        showError(res.message || "Failed to send OTP");
      }
    } catch (err) {
      showError(err.message || "Something went wrong");
    } finally {
      setSending(false);
    }
  }, [isMobileValid, mobile]);

  // --- Verify OTP ---
  const handleVerifyOtp = useCallback(async () => {
    if (otpInput.length !== 6) {
      alert("Enter a valid 6-digit OTP!");
      return;
    }
    setVerifying(true);
    try {
      const res = await CallApi(constant.API.USER.VERIFYOTP, "POST", {
        mobile,
        otp: otpInput,
      });
      if (res.status) {
        setOtpVerified(true);
        showSuccess(res.message || "OTP Verified Successfully");
      } else {
        showError(res.message || "Failed to Verify OTP");
      }
    } catch (err) {
      showError(err.message || "Something went wrong during OTP verification");
    } finally {
      setVerifying(false);
    }
  }, [mobile, otpInput]);

  // --- Final Submit ---
  const handleSubmit = useCallback(() => {
    if (!isMobileValid || !isCaptchaValid) {
      showError("Mobile or Captcha invalid!");
      return;
    }
    showSuccess("Form Submitted!");
    window.location.href = "https://insurance.digibima.com";
  }, [isMobileValid, isCaptchaValid]);

  // --- Slider ---
  const slides = useMemo(
    () => [
      { id: 1, img: cardone, alt: "24x7 Customer Support" },
      { id: 2, img: cardtwo, alt: "Claim Assistance" },
      { id: 3, img: cardthree, alt: "Renewal & New Policy" },
      { id: 4, img: cardtwo, alt: "Talk to Advisor" },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const count = slides.length;
  const wrap = useCallback((n) => (n + count) % count, [count]);
  const next = useCallback(() => setActive((p) => wrap(p + 1)), [wrap]);
  const prev = useCallback(() => setActive((p) => wrap(p - 1)), [wrap]);
  const timerRef = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    if (count <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isHovering.current) {
        setActive((p) => (p + 1) % count);
      }
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count]);

  useEffect(() => {
    return () => {
      if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    };
  }, []);

  const touch = useRef({ x: 0, moved: false });
  const onTouchStart = useCallback((e) => {
    touch.current = { x: e.touches[0].clientX, moved: false };
  }, []);
  const onTouchMove = useCallback((e) => {
    if (Math.abs(e.touches[0].clientX - touch.current.x) > 8) touch.current.moved = true;
  }, []);
  const onTouchEnd = useCallback(
    (e) => {
      if (!touch.current.moved) return;
      const dx = e.changedTouches[0].clientX - touch.current.x;
      dx > 40 ? prev() : dx < -40 && next();
    },
    [next, prev]
  );
  const goTo = useCallback((i) => setActive(wrap(i)), [wrap]);

  return (
    <>
      <Seo
        title="Customer Login – Digibima Insurance Portal"
        description="Access your Digibima insurance account securely. Login to view policy details, manage your health, life, or general insurance plans, and track claims with ease."
      />
      <section className="w-full pt-36">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* LEFT CARD */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <h2 className="text-3xl font-semibold text-slate-900">Customer Login</h2>
              <p className="mt-2 text-sm text-slate-600">Please fill the policy Details</p>

              <div className="mt-6 rounded-xl border border-slate-200 p-4">
                {/* Mobile */}
                <div className="grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-8">
                    <label className="labelcls">Enter Your Mobile</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter Your Mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>

                  <div className="col-span-4 flex h-full items-end">
                    {!otpVerified && (
                      <button
                        onClick={handleSendOtp}
                        disabled={!isMobileValid || sending || (!canResend && otpSent)}
                        className={`w-full thmbtn px-5 py-2 text-white font-semibold ${
                          otpSent && !canResend ? "opacity-60 cursor-not-allowed" : "opacity-100"
                        }`}
                      >
                        {sending ? "Sending…" : otpSent ? "Resend" : "Send OTP"}
                      </button>
                    )}
                  </div>
                </div>

                {otpSent && !canResend && !otpVerified && (
                  <span className="mt-3 text-base text-red-500">Resend in {resendTimer}s</span>
                )}

                {/* OTP Input (changed to 6 boxes) */}
                {!otpVerified && otpSent && (
                  <div className="mt-4 grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-8">
                      <label className="labelcls">Enter OTP</label>
                      <OTPBoxes value={otpInput} onChange={setOtpInput} length={6} />
                    </div>
                    <div className="col-span-4 flex h-full items-end">
                      <button
                        onClick={handleVerifyOtp}
                        disabled={verifying}
                        className="w-full thmbtn px-3 py-2 text-white font-semibold disabled:opacity-60"
                      >
                        {verifying ? "Verifying…" : "Verify OTP"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Captcha */}
                <div className="mt-4 grid grid-cols-12 gap-3 items-center">
                  <div className="col-span-5">
                    <div className="relative flex h-11 items-center justify-center rounded-md bg-black/90 text-white font-bold tracking-wider">
                      <div className="pointer-events-none absolute inset-0 [background:repeating-linear-gradient(45deg,_rgba(255,255,255,0.07)_0_8px,_transparent_8px_16px)] rounded-md" />
                      <span className="relative z-10 text-xl select-none">{captcha}</span>
                    </div>
                  </div>
                  <div className="col-span-7">
                    <input
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Captcha"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      maxLength={captcha.length}
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Can&apos;t read the image? click{" "}
                  <button
                    type="button"
                    className="text-blue-600 underline hover:text-blue-700"
                    onClick={generateCaptcha}
                  >
                    here
                  </button>{" "}
                  to refresh.
                </p>

                {/* Submit */}
                {otpVerified && (
                  <div className="mt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={!isMobileValid || !isCaptchaValid}
                      className="w-full thmbtn px-5 py-2 rounded-md bg-green-600 text-white font-semibold transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE: Slider */}
            <div className="relative">
              <div className="mb-4 flex items-center gap-3">
<Link
  href="tel:+919119173733"
  className="inline-flex items-center gap-2 rounded-full bg-[#7998F4] px-4 py-2 font-medium text-white ring-1 ring-green-200 transform transition-transform duration-200 hover:scale-105"
>
  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white">
    <FiPhoneCall size={16} />
  </span>
  Talk to Advisor
</Link>

              </div>

              <div
                className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-slate-100 shadow-sm select-none"
                onMouseEnter={() => (isHovering.current = true)}
                onMouseLeave={() => (isHovering.current = false)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <div className="relative md:h-[320px] h-[220px]">
                  {slides.map((s, i) => (
                    <div
                      key={s.id}
                      className={`absolute inset-0 p-3 transition-opacity duration-700 ease-in-out ${
                        i === active ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <div className="h-full w-full overflow-hidden rounded-xl bg-white relative">
                        <Image
                          src={s.img}
                          alt={s.alt}
                          fill
                          sizes="(min-width: 768px) 50vw, 100vw"
                          priority={i === 0}
                          className="object-contain"
                          draggable={false}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Arrows */}
                {count > 1 && (
                  <>
                    <button
                      aria-label="Previous"
                      onClick={prev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-[#7998F4] text-white p-2 shadow ring-1 ring-blue-200 hover:scale-105"
                    >
                      <FiChevronLeft size={18} />
                    </button>
                    <button
                      aria-label="Next"
                      onClick={next}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full bg-[#7998F4] text-white p-2 shadow ring-1 ring-blue-200 hover:scale-105"
                    >
                      <FiChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Dots */}
                {count > 1 && (
                  <div className="flex items-center justify-center gap-3 py-3 z-20 relative">
                    {slides.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => goTo(i)}
                        className={`h-2 w-2 rounded-full ${
                          i === active ? "bg-[#7998F4]" : "bg-slate-300"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(CustomerLogin);
