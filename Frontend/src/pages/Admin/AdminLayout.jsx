import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  LogOut,
  Shield,
  Tag,
  Truck,
  ChevronRight,
  BarChart3,
  AlertTriangle,
  CreditCard,
  Building2,
  Wallet,
  Percent,
  Settings,
  TrendingUp,
  Menu,
  X,
  Bell,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";

const colors = {
  sidebarBg: "#111827",
  sidebarHover: "rgba(37,99,235,0.08)",
  sidebarActive: "rgba(37,99,235,0.15)",
  sidebarActiveBorder: "#2563EB",
  sidebarText: "#94A3B8",
  sidebarTextActive: "#FFFFFF",
  blue: "#2563EB",
  cyan: "#06B6D4",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#172033",
  textSecondary: "#64748B",
  border: "#E2E8F0",
  divider: "rgba(0,0,0,0.06)",
};

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState({ Products: true, Orders: true });

  useEffect(() => {
    window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isGroupChildActive = (children) =>
    children.some((child) => location.pathname === child.to.split("?")[0]);

  const navStructure = [
    { type: "link", to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { type: "divider" },
    {
      type: "group",
      label: "Products",
      icon: Package,
      children: [
        { to: "/admin/products", label: "All Products" },
        { to: "/admin/products/add", label: "Add Product" },
        { to: "/admin/categories", label: "Categories" },
        { to: "/admin/inventory", label: "Inventory" },
      ],
    },
    { type: "divider" },
    {
      type: "group",
      label: "Orders",
      icon: ShoppingBag,
      children: [
        { to: "/admin/orders", label: "All Orders" },
        { to: "/admin/orders?status=Pending", label: "Pending" },
        { to: "/admin/orders?status=Preparing", label: "Preparing" },
        { to: "/admin/orders?status=Delivered", label: "Delivered" },
      ],
    },
    { type: "divider" },
    { type: "link", to: "/admin/customers", label: "Customers", icon: Users },
    { type: "link", to: "/admin/delivery-partners", label: "Delivery Partners", icon: Truck },
    { type: "link", to: "/admin/coupons", label: "Offers & Coupons", icon: Tag },
    { type: "link", to: "/admin/users", label: "All Users", icon: Users },
    { type: "divider" },
    { type: "link", to: "/admin/reports", label: "Reports", icon: BarChart3 },
  ];

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Shield size={18} color="white" />
          </div>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
              EatAndMeat
            </div>
            <div style={{ fontSize: "0.6rem", fontWeight: 600, color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Admin Panel
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        {navStructure.map((item, idx) => {
          if (item.type === "divider") {
            return <div key={`d-${idx}`} style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "8px 12px" }} />;
          }

          if (item.type === "link") {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "9px 12px", borderRadius: 8,
                  textDecoration: "none", fontSize: "0.85rem", fontWeight: 500,
                  color: isActive ? colors.sidebarTextActive : colors.sidebarText,
                  background: isActive ? colors.sidebarActive : "transparent",
                  borderLeft: isActive ? `3px solid ${colors.blue}` : "3px solid transparent",
                  transition: "all 0.15s ease",
                  marginBottom: 2,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = colors.sidebarHover;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = "transparent";
                }}
              >
                <item.icon size={17} style={{ opacity: isActive ? 1 : 0.7 }} />
                <span>{item.label}</span>
              </NavLink>
            );
          }

          if (item.type === "group") {
            const isOpen = openGroups[item.label] || isGroupChildActive(item.children);
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleGroup(item.label)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%",
                    padding: "9px 12px", borderRadius: 8, border: "none",
                    background: "transparent", cursor: "pointer",
                    color: colors.sidebarText, fontSize: "0.85rem", fontWeight: 600,
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.sidebarHover; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <item.icon size={17} style={{ opacity: 0.7 }} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  <ChevronRight size={14} style={{
                    opacity: 0.4, transition: "transform 0.2s",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                  }} />
                </button>
                <div style={{
                  maxHeight: isOpen ? 300 : 0, opacity: isOpen ? 1 : 0,
                  overflow: "hidden", transition: "all 0.25s ease",
                  paddingLeft: 18,
                }}>
                  {item.children.map((child) => {
                    const childPath = child.to.split("?")[0];
                    const isActive = location.pathname === childPath;
                    return (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        style={{
                          display: "block", padding: "7px 12px", borderRadius: 6,
                          textDecoration: "none", fontSize: "0.8rem", fontWeight: 500,
                          color: isActive ? colors.sidebarTextActive : colors.sidebarText,
                          background: isActive ? colors.sidebarActive : "transparent",
                          marginBottom: 1, transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) e.currentTarget.style.background = colors.sidebarHover;
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        {child.label}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </nav>

      {/* User + Logout */}
      <div style={{ padding: "12px 10px", borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
          borderRadius: 8, marginBottom: 8, background: "rgba(255,255,255,0.03)",
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700, fontSize: "0.75rem",
          }}>
            {currentUser?.fullName?.charAt(0) || "A"}
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "#fff" }}>
              {currentUser?.fullName || "Admin"}
            </div>
            <div style={{ fontSize: "0.65rem", color: colors.textSecondary }}>
              {currentUser?.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: "flex", alignItems: "center", gap: 8, width: "100%",
            padding: "9px 12px", borderRadius: 8, border: "none",
            background: "rgba(239,68,68,0.06)", color: "#F87171",
            fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: colors.bg, display: "flex", overflow: "hidden", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Desktop Sidebar */}
      <aside style={{
        width: 256, background: colors.sidebarBg, display: "flex", flexDirection: "column",
        flexShrink: 0, borderRight: `1px solid rgba(255,255,255,0.06)`,
      }}
        className="admin-sidebar-desktop"
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.5)" }} onClick={() => setSidebarOpen(false)}>
          <aside style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 272,
            background: colors.sidebarBg, display: "flex", flexDirection: "column",
            boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 12px 0" }}>
              <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", color: colors.textSecondary, cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* Topbar */}
        <header style={{
          background: colors.card, borderBottom: `1px solid ${colors.border}`,
          padding: "0 24px", height: 56, display: "flex", alignItems: "center",
          justifyContent: "space-between", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                display: "none", background: "none", border: "none",
                color: colors.textSecondary, cursor: "pointer", padding: 4,
              }}
              className="admin-menu-btn"
            >
              <Menu size={20} />
            </button>
            <div style={{ position: "relative" }}>
              <Search size={15} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#CBD5E1" }} />
              <input
                type="text"
                placeholder="Search..."
                style={{
                  background: colors.bg, border: `1px solid ${colors.border}`,
                  borderRadius: 8, padding: "7px 12px 7px 34px", fontSize: "0.82rem",
                  color: colors.text, width: 240, outline: "none",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button style={{
              position: "relative", background: colors.bg, border: `1px solid ${colors.border}`,
              borderRadius: 8, width: 36, height: 36, display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer",
              color: colors.textSecondary,
            }}>
              <Bell size={16} />
              <span style={{
                position: "absolute", top: -2, right: -2, width: 8, height: 8,
                borderRadius: "50%", background: "#EF4444",
                border: `2px solid ${colors.card}`,
              }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 10px 4px 4px", borderRadius: 8, border: `1px solid ${colors.border}` }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: "0.7rem",
              }}>
                {currentUser?.fullName?.charAt(0) || "A"}
              </div>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: colors.text }}>
                {currentUser?.fullName || "Admin"}
              </span>
            </div>
          </div>
        </header>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24, background: colors.bg }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
