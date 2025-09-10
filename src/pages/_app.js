// pages/_app.js
import "@/styles/globals.css";
import "@/styles/css/digibima.css";
import Header from "./partial/header";
import Footer from "./partial/footer";
import FooterTwo from "./partial/footertwo";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import PageLoader from "@/layouts/loader";
import { useRouter } from "next/router";
import { PrimeReactProvider } from "primereact/api";
import { UserContext } from "@/context/UserContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleStart = () => setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (loading || pageLoading) {
    return <PageLoader />;
  }

  // 👇 NEW: hide layout ONLY on exact "/admin"
  // (handles trailing slash and ignores query string)
  const pathNoQuery = router.asPath.split("?")[0].replace(/\/+$/, "") || "/";
  const isAdminRoot = pathNoQuery === "/admin";

  return (
    <div className={poppins.className}>
      {/* Header/Footer hidden only on /admin, visible elsewhere */}
      {!isAdminRoot && <Header />}

      <PrimeReactProvider>
        <Toaster />
        <Component {...pageProps} />
      </PrimeReactProvider>

      {/* <Footer /> */}
      {!isAdminRoot && <FooterTwo />}
    </div>
  );
}
