import {
  FaHandHoldingHeart,
  FaUsers,
  FaClock,
  FaShieldAlt,
  FaLaptopCode,
  FaUserCog,
  FaHands,
} from "react-icons/fa";

export default function WhyChooseUsSection() {
  const featuresLeft = [
    {
      title: "Extensive Knowledge",
      desc: "Foresee the pain trouble all that rationally encounter",
      icon: <FaHandHoldingHeart className="text-xl" />,
    },
    {
      title: "Team Approach",
      desc: "How all this mistaken idea any denouncing pleasure",
      icon: <FaUsers className="text-xl" />,
    },
    {
      title: "Time Savings",
      desc: "Actual teachings of the great it explorer of the truth",
      icon: <FaClock className="text-xl" />,
    },
  ];

  const featuresRight = [
    {
      title: "Risk Management",
      desc: "One rejects, dislikes, or avoids pleasure all itself",
      icon: <FaShieldAlt className="text-xl" />,
    },
    {
      title: "Advanced Tech",
      desc: "Rationally encounter that are consequences extremely",
      icon: <FaLaptopCode className="text-xl" />,
    },
    {
      title: "Customized Advice",
      desc: "How all this mistaken idea of denouncing pleasure",
      icon: <FaUserCog className="text-xl" />,
    },
  ];

  const Card = ({ title, desc, shift = "", side, icon }) => (
    <div
      className={`relative w-full
        max-w-full sm:max-w-[360px] md:max-w-[420px] lg:max-w-[280px]
        mb-6 md:mb-8 ${shift}`}
    >
      <div
        className={`flex bg-white shadow-md rounded-2xl border relative overflow-visible
          ${side === "left" ? "rounded-br-none" : ""}
          ${side === "right" ? "rounded-bl-none" : ""}
        `}
      >
        <div
          className={`absolute top-[-10px] md:top-[-16px] ${
            side === "left" ? "-right-4 md:-right-6 rounded-br-none" : "-left-4 md:-left-6"
          }`}
        >
          <div className={`bg-[#31A8D8] p-3 md:p-3 rounded-2xl flex items-center justify-center shadow-md ${
    side === "left" ? "rounded-br-none rounded-tl-none" : "rounded-bl-none rounded-tr-none"
  }`}>
            <span className="text-white p-2 py-3 text-lg md:text-xl">
              {icon || <FaHands />}
            </span>
          </div>
        </div>

        <div
          className={`p-4 ${
            side === "left" ? "pr-12 md:pr-14" : "pl-12 md:pl-14"
          } text-left`}
        >
          <h3 className="text-base md:text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <p className="text-sm md:text-[15px] text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  );
return (
  <section
    className="relative bg-white py-16 md:py-20 lg:py-24 px-4  bg-no-repeat bg-cover bg-center"
    style={{ backgroundImage: "url('/images/homepage/whychoosebgimg.jpg')" }}
  >
    {/* overlay */}
    <div className="absolute inset-0 pointer-events-none bg-white/90 md:bg-white/90"></div>
    {/* or gradient: 
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/90 via-white/60 to-white/90" />
    */}

    {/* content sits above overlay */}
    <div className="relative z-10">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-xs md:text-sm text-purple-600 font-semibold uppercase mb-1">
          Why Choose Us
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Reasons to Choose Counsolve
        </h2>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left cards */}
        <div className="flex flex-col justify-between items-center lg:items-end w-full lg:w-1/3 gap-6">
          {featuresLeft.map((item, idx) => (
            <Card
              key={idx}
              {...item}
              side="left"
              shift={idx === 1 ? "lg:-translate-x-6" : "lg:translate-x-4"}
            />
          ))}
        </div>

        {/* Center Image */}
        <div className="w-full lg:w-1/3 flex justify-center">
          <img
            src="/images/homepage/whychoose.png"
            alt="Center People"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] object-cover"
            loading="lazy"
          />
        </div>

        {/* Right cards */}
        <div className="flex flex-col justify-between items-center lg:items-start w-full lg:w-1/3 gap-6">
          {featuresRight.map((item, idx) => (
            <Card
              key={idx}
              {...item}
              side="right"
              shift={idx === 1 ? "lg:translate-x-6" : "lg:-translate-x-6"}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

}
