import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  History,
  Package,
  Calendar,
  IndianRupee,
  TrendingUp,
  ShoppingBag,
  Clock,
  ChevronRight,
  Filter,
  Download,
} from "lucide-react";
import { getDeliveryHistory } from "../../services/deliveryService";

const c = { plum: "#5B3A57", rose: "#D9829B", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

export const DeliveryHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ totalOrders: 0, totalEarnings: 0, avgOrderValue: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (statusFilter) params.status = statusFilter;
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;

      const res = await getDeliveryHistory(params);
      if (res.success) {
        setOrders(res.orders || []);
        setSummary(res.summary || { totalOrders: 0, totalEarnings: 0, avgOrderValue: 0 });
        setTotalPages(res.totalPages || 1);
        setTotal(res.total || 0);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [page, statusFilter, dateFrom, dateTo]);

  const summaryCards = [
    { label: "Total Deliveries", value: summary.totalOrders, icon: Package, color: c.plum, bg: "rgba(91,58,87,0.08)" },
    { label: "Total Earnings", value: `₹${summary.totalEarnings}`, icon: IndianRupee, color: c.champagne, bg: "rgba(214,183,122,0.08)" },
    { label: "Avg Order Value", value: `₹${Math.round(summary.avgOrderValue)}`, icon: TrendingUp, color: "#16A34A", bg: "rgba(22,163,74,0.08)" },
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>Delivery History</h1>
          <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>View all your past deliveries</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 14, marginBottom: 20 }}>
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} style={{
              background: "white", borderRadius: 12, border: "1px solid rgba(91,58,87,0.08)",
              overflow: "hidden",
            }}>
              <div style={{ height: 3, background: card.color }} />
              <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 600, color: c.textSec, margin: 0 }}>{card.label}</p>
                  <h2 style={{ fontSize: "1.15rem", fontWeight: 800, color: c.text, margin: "4px 0 0" }}>{card.value}</h2>
                </div>
                <div style={{
                  width: 34, height: 34, borderRadius: 10, background: card.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={16} style={{ color: card.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{
        display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
        padding: "14px 16px", borderRadius: 12, background: "white",
        border: "1px solid rgba(91,58,87,0.08)", marginBottom: 18,
      }}>
        <Filter size={16} style={{ color: c.textSec }} />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          style={{
            padding: "7px 12px", borderRadius: 8, border: "1.5px solid rgba(91,58,87,0.12)",
            fontSize: "0.78rem", fontWeight: 600, color: c.text, background: "white", cursor: "pointer",
          }}
        >
          <option value="">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date" value={dateFrom}
          onChange={(e) => { setDateFrom(e.target.value); setPage(1); }}
          style={{
            padding: "7px 12px", borderRadius: 8, border: "1.5px solid rgba(91,58,87,0.12)",
            fontSize: "0.78rem", color: c.text,
          }}
        />
        <span style={{ fontSize: "0.78rem", color: c.textSec }}>to</span>
        <input
          type="date" value={dateTo}
          onChange={(e) => { setDateTo(e.target.value); setPage(1); }}
          style={{
            padding: "7px 12px", borderRadius: 8, border: "1.5px solid rgba(91,58,87,0.12)",
            fontSize: "0.78rem", color: c.text,
          }}
        />

        {(statusFilter || dateFrom || dateTo) && (
          <button
            onClick={() => { setStatusFilter(""); setDateFrom(""); setDateTo(""); setPage(1); }}
            style={{
              padding: "6px 12px", borderRadius: 6, border: "none",
              background: "rgba(220,38,38,0.06)", color: "#DC2626",
              fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        )}

        <div style={{ marginLeft: "auto", fontSize: "0.75rem", fontWeight: 600, color: c.textSec }}>
          {total} result{total !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>
          Loading...
        </div>
      ) : orders.length === 0 ? (
        <div style={{
          background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.08)",
          padding: "48px 20px", textAlign: "center",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: "rgba(91,58,87,0.06)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: c.plum,
          }}>
            <History size={26} />
          </div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 4px" }}>No deliveries found</h2>
          <p style={{ color: c.textSec, fontSize: "0.82rem", margin: 0 }}>
            {statusFilter || dateFrom || dateTo ? "Try adjusting your filters" : "Complete deliveries to see history here"}
          </p>
        </div>
      ) : (
        <div style={{
          background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.1)", overflow: "hidden",
        }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Order", "Customer", "Date", "Items", "Amount", "Status", ""].map((h) => (
                    <th key={h} style={{
                      textAlign: "left", padding: "12px 16px", fontSize: "0.68rem", fontWeight: 600,
                      textTransform: "uppercase", letterSpacing: "0.04em", color: c.textSec,
                      background: c.bg, borderBottom: "1px solid rgba(91,58,87,0.06)",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    style={{ borderBottom: "1px solid rgba(91,58,87,0.04)", cursor: "pointer", transition: "all 0.15s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(91,58,87,0.02)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    onClick={() => navigate(`/delivery/order/${order._id}`)}
                  >
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.85rem", color: c.plum }}>
                        #{order.orderNumber}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: "0.82rem", color: c.text }}>{order.customer?.fullName || "—"}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Calendar size={11} style={{ color: c.textSec }} />
                        <span style={{ fontSize: "0.78rem", color: c.textSec }}>
                          {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString("en-IN") : "—"}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: "0.78rem", color: c.textSec }}>
                        {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.88rem", color: c.champagne }}>₹{order.totalAmount}</span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        fontSize: "0.68rem", fontWeight: 700, padding: "3px 10px", borderRadius: 6,
                        background: order.orderStatus === "Delivered" ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)",
                        color: order.orderStatus === "Delivered" ? "#16A34A" : "#DC2626",
                      }}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <ChevronRight size={14} style={{ color: c.textSec }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center", gap: 6,
              padding: "14px 16px", borderTop: "1px solid rgba(91,58,87,0.06)",
            }}>
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                style={{
                  padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(91,58,87,0.12)",
                  background: "white", color: c.textSec, fontSize: "0.75rem", fontWeight: 600,
                  cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.5 : 1,
                }}
              >
                Prev
              </button>
              <span style={{ fontSize: "0.78rem", fontWeight: 600, color: c.textSec }}>
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                style={{
                  padding: "6px 14px", borderRadius: 6, border: "1px solid rgba(91,58,87,0.12)",
                  background: "white", color: c.textSec, fontSize: "0.75rem", fontWeight: 600,
                  cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryHistory;
