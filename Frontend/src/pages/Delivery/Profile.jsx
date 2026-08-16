import {
  User,
  Mail,
  Phone,
  Bike,
  Star,
  MapPin,
  FileBadge,
  Pencil,
  Shield,
  Calendar,
  Trophy,
  Zap,
  Award,
  Heart,
  IndianRupee,
  CircleCheckBig,
} from "lucide-react";

export const Profile = () => {
  const achievements = [
    { icon: Trophy, label: "Top Performer", desc: "Aug 2026", color: "#f59e0b" },
    { icon: Zap, label: "Fast Delivery", desc: "50 orders", color: "#9333ea" },
    { icon: Award, label: "5-Star Rated", desc: "100 reviews", color: "#10b981" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
            boxShadow: "0 4px 15px rgba(147,51,234,0.4)",
          }}
        >
          <User size={20} color="white" />
        </div>
        <div>
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e0d0d0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Profile
          </h1>
          <p className="text-sm" style={{ color: "#94a3b8" }}>
            Manage your delivery partner profile
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left - Profile Card */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(147,51,234,0.03) 0%, rgba(147,51,234,0.01) 100%)",
            border: "1px solid rgba(0,0,0,0.06)",
            backdropFilter: "blur(20px)",
            animation: "fadeSlideUp 0.5s ease both",
          }}
        >
          {/* Profile header with gradient */}
          <div
            className="h-28 relative"
            style={{
              background: "linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #f59e0b 100%)",
            }}
          >
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-12"
              style={{
                background: "linear-gradient(to top, rgba(15,10,10,1), transparent)",
              }}
            />
          </div>

          <div className="px-6 pb-6 -mt-16 relative">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/200"
                  alt=""
                  className="w-28 h-28 rounded-full"
                  style={{
                    border: "4px solid #0f0a0a",
                    boxShadow: "0 8px 30px rgba(147,51,234,0.3)",
                  }}
                />
                <div
                  className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #34d399)",
                    border: "3px solid #0f0a0a",
                    boxShadow: "0 0 12px rgba(16,185,129,0.5)",
                  }}
                >
                  <Shield size={14} color="white" />
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <h2 className="text-2xl font-extrabold" style={{ color: "#1e293b" }}>
                Rahul Kumar
              </h2>
              <p
                className="text-xs font-bold uppercase tracking-wider mt-1"
                style={{ color: "#f59e0b" }}
              >
                Delivery Partner
              </p>

              {/* Rating */}
              <div className="flex items-center justify-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      fill="#fbbf24"
                      color="#fbbf24"
                    />
                  ))}
                </div>
                <span className="font-bold text-sm" style={{ color: "#1e293b" }}>
                  4.9
                </span>
                <span className="text-xs" style={{ color: "#94a3b8" }}>
                  (246 reviews)
                </span>
              </div>

              {/* Edit button */}
              <button
                className="mt-5 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #9333ea 0%, #7c3aed 60%, #6d28d9 100%)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(147,51,234,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(147,51,234,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(147,51,234,0.4)";
                }}
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2 mt-5">
              {[
                { label: "Deliveries", value: "256", icon: CircleCheckBig, color: "#10b981" },
                { label: "Rating", value: "4.9", icon: Star, color: "#f59e0b" },
                { label: "Status", value: "Online", icon: Zap, color: "#9333ea" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl text-center transition-all duration-300"
                  style={{
                    background: `${stat.color}08`,
                    border: `1px solid ${stat.color}20`,
                  }}
                >
                  <stat.icon size={16} style={{ color: stat.color, margin: "0 auto" }} />
                  <p className="text-lg font-extrabold mt-1" style={{ color: "#1e293b" }}>
                    {stat.value}
                  </p>
                  <p className="text-[9px] font-medium" style={{ color: "#94a3b8" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(147,51,234,0.03) 0%, rgba(147,51,234,0.01) 100%)",
              border: "1px solid rgba(0,0,0,0.06)",
              backdropFilter: "blur(20px)",
              animation: "fadeSlideUp 0.5s ease 0.1s both",
            }}
          >
            <div className="h-1" style={{ background: "linear-gradient(90deg, #9333ea, #ec4899)" }} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-extrabold text-xl" style={{ color: "#1e293b" }}>
                  Personal Information
                </h2>
                <Pencil size={16} style={{ color: "#94a3b8" }} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: User, label: "Full Name", value: "Rahul Kumar", color: "#9333ea" },
                  { icon: Mail, label: "Email", value: "rahul@gmail.com", color: "#3b82f6" },
                  { icon: Phone, label: "Phone", value: "+91 9876543210", color: "#10b981" },
                  { icon: Bike, label: "Vehicle", value: "Bike", color: "#f59e0b" },
                  { icon: FileBadge, label: "License No", value: "TN123456789", color: "#8b5cf6" },
                  { icon: MapPin, label: "Service Area", value: "Coimbatore", color: "#ec4899" },
                  { icon: Calendar, label: "Joined", value: "15 Mar 2025", color: "#06b6d4" },
                  { icon: Shield, label: "Verified", value: "KYC Complete", color: "#10b981" },
                ].map((info, i) => (
                  <div
                    key={info.label}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                    style={{
                      background: "rgba(147,51,234,0.02)",
                      border: "1px solid rgba(147,51,234,0.03)",
                      animation: `fadeSlideUp 0.4s ease ${0.2 + i * 0.05}s both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${info.color}30`;
                      e.currentTarget.style.background = `${info.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(147,51,234,0.03)";
                      e.currentTarget.style.background = "rgba(147,51,234,0.02)";
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${info.color}12`,
                        boxShadow: `0 0 12px ${info.color}20`,
                      }}
                    >
                      <info.icon size={18} style={{ color: info.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {info.label}
                      </p>
                      <h3 className="font-bold text-sm mt-0.5" style={{ color: "#1e293b" }}>
                        {info.value}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(147,51,234,0.03) 0%, rgba(147,51,234,0.01) 100%)",
              border: "1px solid rgba(0,0,0,0.06)",
              backdropFilter: "blur(20px)",
              animation: "fadeSlideUp 0.5s ease 0.3s both",
            }}
          >
            <div className="h-1" style={{ background: "linear-gradient(90deg, #f59e0b, #f6e3a1)" }} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-extrabold text-xl" style={{ color: "#1e293b" }}>
                  Achievements
                </h2>
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>
                  3 Badges
                </span>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {achievements.map((badge, i) => (
                  <div
                    key={badge.label}
                    className="p-5 rounded-xl text-center transition-all duration-500 group"
                    style={{
                      background: `linear-gradient(135deg, ${badge.color}08, ${badge.color}03)`,
                      border: `1px solid ${badge.color}20`,
                      animation: `fadeSlideUp 0.4s ease ${0.4 + i * 0.1}s both`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${badge.color}50`;
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = `0 12px 30px ${badge.color}20`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${badge.color}20`;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-3 transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${badge.color}, ${badge.color}aa)`,
                        boxShadow: `0 8px 24px ${badge.color}40`,
                      }}
                    >
                      <badge.icon size={24} color="white" />
                    </div>
                    <h3 className="font-extrabold text-sm" style={{ color: "#1e293b" }}>
                      {badge.label}
                    </h3>
                    <p className="text-[10px] mt-1" style={{ color: "#94a3b8" }}>
                      {badge.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Online Button */}
          <div
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))",
              border: "1px solid rgba(16,185,129,0.2)",
              animation: "fadeSlideUp 0.5s ease 0.5s both",
            }}
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #34d399)",
                    boxShadow: "0 4px 15px rgba(16,185,129,0.4)",
                  }}
                >
                  <Zap size={22} color="white" />
                </div>
                <div>
                  <h3 className="font-extrabold" style={{ color: "#1e293b" }}>
                    You&apos;re Online
                  </h3>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>
                    Ready to accept delivery orders
                  </p>
                </div>
              </div>
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #9333ea, #7c3aed)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(147,51,234,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(147,51,234,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(147,51,234,0.4)";
                }}
              >
                <Heart size={16} />
                Stay Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
