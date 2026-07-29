import WomenImg from "../assets/womenImg.jpeg";


const WomenEmpowerment = () => {
  return (
    <section className="women-section relative overflow-hidden py-24 px-6">
      {/* ===== ADVANCED ANIMATED BACKGROUND ===== */}

      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-mesh-gradient"></div>

      {/* Background image layer (optional - add your image) */}
      <div className="absolute inset-0 bg-img-layer"></div>

      {/* Hexagonal grid pattern */}
      <div className="absolute inset-0 hex-grid"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
        <div className="particle particle-7"></div>
        <div className="particle particle-8"></div>
        <div className="particle particle-9"></div>
        <div className="particle particle-10"></div>
      </div>

      {/* Light rays */}
      <div className="light-rays">
        <div className="ray ray-1"></div>
        <div className="ray ray-2"></div>
        <div className="ray ray-3"></div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="geo-shape geo-diamond-1"></div>
        <div className="geo-shape geo-circle-1"></div>
        <div className="geo-shape geo-diamond-2"></div>
        <div className="geo-shape geo-circle-2"></div>
        <div className="geo-shape geo-ring-1"></div>
        <div className="geo-shape geo-ring-2"></div>
      </div>

      {/* Glowing orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Diagonal moving lines */}
      <div className="diagonal-lines">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`diag-line diag-line-${i + 1}`}></div>
        ))}
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 vignette-overlay"></div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="fade-in-left">
          <span className="glassmorphism-badge inline-block bg-red-500/20 text-red-400 px-5 py-2.5 rounded-full text-sm font-semibold border border-red-500/30 backdrop-blur-sm">
            ✨ Women Empowerment Initiative
          </span>

          <h2 className="text-5xl font-bold mt-8 text-white leading-tight">
            Empowering Women,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 animate-text-shimmer">
              {" "}Delivering Freshness
            </span>
          </h2>

          <p className="mt-6 text-gray-300 leading-8 text-lg">
            Every order you place helps create employment opportunities for
            women in our community. Our trained women delivery partners ensure
            your fresh chicken and masalas reach your doorstep safely, hygienically
            and on time.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-10">
            <div className="glassmorphism-card group">
              <div className="text-2xl mb-2">👩</div>
              <span className="text-gray-200 font-medium group-hover:text-red-400 transition-colors">
                Women Delivery Partners
              </span>
            </div>
            <div className="glassmorphism-card group">
              <div className="text-2xl mb-2">🛡</div>
              <span className="text-gray-200 font-medium group-hover:text-red-400 transition-colors">
                Safe &amp; Trusted Service
              </span>
            </div>
            <div className="glassmorphism-card group">
              <div className="text-2xl mb-2">❤️</div>
              <span className="text-gray-200 font-medium group-hover:text-red-400 transition-colors">
                Supporting Local Families
              </span>
            </div>
            <div className="glassmorphism-card group">
              <div className="text-2xl mb-2">🚚</div>
              <span className="text-gray-200 font-medium group-hover:text-red-400 transition-colors">
                Fast Doorstep Delivery
              </span>
            </div>
          </div>

          <button className="meathub-cta mt-10 px-8 py-4 rounded-full font-semibold text-white text-lg">
            Learn More About Our Mission
          </button>
        </div>

        {/* Right Image */}
        <div className="flex justify-center fade-in-right">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 to-orange-500/20 rounded-3xl blur-2xl scale-110 image-glow"></div>
            <img
              src={WomenImg}
              alt="Women Delivery Partner"
              className="relative max-w-md w-full rounded-3xl border border-red-500/20 image-card-shadow"
            />
            <div className="absolute -bottom-4 -left-4 glassmorphism-badge bg-red-900/60 text-white px-5 py-3 rounded-xl border border-red-500/30 backdrop-blur-md animate-bounce-slow">
              <span className="text-2xl font-bold text-orange-400">500+</span>
              <span className="block text-xs text-gray-300">Women Empowered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenEmpowerment;
