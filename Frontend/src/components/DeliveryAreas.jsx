import { MapPin, CheckCircle } from "lucide-react";

const DELIVERY_BG = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80";

const areas = [
  { id: 1, name: "RS Puram",        time: "30 min" },
  { id: 2, name: "Gandhipuram",     time: "25 min" },
  { id: 3, name: "Peelamedu",       time: "40 min" },
  { id: 4, name: "Saibaba Colony",  time: "35 min" },
  { id: 5, name: "Singanallur",     time: "45 min" },
  { id: 6, name: "TownHall",        time: "20 min" },
];

const DeliveryAreas = () => (
  <section className="relative py-24 px-6 lg:px-10 overflow-hidden">
    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${DELIVERY_BG})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/95 to-black/90" />

    <div className="relative z-10 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="mb-14">
        <span className="inline-block text-red-500 text-xs font-bold tracking-[3px] uppercase mb-3">
          We Come To You
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
          Delivery Near You
        </h2>
        <p className="text-white/45 mt-3">
          Fresh chicken and masalas delivered across Coimbatore zones
        </p>
      </div>

      {/* Area Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {areas.map((area, i) => (
          <div
            key={area.id}
            className="group flex items-center justify-between glass rounded-2xl px-5 py-4
              hover:glass-red hover:-translate-y-1
              hover:shadow-[0_16px_40px_rgba(239,68,68,0.15)]
              transition-all duration-350 cursor-pointer fade-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div className="flex items-center gap-3">
              {/* Pin icon */}
              <div className="flex items-center justify-center w-9 h-9 glass-red rounded-full
                text-red-300 shrink-0
                group-hover:scale-110 group-hover:-rotate-12
                transition-transform duration-350">
                <MapPin size={16} />
              </div>
              <span className="text-white font-bold text-sm">{area.name}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <CheckCircle size={13} className="text-green-400" />
              <span className="text-white/40 text-xs font-medium">~{area.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        className="inline-flex items-center gap-2.5 bg-gradient-fire text-white
          px-10 py-4 rounded-full font-bold text-sm tracking-wide
          shadow-[0_8px_30px_rgba(239,68,68,0.4)]
          hover:shadow-[0_20px_50px_rgba(239,68,68,0.65)]
          hover:-translate-y-1 hover:scale-105
          transition-all duration-300"
      >
        <MapPin size={17} />
        Check Availability
      </button>
    </div>
  </section>
);

export default DeliveryAreas;
