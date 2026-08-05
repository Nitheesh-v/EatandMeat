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

export default function OrderTimeline({ status }) {
  const currentIndex = steps.indexOf(status);

  return (
    <div className="mt-4">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3 mb-2">
          <div className="text-xl">
            {index <= currentIndex ? "✅" : "⚪"}
          </div>

          <span
            className={
              index <= currentIndex
                ? "font-semibold text-green-700"
                : "text-gray-400"
            }
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}