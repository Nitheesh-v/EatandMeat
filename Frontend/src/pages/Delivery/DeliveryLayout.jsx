import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Delivery/Sidebar";
import Navbar from "../../components/Delivery/Navbar";

const animations = `
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 4px 20px rgba(212,33,60,0.5), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  50% {
    box-shadow: 0 4px 30px rgba(212,33,60,0.8), 0 0 40px rgba(255,107,53,0.3), inset 0 1px 0 rgba(255,255,255,0.2);
  }
}

@keyframes pulse-dot {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

@keyframes pulse-badge {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

* {
  scrollbar-width: thin;
  scrollbar-color: rgba(212,33,60,0.3) transparent;
}

*::-webkit-scrollbar {
  width: 6px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #d4213c, #96101f);
  border-radius: 3px;
}
`;

const DeliveryLayout = () => {
  return (
    <div className="flex min-h-screen" style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)" }}>
      <style>{animations}</style>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DeliveryLayout;
