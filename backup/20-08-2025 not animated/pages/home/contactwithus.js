export default function ContactSection() {
  return (
    <section className="relative bg-[#1f4c7d] py-10 px-4 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-evenly max-w-6xl w-full text-center md:text-left">
        
        {/* Text */}
        <div>
          <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">
            We make sure to protect you from any uncertainty
          </h2>
          <p className="text-base greentext text-right">
            Get in touch with us, we’ll be pleased to assist you!
          </p>
        </div>

        {/* Button */}
        <div className="mt-6 md:mt-0">
          <button className="px-6 py-3 border border-white rounded-md text-white font-medium hover:bg-white hover:text-[#1f4c7d] transition">
            CONNECT WITH US
          </button>
        </div>
      </div>
    </section>
  );
}
