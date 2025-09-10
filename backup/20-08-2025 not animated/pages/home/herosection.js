import React, { isValidElement, cloneElement } from "react";
import Link from "next/link";

export default function InsuranceCategoriesSection({
  items = defaultItems,
  onCardClick,
  bgImage = "/images/homepage/herosectionimg.jpg",
  title = "Your Digital Insurance Partner",
  subtitle = "Buy The Best Insurance Plan",
}) {

  const CardInner = (card) => (
    <>
      {card.badge && (
        <span
          className={`absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center justify-center gap-1
                      rounded-full px-3 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wide shadow-sm
                      ${badgeTheme(card.badgeTheme)}`}
        >
          {renderNodeOrImage(card.badgeIcon, "h-3 w-3 sm:h-3.5 sm:w-3.5")}
          <span className="whitespace-nowrap leading-none">{card.badge}</span>
        </span>
      )}

      <div
        className="
          mx-auto rounded-2xl 
          flex items-center justify-center overflow-hidden
          h-16 w-16        
          sm:h-20 sm:w-20
          md:h-20 md:w-20
          lg:h-20 lg:w-20
        "
      >
        {renderNodeOrImage(
          card.icon,
          "h-full w-full object-contain drop-shadow-sm select-none [image-rendering:crisp-edges] [image-rendering:-webkit-optimize-contrast]"
        ) ?? <span className="text-3xl sm:text-4xl">🛡️</span>}
      </div>

      <div className="mt-2 sm:mt-3 text-center">
        <div className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-slate-900 leading-snug">
          {card.title}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl group-hover:ring-2 group-hover:ring-blue-300/50 group-hover:shadow-[0_10px_25px_rgba(30,58,138,0.12)] transition-all" />
    </>
  );

  return (
    <section className="relative w-full overflow-hidden pt-28 sm:pt-32 md:pt-36">
      <div
        className="absolute inset-0 -z-20 bg-center bg-cover [image-rendering:-webkit-optimize-contrast]"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-white/70 backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute -inset-x-20 -top-24 -bottom-24 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)]" />

      <div className="mx-auto w-full max-w-[120rem] px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex justify-center px-2">
          <div className="w-full md:w-3/4 lg:w-2/3 rounded-[48px] bg-[#1e3a8a] text-white px-8 sm:px-10 py-5">
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-2 leading-tight">
              {title}
            </h2>
            <p className="mt-1 text-center greentext text-xl sm:text-xl leading-snug">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-12">
          <div
            className="
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
              gap-3 sm:gap-4 md:gap-6
              px-2 sm:px-4 md:px-16 mb-10
              max-sm:[display:grid] max-sm:[grid-auto-flow:column] max-sm:[grid-auto-columns:70%]
              max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory
              max-sm:scroll-px-4 max-sm:px-2
              max-sm:[scrollbar-width:none] max-sm:[-ms-overflow-style:none]
            "
          >
            {items.map((card) => {
              const classCard =
                "relative group rounded-2xl bg-white/95 p-2.5 sm:p-3 md:p-4 shadow-sm ring-1 ring-black/5 transition-all duration-200 text-left focus:outline-none hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 backdrop-blur-sm max-sm:snap-center";
              const handleCardClick = () => onCardClick?.(card);

              if (card.link) {
                return (
                  <Link
                    key={card.title}
                    href={card.link}
                    onClick={handleCardClick}
                    aria-label={card.title}
                    className={classCard}
                    prefetch
                  >
                    {CardInner(card)}
                  </Link>
                );
              }

              return (
                <button
                  key={card.title}
                  type="button"
                  onClick={handleCardClick}
                  className={classCard}
                  aria-label={card.title}
                >
                  {CardInner(card)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function renderNodeOrImage(nodeOrType, className) {
  if (!nodeOrType) return null;

  // Image URL
  if (typeof nodeOrType === "string") {
    return (
      <img
        src={nodeOrType}
        alt=""
        className={className}
        loading="lazy"
        decoding="async"
        draggable={false}
        fetchPriority="low"
      />
    );
  }

  if (isValidElement(nodeOrType)) {
    return cloneElement(nodeOrType, {
      className: [nodeOrType.props?.className, className]
        .filter(Boolean)
        .join(" "),
      draggable: false,
      focusable: false,
      "aria-hidden": true,
    });
  }

  const Comp = nodeOrType;
  try {
    return (
      <Comp
        className={className}
        draggable={false}
        focusable={false}
        aria-hidden
      />
    );
  } catch {
    return null;
  }
}

function badgeTheme(theme) {
  switch (theme) {
    case "pink": 
      return "bg-[#EEC9F3] text-[#6D2B7D]";
    case "yellow":
      return "bg-[#FFE79A] text-[#6B5400]";
    case "green": 
      return "bg-[#BFEAC4] text-[#105C2F]";
    default:
      return "bg-slate-100 text-slate-700";
  }
}


const defaultItems = [
  {
    title: "Health",
    badge: "POPULAR",
    badgeTheme: "pink",
    icon: "/images/homepage/health.png",
    badgeIcon: "/icons/star.png",
    link: "/insurance/health",
  },
  {
    title: "Term Life",
    icon: "/images/homepage/health.png",
    link: "/insurance/term-life",
  },
  {
    title: "2 Wheeler",
    badge: "SPECIAL OFFERS",
    badgeTheme: "yellow",
    icon: "/images/homepage/bike.png",
    link: "/insurance/two-wheeler",
  },
  {
    title: "4 Wheeler",
    icon: "/images/homepage/car.png",
    link: "/insurance/four-wheeler",
  },
  {
    title: "Travel",
    badge: "SAVINGS",
    badgeTheme: "green",
    icon: "/images/homepage/commercial.png",
    link: "/insurance/travel",
  },
  {
    title: "Others",
    icon: "/images/health/health-two.png",
    link: "/insurance/others",
  },
];
