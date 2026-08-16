import { ShoppingCart, User, Menu, X, Flame, MapPin, ChevronDown, Package, LogOut, Bell } from "lucide-react";
import { Link, useLocation as useRouterLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../Context/CartContext";
import { useLocation } from "../Context/LocationContext";
import { useAuth } from "../Context/AuthContext";

const navLinks = [
  { to: "/", label: "Home", roles: [null, "customer"] },
  { to: "/products", label: "Products", roles: [null, "customer"] },
  { to: "/contact", label: "Contact", roles: [null, "customer", "company", "delivery"] },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const routerLocation = useRouterLocation();
  const profileRef = useRef(null);
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const { location, setShowLocationModal } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setProfileOpen(false); }, [routerLocation.pathname]);

  useEffect(() => {
    const onClick = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const primary = "#B4232C";
  const gold = "#C9A227";
  const deep = "#24140F";
  const cream = "#FAF7F2";
  const text = "#30231E";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(250,247,242,0.97)" : "rgba(250,247,242,0.85)",
      backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
      borderBottom: scrolled ? `1px solid rgba(180,35,44,0.1)` : "1px solid rgba(0,0,0,0.04)",
      boxShadow: scrolled ? "0 2px 20px rgba(36,20,15,0.06)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 16 }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: `linear-gradient(135deg, ${primary}, #D4354A)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(180,35,44,0.3)",
          }}>
            <Flame size={18} color="white" />
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span style={{ color: deep }}>Eat</span>
            <span style={{ color: primary }}>And</span>
            <span style={{ color: gold }}>Meat</span>
          </span>
        </Link>

        {/* Location — desktop */}
        <button onClick={() => setShowLocationModal(true)} style={{
          display: "none", alignItems: "center", gap: 6, background: "transparent",
          border: "none", cursor: "pointer", padding: "6px 10px", borderRadius: 8,
          fontSize: "0.82rem", fontWeight: 600, color: text,
        }} className="nav-location-btn">
          <MapPin size={14} style={{ color: primary }} />
          <span style={{ color: "#64748b", fontSize: "0.72rem" }}>Delivering to</span>
          <span style={{ color: text, fontWeight: 700 }}>
            {location?.area || "Select Location"}
          </span>
          <ChevronDown size={12} style={{ color: "#94A3B8" }} />
        </button>

        {/* Nav Links */}
        <ul style={{ display: "flex", alignItems: "center", gap: 24, listStyle: "none", margin: "0 0 0 auto", padding: 0 }}
          className="nav-links-desktop">
          {navLinks.filter((l) => l.roles.includes(currentUser?.role ?? null)).map((link) => (
            <li key={link.to}>
              <Link to={link.to} style={{
                fontSize: "0.85rem", fontWeight: 600, textDecoration: "none",
                color: routerLocation.pathname === link.to ? primary : "#64748b",
                transition: "color 0.2s",
                position: "relative", paddingBottom: 2,
              }}>
                {link.label}
                {routerLocation.pathname === link.to && (
                  <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: primary, borderRadius: 1 }} />
                )}
              </Link>
            </li>
          ))}
          {currentUser?.role === "customer" && (
            <li>
              <Link to="/my-orders" style={{
                fontSize: "0.85rem", fontWeight: 600, textDecoration: "none",
                color: routerLocation.pathname === "/my-orders" ? primary : "#64748b",
              }}>Orders</Link>
            </li>
          )}
        </ul>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Cart */}
          {currentUser?.role !== "company" && currentUser?.role !== "delivery" && (
            <Link to="/cart" style={{
              position: "relative", width: 36, height: 36, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(180,35,44,0.06)", border: "1px solid rgba(180,35,44,0.1)",
              textDecoration: "none", transition: "all 0.2s",
            }}>
              <ShoppingCart size={16} style={{ color: text }} />
              {totalItems > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -4, width: 16, height: 16,
                  borderRadius: "50%", background: primary, color: "white",
                  fontSize: "0.6rem", fontWeight: 800, display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>{totalItems}</span>
              )}
            </Link>
          )}

          {/* Profile */}
          <div style={{ position: "relative" }} ref={profileRef}>
            <button onClick={() => setProfileOpen((v) => !v)} style={{
              width: 36, height: 36, borderRadius: 8, display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer",
              background: currentUser ? primary : "rgba(180,35,44,0.06)",
              border: currentUser ? "none" : "1px solid rgba(180,35,44,0.1)",
              color: currentUser ? "white" : "#64748b", fontWeight: 700, fontSize: "0.75rem",
              transition: "all 0.2s",
            }}>
              {currentUser ? (currentUser.fullName?.charAt(0) || "U") : <User size={16} />}
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div style={{
                position: "absolute", right: 0, marginTop: 8, width: 260,
                background: "#FFFFFF", border: "1px solid #E2E8F0",
                borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}>
                {currentUser ? (
                  <>
                    <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8, background: primary,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", fontWeight: 700, fontSize: "0.8rem",
                        }}>{currentUser.fullName?.charAt(0)}</div>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: text }}>{currentUser.fullName}</div>
                          <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{currentUser.email}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: 6 }}>
                      {currentUser.role === "customer" && (
                        <Link to="/my-orders" style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                          borderRadius: 8, textDecoration: "none", fontSize: "0.82rem",
                          color: text, fontWeight: 500,
                        }}><Package size={15} style={{ color: "#94A3B8" }} />My Orders</Link>
                      )}
                      <button onClick={logout} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                        borderRadius: 8, width: "100%", border: "none", background: "transparent",
                        color: "#EF4444", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer",
                      }}><LogOut size={15} />Logout</button>
                    </div>
                  </>
                ) : (
                  <div style={{ padding: 16 }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: text, margin: "0 0 4px" }}>Welcome</p>
                    <p style={{ fontSize: "0.75rem", color: "#94A3B8", margin: "0 0 12px" }}>Login to track orders</p>
                    <Link to="/login" style={{
                      display: "block", textAlign: "center", background: primary, color: "white",
                      padding: "8px 16px", borderRadius: 8, textDecoration: "none",
                      fontSize: "0.82rem", fontWeight: 700,
                    }}>Login</Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", width: 36, height: 36, borderRadius: 8,
            alignItems: "center", justifyContent: "center", cursor: "pointer",
            background: menuOpen ? "rgba(180,35,44,0.08)" : "transparent",
            border: `1px solid ${menuOpen ? "rgba(180,35,44,0.2)" : "rgba(0,0,0,0.08)"}`,
            color: text,
          }} className="nav-hamburger">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: "#FFFFFF", borderTop: "1px solid #E2E8F0",
          padding: "12px 16px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} style={{
              display: "block", padding: "10px 0", textDecoration: "none",
              fontSize: "0.85rem", fontWeight: 600,
              color: routerLocation.pathname === link.to ? primary : text,
              borderBottom: "1px solid #F1F5F9",
            }}>{link.label}</Link>
          ))}
          {currentUser?.role === "customer" && (
            <Link to="/my-orders" style={{
              display: "block", padding: "10px 0", textDecoration: "none",
              fontSize: "0.85rem", fontWeight: 600, color: text,
            }}>My Orders</Link>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .nav-location-btn { display: flex !important; }
        }
        @media (min-width: 768px) {
          .nav-links-desktop { display: flex !important; }
        }
        @media (max-width: 767px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
