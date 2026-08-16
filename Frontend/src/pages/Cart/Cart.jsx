import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { ShoppingCart, Trash2, ArrowRight, Package, Minus, Plus, IndianRupee, Truck, Tag } from "lucide-react";
import { useState } from "react";

const primary = "#B4232C";
const gold = "#C9A227";
const deep = "#24140F";
const beige = "#F5F0E8";
const text = "#30231E";

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } = useCart();
  const [removingId, setRemovingId] = useState(null);
  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const grandTotal = totalPrice + deliveryCharge;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => { removeFromCart(id); setRemovingId(null); }, 300);
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <section style={{ background: beige, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ textAlign: "center", maxWidth: 400 }}>
          <div style={{
            width: 100, height: 100, borderRadius: 24, margin: "0 auto 24px",
            background: "rgba(180,35,44,0.06)", border: "1px solid rgba(180,35,44,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ShoppingCart size={44} style={{ color: primary }} />
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: "0 0 8px" }}>
            Your Cart is <span style={{ color: primary }}>Empty</span>
          </h1>
          <p style={{ color: "#8B7355", fontSize: "0.9rem", margin: "0 0 24px" }}>
            Add fresh chicken and masalas to your cart.
          </p>
          <Link to="/products">
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
              borderRadius: 10, background: primary, color: "white", fontWeight: 700,
              fontSize: "0.9rem", border: "none", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(180,35,44,0.25)",
            }}>
              <Package size={18} /> Start Shopping
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: beige, minHeight: "100vh", paddingTop: 88, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: "0 0 4px" }}>
            Shopping <span style={{ color: primary }}>Cart</span>
          </h1>
          <p style={{ fontSize: "0.85rem", color: "#8B7355" }}>
            <strong style={{ color: gold }}>{totalItems}</strong> items in your cart
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "start" }}
          className="cart-grid">

          {/* Cart Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {cartItems.map((item, index) => (
              <div key={item.id} style={{
                background: "#FFFFFF", borderRadius: 12, overflow: "hidden",
                border: `1px solid ${removingId === item.id ? "rgba(180,35,44,0.3)" : "#E8DFD3"}`,
                opacity: removingId === item.id ? 0.5 : 1,
                transition: "all 0.3s ease",
              }}
                onMouseEnter={(e) => { if (removingId !== item.id) e.currentTarget.style.boxShadow = "0 4px 16px rgba(36,20,15,0.06)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ height: 3, background: `linear-gradient(90deg, ${primary}, ${gold})` }} />
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 16 }}>
                    {/* Image */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{
                        width: 90, height: 90, borderRadius: 10, objectFit: "cover",
                        border: "1px solid #E8DFD3",
                      }} />
                      <span style={{
                        position: "absolute", top: -6, right: -6, width: 22, height: 22,
                        borderRadius: "50%", background: primary, color: "white",
                        fontSize: "0.65rem", fontWeight: 800, display: "flex",
                        alignItems: "center", justifyContent: "center",
                      }}>{item.quantity}</span>
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <div>
                          <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: deep, margin: "0 0 4px" }}>{item.name}</h3>
                          <p style={{ fontSize: "0.78rem", color: "#8B7355", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                            <Tag size={11} style={{ color: gold }} /> {item.weight}
                          </p>
                        </div>
                        <button onClick={() => handleRemove(item.id)} style={{
                          width: 32, height: 32, borderRadius: 8, display: "flex",
                          alignItems: "center", justifyContent: "center",
                          background: "rgba(180,35,44,0.06)", border: "1px solid rgba(180,35,44,0.12)",
                          cursor: "pointer", color: primary, transition: "all 0.2s",
                        }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(180,35,44,0.12)"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(180,35,44,0.06)"; }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Quantity + Price */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <button onClick={() => decreaseQuantity(item.id)} style={{
                            width: 30, height: 30, borderRadius: 6, display: "flex",
                            alignItems: "center", justifyContent: "center",
                            background: "#F5F0E8", border: "1px solid #E8DFD3",
                            cursor: "pointer", color: text, transition: "all 0.2s",
                          }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(180,35,44,0.1)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F0E8"; }}
                          ><Minus size={13} /></button>
                          <span style={{ fontWeight: 800, fontSize: "0.95rem", color: deep, width: 28, textAlign: "center" }}>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)} style={{
                            width: 30, height: 30, borderRadius: 6, display: "flex",
                            alignItems: "center", justifyContent: "center",
                            background: "#F5F0E8", border: "1px solid #E8DFD3",
                            cursor: "pointer", color: text, transition: "all 0.2s",
                          }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(22,163,74,0.1)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "#F5F0E8"; }}
                          ><Plus size={13} /></button>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: "0.72rem", color: "#8B7355", margin: 0 }}>₹{item.price} each</p>
                          <p style={{ fontSize: "1.1rem", fontWeight: 800, color: primary, margin: 0 }}>₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ textAlign: "center", paddingTop: 8 }}>
              <button onClick={() => { if (window.confirm("Clear all items?")) cartItems.forEach((i) => removeFromCart(i.id)); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px",
                  borderRadius: 8, background: "rgba(180,35,44,0.06)", border: "1px solid rgba(180,35,44,0.12)",
                  color: primary, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                }}>
                <Trash2 size={13} /> Clear All
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{
            background: "#FFFFFF", borderRadius: 12, border: "1px solid #E8DFD3",
            position: "sticky", top: 88, overflow: "hidden",
          }}>
            <div style={{ height: 3, background: `linear-gradient(90deg, ${gold}, #f6e3a1)` }} />
            <div style={{ padding: 20 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: deep, marginBottom: 4 }}>Order Summary</h2>
              <p style={{ fontSize: "0.72rem", color: "#8B7355", margin: "0 0 16px" }}>{cartItems.length} items</p>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: "0.82rem", color: "#8B7355" }}>Subtotal</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: text }}>₹{totalPrice}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: "0.82rem", color: "#8B7355", display: "flex", alignItems: "center", gap: 4 }}>
                  Delivery <Truck size={12} style={{ color: "#8B7355" }} />
                </span>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: text }}>₹{deliveryCharge}</span>
              </div>

              <div style={{ height: 1, background: "#F5F0E8", margin: "14px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: deep }}>Grand Total</span>
                <span style={{ fontSize: "1.5rem", fontWeight: 800, color: primary }}>₹{grandTotal}</span>
              </div>

              <Link to="/checkout" style={{ display: "block" }}>
                <button style={{
                  width: "100%", padding: "12px", borderRadius: 10, border: "none",
                  background: primary, color: "white", fontWeight: 700, fontSize: "0.9rem",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 2px 8px rgba(180,35,44,0.25)", transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#9A1D25"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = primary; }}
                >
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
              </Link>

              <Link to="/products" style={{
                display: "block", textAlign: "center", marginTop: 10,
                fontSize: "0.82rem", fontWeight: 600, color: "#8B7355", textDecoration: "none",
              }}>← Continue Shopping</Link>

              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16, paddingTop: 14, borderTop: "1px solid #F5F0E8" }}>
                {[{ icon: "🔒", label: "Secure" }, { icon: "⚡", label: "Fast" }, { icon: "✅", label: "Fresh" }].map((b) => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: "0.75rem" }}>{b.icon}</span>
                    <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "#8B7355" }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) { .cart-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
};

export default Cart;
