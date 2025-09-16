import Link from "next/link";
import Seo from "@/pages/components/seo";
import { MOTOR_PRODUCTS } from "@/data/motorproducts";

export async function getStaticProps() {
  const items = Object.entries(MOTOR_PRODUCTS).map(([slug, d]) => ({
    slug,
    h1: d.h1,
    lead: d.lead,
  }));
  return { props: { items }, revalidate: 3600 };
}

export default function MotorIndex({ items }) {
  return (
    <>
      <Seo
        title="Motor Insurance | DigiBima"
        description="Compare 2 Wheeler and 4 Wheeler insurance—comprehensive, third-party and add-ons."
        canonical="/motor-insurance"
      />
      <main className=" py-10 md:py-16 ">
        <div className="max-w-screen-xl  pt-28 mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">Motor Insurance</h1>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((it) => (
            <li
              key={it.slug}
              className="rounded-2xl border bg-white p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{it.h1}</h2>
              <p className="text-sm mt-1">{it.lead}</p>
              <Link
                href={`/motor-insurance/${it.slug}`}
                className="mt-3 inline-block text-emerald-700"
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
