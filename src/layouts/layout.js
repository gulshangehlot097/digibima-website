// src/layouts/Layout.js
import Header from "@/pages/partial/header";
import FooterTwo from "@/pages/partial/footertwo";
// import Footer from "@/pages/partial/footer"; // agar kabhi chahiye

export default function Layout({ children, isAdminRoot }) {
  return (
    <>
      {!isAdminRoot && <Header />}
      <main>{children}</main>
      {!isAdminRoot && <FooterTwo />}
    </>
  );
}
