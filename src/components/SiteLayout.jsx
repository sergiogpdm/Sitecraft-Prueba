import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import FloatingOrderButton from "./FloatingOrderButton.jsx";

export default function SiteLayout() {
  return (
    <div className="min-h-full">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      <FloatingOrderButton />
    </div>
  );
}
