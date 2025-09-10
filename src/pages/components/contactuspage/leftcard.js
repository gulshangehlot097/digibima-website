"use client";
import Image from "next/image";
import { memo } from "react";

function LeftContactCard() {
  return (
    <main className="min-h-screen w-full  flex items-center justify-center p-4">
      <section className="">
        {/* Illustration */}
        <div className="w-full relative">
          <Image
            src="/images/contactus/imgone.png"
            alt="Support Illustration"
            width={800}
            height={500}
            className="object-contain p-4"
            priority
          />
        </div>
      </section>
    </main>
  );
}

export default memo(LeftContactCard);
