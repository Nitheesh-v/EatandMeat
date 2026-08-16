import { ShoppingCart, User, Menu, X, Flame, MapPin, ChevronDown, Package, LogOut } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const routerLocation = useRouterLocation();
  const profileRef = useRef(null);
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const { location, setShowLocationModal } = useLocation();

  useEffect(() => { setMenuOpen(false); setProfileOpen(false); }, [routerLocation.pathname]);

  useEffect(() => {
    const onClick = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const deep = "#24140F";
  const primary = "#B4232C";
  const gold = "#C9A227";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: deep,
      borderBottom: `1px solid rgba(201,162,39,0.15)`,
      boxShadow: "0 2px 20px rgba(36,20,15,0.3)",
    }}>
      {/* Gold accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${primary}, ${gold}, ${primary})` }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, gap: 16 }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: `linear-gradient(135deg, ${primary}, ${gold})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(180,35,44,0.4)",
          }}>
            <Flame size={17} color="white" />
          </div>
          <span style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
            <span style={{ color: "#FFFFFF" }}>Eat</span>
            <span style={{ color: primary }}>And</span>
            <span style={{ color: gold }}>Meat</span>
          </span>
        </Link>

        {/* Location — desktop */}
        <button onClick={() => setShowLocationModal(true)} style={{
          display: "none", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer",
          padding: "5px 10px", borderRadius: 8, fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.7)",
        }} className="nav-location-btn">
          <MapPin size={13} style={{ color: gold }} />
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.68rem" }}>Delivering to</span>
          <span style={{ color: "#FFFFFF", fontWeight: 700 }}>{location?.area || "Select"}</span>
          <ChevronDown size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
        </button>

        {/* Nav Links */}
        <ul style={{ display: "flex", alignItems: "center", gap: 24, listStyle: "none", margin: "0 0 0 auto", padding: 0 }}
          className="nav-links-desktop">
          {navLinks.filter((l) => l.roles.includes(currentUser?.role ?? null)).map((link) => {
            const isActive = routerLocation.pathname === link.to;
            return (
              <li key={link.to}>
                <Link to={link.to} style={{
                  fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
                  color: isActive ? gold : "rgba(255,255,255,0.5)",
                  transition: "color 0.2s", position: "relative", paddingBottom: 3,
                }}>
                  {link.label}
                  {isActive && (
                    <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: gold, borderRadius: 1 }} />
                  )}
                </Link>
              </li>
            );
          })}
          {currentUser?.role === "customer" && (
            <li>
              <Link to="/my-orders" style={{
                fontSize: "0.82rem", fontWeight: 600, textDecoration: "none",
                color: routerLocation.pathname === "/my-orders" ? gold : "rgba(255,255,255,0.5)",
              }}>Orders</Link>
            </li>
          )}
        </ul>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Cart */}
          {currentUser?.role !== "company" && currentUser?.role !== "delivery" && (
            <Link to="/cart" style={{
              position: "relative", width: 34, height: 34, borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)",
              textDecoration: "none", transition: "all 0.2s",
            }}>
              <ShoppingCart size={15} style={{ color: "rgba(255,255,255,0.7)" }} />
              {totalItems > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -4, width: 16, height: 16,
                  borderRadius: "50%", background: primary, color: "white",
                  fontSize: "0.6rem", fontWeight: 800, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 6px ${primary}80`,
                }}>{totalItems}</span>
              )}
            </Link>
          )}

          {/* Profile */}
          <div style={{ position: "relative" }} ref={profileRef}>
            <button onClick={() => setProfileOpen((v) => !v)} style={{
              width: 34, height: 34, borderRadius: 8, display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer",
              background: currentUser ? `linear-gradient(135deg, ${primary}, ${gold})` : "rgba(255,255,255,0.06)",
              border: currentUser ? "none" : "1px solid rgba(255,255,255,0.08)",
              color: "white", fontWeight: 700, fontSize: "0.72rem",
              transition: "all 0.2s",
            }}>
              {currentUser ? (currentUser.fullName?.charAt(0) || "U") : <User size={15} />}
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div style={{
                position: "absolute", right: 0, marginTop: 8, width: 260,
                background: "#FFFFFF", border: "1px solid #E2E8F0",
                borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                overflow: "hidden",
              }}>
                {currentUser ? (
                  <>
                    <div style={{ padding: "14px 16px", borderBottom: "1px solid #F1F5F9" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: `linear-gradient(135deg, ${primary}, ${gold})`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "white", fontWeight: 700, fontSize: "0.8rem",
                        }}>{currentUser.fullName?.charAt(0)}</div>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#30231E" }}>{currentUser.fullName}</div>
                          <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{currentUser.email}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: 6 }}>
                      {currentUser.role === "customer" && (
                        <Link to="/my-orders" style={{
                          display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                          borderRadius: 8, textDecoration: "none", fontSize: "0.82rem", color: "#30231E", fontWeight: 500,
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
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#30231E", margin: "0 0 4px" }}>Welcome</p>
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
            display: "none", width: 34, height: 34, borderRadius: 8,
            alignItems: "center", justifyContent: "center", cursor: "pointer",
            background: menuOpen ? "rgba(255,255,255,0.08)" : "transparent",
            border: `1px solid rgba(255,255,255,0.1)`,
            color: "rgba(255,255,255,0.7)",
          }} className="nav-hamburger">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: deep, borderTop: `1px solid rgba(201,162,39,0.1)`,
          padding: "12px 16px",
        }}>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} style={{
              display: "block", padding: "10px 0", textDecoration: "none",
              fontSize: "0.85rem", fontWeight: 600,
              color: routerLocation.pathname === link.to ? gold : "rgba(255,255,255,0.6)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>{link.label}</Link>
          ))}
          {currentUser?.role === "customer" && (
            <Link to="/my-orders" style={{
              display: "block", padding: "10px 0", textDecoration: "none",
              fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.6)",
            }}>My Orders</Link>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) { .nav-location-btn { display: flex !important; } }
        @media (min-width: 768px) { .nav-links-desktop { display: flex !important; } }
        @media (max-width: 767px) { .nav-links-desktop { display: none !important; } .nav-hamburger { display: flex !important; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
