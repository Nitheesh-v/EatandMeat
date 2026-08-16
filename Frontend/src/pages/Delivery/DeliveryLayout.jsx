import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Delivery/Sidebar";
import Navbar from "../../components/Delivery/Navbar";

const DeliveryLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FCF8FA" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DeliveryLayout;
