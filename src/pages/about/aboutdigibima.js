"use client";
import Seo from "@/pages/components/seo";
import AboutUs from '../home/aboutsection'
import InsuranceSection from '@/pages/components/aboutpage/aboutus/insurancesection'
import IrdaiBanner from '@/pages/components/aboutpage/aboutus/irdaibanner'
import DigibimaCta from '@/pages/home/digibimacta'
import WhyChooseUs from '@/pages/home/whychooseus'

export default function AboutDigibima() {
  return (
    <>
         <Seo
        title="About Us | DigiBima"
        description="Learn more about DigiBima – India’s trusted insurance platform. Our mission is to make insurance simple, transparent, and accessible for everyone."
      />
      <main className="relative w-full overflow-hidden pt-28 sm:pt-32 md:pt-28">
        <AboutUs />
        <IrdaiBanner />
        <InsuranceSection />
        
          <DigibimaCta/>
          <WhyChooseUs/>
      </main>
    </>
  );
}


