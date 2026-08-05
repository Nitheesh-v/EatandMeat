import { Bell, MapPin, Power } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { currentUser } = useAuth();
  const [online, setOnline] = useState(true);

  return (
    <header
      className="h-20 flex items-center justify-between px-8 border-b relative z-20"
      style={{
        background: "linear-gradient(135deg, rgba(20,10,10,0.95) 0%, rgba(30,15,15,0.9) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212,33,60,0.15)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Animated flame logo */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #d4213c 0%, #ff6b35 100%)",
            boxShadow: "0 4px 20px rgba(212,33,60,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
            animation: "pulse-glow 3s ease-in-out infinite",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        </div>
        <div>
          <h2
            className="text-2xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f0e6e6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "none",
            }}
          >
            Delivery<span style={{ color: "#d4213c" }}>Dashboard</span>
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "rgba(212,175,55,0.7)" }}>
            Welcome back, {currentUser?.fullName}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Current Area */}
        <div
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.2)",
            color: "#d4af37",
            boxShadow: "0 0 15px rgba(212,175,55,0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,175,55,0.15)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(212,175,55,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(212,175,55,0.08)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(212,175,55,0.1)";
          }}
        >
          <MapPin size={14} />
          Coimbatore
        </div>

        {/* Online Status */}
        <button
          onClick={() => setOnline(!online)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-500 cursor-pointer"
          style={{
            background: online
              ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
              : "rgba(255,255,255,0.08)",
            color: "white",
            border: online ? "none" : "1px solid rgba(255,255,255,0.15)",
            boxShadow: online
              ? "0 4px 20px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
              : "none",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: online ? "#4ade80" : "rgba(255,255,255,0.4)",
              boxShadow: online ? "0 0 8px #4ade80" : "none",
              animation: online ? "pulse-dot 2s ease-in-out infinite" : "none",
            }}
          />
          <Power size={14} />
          {online ? "Online" : "Offline"}
        </button>

        {/* Notification */}
        <button
          className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(212,33,60,0.2)";
            e.currentTarget.style.borderColor = "rgba(212,33,60,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          <Bell size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
          <span
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-white text-[10px] flex items-center justify-center font-bold"
            style={{
              background: "linear-gradient(135deg, #d4213c, #ff4757)",
              boxShadow: "0 2px 10px rgba(212,33,60,0.5)",
              animation: "pulse-badge 2s ease-in-out infinite",
            }}
          >
            3
          </span>
        </button>

        {/* Profile */}
        <div
          className="flex items-center gap-3 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <img
            src={
              currentUser?.profileImage ||
              "https://ui-avatars.com/api/?name=Delivery&background=d4213c&color=fff"
            }
            alt="profile"
            className="w-9 h-9 rounded-full"
            style={{
              ring: "2px solid rgba(212,175,55,0.5)",
              border: "2px solid rgba(212,175,55,0.5)",
              boxShadow: "0 0 12px rgba(212,175,55,0.3)",
            }}
          />
          <div>
            <p className="font-semibold text-sm" style={{ color: "#fff" }}>
              {currentUser?.fullName}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#d4af37" }}>
              Delivery Partner
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
