import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";

export default function FaqSection() {
  const faqs = [
    {
      question: "What kind of insurance policies does DigiBima offer?",
      answer:
        "DigiBima offers Life Insurance, Health Insurance & General Insurance.",
    },
    {
      question: "What are the tax benefits on insurance?",
      answer:
        "There are various tax benefits for different insurance. As an illustration, Life Insurance is essential to tax planning. According to the Income Tax Act of 1961, by purchasing a life insurance plan, you are eligible to deduct certain expenses from your taxable income.",
    },
    {
      question: "What are the factors to consider before buying a life insurance policy?",
      answer:
        "Key factors include your age, stage of life, policy premium vs. coverage ratio, insurer's background, claim settlement ratio, and reading inclusions/exclusions clearly. Choose wisely as it’s a long-term decision.",
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-[#D9F3FF] py-16 px-4">
     <div className="text-center mb-10 max-w-3xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
    Frequently Asked Questions
  </h2>
  <p className="text-base md:text-lg text-gray-600">
    We are here to help you do your job so that we can help you get the most out of your time.
  </p>
</div>


      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Sidebar */}
        <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Any Questions?</h2>
          <p className="text-base text-gray-600 leading-relaxed mb-6">
            Do you have any inquiries about your insurance policy? Whether you're looking for short-term protection, long-term security, or a balanced mix, we’re here to guide you. Reach out now to explore your options!
          </p>

          <div className="border-t pt-4">
            <div className="flex items-start gap-3 text-base text-gray-700">
              <div className="bg-red-100 p-2 rounded-full shadow-sm">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 14h.01M16 10h.01M12 6h0M12 18h0"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-800">What You Need?</p>
                <a href="#" className="text-red-600 underline hover:text-red-700 transition">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="md:col-span-2 space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-md shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleIndex(i)}
                className="w-full px-6 py-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-sm flex items-center justify-center rounded-full shadow-md">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <p className="text-base text-gray-800 font-medium">
                    {item.question}
                  </p>
                </div>
                <FaChevronUp
                  className={`text-gray-500 transition-transform duration-300 ${
                    activeIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Animated Answer Section */}
              <div
                className={`px-6 text-base text-gray-700 overflow-hidden transition-all duration-300 ${
                  activeIndex === i ? "max-h-60 pb-4" : "max-h-0"
                }`}
              >
                <div className="pt-2">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
