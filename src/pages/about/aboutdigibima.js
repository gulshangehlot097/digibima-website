"use client";
import AboutUs from '../home/aboutsection'
import InsuranceSection from '@/pages/components/aboutpage/aboutus/insurancesection'
import IrdaiBanner from '@/pages/components/aboutpage/aboutus/irdaibanner'
import DigibimaCta from '@/pages/home/digibimacta'
import WhyChooseUs from '@/pages/home/whychooseus'

export default function AboutDigibima() {
  return (
    <>
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


