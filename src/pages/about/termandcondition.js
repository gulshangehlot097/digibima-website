"use client";
import Seo from "@/pages/components/seo";
import TermsAndConditions from '@/pages/components/aboutpage/terms&condition/termsection'


export default function TermsAndCondition() {
  return (
    <>
         <Seo
        title="Terms & Conditions | DigiBima"
        description="Review DigiBima’s terms and conditions to understand the rules, responsibilities, and guidelines for using our insurance services and website."
      />
      <main className="relative w-full overflow-hidden pt-28 sm:pt-32 md:pt-28">
       <TermsAndConditions />
      </main>
    </>
  );
}