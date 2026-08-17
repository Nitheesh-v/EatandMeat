import { Bell, MapPin, Power } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUnreadCount } from "../../services/notificationService";

const c = { plum: "#5B3A57", rose: "#D9829B", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await getUnreadCount();
        if (res.success) setUnreadCount(res.unreadCount);
      } catch (err) { /* silent */ }
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{
      background: "#FFFFFF", borderBottom: `1px solid rgba(91,58,87,0.08)`,
      padding: "0 20px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div>
        <h2 style={{ fontSize: "1rem", fontWeight: 800, color: c.text, margin: 0 }}>
          Delivery <span style={{ color: c.plum }}>Dashboard</span>
        </h2>
        <p style={{ fontSize: "0.68rem", color: c.textSec, margin: 0 }}>Welcome, {currentUser?.fullName}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "none", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 8, background: "rgba(91,58,87,0.05)", border: "1px solid rgba(91,58,87,0.1)", fontSize: "0.75rem", fontWeight: 600, color: c.plum }}
          className="nav-location"><MapPin size={12} /> Coimbatore</div>

        {/* Notification Bell */}
        <button
          onClick={() => navigate("/delivery/notifications")}
          style={{
            position: "relative", width: 36, height: 36, borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(91,58,87,0.05)", border: "1px solid rgba(91,58,87,0.1)",
            cursor: "pointer", transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91,58,87,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(91,58,87,0.05)"; }}
        >
          <Bell size={16} style={{ color: c.plum }} />
          {unreadCount > 0 && (
            <span style={{
              position: "absolute", top: -4, right: -4, minWidth: 16, height: 16,
              borderRadius: 8, background: "#DC2626", color: "white", fontSize: "0.6rem",
              fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 4px", border: "2px solid white",
            }}>
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        <button onClick={() => setOnline(!online)} style={{
          display: "flex", alignItems: "center", gap: 5, padding: "5px 14px", borderRadius: 8,
          fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", border: "none", transition: "all 0.2s",
          background: online ? `linear-gradient(135deg, ${c.plum}, ${c.rose})` : "#F1F5F9",
          color: online ? "white" : c.textSec,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: online ? "#D9829B" : "#CBD5E1" }} />
          <Power size={12} /> {online ? "Online" : "Offline"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.7rem" }}>
            {currentUser?.fullName?.charAt(0) || "D"}
          </div>
        </div>
      </div>

      <style>{`@media (min-width: 1024px) { .nav-location { display: flex !important; } }`}</style>
    </header>
  );
};

export default Navbar;
