import {
  LayoutDashboard,
  PackageSearch,
  Bike,
  Wallet,
  User,
  LogOut,
  CreditCard,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const menus = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/delivery/dashboard" },
    { name: "Available Orders", icon: PackageSearch, path: "/delivery/available-orders" },
    { name: "My Deliveries", icon: Bike, path: "/delivery/my-deliveries" },
    { name: "Earnings", icon: Wallet, path: "/delivery/earnings" },
    { name: "Withdraw", icon: CreditCard, path: "/delivery/withdraw" },
    { name: "Profile", icon: User, path: "/delivery/profile" },
  ];

  return (
    <aside
      className="w-64 min-h-screen flex flex-col relative"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #FCF8FA 100%)",
        borderRight: "1px solid rgba(91,58,87,0.1)",
        boxShadow: "2px 0 20px rgba(91,58,87,0.05)",
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #5B3A57, #D9829B, #D9829B)" }} />

      {/* Logo */}
      <div
        className="h-20 flex items-center justify-center gap-2"
        style={{ borderBottom: "1px solid rgba(91,58,87,0.08)" }}
      >
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: "linear-gradient(135deg, #5B3A57, #D9829B)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(91,58,87,0.25)",
        }}>
          <span style={{ color: "white", fontSize: "0.85rem", fontWeight: 800 }}>E</span>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight">
          <span style={{ color: "#352832" }}>Eat</span>
          <span style={{ color: "#5B3A57" }}>And</span>
          <span style={{ color: "#D9829B" }}>Meat</span>
        </h2>
      </div>

      {/* Partner info */}
      <div className="p-4" style={{ borderBottom: "1px solid rgba(91,58,87,0.06)" }}>
        <div className="flex items-center gap-3">
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "linear-gradient(135deg, #5B3A57, #D9829B)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700, fontSize: "0.9rem",
            boxShadow: "0 4px 12px rgba(91,58,87,0.2)",
          }}>
            {currentUser?.fullName?.charAt(0) || "D"}
          </div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: "#352832" }}>
              {currentUser?.fullName}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "#5B3A57" }}>
              Delivery Partner
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold"
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "#6B5A65",
              background: isActive
                ? "linear-gradient(135deg, #5B3A57, #D9829B)"
                : "transparent",
              boxShadow: isActive ? "0 4px 15px rgba(91,58,87,0.25)" : "none",
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.background = "rgba(91,58,87,0.06)";
                e.currentTarget.style.color = "#352832";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#6B5A65";
              }
            }}
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer"
          style={{
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.15)",
            color: "#ef4444",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.06)"; }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
