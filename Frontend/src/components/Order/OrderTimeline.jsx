import { CheckCircle2, Circle } from "lucide-react";

const steps = [
  "Pending",
  "Accepted",
  "Preparing",
  "Packed",
  "Assigned",
  "Picked Up",
  "Out For Delivery",
  "Delivered",
];

const primary = "#B4232C";
const gold = "#C9A227";

export default function OrderTimeline({ status }) {
  const currentIndex = steps.indexOf(status);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", paddingLeft: 28 }}>
      {/* Vertical line */}
      <div style={{
        position: "absolute", left: 11, top: 8, bottom: 8, width: 2,
        background: "#E2E8F0", borderRadius: 1,
      }} />
      {/* Active line */}
      <div style={{
        position: "absolute", left: 11, top: 8, width: 2, borderRadius: 1,
        height: currentIndex >= 0 ? `${((currentIndex + 1) / steps.length) * 100}%` : "0%",
        background: `linear-gradient(180deg, ${primary}, ${gold})`,
        transition: "height 0.5s ease",
      }} />

      {steps.map((step, index) => {
        const isDone = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "6px 0",
            position: "relative", zIndex: 1,
          }}>
            {/* Icon */}
            {isDone ? (
              <CheckCircle2
                size={18}
                style={{
                  color: isCurrent ? primary : "#16A34A",
                  filter: isCurrent ? `drop-shadow(0 0 6px ${primary}60)` : "none",
                }}
                fill={isCurrent ? `${primary}20` : "rgba(22,163,74,0.1)"}
              />
            ) : (
              <Circle
                size={18}
                style={{ color: "#CBD5E1" }}
              />
            )}

            {/* Label */}
            <span style={{
              fontSize: "0.82rem",
              fontWeight: isDone ? 600 : 400,
              color: isCurrent ? primary : isDone ? "#16A34A" : "#94A3B8",
            }}>
              {step}
            </span>

            {/* Current badge */}
            {isCurrent && (
              <span style={{
                fontSize: "0.6rem", fontWeight: 700, padding: "2px 8px", borderRadius: 6,
                background: `${primary}12`, color: primary,
                border: `1px solid ${primary}25`,
              }}>
                Current
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
