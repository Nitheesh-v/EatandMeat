import { useEffect, useState } from "react";
import {
  Bell,
  BellOff,
  CheckCheck,
  Trash2,
  Package,
  CreditCard,
  Info,
  Star,
  Clock,
  ChevronRight,
} from "lucide-react";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearRead,
} from "../../services/notificationService";

const c = { plum: "#5B3A57", rose: "#D9829B", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

const typeConfig = {
  order: { icon: Package, color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
  delivery: { icon: Package, color: "#0891B2", bg: "rgba(8,145,178,0.08)" },
  payment: { icon: CreditCard, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
  system: { icon: Info, color: "#5B3A57", bg: "rgba(91,58,87,0.08)" },
  promo: { icon: Star, color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
};

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, unread

  const loadData = async () => {
    try {
      const params = {};
      if (filter === "unread") params.unreadOnly = "true";
      const [notiRes, unreadRes] = await Promise.all([
        getNotifications(params),
        getUnreadCount(),
      ]);
      if (notiRes.success) setNotifications(notiRes.notifications || []);
      setUnreadCount(unreadRes.success ? unreadRes.unreadCount : 0);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filter]);

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.log(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleClearRead = async () => {
    try {
      await clearRead();
      setNotifications((prev) => prev.filter((n) => !n.read));
    } catch (err) {
      console.log(err);
    }
  };

  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>Notifications</h1>
          <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up"}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              style={{
                display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8,
                fontSize: "0.75rem", fontWeight: 600, border: "1px solid rgba(91,58,87,0.15)",
                background: "white", color: c.plum, cursor: "pointer",
              }}
            >
              <CheckCheck size={13} /> Mark all read
            </button>
          )}
          {notifications.some((n) => n.read) && (
            <button
              onClick={handleClearRead}
              style={{
                display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8,
                fontSize: "0.75rem", fontWeight: 600, border: "1px solid rgba(220,38,38,0.15)",
                background: "rgba(220,38,38,0.04)", color: "#DC2626", cursor: "pointer",
              }}
            >
              <Trash2 size={13} /> Clear read
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[
          { key: "all", label: "All" },
          { key: "unread", label: `Unread (${unreadCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: "7px 16px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: "none",
              background: filter === tab.key
                ? `linear-gradient(135deg, ${c.plum}, ${c.rose})`
                : "rgba(91,58,87,0.04)",
              color: filter === tab.key ? "white" : c.textSec,
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div style={{
          background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.08)",
          padding: "48px 20px", textAlign: "center",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: "rgba(91,58,87,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: c.plum,
          }}>
            <BellOff size={26} />
          </div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 4px" }}>
            No notifications
          </h2>
          <p style={{ color: c.textSec, fontSize: "0.82rem", margin: 0 }}>
            {filter === "unread" ? "All caught up! No unread notifications." : "You'll see delivery updates here."}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notifications.map((notif) => {
            const config = typeConfig[notif.type] || typeConfig.system;
            const Icon = config.icon;

            return (
              <div
                key={notif._id}
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: `1px solid ${notif.read ? "rgba(91,58,87,0.06)" : "rgba(91,58,87,0.12)"}`,
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  transition: "all 0.15s",
                  cursor: "pointer",
                  opacity: notif.read ? 0.65 : 1,
                }}
                onClick={() => !notif.read && handleMarkRead(notif._id)}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(91,58,87,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Unread dot */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, background: config.bg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={17} style={{ color: config.color }} />
                  </div>
                  {!notif.read && (
                    <div style={{
                      position: "absolute", top: -3, right: -3, width: 8, height: 8,
                      borderRadius: "50%", background: c.rose, border: "2px solid white",
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <h3 style={{
                      fontSize: "0.85rem", fontWeight: 700, color: c.text, margin: 0,
                      textDecoration: notif.read ? "none" : "none",
                    }}>
                      {notif.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <Clock size={10} style={{ color: c.textSec }} />
                      <span style={{ fontSize: "0.68rem", color: c.textSec }}>
                        {timeAgo(notif.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: c.textSec, margin: "4px 0 0", lineHeight: 1.4 }}>
                    {notif.message}
                  </p>
                  {notif.relatedOrder && (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 4, marginTop: 6,
                      padding: "2px 8px", borderRadius: 6, fontSize: "0.68rem", fontWeight: 600,
                      background: "rgba(91,58,87,0.05)", color: c.plum,
                    }}>
                      #{notif.relatedOrder.orderNumber} · ₹{notif.relatedOrder.totalAmount}
                    </span>
                  )}
                </div>

                {/* Delete button */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(notif._id); }}
                  style={{
                    flexShrink: 0, width: 28, height: 28, borderRadius: 6,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "transparent", border: "none", cursor: "pointer", color: c.textSec,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(220,38,38,0.08)"; e.currentTarget.style.color = "#DC2626"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = c.textSec; }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
