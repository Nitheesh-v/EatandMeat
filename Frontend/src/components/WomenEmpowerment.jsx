import WomenImg from "../assets/womenImg.jpeg";

const WomenEmpowerment = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6 bg-gray-900 min-h-[600px]">
      {/* Background Image with Dark Overlay — Women Delivery Themed */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?w=1920&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="animate-fadeInLeft">
          {/* Badge */}
          <span className="inline-block bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 px-5 py-2 rounded-full text-sm font-semibold">
            ✨ Women Empowerment Initiative
          </span>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mt-6 text-white leading-tight">
            Empowering Women,
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {" "}
              Delivering Freshness
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-gray-400 leading-8 text-lg">
            Every order you place helps create employment opportunities for
            women in our community. Our trained women delivery partners ensure
            your fresh chicken and masalas reach your doorstep safely,
            hygienically and on time.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 group cursor-default">
              <div className="text-2xl mb-2">👩</div>
              <span className="text-gray-300 font-medium group-hover:text-red-400 transition-colors">
                Women Delivery Partners
              </span>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 group cursor-default">
              <div className="text-2xl mb-2">🤝</div>
              <span className="text-gray-300 font-medium group-hover:text-red-400 transition-colors">
                Safe & Trusted Service
              </span>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 group cursor-default">
              <div className="text-2xl mb-2">❤️</div>
              <span className="text-gray-300 font-medium group-hover:text-red-400 transition-colors">
                Supporting Local Families
              </span>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 group cursor-default">
              <div className="text-2xl mb-2">🚚</div>
              <span className="text-gray-300 font-medium group-hover:text-red-400 transition-colors">
                Fast Doorstep Delivery
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="mt-8 bg-gradient-to-r from-red-600 to-red-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300">
            Learn More About Our Mission
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center animate-fadeInRight">
          <div className="relative">
            {/* Image Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-orange-500/20 rounded-3xl blur-2xl scale-110 animate-imageGlow"></div>

            {/* Image */}
            <img
              src={WomenImg}
              alt="Women Delivery Partner"
              className="relative max-w-md w-full rounded-3xl border border-red-500/20 shadow-2xl hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />

            {/* Fallback if image fails */}
            <div className="relative max-w-md w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-red-500/20 shadow-2xl items-center justify-center hidden">
              <div className="text-center">
                <div className="text-6xl mb-4">👩</div>
                <p className="text-gray-400 font-semibold">
                  Women Delivery Partner
                </p>
              </div>
            </div>

            {/* Stat Badge */}
            <div className="absolute -bottom-4 -left-4 bg-gray-800/80 backdrop-blur-md border border-red-500/30 rounded-xl px-5 py-3 shadow-lg animate-badgeBounce">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-xs text-gray-400 font-semibold">
                Women Empowered
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes imageGlow {
          0%, 100% { opacity: 0.6; transform: scale(1.1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes badgeBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out 0.2s both; }
        .animate-imageGlow { animation: imageGlow 4s ease-in-out infinite; }
        .animate-badgeBounce { animation: badgeBounce 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default WomenEmpowerment;
