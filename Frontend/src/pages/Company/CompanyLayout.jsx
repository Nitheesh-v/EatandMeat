import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ChefHat,
  PackageCheck,
  Bike,
  BarChart3,
  LogOut,
  Flame,
} from "lucide-react";
import { useEffect } from "react";

const companyLayoutStyles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');

/* Full page takeover — no navbar/footer leakage */
.cl-page-wrapper {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #F6F3EF;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}
.cl-sidebar {
  width: 240px;
  background: linear-gradient(180deg, #2B1B14 0%, #1A0F0A 100%);
  color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid rgba(100,31,40, 0.15);
}
.cl-sidebar-line {
  height: 3px;
  background: linear-gradient(90deg, #641F28, #C9A227, #93c5fd);
  flex-shrink: 0;
}
.cl-logo-area {
  padding: 22px 18px;
  border-bottom: 1px solid rgba(100,31,40, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
}
.cl-nav-area {
  flex: 1;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}
.cl-nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  color: #d8cfc7;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}
.cl-nav-link:hover {
  background: rgba(100,31,40, 0.12);
  color: white;
}
.cl-nav-link.active {
  background: rgba(100,31,40, 0.18);
  color: white;
  border-color: rgba(100,31,40, 0.35);
}
.cl-logout-area {
  padding: 14px 10px;
  border-top: 1px solid rgba(100,31,40, 0.15);
}
.cl-logout-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 11px 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 10px;
  color: #fca5a5;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.cl-logout-btn:hover {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}
.cl-main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}
.cl-topbar {
  background: white;
  border-bottom: 1px solid rgba(100,31,40, 0.08);
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.cl-topbar-title {
  font-family: 'Fraunces', serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #2B1B14;
  margin: 0;
}
.cl-topbar-sub {
  color: #8B7355;
  font-size: 0.8rem;
  margin: 2px 0 0 0;
}
.cl-topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cl-store-tag {
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.25);
  color: #16a34a;
  padding: 7px 14px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.8rem;
}
.cl-store-dot {
  width: 7px;
  height: 7px;
  background: #22c55e;
  border-radius: 50%;
  animation: clPulseDot 2s ease-in-out infinite;
}
@keyframes clPulseDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.cl-user-tag {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px 5px 5px;
  border-radius: 20px;
  border: 1px solid rgba(100,31,40, 0.15);
  background: white;
}
.flicker {
  animation: flicker 3s ease-in-out infinite;
}
@keyframes flicker {
  0%,100% { opacity: 1; }
  50%      { opacity: 0.65; }
}
.cl-user-avatar {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #641F28, #C9A227);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.7rem;
}
.cl-user-label {
  font-weight: 600;
  color: #2B1B14;
  font-size: 0.8rem;
}
.cl-body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
@media (max-width: 900px) {
  .cl-sidebar { width: 64px; }
  .cl-logo-text, .cl-nav-link span, .cl-logout-btn span { display: none; }
  .cl-nav-link { justify-content: center; padding: 11px; }
  .cl-logout-btn { justify-content: center; padding: 11px; }
  .cl-logo-area { justify-content: center; padding: 18px 10px; }
}
`;

const navItems = [
  { to: "/company/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/company/orders", label: "Orders", icon: ShoppingBag },
  { to: "/company/preparing", label: "Preparing", icon: ChefHat },
  { to: "/company/packed", label: "Packed", icon: PackageCheck },
  { to: "/company/delivery-partners", label: "Delivery Partners", icon: Bike },
  { to: "/company/reports", label: "Reports", icon: BarChart3 },
];

const CompanyLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <style>{companyLayoutStyles}</style>
      <div className="cl-page-wrapper">
        {/* Sidebar */}
        <aside className="cl-sidebar">
          <div className="cl-sidebar-line"></div>

          <div className="cl-logo-area">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Flame size={24} className="flicker" style={{ color: "#641F28" }} />
              <span className="text-xl font-black tracking-tight text-white cl-logo-text">
                Eat And<span style={{ color: "#641F28" }}>Meat</span>
              </span>
            </Link>
          </div>

          <nav className="cl-nav-area">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `cl-nav-link ${isActive ? "active" : ""}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="cl-logout-area">
            <Link to="/login">
              <button className="cl-logout-btn">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
            </Link>
          
          </div>
        </aside>

        {/* Main */}
        <div className="cl-main-area">
          <header className="cl-topbar">
            <div>
              <h2 className="cl-topbar-title">Company Dashboard</h2>
              <p className="cl-topbar-sub">Manage orders and monitor your business</p>
            </div>
            <div className="cl-topbar-right">
              <div className="cl-store-tag">
                <span className="cl-store-dot"></span>
                Store Open
              </div>
              <div className="cl-user-tag">
                <div className="cl-user-avatar">A</div>
                <span className="cl-user-label">Admin</span>
              </div>
            </div>
          </header>

          <div className="cl-body">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyLayout;