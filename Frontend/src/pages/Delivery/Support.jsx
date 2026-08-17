import { useEffect, useState } from "react";
import {
  Headphones,
  Plus,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  X,
  FileText,
} from "lucide-react";
import {
  createTicket,
  getMyTickets,
  getTicket,
  replyToTicket,
  closeTicket,
  getFaqs,
} from "../../services/supportService";

const c = { plum: "#5B3A57", rose: "#D9829B", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

const statusConfig = {
  open: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", label: "Open" },
  in_progress: { color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", label: "In Progress" },
  resolved: { color: "#16A34A", bg: "rgba(22,163,74,0.08)", border: "rgba(22,163,74,0.2)", label: "Resolved" },
  closed: { color: "#8B7585", bg: "rgba(139,117,133,0.08)", border: "rgba(139,117,133,0.2)", label: "Closed" },
};

const categories = [
  { value: "order_issue", label: "📦 Order Issue" },
  { value: "payment_issue", label: "💳 Payment Issue" },
  { value: "delivery_issue", label: "🚴 Delivery Issue" },
  { value: "account_issue", label: "👤 Account Issue" },
  { value: "app_issue", label: "📱 App Issue" },
  { value: "other", label: "💬 Other" },
];

export const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("tickets"); // tickets, faq, new
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const [form, setForm] = useState({
    subject: "",
    category: "other",
    description: "",
    priority: "medium",
  });

  const loadData = async () => {
    try {
      const [ticketsRes, faqsRes] = await Promise.all([
        getMyTickets(),
        getFaqs(),
      ]);
      if (ticketsRes.success) setTickets(ticketsRes.tickets || []);
      if (faqsRes.success) setFaqs(faqsRes.faqs || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const res = await createTicket(form);
      if (res.success) {
        setTickets((prev) => [res.ticket, ...prev]);
        setForm({ subject: "", category: "other", description: "", priority: "medium" });
        setShowForm(false);
        setActiveTab("tickets");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error creating ticket");
    }
  };

  const handleViewTicket = async (id) => {
    try {
      const res = await getTicket(id);
      if (res.success) setSelectedTicket(res.ticket);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReply = async (ticketId) => {
    if (!replyText.trim()) return;
    setSendingReply(true);
    try {
      const res = await replyToTicket(ticketId, replyText);
      if (res.success) {
        setSelectedTicket(res.ticket);
        setReplyText("");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error sending reply");
    } finally {
      setSendingReply(false);
    }
  };

  const handleClose = async (id) => {
    try {
      const res = await closeTicket(id);
      if (res.success) {
        setSelectedTicket(res.ticket);
        setTickets((prev) => prev.map((t) => (t._id === id ? res.ticket : t)));
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>
        Loading...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: 0 }}>Support</h1>
          <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "2px 0 0" }}>Get help with your deliveries</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setActiveTab(showForm ? "tickets" : "new"); }}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10,
            fontSize: "0.8rem", fontWeight: 700, border: "none", cursor: "pointer",
            background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`, color: "white",
            boxShadow: "0 4px 15px rgba(91,58,87,0.25)",
          }}
        >
          <Plus size={16} /> New Ticket
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
        {[
          { key: "tickets", label: `My Tickets (${tickets.length})` },
          { key: "faq", label: "FAQ" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSelectedTicket(null); setShowForm(false); }}
            style={{
              padding: "7px 16px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", border: "none",
              background: activeTab === tab.key ? `linear-gradient(135deg, ${c.plum}, ${c.rose})` : "rgba(91,58,87,0.04)",
              color: activeTab === tab.key ? "white" : c.textSec,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Create Ticket Form */}
      {showForm && (
        <div style={{
          background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.1)",
          overflow: "hidden", marginBottom: 18,
        }}>
          <div style={{ height: 3, background: `linear-gradient(90deg, ${c.plum}, ${c.rose})` }} />
          <form onSubmit={handleCreateTicket} style={{ padding: 20 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: c.text, margin: "0 0 16px" }}>Create Support Ticket</h3>

            <div style={{ display: "grid", gap: 14 }}>
              <input
                type="text"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 10,
                  border: "1.5px solid rgba(91,58,87,0.12)", fontSize: "0.85rem", color: c.text,
                  background: "rgba(91,58,87,0.02)", outline: "none",
                }}
              />

              <div style={{ display: "flex", gap: 10 }}>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{
                    flex: 1, padding: "11px 14px", borderRadius: 10,
                    border: "1.5px solid rgba(91,58,87,0.12)", fontSize: "0.85rem", color: c.text,
                    background: "white", outline: "none", cursor: "pointer",
                  }}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>

                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  style={{
                    padding: "11px 14px", borderRadius: 10,
                    border: "1.5px solid rgba(91,58,87,0.12)", fontSize: "0.85rem", color: c.text,
                    background: "white", outline: "none", cursor: "pointer",
                  }}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <textarea
                placeholder="Describe your issue in detail..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={4}
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 10,
                  border: "1.5px solid rgba(91,58,87,0.12)", fontSize: "0.85rem", color: c.text,
                  background: "rgba(91,58,87,0.02)", outline: "none", resize: "vertical",
                }}
              />

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    flex: 1, padding: "11px", borderRadius: 10, fontSize: "0.85rem", fontWeight: 600,
                    border: "1px solid rgba(91,58,87,0.15)", background: "white", color: c.textSec, cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1, padding: "11px", borderRadius: 10, fontSize: "0.85rem", fontWeight: 700,
                    border: "none", background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`,
                    color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  <Send size={14} /> Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Ticket Detail View */}
      {selectedTicket && (
        <div style={{
          background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.1)",
          overflow: "hidden", marginBottom: 18,
        }}>
          <div style={{ height: 3, background: `linear-gradient(90deg, ${c.plum}, ${c.rose})` }} />
          <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: c.text, margin: 0 }}>{selectedTicket.subject}</h3>
                <div style={{ display: "flex", gap: 8, marginTop: 6, alignItems: "center" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 6, fontSize: "0.7rem", fontWeight: 700,
                    ...(() => { const s = statusConfig[selectedTicket.status]; return { background: s.bg, color: s.color, border: `1px solid ${s.border}` }; })(),
                  }}>
                    {statusConfig[selectedTicket.status]?.label}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: c.textSec }}>
                    Created {new Date(selectedTicket.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                style={{ background: "none", border: "none", cursor: "pointer", color: c.textSec, padding: 4 }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{
              padding: "12px 14px", borderRadius: 10, background: "rgba(91,58,87,0.02)",
              border: "1px solid rgba(91,58,87,0.05)", marginBottom: 16,
            }}>
              <p style={{ fontSize: "0.85rem", color: c.text, margin: 0, lineHeight: 1.5 }}>
                {selectedTicket.description}
              </p>
            </div>

            {/* Replies */}
            {selectedTicket.replies?.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
                <h4 style={{ fontSize: "0.8rem", fontWeight: 600, color: c.textSec, margin: 0 }}>
                  Replies ({selectedTicket.replies.length})
                </h4>
                {selectedTicket.replies.map((reply, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "12px 14px", borderRadius: 10,
                      background: reply.sender === "admin"
                        ? "rgba(91,58,87,0.04)"
                        : "rgba(59,130,246,0.04)",
                      border: `1px solid ${reply.sender === "admin" ? "rgba(91,58,87,0.08)" : "rgba(59,130,246,0.1)"}`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: reply.sender === "admin" ? c.plum : "#2563EB" }}>
                        {reply.sender === "admin" ? "Support Team" : "You"}
                      </span>
                      <span style={{ fontSize: "0.68rem", color: c.textSec }}>
                        {new Date(reply.createdAt).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.82rem", color: c.text, margin: 0 }}>{reply.message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply input */}
            {selectedTicket.status !== "closed" && (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleReply(selectedTicket._id)}
                  style={{
                    flex: 1, padding: "10px 14px", borderRadius: 10,
                    border: "1.5px solid rgba(91,58,87,0.12)", fontSize: "0.85rem", color: c.text,
                    outline: "none",
                  }}
                />
                <button
                  onClick={() => handleReply(selectedTicket._id)}
                  disabled={sendingReply || !replyText.trim()}
                  style={{
                    padding: "10px 16px", borderRadius: 10, border: "none",
                    background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`,
                    color: "white", cursor: "pointer", display: "flex", alignItems: "center",
                  }}
                >
                  <Send size={16} />
                </button>
                {selectedTicket.status !== "closed" && (
                  <button
                    onClick={() => handleClose(selectedTicket._id)}
                    style={{
                      padding: "10px 14px", borderRadius: 10,
                      border: "1px solid rgba(220,38,38,0.2)", background: "rgba(220,38,38,0.04)",
                      color: "#DC2626", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tickets List */}
      {activeTab === "tickets" && !selectedTicket && (
        <>
          {tickets.length === 0 ? (
            <div style={{
              background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.08)",
              padding: "48px 20px", textAlign: "center",
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, background: "rgba(91,58,87,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: c.plum,
              }}>
                <Headphones size={26} />
              </div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 4px" }}>No tickets yet</h2>
              <p style={{ color: c.textSec, fontSize: "0.82rem", margin: 0 }}>Create a support ticket if you need help.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {tickets.map((ticket) => {
                const sc = statusConfig[ticket.status] || statusConfig.open;
                return (
                  <div
                    key={ticket._id}
                    onClick={() => handleViewTicket(ticket._id)}
                    style={{
                      background: "white", borderRadius: 12, border: "1px solid rgba(91,58,87,0.08)",
                      padding: "14px 16px", cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(91,58,87,0.06)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: c.text, margin: "0 0 4px" }}>
                          {ticket.subject}
                        </h3>
                        <p style={{ fontSize: "0.75rem", color: c.textSec, margin: 0, lineHeight: 1.4 }}>
                          {ticket.description.slice(0, 100)}{ticket.description.length > 100 ? "..." : ""}
                        </p>
                      </div>
                      <span style={{
                        padding: "3px 10px", borderRadius: 6, fontSize: "0.68rem", fontWeight: 700,
                        background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, flexShrink: 0, marginLeft: 10,
                      }}>
                        {sc.label}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, alignItems: "center" }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ fontSize: "0.68rem", color: c.textSec }}>
                          {new Date(ticket.createdAt).toLocaleDateString("en-IN")}
                        </span>
                        {ticket.replies?.length > 0 && (
                          <span style={{ fontSize: "0.68rem", color: c.plum, fontWeight: 600 }}>
                            💬 {ticket.replies.length}
                          </span>
                        )}
                      </div>
                      <ChevronRight size={14} style={{ color: c.textSec }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* FAQ */}
      {activeTab === "faq" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: "white", borderRadius: 12, border: "1px solid rgba(91,58,87,0.08)",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <HelpCircle size={16} style={{ color: c.plum, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text }}>{faq.question}</span>
                </div>
                {expandedFaq === i ? <ChevronUp size={16} style={{ color: c.textSec }} /> : <ChevronDown size={16} style={{ color: c.textSec }} />}
              </button>
              {expandedFaq === i && (
                <div style={{ padding: "0 16px 14px 42px" }}>
                  <p style={{ fontSize: "0.82rem", color: c.textSec, margin: 0, lineHeight: 1.6 }}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Support;
