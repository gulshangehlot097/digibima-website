import Link from "next/link";
import Image from "next/image";
import Seo from "@/pages/components/seo";
import FaqSection from "@/pages/components/life-askedquestion/index";
import { MOTOR_PRODUCTS } from "@/data/motorproducts";
import constant from "@/env";
import { useRouter } from "next/router";
import { showSuccess, showError } from "@/layouts/toaster";
import {
  FaCheck,
  FaChevronRight,
  FaArrowRight,
  FaQuestionCircle,
  FaListUl,
  FaShieldAlt,
  FaCar,
  FaClock,
} from "react-icons/fa";

/* -------------------------------------------
 *  SSG
 * ------------------------------------------ */
export async function getStaticPaths() {
  const paths = Object.keys(MOTOR_PRODUCTS).map((p) => ({
    params: { product: p },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = MOTOR_PRODUCTS[params.product] || null;
  if (!data) return { notFound: true };
  const lastUpdated = new Date().toISOString();
  return {
    props: { slug: params.product, data, lastUpdated },
    revalidate: 3600,
  };
}

/* -------------------------------------------
 *  Page (Plain JS)
 * ------------------------------------------ */
export default function MotorProductPage({ slug, data, lastUpdated }) {
     const router = useRouter();
  const canonical = `/motor-insurance/${slug}`;
  const updatedHuman = new Date(lastUpdated).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Motor Insurance", item: "/motor-insurance" },
      { "@type": "ListItem", position: 3, name: data.h1, item: canonical },
    ],
  };

  const faqLd =
    data.faqs?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  const related = Object.entries(MOTOR_PRODUCTS)
    .filter(([s]) => s !== slug)
    .map(([s, d]) => ({ slug: s, h1: d.h1, lead: d.lead }));




  const handleQuoteClick = (e) => {
  const BASE = constant.SOFTWARE_URL; 

  let token = "";
  let userId = "";
  let userName = "";
  let  typeKey="2wheeler"   

  try {
    token = localStorage.getItem("token") || "";
    const raw = localStorage.getItem("dbuser");
    if (raw) {
      const u = JSON.parse(raw);
      userId = String(u?.id ?? u?.user_id ?? u?.userid ?? "").trim();
      userName = String(u?.name ?? u?.full_name ?? u?.username ?? "").trim();
    }
  } catch (err) {
    console.warn("Error reading localStorage:", err);
  }

  if (!token) {
   
     setTimeout(() => {
        router.push(`/login`);
         showError("Please login first");
      }, 200);
    return;
  }

  const qs = new URLSearchParams();
  qs.set("token", token);
  if (userId) qs.set("user_id", userId);
  if (userName) qs.set("user_name", userName);
  qs.set("login_type", "user");
  if (typeKey) qs.set("type", typeKey);

  const url = `${BASE}?${qs.toString()}`;

  window.location.assign(url); 
  };

  return (
    <>
      <Seo title={`${data.h1} | DigiBima`} description={data.lead} canonical={canonical} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      {/* PAGE */}
      <main className="relative w-full pt-24 sm:pt-28 lg:pt-40 overflow-x-hidden">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center text-sm text-gray-500 w-full overflow-x-auto"
          >
            <Link href="/" className="hover:text-emerald-600 transition-colors shrink-0">
              Home
            </Link>
            <FaChevronRight className="mx-2 text-gray-400 shrink-0" />
            <Link href="/motor-insurance" className="hover:text-emerald-600 transition-colors shrink-0">
              Motor Insurance
            </Link>
            <FaChevronRight className="mx-2 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-medium whitespace-nowrap shrink-0">{data.h1}</span>
          </nav>

          {/* HERO */}
          <section className="relative grid gap-8 md:grid-cols-2 items-center rounded-2xl sm:rounded-3xl bg-white border overflow-hidden">
            {/* Left */}
            <div className="p-6 sm:p-10 space-y-6 min-w-0">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight break-words">
                {data.h1}
              </h1>
              <p className="text-base md:text-lg text-gray-600 text-justify break-words">{data.lead}</p>

              {/* Chips from first list section (if available) */}
              {Array.isArray(data.sections) &&
                data.sections[0]?.type === "list" &&
                data.sections[0].items?.length && (
                  <div className="flex flex-wrap gap-3 min-w-0">
                    {data.sections[0].items.slice(0, 3).map((b) => (
                      <span
                        key={b}
                        className="inline-flex items-center gap-2 rounded-full bg-white shadow px-4 py-1.5 text-sm font-medium text-emerald-700 border border-emerald-100"
                      >
                        <FaCheck className="shrink-0" /> {b}
                      </span>
                    ))}
                  </div>
                )}

              {/* CTA */}
              <div className="flex flex-wrap gap-3 pt-2">
              <Link
  href="#"
  onClick={handleQuoteClick}
  prefetch={false}
  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition-transform hover:scale-105"
>
  Get Instant Quote <FaArrowRight className="shrink-0" />
</Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 hover:shadow transition-transform hover:scale-105"
                >
                  Talk to Advisor <FaQuestionCircle className="shrink-0" />
                </Link>
              </div>

              <p className="pt-1 text-xs text-gray-500">Last updated: {updatedHuman}</p>
            </div>

            {/* Right (stable height on small/medium, full on lg+) */}
           {/* Right (hidden on mobile, visible from md+) */}
<div className="relative w-full min-w-0 h-56 sm:h-72 md:h-[360px] lg:h-full hidden md:block" aria-hidden="true">
  <div className="absolute inset-0 bg-emerald-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
  {data.heroImg ? (
    <Image
      src={data.heroImg}
      alt={data.heroAlt || "Motor insurance"}
      fill
      sizes="(min-width:1280px) 50vw, (min-width:768px) 50vw"
      className="object-cover"
      priority
    />
  ) : (
    <div className="absolute inset-0 grid place-items-center bg-emerald-50 text-emerald-700">
      <span className="text-sm">Image coming soon</span>
    </div>
  )}
</div>

          </section>

          {/* Stats */}
          <div className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              { icon: <FaShieldAlt />, t: "Comprehensive Protection" },
              { icon: <FaCar />, t: "Cashless Garage Network" },
              { icon: <FaClock />, t: "Fast Claim Assistance" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white p-5 shadow hover:shadow-xl transition border border-gray-100 min-w-0"
              >
                <div className="flex items-center gap-3 text-emerald-600 text-lg">
                  <div className="rounded-full bg-emerald-50 p-3 shadow-inner shrink-0">{s.icon}</div>
                  <span className="font-semibold text-gray-800 break-words">{s.t}</span>
                </div>
              </div>
            ))}
          </div>

          {/* MAIN GRID: single column on mobile/tablets; 2 columns only on lg+ */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_320px]">
            {/* Content */}
            <div className="min-w-0">
              {/* TOC */}
              {data.sections?.length ? (
                <div className="w-full overflow-x-auto">
                  <div className="flex gap-3 pb-2 min-w-max">
                    {data.sections.map((s) => (
                      <Link
                        key={s.id}
                        href={`#${s.id}`}
                        className="whitespace-nowrap rounded-full border px-4 py-1.5 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Key Details */}
              {data.eligibilityTable?.length ? (
                <section id="key-details" className="mt-12 scroll-mt-24 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 break-words">Key Details</h2>
                  <div className="mt-2 h-1 w-16 rounded bg-emerald-500"></div>
                  <div className="mt-6 overflow-x-auto rounded-xl border">
                    <table className="w-full border-collapse text-sm bg-white">
                      <tbody className="divide-y">
                        {data.eligibilityTable.map(([k, v]) => (
                          <tr key={k} className="hover:bg-gray-50/60 align-top">
                            <th className="text-left p-4 w-full sm:w-1/3 bg-emerald-50 font-medium text-gray-700">
                              {k}
                            </th>
                            <td className="p-4 text-gray-700">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null}

              {/* Sections */}
              {data.sections?.map((s, idx) => (
                <section id={s.id} key={s.id} className="mt-12 scroll-mt-24">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-semibold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-gray-900 break-words">{s.title}</h2>
                      <div className="mt-1 h-1 w-16 rounded bg-emerald-500" />
                    </div>
                  </div>

                  {s.type === "text" && (
                    <p className="mt-5 max-w-3xl leading-relaxed text-gray-700">{s.text}</p>
                  )}

                  {s.type === "list" && Array.isArray(s.items) && s.items.length > 0 && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {s.items.map((item, i) => (
                        <div
                          key={`${s.id}-${i}`}
                          className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                              <FaCheck />
                            </span>
                            <p className="text-gray-800 text-justify">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* FAQs */}
              <section id="faqs" className="scroll-mt-24">
                <FaqSection faqs={data.faqs || []} />
              </section>

              {/* CTA ribbon */}
              <div className="mt-14 rounded-3xl border bg-gradient-to-r from-emerald-50 to-white p-6 md:p-8 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 break-words">Drive with confidence</h3>
                    <p className="text-gray-600 break-words">Compare premiums, add-ons, and get instant policy.</p>
                  </div>
                <div className="flex gap-3 ">
                   <Link
  href="#"
  onClick={handleQuoteClick}
  prefetch={false}
  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white font-semibold shadow hover:bg-emerald-700 whitespace-nowrap"
>
  Get Quote <FaArrowRight className="shrink-0" />
</Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                    >
                      Talk to Advisor <FaQuestionCircle className="shrink-0" />
                    </Link>
                  </div>

                </div>
              </div>

              {/* Related */}
              {related.length ? (
                <section id="related" className="mt-12 scroll-mt-24 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900">Related Motor Plans</h2>
                  <div className="mt-2 h-1 w-16 rounded bg-emerald-500"></div>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {related.map((it) => (
                      <li
                        key={it.slug}
                        className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition"
                      >
                        <h3 className="font-semibold text-gray-800">{it.h1}</h3>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{it.lead}</p>
                        <Link
                          href={`/motor-insurance/${it.slug}`}
                          className="mt-3 inline-flex items-center gap-2 text-emerald-700 hover:underline"
                        >
                          View details <FaArrowRight />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <p className="mt-10 text-xs text-gray-500 mb-5">
                *Information is generic and for education. Features vary by insurer & policy terms. Please read the sales
                brochure carefully.
              </p>
            </div>

            {/* Sidebar (desktop+ only) */}
            <aside className="hidden lg:block lg:sticky lg:top-28 xl:top-32 h-max min-w-0 z-20 mb-5 max-h-[calc(100vh-8rem)] overflow-auto">
              <div className="rounded-2xl border bg-white/80 p-6 shadow-lg backdrop-blur">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaListUl className="shrink-0" /> Quick Links
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {data.eligibilityTable?.length ? (
                    <li>
                      <Link href="#key-details" className="inline-flex items-center gap-2 text-gray-700 hover:text-emerald-600">
                        <FaChevronRight className="shrink-0" /> Key Details
                      </Link>
                    </li>
                  ) : null}

                  {data.sections?.map((s) => (
                    <li key={s.id}>
                      <Link href={`#${s.id}`} className="inline-flex items-center gap-2 text-gray-700 hover:text-emerald-600">
                        <FaChevronRight className="shrink-0" /> <span className="break-words">{s.title}</span>
                      </Link>
                    </li>
                  ))}

                  {data.faqs?.length ? (
                    <li>
                      <Link href="#faqs" className="inline-flex items-center gap-2 text-gray-700 hover:text-emerald-600">
                        <FaChevronRight className="shrink-0" /> FAQs
                      </Link>
                    </li>
                  ) : null}

                  {related.length ? (
                    <li>
                      <Link href="#related" className="inline-flex items-center gap-2 text-gray-700 hover:text-emerald-600">
                        <FaChevronRight className="shrink-0" /> Related Plans
                      </Link>
                    </li>
                  ) : null}
                </ul>

                <div className="mt-6 grid gap-3">
                 <Link
  href="#"
  onClick={handleQuoteClick}
  prefetch={false}
  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white font-semibold shadow hover:bg-emerald-700"
>
  Get Quote <FaArrowRight className="shrink-0" />
</Link>

                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Advisor <FaQuestionCircle className="shrink-0" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Sticky mobile CTA with iOS safe-area */}
      <div className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 md:hidden pointer-events-none">
        <div className="flex gap-2 rounded-2xl border bg-white/95 p-2 shadow-lg backdrop-blur pointer-events-auto">
          <Link
  href="#"
  onClick={handleQuoteClick}
  prefetch={false}
  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-white"
>
  Get Quote <FaArrowRight />
</Link>

          <Link
            href="/contact"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-gray-700"
          >
            Advisor <FaQuestionCircle />
          </Link>
        </div>
      </div>
    </>
  );
}
