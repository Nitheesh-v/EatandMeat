import { ShoppingCart, User, Menu, X, Flame } from "lucide-react";
import { Link,  } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useLocation } from "../Context/LocationContext"

const navLinks = [
  { to: "/",         label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/offers",   label: "Offers" },
  { to: "/contact",  label: "Contact" },
  {to:"/aboutUs", label:"AboutUs"},
  
];


 
const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const Location                  = useLocation();

const { totalItems } = useCart()
// const { location } = useLocation()
// ;;
const { location, setShowLocationModal } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? "glass-dark shadow-2xl py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className=" max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-6">

{/* ── Logo ── */}

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Flame size={26} className="text-red-500 flicker" />
          <span className="text-2xl font-black tracking-tight text-white">
            Eat And<span className="text-red-500">Meat</span>
          </span>
        </Link>
{/* lOCATION */}
<div className="hidden lg:flex items-center gap-3">

    <div>

        <p className="text-xs text-gray-500">
            Deliver to
        </p>

        <p className="font-semibold text-sm">
            {location.area
                ? `${location.area}, ${location.district}`
                : "Select Location"}
        </p>

    </div>

    <button
    onClick={() => setShowLocationModal(true)}
    className="text-red-600 text-sm font-medium hover:underline"
>
    Change
</button>
</div>


{/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link relative text-sm font-semibold tracking-wide transition-colors duration-300
                  ${Location.pathname === link.to
                    ? "text-white active"
                    : "text-white/70 hover:text-white"
                  }`}
              >
                {link.label}
                <span className="nav-underline" />
              </Link>
            </li>
          ))}
        </ul>

{/* ── Actions ── */}
        <div className="flex items-center gap-4">
{/* Cart */}
          <Link
            to="/cart"
            className="relative text-white/80 hover:text-red-400 transition-all duration-300 hover:scale-110"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            <span
              className="badge-pulse absolute -top-2 -right-2 bg-red-500 text-white
                text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center"
            >
          {totalItems}
            </span>
          </Link>

{/* Login */}
          <Link
            to="/login"
            className="hidden sm:flex items-center gap-2 bg-gradient-fire text-white
              px-5 py-2.5 rounded-full text-sm font-bold
              shadow-[0_4px_20px_rgba(239,68,68,0.4)]
              hover:shadow-[0_8px_30px_rgba(239,68,68,0.6)]
              hover:-translate-y-0.5 hover:scale-105
              transition-all duration-300"
          >
            <User size={15} />
            Login
          </Link>

{/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-1 transition-transform duration-200 active:scale-90"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

{/* ── Mobile menu ── */}
      <div
        className={`mobile-menu glass-dark md:hidden flex flex-col ${menuOpen ? "open" : ""}`}
      >
        <div className="px-6 py-2 flex flex-col gap-0">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="py-3 text-sm font-semibold text-white/70 hover:text-red-400
                border-b border-white/5 last:border-none
                hover:pl-2 transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
