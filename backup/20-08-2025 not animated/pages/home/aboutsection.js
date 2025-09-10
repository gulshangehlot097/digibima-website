export default function AboutSection() {
  return (
    <section className="relative bg-[#D9F3FF] py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image with Shapes */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <div className=" w-100 h-100">
            <img
              src="/images/homepage/aboutimg.png"
              alt="About DigiBima"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Get To Know <span className="text-blue-700">Us</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            DigiBima is an Insurance Brokerage/Aggregator and Risk Management
            Company. We offer a wide range of services to help you find the
            right insurance plan for your needs, whether you need to protect
            yourself from the costs of medical bills, or find a way to pay off
            those credit card bills before they become unmanageable.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We work with dozens of insurance carriers, so we can help you get
            the best deal on your policy. If we can’t find what you’re looking
            for in our list of available plans, we’ll do some research and find
            something that works for you—and if we can, we’ll even help you
            design a custom plan just for your needs!
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button className="bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 transition">
              View More
            </button>
            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-sm">
              <div className=" p-2">
                📞
              </div>
              <span className="text-gray-800 font-medium">
                +91 911 917 3733
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
