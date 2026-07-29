import { Link } from "react-router-dom";
import { Flame, Phone, MapPin, Clock,  } from "lucide-react";

const navLinks = [
  { id: 1, name: "Home",     to: "/" },
  { id: 2, name: "Products", to: "/products" },
  { id: 3, name: "Offers",   to: "/offers" },
  { id: 4, name: "Contact",  to: "/contact" },
  {id:5,name:"About Us" , to:"/aboutUs"}
];

const contacts = [
  { Icon: Phone,  text: "+91 98765 43210" },
  { Icon: MapPin, text: "Coimbatore, Tamil Nadu" },
  { Icon: Clock,  text: "8 AM – 10 PM, Daily" },
];

const socials = [
  { Icon: Flame, label: "Instagram" },
  { Icon: Flame,  label: "Facebook"  },
  { Icon: Flame,   label: "Twitter"   },
];

const Footer = () => (
  <footer className="relative bg-[#030000] border-t border-red-500/10 overflow-hidden">
    {/* Ambient top glow */}
    <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2
      w-[700px] h-[300px] bg-red-600/5 rounded-full blur-3xl" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12
        border-b border-white/[0.06]">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <Flame size={24} className="text-red-500 flicker" />
            <span className="text-2xl font-black text-white tracking-tight">
              Eat And <span className="text-red-500">Meat</span>
            </span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
            Fresh chicken and authentic masalas delivered hygienically to your doorstep.
            Quality you can taste, freshness you can trust.
          </p>
          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex items-center justify-center w-10 h-10 glass rounded-full
                  text-white/50 hover:glass-red hover:text-red-300
                  hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(239,68,68,0.25)]
                  transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-[2.5px] mb-5">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.to}
                  className="group flex items-center gap-2 text-white/50 text-sm font-medium
                    hover:text-red-300 transition-all duration-300"
                >
                  <span className="text-red-500 text-xs opacity-0 -translate-x-1
                    group-hover:opacity-100 group-hover:translate-x-0
                    transition-all duration-300">
                    →
                  </span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-[2.5px] mb-5">
            Contact Us
          </h3>
          <div className="flex flex-col gap-4">
            {contacts.map(({ Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 text-white/45 text-sm
                  hover:text-white/80 transition-colors duration-300"
              >
                <Icon size={15} className="text-red-500 shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between
        pt-7 gap-3 text-[13px] text-white/25">
        <span>© 2026 MeatHub. All rights reserved.</span>
        <span>Made with ❤️ in Coimbatore</span>
      </div>
    </div>
  </footer>
);

export default Footer;
