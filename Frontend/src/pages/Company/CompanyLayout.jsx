import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, ShoppingBag, ChefHat, PackageCheck,
  Bike, BarChart3, LogOut, Flame, Menu, X, Bell,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const c = {
  sidebar: "#2B1B14",
  sidebarHover: "rgba(100,31,40,0.12)",
  sidebarActive: "rgba(100,31,40,0.2)",
  red: "#641F28",
  gold: "#C9A227",
  bg: "#F6F3EF",
  card: "#FFFFFF",
  text: "#2B1B14",
  textSec: "#8B7355",
  border: "#E2D5C8",
};

const navItems = [
  { to: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/company/orders", label: "Orders", icon: ShoppingBag },
  { to: "/company/preparing", label: "Preparing", icon: ChefHat },
  { to: "/company/packed", label: "Packed", icon: PackageCheck },
  { to: "/company/delivery-partners", label: "Delivery Partners", icon: Bike },
  { to: "/company/reports", label: "Reports", icon: BarChart3 },
];

const CompanyLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); setSidebarOpen(false); }, [location.pathname]);

  const handleLogout = async () => { await logout(); navigate("/login"); };

  const SidebarContent = () => (
    <>
      <div style={{ padding: "20px 18px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg, ${c.red}, ${c.gold})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Flame size={16} color="white" />
          </div>
          <span style={{ fontSize: "1rem", fontWeight: 800, color: "#fff" }}>
            EatAnd<span style={{ color: c.red }}>Meat</span>
          </span>
        </Link>
      </div>

      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8,
              textDecoration: "none", fontSize: "0.85rem", fontWeight: 500,
              color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.5)",
              background: isActive ? c.sidebarActive : "transparent",
              borderLeft: isActive ? `3px solid ${c.red}` : "3px solid transparent",
              transition: "all 0.15s", marginBottom: 2,
            }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = c.sidebarHover; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <item.icon size={17} style={{ opacity: isActive ? 1 : 0.6 }} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, marginBottom: 8, background: "rgba(255,255,255,0.03)" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${c.red}, ${c.gold})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.75rem" }}>
            {currentUser?.fullName?.charAt(0) || "C"}
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#fff" }}>{currentUser?.fullName || "Company"}</div>
            <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{currentUser?.email}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px",
          borderRadius: 8, border: "none", background: "rgba(239,68,68,0.08)", color: "#FCA5A5",
          fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: c.bg, display: "flex", overflow: "hidden", fontFamily: "'Inter', sans-serif" }}>
      <aside style={{ width: 240, background: c.sidebar, display: "flex", flexDirection: "column", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.06)" }} className="company-sidebar">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.4)" }} onClick={() => setSidebarOpen(false)}>
          <aside style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 260, background: c.sidebar, display: "flex", flexDirection: "column", boxShadow: "4px 0 20px rgba(0,0,0,0.3)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: 12 }}>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}><X size={18} /></button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <header style={{ background: c.card, borderBottom: `1px solid ${c.border}`, padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSidebarOpen(true)} style={{ display: "none", background: "none", border: "none", color: c.textSec, cursor: "pointer", padding: 4 }} className="company-menu-btn"><Menu size={20} /></button>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: c.text, margin: 0 }}>Company Dashboard</h2>
              <p style={{ fontSize: "0.72rem", color: c.textSec, margin: 0 }}>Manage orders and operations</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", fontSize: "0.75rem", fontWeight: 600, color: "#16A34A" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }} /> Store Open
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px 4px 4px", borderRadius: 8, border: `1px solid ${c.border}` }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: `linear-gradient(135deg, ${c.red}, ${c.gold})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.7rem" }}>
                {currentUser?.fullName?.charAt(0) || "C"}
              </div>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: c.text }}>{currentUser?.fullName || "Company"}</span>
            </div>
          </div>
        </header>
        <div style={{ flex: 1, overflowY: "auto", padding: 24, background: c.bg }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .company-sidebar { display: none !important; } .company-menu-btn { display: flex !important; } }
      `}</style>
    </div>
  );
};

export default CompanyLayout;
