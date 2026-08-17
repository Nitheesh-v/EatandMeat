import {
  LayoutDashboard,
  PackageSearch,
  Bike,
  Wallet,
  User,
  LogOut,
  CreditCard,
  Bell,
  Headphones,
  Settings,
  History,
  FileText,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import { getUnreadCount } from "../../services/notificationService";

const c = { plum: "#5B3A57", rose: "#D9829B", softRose: "#F5E6EB", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832" };

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const handleLogout = async () => { await logout(); navigate("/login"); };

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await getUnreadCount();
        if (res.success) setUnreadCount(res.unreadCount);
      } catch (err) { /* silent */ }
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/delivery/dashboard" },
    { name: "Available Orders", icon: PackageSearch, path: "/delivery/available-orders" },
    { name: "My Deliveries", icon: Bike, path: "/delivery/my-deliveries" },
    { name: "Order Details", icon: FileText, path: "/delivery/order-details", badge: null },
    { name: "Earnings", icon: Wallet, path: "/delivery/earnings" },
    { name: "Wallet & Payments", icon: CreditCard, path: "/delivery/wallet" },
    { name: "Delivery History", icon: History, path: "/delivery/history" },
    { name: "Withdraw", icon: CreditCard, path: "/delivery/withdraw" },
    { name: "Notifications", icon: Bell, path: "/delivery/notifications", badge: unreadCount },
    { name: "Support", icon: Headphones, path: "/delivery/support" },
    { name: "Profile", icon: User, path: "/delivery/profile" },
    { name: "Settings", icon: Settings, path: "/delivery/settings" },
  ];

  return (
    <aside style={{
      width: 240, minHeight: "100vh", display: "flex", flexDirection: "column",
      background: `linear-gradient(180deg, #FFFFFF 0%, ${c.softRose} 100%)`,
      borderRight: `1px solid rgba(91,58,87,0.1)`, flexShrink: 0,
    }} className="delivery-sidebar">
      <div style={{ height: 3, background: `linear-gradient(90deg, ${c.plum}, ${c.rose}, ${c.champagne})` }} />

      <div style={{ padding: "18px 16px", borderBottom: `1px solid rgba(91,58,87,0.06)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "0.75rem", fontWeight: 800 }}>E</span>
          </div>
          <span style={{ fontSize: "1rem", fontWeight: 800 }}>
            <span style={{ color: c.text }}>Eat</span><span style={{ color: c.plum }}>And</span><span style={{ color: c.rose }}>Meat</span>
          </span>
        </div>
      </div>

      <div style={{ padding: "12px 14px", borderBottom: `1px solid rgba(91,58,87,0.06)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.8rem" }}>
            {currentUser?.fullName?.charAt(0) || "D"}
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: c.text }}>{currentUser?.fullName}</div>
            <div style={{ fontSize: "0.65rem", color: c.plum, fontWeight: 600 }}>Delivery Partner</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {menus.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path} style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 8,
              textDecoration: "none", fontSize: "0.82rem", fontWeight: 500, transition: "all 0.15s",
              color: isActive ? "#FFFFFF" : "#6B5A65",
              background: isActive ? `linear-gradient(135deg, ${c.plum}, ${c.rose})` : "transparent",
              boxShadow: isActive ? `0 4px 12px ${c.plum}30` : "none",
            })}
              onMouseEnter={(e) => { if (!e.currentTarget.classList.contains("active")) { e.currentTarget.style.background = "rgba(91,58,87,0.06)"; e.currentTarget.style.color = c.text; } }}
              onMouseLeave={(e) => { if (!e.currentTarget.classList.contains("active")) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6B5A65"; } }}
            >
              <div style={{ position: "relative" }}>
                <Icon size={17} />
                {item.badge > 0 && (
                  <span style={{
                    position: "absolute", top: -6, right: -8, minWidth: 16, height: 16,
                    borderRadius: 8, background: "#DC2626", color: "white", fontSize: "0.6rem",
                    fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "0 4px",
                  }}>
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </div>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div style={{ padding: "10px 8px", borderTop: `1px solid rgba(91,58,87,0.06)` }}>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "9px 12px",
          borderRadius: 8, border: "none", background: "rgba(220,38,38,0.06)", color: "#DC2626",
          fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.12)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.06)"; }}
        ><LogOut size={16} /> Logout</button>
      </div>

      <style>{`
        @media (max-width: 1024px) { .delivery-sidebar { width: 64px !important; } .delivery-sidebar span:not(.dot) { display: none; } }
      `}</style>
    </aside>
  );
};

export default Sidebar;
