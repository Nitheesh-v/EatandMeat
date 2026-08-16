import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();
  const path = location.pathname;

  // Hide customer Navbar/Footer for dashboard pages
  const isDashboard = path.startsWith("/company") || path.startsWith("/delivery") || path.startsWith("/admin");

  return (
    <>
      {!isDashboard && <Navbar />}

      <main className="min-h-screen">
        <Outlet />
      </main>

      {!isDashboard && <Footer />}
    </>
  );
};

export default MainLayout;
