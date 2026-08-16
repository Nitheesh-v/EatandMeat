import { Bell, MapPin, Power } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [online, setOnline] = useState(true);

  return (
    <header
      className="h-16 flex items-center justify-between px-6"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid rgba(147,51,234,0.08)",
        boxShadow: "0 1px 8px rgba(147,51,234,0.04)",
      }}
    >
      {/* Left */}
      <div>
        <h2 className="text-lg font-extrabold tracking-tight" style={{ color: "#1e293b" }}>
          Delivery{" "}
          <span style={{
            background: "linear-gradient(135deg, #9333ea, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Dashboard
          </span>
        </h2>
        <p className="text-[11px]" style={{ color: "#94a3b8" }}>
          Welcome, {currentUser?.fullName}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            background: "rgba(147,51,234,0.06)",
            border: "1px solid rgba(147,51,234,0.12)",
            color: "#9333ea",
          }}
        >
          <MapPin size={12} />
          Coimbatore
        </div>

        <button
          onClick={() => setOnline(!online)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer"
          style={{
            background: online
              ? "linear-gradient(135deg, #9333ea, #ec4899)"
              : "rgba(0,0,0,0.04)",
            color: online ? "white" : "#94a3b8",
            border: online ? "none" : "1px solid rgba(0,0,0,0.08)",
            boxShadow: online ? "0 2px 10px rgba(147,51,234,0.3)" : "none",
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: online ? "#c084fc" : "#cbd5e1",
            boxShadow: online ? "0 0 6px #c084fc" : "none",
          }} />
          <Power size={12} />
          {online ? "Online" : "Offline"}
        </button>

        <div className="flex items-center gap-2 px-2 py-1 rounded-xl">
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: "linear-gradient(135deg, #9333ea, #ec4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 700, fontSize: "0.75rem",
          }}>
            {currentUser?.fullName?.charAt(0) || "D"}
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold text-xs" style={{ color: "#1e293b" }}>
              {currentUser?.fullName}
            </p>
            <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#9333ea" }}>
              Partner
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
