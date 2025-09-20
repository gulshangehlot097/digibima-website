import {  useState} from "react";
import { FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
export default function FaqSection({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  // normalize props
  const normalizedFaqs = faqs.map((f) => ({
    question: f.question || f.q,
    answer: f.answer || f.a,
  }));

  const toggleIndex = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-[#C3ECFE] py-16 px-4">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Frequently Asked <span className="text-[#0c4c8d]">Questions</span>
        </h2>
        <p className="text-base md:text-lg text-gray-600">
          We are here to help you do your job so that we can help you get the
          most out of your time.
        </p>
      </div>

      <div className="">
        <div className="md:col-span-2 space-y-4">
          {normalizedFaqs.map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-md shadow-sm overflow-hidden transition-all"
            >
              <div className="bg-white">
                <button
                  onClick={() => toggleIndex(i)}
                  className="w-full px-6 py-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-8 h-8 bg-[#0c4c8d] text-white font-bold text-sm flex items-center justify-center rounded-full shadow-md">
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
              </div>

              <AnimatePresence initial={false}>
                {activeIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-6 text-base text-gray-700  text-justify overflow-hidden"
                  >
                    <div className="pt-2 pb-4" style={{ whiteSpace: "pre-line" }}>{item.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
