import { useState } from "react";
import deliveryZones from "../../data/deliveryZones/deliveryZones";
import { useLocation } from "../../Context/LocationContext";
import {
  MapPin,
  ChevronDown,
  CheckCircle2,
  X,
  Truck,
  Loader2,
} from "lucide-react";

const deliveryModalStyles = `
.dm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  animation: dmOverlayIn 0.3s ease-out;
  padding: 20px;
}
@keyframes dmOverlayIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.dm-card {
  background: linear-gradient(135deg, #2d0a0a 0%, #1a0505 100%);
  border: 1px solid rgba(212, 175, 55, 0.22);
  border-radius: 18px;
  padding: 24px 22px;
  width: 100%;
  max-width: 340px;
  position: relative;
  overflow: hidden;
  animation: dmCardIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5), 0 0 40px rgba(220, 38, 38, 0.1);
}
@keyframes dmCardIn {
  from { opacity: 0; transform: scale(0.9) translateY(16px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.dm-card::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.06), transparent);
  animation: dmShimmer 4s ease-in-out infinite;
}
@keyframes dmShimmer {
  0% { left: -100%; }
  50%, 100% { left: 100%; }
}
.dm-close-btn {
  position: absolute;
  top: 12px; right: 12px;
  width: 28px; height: 28px;
  border-radius: 8px;
  border: 1px solid rgba(212, 175, 55, 0.25);
  background: rgba(69, 10, 10, 0.4);
  color: #9ca3af;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
}
.dm-close-btn:hover {
  background: rgba(220, 38, 38, 0.2);
  color: white;
}
.dm-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
}
.dm-icon-wrap {
  width: 40px; height: 40px;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(234, 88, 12, 0.15));
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.dm-title {
  color: white;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.2;
}
.dm-title .accent {
  background: linear-gradient(135deg, #ef4444, #f59e0b);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.dm-subtitle {
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 2px;
}
.dm-select-wrap {
  position: relative;
  margin-bottom: 12px;
  z-index: 1;
}
.dm-select {
  width: 100%;
  background: rgba(69, 10, 10, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.22);
  border-radius: 10px;
  padding: 10px 36px 10px 36px;
  color: #f3f4f6;
  font-size: 0.85rem;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.dm-select:focus {
  outline: none;
  border-color: rgba(212, 175, 55, 0.6);
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.15);
}
.dm-select:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.dm-select option {
  background: #2d0a0a;
  color: #f3f4f6;
}
.dm-select-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
}
.dm-select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  pointer-events: none;
}
.dm-check-btn {
  width: 100%;
  background: linear-gradient(135deg, #dc2626 0%, #92721e 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 12px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(220, 38, 38, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  z-index: 1;
}
.dm-check-btn::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  transform: scale(0);
  transition: transform 0.5s ease;
}
.dm-check-btn:hover::after { transform: scale(1); }
.dm-check-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 38, 38, 0.6);
}
.dm-check-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.dm-error-text {
  color: #f87171;
  font-size: 0.75rem;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 1;
}
`;

const DeliveryModal = () => {
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setLocation, showLocationModal, setShowLocationModal } = useLocation();

  const areas =
    deliveryZones.find((item) => item.district === district)?.areas || [];

  const handleCheck = () => {
    setError("");

    if (!district || !area) {
      setError("Please select both district and area.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLocation({ district, area, available: true });
      setShowLocationModal(false);
      setLoading(false);
    }, 800);
  };

  const handleClose = () => {
    setShowLocationModal(false);
    setDistrict("");
    setArea("");
    setError("");
  };

  if (!showLocationModal) return null;

  return (
    <>
      <style>{deliveryModalStyles}</style>
      <div className="dm-overlay" onClick={handleClose}>
        <div className="dm-card" onClick={(e) => e.stopPropagation()}>
          {/* Close Button */}
          <button className="dm-close-btn" onClick={handleClose}>
            <X size={14} />
          </button>

          {/* Header */}
          <div className="dm-header">
            <div className="dm-icon-wrap">
              <Truck size={18} className="text-red-400" />
            </div>
            <div>
              <h2 className="dm-title">
                Select <span className="accent">Location</span>
              </h2>
              <p className="dm-subtitle">We deliver to your doorstep</p>
            </div>
          </div>

          {/* District */}
          <div className="dm-select-wrap">
            <MapPin size={14} className="dm-select-icon" />
            <select
              className="dm-select"
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setArea("");
                setError("");
              }}
            >
              <option value="">Select District</option>
              {deliveryZones.map((zone) => (
                <option key={zone.district} value={zone.district}>
                  {zone.district}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="dm-select-arrow" />
          </div>

          {/* Area */}
          <div className="dm-select-wrap">
            <MapPin size={14} className="dm-select-icon" />
            <select
              className="dm-select"
              value={area}
              onChange={(e) => {
                setArea(e.target.value);
                setError("");
              }}
              disabled={!district}
            >
              <option value="">
                {district ? "Select Area" : "Select district first"}
              </option>
              {areas.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="dm-select-arrow" />
          </div>

          {/* Error */}
          {error && (
            <div className="dm-error-text">
              <X size={12} />
              {error}
            </div>
          )}

          {/* Button */}
          <button
            onClick={handleCheck}
            className="dm-check-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <CheckCircle2 size={14} />
                Check Availability
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeliveryModal;