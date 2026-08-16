import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Delivery/Sidebar";
import Navbar from "../../components/Delivery/Navbar";
import { Menu, X } from "lucide-react";

const c = { plum: "#5B3A57", bg: "#FCF8FA" };

const DeliveryLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setSidebarOpen(false); }, [location.pathname]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: c.bg }}>
      {/* Desktop Sidebar */}
      <div className="delivery-sidebar-desktop">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)" }} onClick={() => setSidebarOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ height: "100%" }}>
            <Sidebar />
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Mobile menu button + Navbar */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            display: "none", width: 40, height: 54, alignItems: "center", justifyContent: "center",
            background: "transparent", border: "none", borderRight: "1px solid rgba(91,58,87,0.08)",
            cursor: "pointer", color: c.plum,
          }} className="delivery-menu-btn">
            <Menu size={20} />
          </button>
          <div style={{ flex: 1 }}>
            <Navbar />
          </div>
        </div>

        <main style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (min-width: 1025px) {
          .delivery-sidebar-desktop { display: block; }
        }
        @media (max-width: 1024px) {
          .delivery-sidebar-desktop { display: none; }
          .delivery-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default DeliveryLayout;
