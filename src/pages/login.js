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

function OTPBoxes({ value = "", onChange = () => {}, length = 6 }) {
  const refs = useRef([]);

  const handleChange = (idx, e) => {
    const raw = e.target.value || "";
    const onlyDigits = raw.replace(/\D/g, "");

    if (onlyDigits.length > 1) {
      const prefix = value.slice(0, idx);
      const suffix = value.slice(idx + onlyDigits.length);
      const merged = (prefix + onlyDigits + suffix).slice(0, length);

      onChange(merged);
      const focusIndex = Math.min(idx + onlyDigits.length, length - 1);
      refs.current[focusIndex]?.focus();
      return;
    }

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [sending, setSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [formLocked, setFormLocked] = useState(false);

  const [cities, setCities] = useState([]); // suggestions list (array)
  const [pinError, setPinError] = useState(""); // error message
  const suggestionsRootRef = useRef(null);

  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(true);

  // --- Captcha (commented as requested) ---
  // const generateCaptcha = useCallback(() => {
  //   const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
  //   let str = "";
  //   for (let i = 0; i < 6; i++)
  //     str += chars[Math.floor(Math.random() * chars.length)];
  //   setCaptcha(str);
  //   setCaptchaInput("");
  // }, []);
  // useEffect(() => generateCaptcha(), [generateCaptcha]);
  // const isCaptchaValid = useMemo(() => {
  //   return captchaInput.trim().normalize("NFKC") === captcha.normalize("NFKC");
  // }, [captcha, captchaInput]);

  const isMobileValid = useMemo(() => /^[6-9]\d{9}$/.test(mobile), [mobile]);

  // --- Send OTP ---
  const resendTimerRef = useRef(null);
  const handleSendOtp = useCallback(async () => {
    if (formLocked) return;
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
  }, [formLocked, isMobileValid, mobile]);

  // --- Verify OTP ---
  const handleVerifyOtp = useCallback(async () => {
    if (formLocked) return;
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
  }, [formLocked, mobile, otpInput]);

  // --- helpers: reset/prefill ---
  const resetForm = useCallback(() => {
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
      resendTimerRef.current = null;
    }

    setGender("");
    setName("");
    setEmail("");
    setMobile("");
    setPincode("");

    setOtpInput("");
    setOtpSent(false);
    setOtpVerified(false);
    setSending(false);
    setVerifying(false);

    setCaptchaInput("");
    setCities([]);
    setPinError("");

    setCanResend(true);
    setResendTimer(30);
  }, []);

  const prefillFromStorage = useCallback(() => {
    try {
      const t = localStorage.getItem("db_auth_token");
      if (!t) return;

      const raw = localStorage.getItem("db_auth_user");
      if (!raw) return;

      const u = JSON.parse(raw) || {};
      setGender(String(u.gender ?? "").toLowerCase());
      setName(String(u.name ?? ""));
      setEmail(String(u.email ?? ""));
      setMobile(String(u.mobile ?? u.phone ?? ""));
      setPincode(String(u.pincode ?? u.pin ?? u.zip ?? ""));

      setFormLocked(true);
    } catch {}
  }, []);

  
  useEffect(() => {
    prefillFromStorage();

    const onAuthChange = () => {
      const t = localStorage.getItem("db_auth_token");
      if (t) prefillFromStorage();
      else resetForm();
    };
    window.addEventListener("auth-change", onAuthChange);

    let bc;
    try {
      bc = new BroadcastChannel("auth");
      bc.onmessage = (ev) => {
        if (ev?.data?.type === "logout") resetForm();
        if (ev?.data?.type === "login") prefillFromStorage();
      };
    } catch {}

    const onStorage = (e) => {
      if (
        e.key === "db_auth_token" ||
        e.key === "auth:logout_at" ||
        e.key === "auth:login_at"
      ) {
        const t = localStorage.getItem("db_auth_token");
        if (!t || e.key === "auth:logout_at") resetForm();
        else prefillFromStorage();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("auth-change", onAuthChange);
      window.removeEventListener("storage", onStorage);
      if (bc) bc.close();
    };
  }, [prefillFromStorage, resetForm]);

  useEffect(() => {
    prefillFromStorage();
  }, [prefillFromStorage]);

  const REMOTE_BASE = "https://uat.digibima.com/";
  function buildRemoteUrl(token, user, type = "home") {
    const uid = String(
      user?.id ?? user?.user_id ?? user?._id ?? user?.ID ?? ""
    ).trim();

    const qs = new URLSearchParams();
    if (uid) qs.set("user_id", uid);
    if (token) qs.set("token", token);
    if (type) qs.set("type", type);

    return `${REMOTE_BASE}?${qs.toString()}`;
  }

  // --- Final Submit ---
  const handleSubmit = useCallback(async () => {
    if (formLocked) return;
    if (!otpVerified) {
      showError("Please verify OTP.");
      return;
    }
    // if (!isCaptchaValid) {
    //   showError("Invalid captcha.");
    //   return;
    // }

    const isEmpty = (v) => String(v ?? "").trim() === "";

    if (isEmpty(gender)) {
      showError("Please select Gender");
      return;
    }
    if (isEmpty(name)) {
      showError("Please enter Full Name");
      return;
    }
    if (isEmpty(email)) {
      showError("Please enter Email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(String(email).trim())) {
      showError("Please enter a valid Email address");
      return;
    }
    if (isEmpty(mobile)) {
      showError("Please enter Mobile Number");
      return;
    }
    if (isEmpty(pincode)) {
      showError("Please enter Pincode");
      return;
    }
    // if (isEmpty(captchaInput)) {
    //   showError("Please enter Captcha");
    //   return;
    // }

    try {
      const payload = { gender, name, email, mobile, pincode };
      const res = await CallApi(constant.API.USER.USERLOGIN, "POST", payload);
      console.log(res);

      if (res?.status) {
        const { token, user } = res;

        try {
          localStorage.setItem("db_auth_token", token);
          localStorage.setItem("db_auth_user", JSON.stringify(user || {}));
        } catch {}

        document.cookie = `db_auth_token=${encodeURIComponent(
          token
        )}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax; secure`;

        try {
          window.dispatchEvent(new Event("auth-change"));
          const bc = new BroadcastChannel("auth");
          bc.postMessage({ type: "login" });
          bc.close();
        } catch {}
        try {
          localStorage.setItem("auth:login_at", String(Date.now()));
        } catch {}

        showSuccess(res?.message || "Login successful");

        const redirectType = "home";
        const targetUrl = buildRemoteUrl(token, user, redirectType);
        window.location.replace(targetUrl);
        return;
      }
    } catch (err) {
      showError(err?.message || "Something went wrong");
    }
  }, [formLocked, otpVerified, gender, name, email, mobile, pincode]);

  // --- pincode helpers ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".city-suggestions")) {
        setCities([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const normalizeCityList = (resp) => {
    const raw =
      (resp && typeof resp === "object" && "data" in resp ? resp.data : resp) ??
      [];

    if (Array.isArray(raw)) {
      return raw
        .map((item) => {
          const pin = String(
            item?.pincode ??
              item?.pin ??
              item?.Pincode ??
              item?.code ??
              item?.zip ??
              item ??
              ""
          ).trim();

          const city = String(
            item?.city ??
              item?.district ??
              item?.name ??
              item?.post_office ??
              item?.taluk ??
              ""
          ).trim();

          return { pin, city };
        })
        .filter(({ pin }) => /^\d{5,6}$/.test(pin));
    }

    if (raw && typeof raw === "object") {
      return Object.entries(raw)
        .filter(
          ([k, v]) => /^\d{5,6}$/.test(k) && typeof v === "string" && v.trim()
        )
        .map(([pin, city]) => ({ pin: String(pin).trim(), city: city.trim() }));
    }

    return [];
  };

  const handleCityClick = useCallback((pin, city) => {
    setPincode(pin);
    setCities([]);
    setPinError("");
  }, []);

  const fetchCities = useCallback(async (cleaned) => {
    if (!/^\d{5,6}$/.test(cleaned)) {
      setCities([]);
      setPinError("");
      return;
    }

    const PINCODE_ENDPOINT =
      constant?.API?.USER?.PINCODE ?? constant?.API?.HEALTH?.PINCODE;

    if (!PINCODE_ENDPOINT) {
      setPinError("Pincode API not configured.");
      setCities([]);
      return;
    }
    try {
      const pincodeData = { pincode: cleaned };
      const pindata = await CallApi(PINCODE_ENDPOINT, "POST", pincodeData);
      const list = normalizeCityList(pindata);
      setCities(list);
      setPinError(list.length ? "" : "No results found for this pincode.");
    } catch (_err) {
      setCities([]);
      setPinError("Error fetching city list. Try again.");
    }
  }, []);

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
    if (Math.abs(e.touches[0].clientX - touch.current.x) > 8)
      touch.current.moved = true;
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
              <h2 className="text-3xl font-semibold text-slate-900">
                Customer Login
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Please fill the policy Details
              </p>

              <div className="mt-6 rounded-xl border border-slate-200 p-6 bg-white">
                {/* === ROW: Gender (full-width) === */}
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-12">
                    <div
                      className="flex gap-2 "
                      role="radiogroup"
                      aria-label="Gender"
                    >
                      {["male", "female"].map((opt) => (
                        <label key={opt} className="cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value={opt}
                            checked={gender === opt}
                            onChange={(e) => {
                              const val = e.target.value;
                              setGender(val); // local state only
                            }}
                            className="peer sr-only"
                            disabled={formLocked}
                          />
                          <div
                            className="px-5 py-2 rounded border text-sm font-medium transition select-none
                                        bg-white text-black border-gray-400 hover:border-gray-500
                                        peer-checked:bg-[#7998F4] peer-checked:text-white peer-checked:border-[#7998F4]"
                          >
                            {opt[0].toUpperCase() + opt.slice(1)}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* === ROW 1: Name (6) | Email (6) === */}
                <div className="mt-4 grid grid-cols-12 gap-3">
                  <div className="col-span-12 md:col-span-6">
                    <label className="labelcls">Full Name</label>
                    <input
                      type="text"
                      className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="e.g., Rajesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      readOnly={formLocked}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label className="labelcls">Email</label>
                    <input
                      type="email"
                      className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      inputMode="email"
                      readOnly={formLocked}
                    />
                  </div>
                </div>

                {/* === ROW 2: Mobile (6) | (Send OTP / Pincode) (6) === */}
                <div className="mt-4 grid grid-cols-12 gap-3">
                  <div className="col-span-12 md:col-span-6">
                    <label className="labelcls">Mobile Number</label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      placeholder="Enter 10-digit mobile"
                      value={mobile}
                      onChange={(e) =>
                        setMobile(e.target.value.replace(/\D/g, ""))
                      }
                      autoComplete="tel"
                      readOnly={formLocked}
                    />
                  </div>

                  {/* RIGHT SIDE: if not verified -> Send OTP button; if verified -> Pincode input */}
                  <div className="col-span-12 md:col-span-6 flex md:items-end">
                    {!otpVerified ? (
                      !otpVerified && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={
                            formLocked ||
                            !isMobileValid ||
                            sending ||
                            (!canResend && otpSent)
                          }
                          className={`mt-2 md:mt-[34px] h-11 thmbtn px-5 text-white font-semibold ${
                            formLocked
                              ? "opacity-60 cursor-not-allowed"
                              : otpSent && !canResend
                              ? "opacity-60 cursor-not-allowed"
                              : "opacity-100"
                          }`}
                        >
                          {formLocked
                            ? "Verified"
                            : sending
                            ? "Sending…"
                            : otpSent
                            ? "Resend"
                            : "Send OTP"}
                        </button>
                      )
                    ) : (
                      
                      <div className="w-full relative">
                        <label className="labelcls">Pincode</label>
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={6}
                          className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          placeholder="e.g., 302001"
                          value={pincode}
                          onChange={(e) => {
                            const cleaned = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);
                            setPincode(cleaned);
                            fetchCities(cleaned);
                          }}
                          autoComplete="postal-code"
                        />

                        {/* error (optional) */}
                        {pinError && (
                          <p className="mt-1 text-xs text-red-600">
                            {pinError}
                          </p>
                        )}

                        {/* suggestions */}
                        {cities.length > 0 && (
                          <div
                            ref={suggestionsRootRef}
                            className="city-suggestions absolute z-30 mt-2 w-full max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white shadow"
                          >
                            {cities.map(({ pin, city }, idx) => (
                              <button
                                key={`${pin}-${city}-${idx}`}
                                type="button"
                                onClick={() => handleCityClick(pin, city)}
                                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                              >
                                <span className="font-medium text-slate-800">
                                  {pin}
                                </span>
                                {city && (
                                  <span className="text-slate-500 text-sm">
                                    {city}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Resend timer (only before verification) */}
                {otpSent && !canResend && !otpVerified && (
                  <span className="mt-2 block text-sm text-red-500">
                    Resend in {resendTimer}s
                  </span>
                )}

                {/* === ROW 3: OTP Boxes (8) | Verify OTP Button (4) === */}
                {otpSent && !otpVerified && (
                  <div className="mt-4 grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-8">
                      <label className="labelcls">Enter OTP</label>
                      <div className="mt-2">
                        <OTPBoxes
                          value={otpInput}
                          onChange={setOtpInput}
                          length={6}
                        />
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 flex md:items-end">
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={formLocked || verifying}
                        className="mt-2 md:mt-[34px] h-11 thmbtn px-3 text-white font-semibold disabled:opacity-60"
                      >
                        {formLocked
                          ? "Locked"
                          : verifying
                          ? "Verifying…"
                          : "Verify OTP"}
                      </button>
                    </div>
                  </div>
                )}

                {/* === ROW 4: Pincode (6) | Blank (6) — only show BEFORE OTP verified === */}
                {!otpVerified && (
                  <div className="mt-4 grid grid-cols-12 gap-3">
                    <div className="col-span-12 md:col-span-6">
                      <div className="w-full relative">
                        <label className="labelcls">Pincode</label>
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={6}
                          className="mt-2 h-11 w-full rounded-lg border border-slate-300 px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          placeholder="e.g., 302001"
                          value={pincode}
                          onChange={(e) => {
                            const cleaned = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 6);
                            setPincode(cleaned);
                            fetchCities(cleaned); // <-- API call here too
                          }}
                          autoComplete="postal-code"
                        />

                        {pinError && (
                          <p className="mt-1 text-xs text-red-600">
                            {pinError}
                          </p>
                        )}

                        {cities.length > 0 && (
                          <div
                            ref={suggestionsRootRef}
                            className="city-suggestions absolute z-50 mt-2 w-full max-h-56 overflow-auto rounded-lg border border-slate-200 bg-white shadow"
                          >
                            {cities.map(({ pin, city }, idx) => (
                              <button
                                key={`${pin}-${city}-${idx}`}
                                type="button"
                                onClick={() => handleCityClick(pin, city)}
                                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between"
                              >
                                <span className="font-medium text-slate-800">
                                  {pin}
                                </span>
                                {city && (
                                  <span className="text-slate-500 text-sm">
                                    {city}
                                  </span>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      {/* blank for symmetry */}
                    </div>
                  </div>
                )}

                {/* === ROW 5: Captcha (commented) === */}
                {/* ...captcha block remains commented ... */}

                {/* === ROW 6: Login button === */}
                <div className="mt-5">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={formLocked || !otpVerified}
                    className={`h-11 w-full thmbtn px-5 rounded-md text-white font-semibold transition ${
                      formLocked || !otpVerified
                        ? "bg-green-600/60 cursor-not-allowed"
                        : "bg-green-600"
                    }`}
                  >
                    {formLocked ? "Logged In" : "Login"}
                  </button>
                </div>
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
