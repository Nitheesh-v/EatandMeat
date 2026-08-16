import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Delivery/Sidebar";
import Navbar from "../../components/Delivery/Navbar";

const animations = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(147,51,234,0.2) #f5f0f7;
}
*::-webkit-scrollbar { width: 6px; }
*::-webkit-scrollbar-track { background: #f5f0f7; }
*::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #c084fc, #f472b6);
  border-radius: 3px;
}
`;

const DeliveryLayout = () => {
  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "#faf5ff",
      }}
    >
      <style>{animations}</style>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 relative" style={{ color: "#1e293b" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DeliveryLayout;
