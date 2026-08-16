import { ShoppingCart, User, Menu, X, Flame, MapPin, ChevronDown, Package, LogOut, Bell } from "lucide-react";

import { Link, useLocation as useRouterLocation } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import { useCart } from "../Context/CartContext";

import { useLocation } from "../Context/LocationContext";

import { useOrder } from "../Context/OrderContext";

import { useAuth } from "../Context/AuthContext";

const navLinks = [
  { to: "/", label: "Home", roles: [null, "customer"] },
  { to: "/products", label: "Products", roles: [null, "customer"] },
  { to: "/contact", label: "Contact", roles: [null, "customer", "company", "delivery"] },
];

const navStyles = `
  .mm-nav-link { position: relative; padding-bottom: 2px; }
  .mm-nav-underline {
    position: absolute; left: 0; bottom: -2px; height: 2px; width: 0%;
    background: linear-gradient(90deg, #0d9488, #14b8a6, #f59e0b);
    border-radius: 1px;
    transition: width .35s cubic-bezier(.16,.84,.32,1);
  }
  .mm-nav-link:hover .mm-nav-underline,
  .mm-nav-link.active .mm-nav-underline { width: 100%; }

  .mm-badge-pulse { animation: mmBadgePulse 2s ease-in-out infinite; }
  @keyframes mmBadgePulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }

  .mm-mobile-menu {
    max-height: 0; overflow: hidden; opacity: 0;
    transition: max-height .45s cubic-bezier(.16,.84,.32,1), opacity .3s ease;
  }
  .mm-mobile-menu.open { max-height: 600px; opacity: 1; }

  .mm-dropdown {
    opacity: 0; transform: translateY(-8px) scale(0.97); pointer-events: none;
    transition: all .22s cubic-bezier(.16,.84,.32,1);
  }
  .mm-dropdown.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

  @keyframes mobileSlideIn {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .mm-mobile-link {
    animation: mobileSlideIn 0.3s ease both;
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 4px 15px rgba(13,148,136,0.3); }
    50% { box-shadow: 0 4px 25px rgba(13,148,136,0.6), 0 0 30px rgba(20,184,166,0.2); }
  }

  .mm-flame-glow { animation: glow-pulse 3s ease-in-out infinite; }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const routerLocation = useRouterLocation();
  const profileRef = useRef(null);

  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const { orders } = useOrder();
  const { location, setShowLocationModal } = useLocation();

  const activeOrders = orders.filter(
    (order) => order.deliveryStatus !== "Delivered"
  ).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [routerLocation.pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isHomePage = routerLocation.pathname === "/";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "linear-gradient(135deg, rgba(10,10,10,0.97) 0%, rgba(10,15,15,0.95) 100%)"
          : "linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,15,15,0.8) 100%)",
        backdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(13,148,136,0.15)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <style>{navStyles}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4 h-16 sm:h-[70px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mm-flame-glow transition-transform duration-300"
          style={{
            background: "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(-12deg) scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0) scale(1)")}
          >
            <Flame size={20} color="white" />
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight">
            <span style={{ color: "#fff" }}>Eat</span>
            <span style={{ color: "#0d9488" }}>And</span>
            <span style={{ color: "#f59e0b" }}>Meat</span>
          </span>
        </Link>

        {/* Location — desktop only */}
        <button
          onClick={() => setShowLocationModal(true)}
          className="hidden lg:flex items-center gap-2 text-left group border-l border-white/10 pl-5 transition-all duration-300 rounded-lg px-3 py-1.5"
          style={{ background: "transparent" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(13,148,136,0.08)";
            e.currentTarget.style.borderColor = "rgba(13,148,136,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          }}
        >
          <MapPin size={16} style={{ color: "#14b8a6" }} />
          <div>
            <p
              className="font-semibold text-sm leading-tight flex items-center gap-1"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {location?.area ? `${location.area}, ${location.district}` : "Select Location"}
              <ChevronDown size={13} className="text-white/30 transition-transform duration-300 group-hover:rotate-180" />
            </p>
          </div>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 list-none ml-auto mr-2">
          {navLinks
            .filter((link) => link.roles.includes(currentUser?.role ?? null))
            .map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`mm-nav-link text-sm font-semibold tracking-wide transition-colors duration-300 ${
                    routerLocation.pathname === link.to
                      ? "text-white active"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span className="mm-nav-underline" />
                </Link>
              </li>
            ))}

          {currentUser?.role === "customer" && (
            <li>
              <Link
                to="/my-orders"
                className={`mm-nav-link relative text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  routerLocation.pathname === "/my-orders"
                    ? "text-white active"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Orders
                <span className="mm-nav-underline" />
                {activeOrders > 0 && (
                  <span
                    className="mm-badge-pulse absolute -top-2.5 -right-4 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                    background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                    boxShadow: "0 2px 10px rgba(13,148,136,0.5)",
                    }}
                  >
                    {activeOrders}
                  </span>
                )}
              </Link>
            </li>
          )}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Notification */}
          {currentUser?.role === "customer" && (
            <button
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(13,148,136,0.15)";
                e.currentTarget.style.borderColor = "rgba(13,148,136,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <Bell size={17} style={{ color: "rgba(255,255,255,0.6)" }} />
            </button>
          )}

          {/* Cart */}
          {currentUser?.role !== "company" && currentUser?.role !== "delivery" && (
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              aria-label="Cart"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(13,148,136,0.12)";
                e.currentTarget.style.borderColor = "rgba(13,148,136,0.25)";
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <ShoppingCart size={17} style={{ color: "rgba(255,255,255,0.7)" }} />
              {totalItems > 0 && (
                <span
                  className="mm-badge-pulse absolute -top-1.5 -right-1.5 text-white text-[9px] font-extrabold w-[18px] h-[18px] rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                    boxShadow: "0 2px 8px rgba(13,148,136,0.5)",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen((v) => !v)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: currentUser
                  ? "linear-gradient(135deg, #0d9488, #14b8a6)"
                  : "rgba(255,255,255,0.05)",
                border: currentUser ? "none" : "1px solid rgba(255,255,255,0.1)",
                boxShadow: currentUser ? "0 4px 15px rgba(13,148,136,0.4)" : "none",
              }}
              aria-label="Account"
              onMouseEnter={(e) => {
                if (currentUser) {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,148,136,0.6)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = currentUser
                  ? "0 4px 15px rgba(13,148,136,0.4)"
                  : "none";
              }}
            >
              <User size={16} className={currentUser ? "text-white" : "text-white/50"} />
            </button>

            {/* Dropdown */}
            <div
              className={`mm-dropdown ${profileOpen ? "open" : ""} absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden`}
              style={{
                background: "linear-gradient(135deg, rgba(20,10,10,0.98), rgba(30,15,15,0.98))",
                backdropFilter: "blur(20px)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6), 0 0 1px rgba(13,148,136,0.3)",
                border: "1px solid rgba(13,148,136,0.15)",
              }}
            >
              {currentUser ? (
                <>
                  {/* Header */}
                  <div
                    className="px-5 py-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                        style={{
                          background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                          color: "white",
                          boxShadow: "0 0 12px rgba(13,148,136,0.4)",
                        }}
                      >
                        {currentUser.fullName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: "#fff" }}>
                          {currentUser.fullName}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {currentUser.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-2">
                    {[
                      { to: "/profile", icon: User, label: "My Profile" },
                      ...(orders.length > 0
                        ? [{ to: "/my-orders", icon: Package, label: "My Orders" }]
                        : []),
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-300"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(13,148,136,0.1)";
                          e.currentTarget.style.color = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                        }}
                      >
                        <item.icon size={16} style={{ color: "#0d9488" }} />
                        {item.label}
                      </Link>
                    ))}

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-300 text-left"
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(13,148,136,0.1)";
                        e.currentTarget.style.color = "#0d9488";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                      }}
                    >
                      <LogOut size={16} style={{ color: "#0d9488" }} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-5">
                  <p className="text-sm font-bold" style={{ color: "#fff" }}>
                    Welcome
                  </p>
                  <p className="text-xs mt-1 mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Login to track orders, save addresses & more.
                  </p>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-bold w-full transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                      boxShadow: "0 4px 15px rgba(13,148,136,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(13,148,136,0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(13,148,136,0.4)";
                    }}
                  >
                    Login
                  </Link>
                  <p className="text-center text-xs mt-3" style={{ color: "rgba(255,255,255,0.4)" }}>
                    New here?{" "}
                    <Link to="/register" className="font-bold" style={{ color: "#f59e0b" }}>
                      Create account
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300"
            style={{
              background: menuOpen ? "rgba(13,148,136,0.15)" : "rgba(255,255,255,0.05)",
              border: menuOpen ? "1px solid rgba(13,148,136,0.3)" : "1px solid rgba(255,255,255,0.1)",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={20} style={{ color: "#0d9488" }} />
            ) : (
              <Menu size={20} style={{ color: "rgba(255,255,255,0.7)" }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mm-mobile-menu md:hidden flex flex-col ${menuOpen ? "open" : ""}`}
        style={{
          background: "linear-gradient(180deg, rgba(15,10,10,0.98), rgba(10,10,10,0.98))",
          borderTop: menuOpen ? "1px solid rgba(13,148,136,0.15)" : "none",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="px-5 py-2 flex flex-col gap-0">
          {/* Location */}
          <button
            onClick={() => setShowLocationModal(true)}
            className="flex items-center gap-3 py-3.5 text-sm font-semibold border-b transition-all duration-300"
            style={{
              borderColor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.1)" }}
            >
              <MapPin size={15} style={{ color: "#f59e0b" }} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                Delivering to
              </p>
              <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.8)" }}>
                {location?.area ? `${location.area}, ${location.district}` : "Select Location"}
              </p>
            </div>
          </button>

          {/* Nav Links */}
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className={`mm-mobile-link flex items-center justify-between py-3.5 text-sm font-semibold border-b transition-all duration-300`}
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                color: routerLocation.pathname === link.to ? "#fff" : "rgba(255,255,255,0.6)",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              <span>{link.label}</span>
              {routerLocation.pathname === link.to && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                    color: "white",
                  }}
                >
                  Active
                </span>
              )}
            </Link>
          ))}

          {/* Orders for customer */}
          {currentUser?.role === "customer" && (
            <Link
              to="/my-orders"
              className="mm-mobile-link flex items-center justify-between py-3.5 text-sm font-semibold border-b transition-all duration-300"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                color: routerLocation.pathname === "/my-orders" ? "#fff" : "rgba(255,255,255,0.6)",
                animationDelay: `${navLinks.length * 0.05}s`,
              }}
            >
              <div className="flex items-center gap-3">
                <Package size={16} style={{ color: "#0d9488" }} />
                My Orders
              </div>
              {activeOrders > 0 && (
                <span
                  className="mm-badge-pulse text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                    color: "white",
                  }}
                >
                  {activeOrders} active
                </span>
              )}
            </Link>
          )}

          {/* Auth Section */}
          <div className="py-4">
            {currentUser ? (
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(13,148,136,0.08), rgba(13,148,136,0.02))",
                  border: "1px solid rgba(13,148,136,0.15)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs"
                      style={{
                        background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                        color: "white",
                      }}
                    >
                      {currentUser.fullName?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: "#fff" }}>
                        Hi, {currentUser.fullName}
                      </p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300"
                    style={{
                      background: "rgba(13,148,136,0.15)",
                      color: "#0d9488",
                      border: "1px solid rgba(13,148,136,0.3)",
                    }}
                  >
                    <LogOut size={12} />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 text-white px-5 py-3 rounded-xl text-sm font-bold w-full transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, #0d9488, #14b8a6)",
                    boxShadow: "0 4px 20px rgba(13,148,136,0.4)",
                  }}
                >
                  <User size={15} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center px-5 py-3 rounded-xl text-sm font-bold w-full transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
