import { useState } from "react";
import Seo from "@/pages/components/seo";
import ContactSection from '@/pages/components/contactuspage/contactsection';
import { CallApi } from "@/api";
import constant from "@/env";
import { showSuccess, showError } from "@/layouts/toaster";

export default function ContactUs() {
  const [resetForm, setResetForm] = useState(false);
 
  const handleContactSubmit = async (data) => {
     console.log(data)
    try {
      const res = await CallApi(constant.API.USER.USERINQUIRE, "POST", data);
      console.log(res)
      if (res.status) {
        showSuccess("We have received your details. Our team will contact you shortly.");
        setResetForm(true);
        setTimeout(() => setResetForm(false), 100);
      } else {
        showError(res.message || "Failed to submit form");
      }
    } catch (err) {
      showError(err.message || "Something went wrong while submitting the form");
    }
  };

  return (
   <>
        <Seo
        title="Digibima Insurance – Health, Life & General Insurance Contact"
        description="Get in touch with Digibima for expert guidance on health, life, and general insurance plans. Contact us via phone, email, or online form for quick support and advice."
      />
    <main className='relative w-full overflow-hidden pt-28 sm:pt-32 md:pt-28'>
      <ContactSection onSubmit={handleContactSubmit} resetTrigger={resetForm} />
    </main></>
  );
}
