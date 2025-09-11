"use client";
import Seo from "@/pages/components/seo";
import HeroSection from './home/herosection'
import ContactWithUs from './home/contactwithus'
import AboutUs from './home/aboutsection'
import WhyChooseUs from './home/whychooseus'
import DigibimaCta from './home/digibimacta'
import FaqSection from './home/faqsection'
import OurPartner from './home/insurancepartner'




export default function Main() {
  return (
   <>
   <Seo
        title="DigiBima - Compare & Buy Insurance Online"
        description="Buy Health, Term Life, Motor and Travel Insurance at best prices. Instant quotes, simple process."
      />
   <main className="">
    <HeroSection/>
    <ContactWithUs/>
    <AboutUs/>
    <WhyChooseUs/>
    <DigibimaCta/>
    <FaqSection/>
    <OurPartner/>
</main></>
  );
}
