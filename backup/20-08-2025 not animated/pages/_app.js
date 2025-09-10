// pages/_app.js
// import '@mui/x-data-grid/index.css';
import "@/styles/globals.css";
import "@/styles/css/digibima.css";
import Header from "./partial/header";
import Footer from "./partial/footer";
import { Toaster } from "react-hot-toast";
import { useState, useEffect, React } from "react";
import { Poppins } from "next/font/google";
// import HealthInsuranceLoader from "./health/loader";

import { useRouter } from "next/router";
import { VerifyToken } from "../api";
import constant from "../env";
import { CallApi, getUserinfo } from "../api";
import { PrimeReactProvider } from "primereact/api";
import { UserContext } from "@/context/UserContext";
import { showError } from "@/layouts/toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"], // optional
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  return (
  <div className={poppins.className}>

      <Header
        
        
      />



   
        <>
          < PrimeReactProvider />
          <Toaster />
        
          <Component  />
         
            <Footer />
        </>

    </div>
  );
}

