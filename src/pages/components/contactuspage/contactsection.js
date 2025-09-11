"use client";
import { useEffect, useCallback, memo } from "react";
import { useForm, Controller } from "react-hook-form";
import { parse, format } from "date-fns";
import LeftContactCard from "./leftcard";
import SecondSection from "./secondsection";
import UniversalDatePicker from "@/pages/datepicker/index";
import { showError } from "@/layouts/toaster";
import { Send } from "lucide-react";
import { isAlpha, isNumber } from "@/styles/js/validation";
import Link from "next/link";

function ContactSection({ onSubmit, resetTrigger }) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      gender: "Male",
      name: "",
      email: "",
      mobile: "",
      dob: "",
      product: "",
      promo: false,
      terms: false,
    },
  });

  const selectedGender = watch("gender");

  useEffect(() => {
    if (resetTrigger) {
      reset();
    }
  }, [resetTrigger, reset]);

  // keep logic identical; just memoize so children don't re-render on each parent render
  const submitHandler = useCallback(
    (data) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  const onError = useCallback((errors) => {
    const firstKey = Object.keys(errors)[0];
    if (firstKey) {
      showError(errors[firstKey]?.message || "Please fix the error");
    }
  }, []);

  return (
    <section className="w-full ">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <LeftContactCard />

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sky-100 md:p-8">
            {/* Gender Tabs */}
            <div className="mb-5 inline-flex rounded-full bg-sky-100 p-1">
              {["Male", "Female"].map((t) => (
                <label
                  key={t}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition cursor-pointer ${
                    selectedGender === t
                      ? "bg-[#7998F4] text-white shadow"
                      : "text-sky-700 hover:bg-sky-200"
                  }`}
                >
                  <input
                    type="radio"
                    value={t}
                    {...register("gender")}
                    className="hidden"
                  />
                  {t}
                </label>
              ))}
            </div>

            <form
              onSubmit={handleSubmit(submitHandler, onError)}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="labelcls">
                    Name
                  </label>
                  <input
                    id="name"
                    placeholder="Full name"
                    className="inputcls"
                    {...register("name", { required: "Name is required" })}
                    onChange={(e) => isAlpha(e, setValue, "name", true)}
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="labelcls">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="inputcls"
                    {...register("email", { required: "Email is required" })}
                  />
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <label htmlFor="mobile" className="labelcls">
                    Mobile Number
                  </label>
                  <input
                    id="mobile"
                    inputMode="numeric"
                    placeholder="10-digit number"
                    maxLength={13}
                    className="inputcls"
                    {...register("mobile", {
                      required: "Mobile is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    })}
                    onChange={(e) => isNumber(e, setValue, "mobile")}
                  />
                </div>

                {/* Date of Birth */}
                <div className="space-y-1">
                  <label htmlFor="dob" className="labelcls">
                    Date of Birth
                  </label>
                  <Controller
                    control={control}
                    name="dob"
                    rules={{ required: "Date of Birth is required" }}
                    render={({ field }) => (
                      <UniversalDatePicker
                        id="dob"
                        name="dob"
                        className="inputcls"
                        wrapperClassName="w-full"
                        inputProps={{
                          id: "dob",
                          name: "dob",
                          placeholder: "DD-MM-YYYY",
                          className: "inputcls",
                          onBlur: field.onBlur,
                          ref: field.ref,
                        }}
                        value={
                          field.value
                            ? parse(field.value, "dd-MM-yyyy", new Date())
                            : null
                        }
                        onChange={(date) => {
                          if (date instanceof Date && !isNaN(date)) {
                            field.onChange(format(date, "dd-MM-yyyy"));
                          } else {
                            field.onChange("");
                          }
                        }}
                      />
                    )}
                  />
                </div>

                {/* Insurance Plan */}
                <div className="space-y-1">
                  <label htmlFor="product" className="labelcls">
                    Insurance Plan
                  </label>
                  <select
                    id="product"
                    defaultValue=""
                    className="inputcls"
                    {...register("product", { required: "Select a plan" })}
                  >
                    <option value="" disabled>
                      Choose
                    </option>
                    <option>Term Life Plan</option>
                    <option>Health Insurance</option>
                    <option>2-Wheeler Insurance</option>
                    <option>4-Wheeler Insurance</option>
                    <option>Other Insurance Plans</option>
                  </select>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 text-sm">
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 accent-pink-500 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-400"
                    {...register("promo")}
                  />
                  <span className="text-slate-700">
                    I agree to receive promotions/informative emails & SMS/WhatsApp updates.
                  </span>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 accent-pink-500 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-400"
                    {...register("terms", { required: "You must accept terms" })}
                  />
                  <span className="text-slate-700">
                    I agree to the{" "}
                    <Link
                      href="/about/termandcondition"
                      className="text-sky-700 underline whitespace-nowrap"
                    >
                      Terms and Conditions
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#7998F4] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-105"
              >
                <Send className="h-4 w-4" /> Send Request
              </button>
            </form>
          </div>
        </div>
      </div>

      <SecondSection />

      <div>
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.513479640078!2d75.76022600000002!3d26.887194400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5ddb1b0df7b%3A0xe3a3135f8c14f416!2sDigibima%20Insurance%20Web%20Aggregator%20Pvt%20Ltd.!5e0!3m2!1sen!2sin!4v1756213881615!5m2!1sen!2sin"
          className="h-[360px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

export default memo(ContactSection);
