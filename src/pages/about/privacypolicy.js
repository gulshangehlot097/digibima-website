"use client";
import Seo from "@/pages/components/seo";
import Page from '@/pages/components/aboutpage/privacypolicy/section'


export default function PrivacyPolicy() {
  return (
    <>
         <Seo
        title="Privacy Policy | DigiBima"
        description="Read DigiBima’s privacy policy to learn how we collect, use, and protect your personal information while providing trusted insurance services."
      />
      <main className="relative w-full overflow-hidden pt-28 sm:pt-32 md:pt-28">
       <Page />
      </main>
    </>
  );
}