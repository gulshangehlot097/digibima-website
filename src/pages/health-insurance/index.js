import Link from "next/link";
import Seo from "@/pages/components/seo";
import { HEALTH_PRODUCTS } from "@/data/healthproducts";

export async function getStaticProps() {
  const items = Object.entries(HEALTH_PRODUCTS).map(([slug, d]) => ({
    slug,
    h1: d.h1,
    lead: d.lead,
  }));
  return { props: { items }, revalidate: 3600 };
}

export default function HealthIndex({ items }) {
  return (
    <>
      <Seo
        title="Health Insurance Plans | DigiBima"
        description="Compare Individual, Family, Senior Citizen and Maternity covers."
        canonical="/health-insurance"
      />
      <main className="py-10 md:py-16 ">
        <div className="max-w-screen-xl  pt-28 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Health Insurance
          </h1>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {items.map((it) => (
              <li
                key={it.slug}
                className="rounded-2xl border bg-white p-6 shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-900">{it.h1}</h2>
                <p className="text-sm mt-1 text-justify">{it.lead}</p>
                <Link
                  href={`/health-insurance/${it.slug}`}
                  className="mt-4 inline-block text-emerald-700 font-medium hover:underline"
                >
                  View details →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
