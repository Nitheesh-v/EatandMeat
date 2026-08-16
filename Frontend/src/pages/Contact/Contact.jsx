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
import "../Styles/Contact.css";

const primary = "#B4232C";
const deep = "#24140F";
const text = "#30231E";

export const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", company: "",
    email: "", phone: "", message: "", agreeToPolicies: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
  };

  return (
    <section className="contact-section relative overflow-hidden py-24 px-6 min-h-screen" style={{ paddingTop: 100 }}>
      <div className="contact-bg-mesh"></div>
      <div className="contact-orb contact-orb-1"></div>
      <div className="contact-orb contact-orb-2"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center contact-fade-in">
          <span className="contact-section-label">Get in Touch</span>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800, color: deep, margin: "6px 0 8px", lineHeight: 1.2 }}>
            Contact <span style={{ color: primary }}>Us</span>
          </h1>
          <p style={{ color: "#64748B", fontSize: "0.9rem", maxWidth: 480, margin: "0 auto", lineHeight: 1.5 }}>
            Have questions about our fresh chicken and masalas? We'd love to hear from you.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 contact-fade-in contact-delay-1">
          {[
            { icon: Mail, label: "Email Us", value: "support@eatandmeat.com" },
            { icon: Phone, label: "Call Us", value: "+91 98765 43210" },
            { icon: FaWhatsapp, label: "WhatsApp", value: "+91 98765 43210", whatsapp: true },
            { icon: MapPin, label: "Visit Us", value: "Coimbatore, Tamil Nadu" },
            { icon: Clock, label: "Working Hours", value: "Mon-Sat: 8AM - 8PM" },
          ].map((card) => (
            <div key={card.label} className="contact-info-card text-center p-5">
              <div className={`contact-info-icon mx-auto mb-3 ${card.whatsapp ? "whatsapp-icon" : ""}`}>
                <card.icon size={20} />
              </div>
              <div style={{ color: "#94A3B8", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                {card.label}
              </div>
              <div style={{ color: text, fontSize: "0.9rem", fontWeight: 600 }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="contact-form-card mt-10 contact-fade-in contact-delay-2">
          <h2 style={{ color: deep, fontSize: "1.25rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <MessageSquare size={20} style={{ color: primary }} />
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {[
                { id: "firstName", label: "First Name", placeholder: "Your First Name", icon: User, required: true },
                { id: "lastName", label: "Last Name", placeholder: "Your Last Name", icon: User, required: true },
              ].map((f) => (
                <div key={f.id} className="contact-input-group relative">
                  <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>{f.label}</label>
                  <f.icon size={16} className="contact-input-icon" />
                  <input type="text" id={f.id} name={f.id} value={formData[f.id]} onChange={handleChange} className="contact-input" placeholder={f.placeholder} required={f.required} />
                </div>
              ))}

              <div className="contact-input-group relative sm:col-span-2">
                <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Company</label>
                <Building2 size={16} className="contact-input-icon" />
                <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="contact-input" placeholder="Your Company (Optional)" />
              </div>

              <div className="contact-input-group relative sm:col-span-2">
                <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Email</label>
                <Mail size={16} className="contact-input-icon" />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="contact-input" placeholder="john@example.com" required />
              </div>

              <div className="contact-input-group relative sm:col-span-2">
                <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Phone Number</label>
                <Phone size={16} className="contact-input-icon" />
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="contact-input" placeholder="+91 98765 43210" required />
              </div>

              <div className="contact-input-group sm:col-span-2">
                <label style={{ display: "block", color: "#64748B", fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>Message</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className="contact-textarea" placeholder="Tell us how we can help you..." required />
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <input type="checkbox" id="agreeToPolicies" name="agreeToPolicies" checked={formData.agreeToPolicies} onChange={handleChange} required className="contact-checkbox" />
                <label htmlFor="agreeToPolicies" style={{ color: "#94A3B8", fontSize: "0.82rem", lineHeight: 1.5 }}>
                  By selecting this, you agree to our{" "}
                  <a href="#" style={{ color: primary, fontWeight: 600, textDecoration: "none" }}>privacy policy</a>.
                </label>
              </div>
            </div>

            <button type="submit" className="contact-submit-btn mt-6 w-full flex items-center justify-center gap-2" style={{ color: "white", fontWeight: 700, fontSize: "0.9rem" }}>
              <Send size={16} />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
