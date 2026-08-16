import { LayoutDashboard, PackageSearch, Bike, Wallet, User, LogOut, CreditCard } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const c = { plum: "#5B3A57", rose: "#D9829B", softRose: "#F5E6EB", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832" };

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => { await logout(); navigate("/login"); };

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/delivery/dashboard" },
    { name: "Available Orders", icon: PackageSearch, path: "/delivery/available-orders" },
    { name: "My Deliveries", icon: Bike, path: "/delivery/my-deliveries" },
    { name: "Earnings", icon: Wallet, path: "/delivery/earnings" },
    { name: "Withdraw", icon: CreditCard, path: "/delivery/withdraw" },
    { name: "Profile", icon: User, path: "/delivery/profile" },
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

      <nav style={{ flex: 1, padding: "10px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {menus.map((item) => (
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
            <item.icon size={17} /> {item.name}
          </NavLink>
        ))}
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
