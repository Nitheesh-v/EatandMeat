import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContext";
import { createOrder } from "../../services/orderService";
import API from "../../api/axios.js";
import LocationPicker from "../../components/map/LocationPicker";
import {
  User, Phone, Mail, MapPin, CreditCard, Banknote, Smartphone,
  Shield, IndianRupee, Truck, Check, Tag, X,
} from "lucide-react";

const primary = "#B4232C";
const gold = "#C9A227";
const deep = "#24140F";
const cream = "#FAF7F2";
const text = "#30231E";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || "", phone: "", email: currentUser?.email || "",
    address: "", city: "", pincode: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const deliveryCharge = cartItems.length > 0 ? 40 : 0;
  const grandTotal = totalPrice + deliveryCharge - couponDiscount;

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) { setCouponMessage("Enter a coupon code"); return; }
    setCouponLoading(true);
    setCouponMessage("");
    try {
      const { data } = await API.post("/coupons/apply", { code: couponCode, orderAmount: totalPrice });
      if (data.success) { setCouponDiscount(data.discount); setCouponApplied(data.couponCode); setCouponMessage(data.message); }
    } catch (err) {
      setCouponDiscount(0); setCouponApplied(""); setCouponMessage(err.response?.data?.message || "Invalid coupon");
    } finally { setCouponLoading(false); }
  };

  const handleRemoveCoupon = () => { setCouponCode(""); setCouponDiscount(0); setCouponApplied(""); setCouponMessage(""); };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cartItems.map((item) => ({ product: item.id.toString(), name: item.name, image: item.image, quantity: item.quantity, price: item.price })),
        deliveryAddress: { fullName: formData.fullName, phone: formData.phone, address: formData.address, city: formData.city, pincode: formData.pincode, latitude: location.latitude, longitude: location.longitude },
        paymentMethod, subtotal: totalPrice, deliveryCharge, tax: 0, discount: couponDiscount, couponCode: couponApplied, totalAmount: grandTotal,
      };
      await createOrder(orderData);
      alert("Order Placed Successfully");
      clearCart();
      navigate("/my-orders");
    } catch (err) { alert("Order Failed"); }
  };

  const input = { width: "100%", background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "11px 14px", color: text, fontSize: "0.85rem", boxSizing: "border-box", outline: "none" };
  const inputIcon = { position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" };
  const card = { background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden" };
  const sectionTitle = { fontSize: "0.95rem", fontWeight: 700, color: deep, display: "flex", alignItems: "center", gap: 8, marginBottom: 16 };

  return (
    <section style={{ background: cream, minHeight: "100vh", paddingTop: 88, paddingBottom: 40 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Shield size={16} style={{ color: "#16A34A" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#16A34A", textTransform: "uppercase", letterSpacing: "0.04em" }}>Secure Checkout</span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: deep, margin: 0 }}>
            Complete Your <span style={{ color: primary }}>Order</span>
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "start" }}
            className="checkout-grid">

            {/* Left: Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Customer Details */}
              <div style={card}>
                <div style={{ height: 3, background: primary }} />
                <div style={{ padding: 20 }}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(180,35,44,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <User size={14} style={{ color: primary }} />
                    </div>
                    Customer Details
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div style={{ position: "relative", gridColumn: "1 / -1" }}>
                      <User size={14} style={inputIcon} />
                      <input type="text" placeholder="Full Name" required value={formData.fullName} onChange={(e) => handleChange("fullName", e.target.value)} style={{ ...input, paddingLeft: 40 }} />
                    </div>
                    <div style={{ position: "relative" }}>
                      <Phone size={14} style={inputIcon} />
                      <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} style={{ ...input, paddingLeft: 40 }} />
                    </div>
                    <div style={{ position: "relative" }}>
                      <Mail size={14} style={inputIcon} />
                      <input type="email" placeholder="Email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} style={{ ...input, paddingLeft: 40 }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div style={card}>
                <div style={{ height: 3, background: gold }} />
                <div style={{ padding: 20 }}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(201,162,39,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <MapPin size={14} style={{ color: gold }} />
                    </div>
                    Delivery Address
                  </h2>
                  <textarea rows={3} placeholder="Complete address with landmark..." required value={formData.address} onChange={(e) => handleChange("address", e.target.value)} style={{ ...input, resize: "none", marginBottom: 12 }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <input type="text" placeholder="City" required value={formData.city} onChange={(e) => handleChange("city", e.target.value)} style={input} />
                    <input type="text" placeholder="PIN Code" required value={formData.pincode} onChange={(e) => handleChange("pincode", e.target.value)} style={input} />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div style={{ ...card, padding: 20 }}>
                <button type="button" onClick={() => {
                  if (!navigator.geolocation) { alert("Not supported"); return; }
                  navigator.geolocation.getCurrentPosition((p) => { setLocation({ latitude: p.coords.latitude, longitude: p.coords.longitude }); alert("Location selected!"); }, () => alert("Unable to fetch"));
                }} style={{ padding: "8px 16px", borderRadius: 8, background: "#16A34A", color: "white", border: "none", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", marginBottom: 12 }}>
                  📍 Use Current Location
                </button>
                <LocationPicker onLocationSelect={(loc) => setLocation(loc)} />
              </div>

              {/* Payment */}
              <div style={card}>
                <div style={{ height: 3, background: "#7C3AED" }} />
                <div style={{ padding: 20 }}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(124,58,237,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CreditCard size={14} style={{ color: "#7C3AED" }} />
                    </div>
                    Payment Method
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                      { value: "COD", label: "Cash on Delivery", icon: Banknote, color: "#16A34A" },
                      { value: "ONLINE", label: "Online Payment (UPI / Card)", icon: Smartphone, color: "#7C3AED" },
                    ].map((opt) => (
                      <label key={opt.value} style={{
                        display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                        background: paymentMethod === opt.value ? `${opt.color}08` : "#FAF7F2",
                        border: `1px solid ${paymentMethod === opt.value ? `${opt.color}30` : "#E2E8F0"}`,
                        transition: "all 0.2s",
                      }}>
                        <input type="radio" name="payment" value={opt.value} checked={paymentMethod === opt.value} onChange={(e) => setPaymentMethod(e.target.value)} style={{ accentColor: primary }} />
                        <opt.icon size={18} style={{ color: opt.color }} />
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: text }}>{opt.label}</span>
                        {paymentMethod === opt.value && <Check size={16} style={{ color: opt.color, marginLeft: "auto" }} />}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{ ...card, position: "sticky", top: 88 }}>
              <div style={{ height: 3, background: `linear-gradient(90deg, ${primary}, ${gold})` }} />
              <div style={{ padding: 20 }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 700, color: deep, marginBottom: 4 }}>Order Summary</h2>
                <p style={{ fontSize: "0.72rem", color: "#94A3B8", margin: "0 0 16px" }}>{cartItems.length} items</p>

                {/* Items */}
                <div style={{ maxHeight: 160, overflowY: "auto", marginBottom: 12 }}>
                  {cartItems.map((item) => (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #F1F5F9" }}>
                      <span style={{ fontSize: "0.82rem", color: text, fontWeight: 500 }}>{item.name} <span style={{ color: "#94A3B8", fontSize: "0.72rem" }}>× {item.quantity}</span></span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 700, color: text }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: "#F1F5F9", margin: "12px 0" }} />

                {/* Coupon */}
                {couponApplied ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 8, background: "rgba(22,163,74,0.06)", border: "1px solid rgba(22,163,74,0.15)", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Tag size={13} style={{ color: "#16A34A" }} />
                      <div>
                        <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#16A34A" }}>{couponApplied}</span>
                        <p style={{ fontSize: "0.68rem", color: "#94A3B8", margin: 0 }}>Save ₹{couponDiscount}</p>
                      </div>
                    </div>
                    <button type="button" onClick={handleRemoveCoupon} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 2 }}><X size={14} /></button>
                  </div>
                ) : (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <input type="text" placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        style={{ ...input, padding: "8px 10px", fontSize: "0.82rem", flex: 1 }} />
                      <button type="button" onClick={handleApplyCoupon} disabled={couponLoading} style={{
                        padding: "8px 14px", borderRadius: 8, background: primary, color: "white", border: "none",
                        fontSize: "0.78rem", fontWeight: 700, cursor: "pointer",
                      }}>{couponLoading ? "..." : "Apply"}</button>
                    </div>
                    {couponMessage && <p style={{ fontSize: "0.72rem", marginTop: 4, color: couponDiscount > 0 ? "#16A34A" : "#EF4444", fontWeight: 600 }}>{couponMessage}</p>}
                  </div>
                )}

                {/* Totals */}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Subtotal</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: text }}>₹{totalPrice}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: "0.82rem", color: "#64748B" }}>Delivery</span>
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: text }}>₹{deliveryCharge}</span>
                </div>
                {couponDiscount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.82rem", color: "#16A34A", fontWeight: 600 }}>Coupon ({couponApplied})</span>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#16A34A" }}>-₹{couponDiscount}</span>
                  </div>
                )}

                <div style={{ height: 1, background: "#F1F5F9", margin: "12px 0" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: deep }}>Grand Total</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: primary }}>₹{grandTotal}</span>
                </div>

                <button type="submit" style={{
                  width: "100%", padding: "13px", borderRadius: 10, border: "none",
                  background: primary, color: "white", fontWeight: 700, fontSize: "0.9rem",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: "0 2px 8px rgba(180,35,44,0.25)", transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#9A1D25"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = primary; }}
                >
                  <Shield size={16} />
                  Place Order — ₹{grandTotal}
                </button>

                <p style={{ textAlign: "center", fontSize: "0.7rem", color: "#94A3B8", marginTop: 10 }}>
                  🔒 100% secure & encrypted checkout
                </p>
              </div>
            </div>
          </div>
        </form>

        <style>{`
          @media (max-width: 768px) { .checkout-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
};

export default Checkout;
