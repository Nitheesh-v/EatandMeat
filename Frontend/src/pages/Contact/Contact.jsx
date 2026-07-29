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

const contactStyles = `
.contact-section {
  background: linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
.contact-bg-mesh {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 10% 20%, rgba(185, 28, 28, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(234, 88, 12, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(127, 29, 29, 0.4) 0%, transparent 70%),
    linear-gradient(135deg, #1a0000 0%, #2d0a0a 50%, #1a0505 100%);
  animation: contactMeshMove 20s ease-in-out infinite;
}
@keyframes contactMeshMove {
  0%, 100% { background-position: 0% 0%; filter: hue-rotate(0deg); }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; filter: hue-rotate(10deg); }
  75% { background-position: 0% 100%; }
}
.contact-hex-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(30deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(150deg, rgba(220, 38, 38, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(220, 38, 38, 0.06) 87.5%, rgba(220, 38, 38, 0.06)),
    linear-gradient(60deg, rgba(234, 88, 12, 0.04) 25%, transparent 25.5%, transparent 75%, rgba(234, 88, 12, 0.04) 75%, rgba(234, 88, 12, 0.04));
  background-size: 80px 140px;
  animation: contactHexScroll 25s linear infinite;
  opacity: 0.5;
}
@keyframes contactHexScroll {
  0% { transform: translate(0, 0); }
  100% { transform: translate(40px, 70px); }
}
.contact-particle {
  position: absolute; border-radius: 50%; pointer-events: none; opacity: 0;
  animation: contactParticleFloat linear infinite;
}
.contact-particle-1 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 10%; bottom: -10px; animation-duration: 12s; }
.contact-particle-2 { width: 6px; height: 6px; background: radial-gradient(circle, #f97316, transparent); left: 20%; bottom: -10px; animation-duration: 15s; animation-delay: 2s; }
.contact-particle-3 { width: 3px; height: 3px; background: radial-gradient(circle, #ef4444, transparent); left: 35%; bottom: -10px; animation-duration: 10s; animation-delay: 4s; }
.contact-particle-4 { width: 5px; height: 5px; background: radial-gradient(circle, #fbbf24, transparent); left: 50%; bottom: -10px; animation-duration: 14s; animation-delay: 1s; }
.contact-particle-5 { width: 4px; height: 4px; background: radial-gradient(circle, #ef4444, transparent); left: 65%; bottom: -10px; animation-duration: 11s; animation-delay: 3s; }
.contact-particle-6 { width: 7px; height: 7px; background: radial-gradient(circle, #f97316, transparent); left: 75%; bottom: -10px; animation-duration: 16s; animation-delay: 5s; }
@keyframes contactParticleFloat {
  0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
  10% { opacity: 1; transform: translateY(-10vh) translateX(10px) scale(1); }
  90% { opacity: 0.6; }
  100% { transform: translateY(-110vh) translateX(-20px) scale(0.3); opacity: 0; }
}
.contact-orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
.contact-orb-1 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.25), transparent 70%);
  top: -10%; left: -5%;
  animation: contactOrbMove1 15s ease-in-out infinite;
}
.contact-orb-2 {
  width: 350px; height: 350px;
  background: radial-gradient(circle, rgba(234, 88, 12, 0.2), transparent 70%);
  bottom: -10%; right: -5%;
  animation: contactOrbMove2 18s ease-in-out infinite;
}
@keyframes contactOrbMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(100px, 80px) scale(1.2); }
  66% { transform: translate(-50px, 120px) scale(0.9); }
}
@keyframes contactOrbMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-80px, -60px) scale(1.15); }
  66% { transform: translate(60px, -100px) scale(0.85); }
}
.contact-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none; z-index: 1;
}
.contact-page-title {
  color: white;
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
}
.contact-page-title .accent {
  background: linear-gradient(135deg, #ef4444, #f97316);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.contact-subtitle {
  color: #9ca3af;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 12px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.contact-section-label {
  display: inline-block;
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #fca5a5;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 16px;
}
.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 40px;
}
.contact-info-card {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.2) 0%, rgba(69, 10, 10, 0.35) 100%);
  border: 1px solid rgba(220, 38, 38, 0.15);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}
.contact-info-card:hover {
  border-color: rgba(220, 38, 38, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(220, 38, 38, 0.15);
}
.contact-info-icon {
  width: 48px; height: 48px;
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(234, 88, 12, 0.15));
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
  color: #fca5a5;
}
.contact-info-label {
  color: #9ca3af;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.contact-info-value {
  color: white;
  font-size: 1rem;
  font-weight: 600;
}
.contact-form-card {
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.2) 0%, rgba(69, 10, 10, 0.4) 100%);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 24px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 40px;
  margin-top: 48px;
  position: relative;
  overflow: hidden;
  animation: contactCardIn 0.8s ease-out;
}
.contact-form-card::before {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 100%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.08), transparent);
  transition: left 0.8s ease;
}
.contact-form-card:hover::before { left: 100%; }
@keyframes contactCardIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.contact-form-title {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 32px;
}
.contact-input-group {
  margin-bottom: 20px;
}
.contact-input-label {
  display: block;
  color: #d1d5db;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 8px;
}
.contact-input {
  width: 100%;
  background: rgba(69, 10, 10, 0.4);
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: 12px;
  padding: 14px 18px 14px 48px;
  color: #f3f4f6;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.contact-input::placeholder { color: rgba(209, 213, 219, 0.4); }
.contact-input:focus {
  outline: none;
  border-color: rgba(220, 38, 38, 0.6);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  background: rgba(69, 10, 10, 0.6);
}
.contact-input-icon {
  position: absolute;
  left: 16px;
  top: 42px;
  color: #6b7280;
  pointer-events: none;
}
.contact-textarea {
  width: 100%;
  background: rgba(69, 10, 10, 0.4);
  border: 1px solid rgba(220, 38, 38, 0.25);
  border-radius: 12px;
  padding: 14px 18px;
  color: #f3f4f6;
  font-size: 0.95rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  resize: vertical;
  box-sizing: border-box;
  min-height: 120px;
}
.contact-textarea::placeholder { color: rgba(209, 213, 219, 0.4); }
.contact-textarea:focus {
  outline: none;
  border-color: rgba(220, 38, 38, 0.6);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
  background: rgba(69, 10, 10, 0.6);
}
.contact-submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  border: none;
  border-radius: 14px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  padding: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 8px;
}
.contact-submit-btn::after {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 60%);
  transform: scale(0);
  transition: transform 0.5s ease;
}
.contact-submit-btn:hover::after { transform: scale(1); }
.contact-submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(220, 38, 38, 0.6);
}
.contact-checkbox-wrap {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 20px;
}
.contact-checkbox-wrap input[type="checkbox"] {
  accent-color: #ef4444;
  width: 18px; height: 18px;
  cursor: pointer;
  margin-top: 2px;
}
.contact-checkbox-label {
  color: #9ca3af;
  font-size: 0.85rem;
  line-height: 1.5;
}
.contact-checkbox-label a {
  color: #fca5a5;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.contact-checkbox-label a:hover { color: white; }
.contact-fade-in { animation: contactFadeIn 0.7s ease-out forwards; }
@keyframes contactFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.contact-delay-1 { animation-delay: 0.1s; opacity: 0; }
.contact-delay-2 { animation-delay: 0.2s; opacity: 0; }
.contact-delay-3 { animation-delay: 0.3s; opacity: 0; }
.contact-relative-input { position: relative; }
@media (max-width: 768px) {
  .contact-page-title { font-size: 1.75rem !important; }
  .contact-orb { display: none; }
  .contact-form-card { padding: 24px; }
}
`;

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
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <style>{contactStyles}</style>
      <section className="contact-section relative overflow-hidden py-24 px-6">
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
            <h1 className="contact-page-title">
              Contact <span className="accent">Sales</span>
            </h1>
            <p className="contact-subtitle">
              Have questions about our fresh chicken and masalas? We'd love to
              hear from you.
            </p>
          </div>

          {/* Info Cards */}
          <div className="contact-info-grid contact-fade-in contact-delay-1">
            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Mail size={22} />
              </div>
              <div className="contact-info-label">Email Us</div>
              <div className="contact-info-value">support@meathub.com</div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Phone size={22} />
              </div>
              <div className="contact-info-label">Call Us</div>
              <div className="contact-info-value">+91 98765 43210</div>
            </div>

            {/* whtsapp */}
             <div className="contact-info-card">
              <div className="contact-info-icon"> 
               <FaWhatsapp size={22}></FaWhatsapp>
              </div>
              <div className="contact-info-label">Whatsapp </div>
              <div className="contact-info-value">+91 98765 43210</div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <MapPin size={22} />
              </div>
              <div className="contact-info-label">Visit Us</div>
              <div className="contact-info-value">Coimbatore, Tamil Nadu</div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">
                <Clock size={22} />
              </div>
              <div className="contact-info-label">Working Hours</div>
              <div className="contact-info-value">Mon-Sat: 8AM - 8PM</div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card contact-fade-in contact-delay-2">
            <h2 className="contact-form-title">
              <MessageSquare size={24} className="text-red-400" />
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                {/* First Name */}
                <div className="contact-input-group contact-relative-input">
                  <label htmlFor="firstName" className="contact-input-label">
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
                    placeholder="John"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="contact-input-group contact-relative-input">
                  <label htmlFor="lastName" className="contact-input-label">
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
                    placeholder="Doe"
                    required
                  />
                </div>

                {/* Company */}
                <div className="contact-input-group contact-relative-input sm:col-span-2">
                  <label htmlFor="company" className="contact-input-label">
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
                <div className="contact-input-group contact-relative-input sm:col-span-2">
                  <label htmlFor="email" className="contact-input-label">
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
                <div className="contact-input-group contact-relative-input sm:col-span-2">
                  <label htmlFor="phone" className="contact-input-label">
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
                <div className="contact-input-group sm:col-span-2">
                  <label htmlFor="message" className="contact-input-label">
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
                <div className="contact-checkbox-wrap sm:col-span-2">
                  <input
                    type="checkbox"
                    id="agreeToPolicies"
                    name="agreeToPolicies"
                    checked={formData.agreeToPolicies}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="agreeToPolicies" className="contact-checkbox-label">
                    By selecting this, you agree to our{" "}
                    <a href="#">privacy policy</a>.
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="contact-submit-btn mt-8">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
