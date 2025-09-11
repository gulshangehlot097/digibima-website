import Head from "next/head";

export default function Seo({ 
  title = "DigiBima - Your Digital Insurance Partner", 
  description = "Compare and buy Health, Motor, Term Life and other insurance plans easily with DigiBima.", 
  canonical = "https://digibima.com", 
  image = "/images/seo-default.png" 
}) {
  return (
    <Head>
      {/* Page Title */}
      <title>{title}</title>

      {/* Meta Description */}
      <meta name="description" content={description} />

   
      {/* <link rel="canonical" href={canonical} />

     
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />


      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} /> */}
    </Head>
  );
}
