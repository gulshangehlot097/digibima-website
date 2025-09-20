"use client";
import Seo from "@/pages/components/seo";
import HeroSection from './home/herosection'
import ContactWithUs from './home/contactwithus'
import AboutUs from './home/aboutsection'
import WhyChooseUs from './home/whychooseus'
import DigibimaCta from './home/digibimacta'
import FaqSection from './home/faqsection'
import OurPartner from './home/insurancepartner'
import PerfectPlanSection from './home/contact'
import ConnectWith from '@/pages/components/home/connectwithus' 




export default function Main() {
  return (
      <>
      <Seo
        title="DigiBima - Compare & Buy Insurance Online"
        description="Buy Health, Term Life, Motor and Travel Insurance at best prices. Instant quotes, simple process."
      />
       <main>
      <HeroSection/>
      <PerfectPlanSection/>
      {/* <ContactWithUs/> */}
      <AboutUs/>
      <WhyChooseUs/>
      <ConnectWith/>
      <FaqSection/>
      <OurPartner/>
    </main>
     </>
  );
}
