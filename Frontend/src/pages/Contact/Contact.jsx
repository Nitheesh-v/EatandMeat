import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Building2,
} from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../Styles/Contact.css"

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
    agreeToPolicies: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="contact-section relative overflow-hidden py-24 px-6 min-h-screen">
      {/* Background layers */}
      <div className="contact-bg-mesh"></div>
      <div className="contact-hex-grid"></div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="contact-particle contact-particle-1"></div>
        <div className="contact-particle contact-particle-2"></div>
        <div className="contact-particle contact-particle-3"></div>
        <div className="contact-particle contact-particle-4"></div>
        <div className="contact-particle contact-particle-5"></div>
        <div className="contact-particle contact-particle-6"></div>
      </div>

      <div className="contact-orb contact-orb-1"></div>
      <div className="contact-orb contact-orb-2"></div>
      <div className="contact-vignette"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center contact-fade-in">
          <span className="contact-section-label">Get in Touch</span>
          <h1 className="text-white text-[2.5rem] md:text-[1.75rem] font-extrabold text-center leading-tight">
            Contact <span className="contact-accent-text">Sales</span>
          </h1>
          <p className="text-[#9ca3af] text-[1.1rem] text-center mt-3 max-w-[500px] mx-auto">
            Have questions about our fresh chicken and masalas? We'd love to
            hear from you.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 contact-fade-in contact-delay-1">
          <div className="contact-info-card text-center p-6">
            <div className="contact-info-icon mx-auto mb-[14px]">
              <Mail size={22} />
            </div>
            <div className="text-[#9ca3af] text-[0.8rem] font-semibold uppercase tracking-wider mb-1">
              Email Us
            </div>
            <div className="text-white text-[1rem] font-semibold">
              support@meathub.com
            </div>
          </div>

          <div className="contact-info-card text-center p-6">
            <div className="contact-info-icon mx-auto mb-[14px]">
              <Phone size={22} />
            </div>
            <div className="text-[#9ca3af] text-[0.8rem] font-semibold uppercase tracking-wider mb-1">
              Call Us
            </div>
            <div className="text-white text-[1rem] font-semibold">
              +91 98765 43210
            </div>
          </div>

          <div className="contact-info-card text-center p-6">
            <div className="contact-info-icon whatsapp-icon mx-auto mb-[14px]">
              <FaWhatsapp size={22} />
            </div>
            <div className="text-[#9ca3af] text-[0.8rem] font-semibold uppercase tracking-wider mb-1">
              WhatsApp
            </div>
            <div className="text-white text-[1rem] font-semibold">
              +91 98765 43210
            </div>
          </div>

          <div className="contact-info-card text-center p-6">
            <div className="contact-info-icon mx-auto mb-[14px]">
              <MapPin size={22} />
            </div>
            <div className="text-[#9ca3af] text-[0.8rem] font-semibold uppercase tracking-wider mb-1">
              Visit Us
            </div>
            <div className="text-white text-[1rem] font-semibold">
              Coimbatore, Tamil Nadu
            </div>
          </div>

          <div className="contact-info-card text-center p-6">
            <div className="contact-info-icon mx-auto mb-[14px]">
              <Clock size={22} />
            </div>
            <div className="text-[#9ca3af] text-[0.8rem] font-semibold uppercase tracking-wider mb-1">
              Working Hours
            </div>
            <div className="text-white text-[1rem] font-semibold">
              Mon-Sat: 8AM - 8PM
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-card mt-12 contact-fade-in contact-delay-2">
          <h2 className="text-white text-[1.5rem] font-bold flex items-center gap-[10px] mb-8">
            <MessageSquare size={24} className="text-red-400" />
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {/* First Name */}
              <div className="contact-input-group relative mb-5">
                <label
                  htmlFor="firstName"
                  className="block text-[#d1d5db] text-[0.85rem] font-semibold mb-2"
                >
                  First Name
                </label>
                <User size={18} className="contact-input-icon" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder="Your First Name"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="contact-input-group relative mb-5">
                <label
                  htmlFor="lastName"
                  className="block text-[#d1d5db] text-[0.85rem] font-semibold mb-2"
                >
                  Last Name
                </label>
                <User size={18} className="contact-input-icon" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder="Your Last Name "
                  required
                />
              </div>

              {/* Company */}
              <div className="contact-input-group relative mb-5 sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-[#d1d5db] text-[0.85rem] font-semibold mb-2"
                >
                  Company
                </label>
                <Building2 size={18} className="contact-input-icon" />
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder="Your Company (Optional)"
                />
              </div>

              {/* Email */}
              <div className="contact-input-group relative mb-5 sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-[#d1d5db] text-[0.85rem] font-semibold mb-2"
                >
                  Email
                </label>
                <Mail size={18} className="contact-input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Phone */}
              <div className="contact-input-group relative mb-5 sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block text-[#d1d5db] text-[0.85rem] font-semibold mb-2"
                >
                  Phone Number
                </label>
                <Phone size={18} className="contact-input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="contact-input"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              {/* Message */}
              <div className="contact-input-group mb-5 sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-[#d1d5db] text-[0.85rem] font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-textarea"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-start gap-3 sm:col-span-2 mt-5">
                <input
                  type="checkbox"
                  id="agreeToPolicies"
                  name="agreeToPolicies"
                  checked={formData.agreeToPolicies}
                  onChange={handleChange}
                  required
                  className="contact-checkbox"
                />
                <label
                  htmlFor="agreeToPolicies"
                  className="text-[#9ca3af] text-[0.85rem] leading-relaxed"
                >
                  By selecting this, you agree to our{" "}
                  <a href="#" className="text-[#fca5a5] font-semibold hover:text-white transition-colors">
                    privacy policy
                  </a>
                  .
                </label>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="contact-submit-btn mt-8 w-full flex items-center justify-center gap-[10px] text-white font-bold text-[1rem]">
              <Send size={18} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
