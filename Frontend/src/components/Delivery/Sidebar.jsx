import {
  LayoutDashboard,
  PackageSearch,
  Bike,
  Wallet,
  User,
  LogOut,
  Flame,
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
    { name: "Profile", icon: User, path: "/delivery/profile" },
  ];

  return (
    <aside
      className="w-72 min-h-screen flex flex-col relative"
      style={{
        background: "linear-gradient(180deg, #0f0a0a 0%, #1a0e0e 30%, #0f0a0a 100%)",
        borderRight: "1px solid rgba(212,33,60,0.12)",
        boxShadow: "4px 0 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: "absolute",
          width: 220,
          height: 220,
          top: -60,
          left: -60,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,33,60,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Logo area */}
      <div
        className="h-20 flex items-center justify-center gap-2 relative z-10"
        style={{ borderBottom: "1px solid rgba(212,33,60,0.12)" }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #d4213c 0%, #ff6b35 100%)",
            boxShadow: "0 4px 15px rgba(212,33,60,0.4)",
          }}
        >
          <Flame size={18} color="white" />
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          <span style={{ color: "#fff" }}>Eat</span>
          <span style={{ color: "#d4213c" }}>And</span>
          <span style={{ color: "#d4af37" }}>Meat</span>
        </h2>
      </div>

      {/* Partner info */}
      <div
        className="p-5 relative z-10"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, #d4213c, #ff6b35)",
              color: "white",
              boxShadow: "0 0 15px rgba(212,33,60,0.3)",
            }}
          >
            {currentUser?.fullName?.charAt(0) || "D"}
          </div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: "#fff" }}>
              {currentUser?.fullName}
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "#d4af37" }}>
              Delivery Partner
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 relative z-10">
        {menus.map((item, i) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 text-sm font-semibold group"
            style={({ isActive }) => ({
              animationDelay: `${0.05 * i}s`,
              color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
              background: isActive
                ? "linear-gradient(135deg, rgba(212,33,60,0.9) 0%, rgba(150,16,31,0.9) 60%, rgba(110,15,28,0.9) 100%)"
                : "transparent",
              boxShadow: isActive
                ? "0 8px 24px rgba(212,33,60,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "none",
              transform: "translateX(0)",
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.background = "rgba(212,33,60,0.1)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                e.currentTarget.style.transform = "translateX(4px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                e.currentTarget.style.transform = "translateX(0)";
              }
            }}
          >
            <item.icon size={19} />
            {item.name}
            {i === 1 && (
              <span
                className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #d4213c, #ff6b35)",
                  color: "white",
                  boxShadow: "0 2px 8px rgba(212,33,60,0.4)",
                }}
              >
                18
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Earnings teaser */}
      <div className="px-4 pb-2 relative z-10">
        <div
          className="p-4 rounded-xl"
          style={{
            background: "linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)",
            border: "1px solid rgba(212,175,55,0.15)",
          }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "#d4af37" }}>
            Today&apos;s Earnings
          </p>
          <p className="text-2xl font-extrabold" style={{ color: "#fff" }}>
            ₹1,420
          </p>
          <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: "70%",
                background: "linear-gradient(90deg, #d4af37, #f6e3a1)",
                boxShadow: "0 0 10px rgba(212,175,55,0.5)",
              }}
            />
          </div>
          <p className="text-[10px] mt-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            ₹800 to next bonus milestone
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4 relative z-10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer"
          style={{
            background: "rgba(212,33,60,0.08)",
            border: "1px solid rgba(212,33,60,0.2)",
            color: "#d4213c",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,33,60,0.2)";
            e.currentTarget.style.boxShadow = "0 4px 15px rgba(212,33,60,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(212,33,60,0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
