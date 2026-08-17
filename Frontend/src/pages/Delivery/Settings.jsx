import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Palette,
  Shield,
  Bike,
  Lock,
  Trash2,
  Save,
  Globe,
  MapPin,
  Moon,
  Sun,
  Smartphone,
  Mail,
  MessageSquare,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
} from "lucide-react";
import {
  getSettings,
  updateNotificationSettings,
  updatePreferences,
  updateSecuritySettings,
  updateDeliverySettings,
  changePassword,
} from "../../services/settingsService";

const c = { plum: "#5B3A57", rose: "#D9829B", champagne: "#D6B77A", bg: "#FCF8FA", text: "#352832", textSec: "#8B7585" };

const Toggle = ({ enabled, onChange, label }) => (
  <button
    onClick={onChange}
    style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      width: "100%", padding: "12px 14px", borderRadius: 10, border: "none",
      background: "rgba(91,58,87,0.02)", cursor: "pointer", textAlign: "left",
    }}
  >
    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: c.text }}>{label}</span>
    <div style={{
      width: 40, height: 22, borderRadius: 11, position: "relative",
      background: enabled ? `linear-gradient(135deg, ${c.plum}, ${c.rose})` : "rgba(91,58,87,0.15)",
      transition: "all 0.2s",
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "white",
        position: "absolute", top: 2, left: enabled ? 20 : 2,
        transition: "all 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
      }} />
    </div>
  </button>
);

export const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("notifications");
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwMessage, setPwMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const loadData = async () => {
    try {
      const res = await getSettings();
      if (res.success) setSettings(res.settings);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const saveNotifications = async (updates) => {
    try {
      setSaving(true);
      const res = await updateNotificationSettings(updates);
      if (res.success) setSettings(res.settings);
    } catch (err) { console.log(err); }
    finally { setSaving(false); }
  };

  const savePreferences = async (updates) => {
    try {
      setSaving(true);
      const res = await updatePreferences(updates);
      if (res.success) setSettings(res.settings);
    } catch (err) { console.log(err); }
    finally { setSaving(false); }
  };

  const saveSecurity = async (updates) => {
    try {
      setSaving(true);
      const res = await updateSecuritySettings(updates);
      if (res.success) setSettings(res.settings);
    } catch (err) { console.log(err); }
    finally { setSaving(false); }
  };

  const saveDelivery = async (updates) => {
    try {
      setSaving(true);
      const res = await updateDeliverySettings(updates);
      if (res.success) setSettings(res.settings);
    } catch (err) { console.log(err); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMessage("");
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMessage("Passwords do not match");
      return;
    }
    try {
      setSaving(true);
      const res = await changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      if (res.success) {
        setPwMessage("Password changed successfully");
        setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setPwMessage(res.message || "Failed to change password");
      }
    } catch (err) {
      setPwMessage(err.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, color: c.textSec }}>
        Loading...
      </div>
    );
  }

  const sections = [
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "preferences", label: "Preferences", icon: Palette },
    { key: "security", label: "Security", icon: Shield },
    { key: "delivery", label: "Delivery", icon: Bike },
  ];

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 10,
    border: "1.5px solid rgba(91,58,87,0.12)", fontSize: "0.85rem", color: c.text,
    background: "rgba(91,58,87,0.02)", outline: "none",
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.4rem", fontWeight: 800, color: c.text, margin: "0 0 4px" }}>Settings</h1>
      <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "0 0 20px" }}>Customize your experience</p>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {/* Sidebar Nav */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{
            background: "white", borderRadius: 12, border: "1px solid rgba(91,58,87,0.08)",
            overflow: "hidden", position: "sticky", top: 20,
          }}>
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.key;
              return (
                <button
                  key={sec.key}
                  onClick={() => setActiveSection(sec.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%",
                    padding: "12px 16px", border: "none", cursor: "pointer", textAlign: "left",
                    background: isActive ? `linear-gradient(135deg, ${c.plum}, ${c.rose})` : "transparent",
                    color: isActive ? "white" : c.textSec,
                    fontSize: "0.82rem", fontWeight: 600, transition: "all 0.15s",
                    borderLeft: isActive ? "3px solid white" : "3px solid transparent",
                  }}
                >
                  <Icon size={16} /> {sec.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            background: "white", borderRadius: 14, border: "1px solid rgba(91,58,87,0.1)",
            overflow: "hidden",
          }}>
            <div style={{ height: 3, background: `linear-gradient(90deg, ${c.plum}, ${c.rose})` }} />
            <div style={{ padding: 24 }}>

              {/* Notifications Section */}
              {activeSection === "notifications" && (
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 6px" }}>
                    <Bell size={18} style={{ display: "inline", marginRight: 8 }} />
                    Notification Settings
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: c.textSec, margin: "0 0 20px" }}>Manage how you receive alerts</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <Toggle
                      enabled={settings.notifications?.orderUpdates}
                      onChange={() => saveNotifications({ ...settings.notifications, orderUpdates: !settings.notifications?.orderUpdates })}
                      label="Order Status Updates"
                    />
                    <Toggle
                      enabled={settings.notifications?.newOrders}
                      onChange={() => saveNotifications({ ...settings.notifications, newOrders: !settings.notifications?.newOrders })}
                      label="New Order Alerts"
                    />
                    <Toggle
                      enabled={settings.notifications?.paymentAlerts}
                      onChange={() => saveNotifications({ ...settings.notifications, paymentAlerts: !settings.notifications?.paymentAlerts })}
                      label="Payment Alerts"
                    />
                    <Toggle
                      enabled={settings.notifications?.promotions}
                      onChange={() => saveNotifications({ ...settings.notifications, promotions: !settings.notifications?.promotions })}
                      label="Promotions & Offers"
                    />
                  </div>

                  <div style={{ borderTop: "1px solid rgba(91,58,87,0.08)", marginTop: 16, paddingTop: 16 }}>
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 600, color: c.text, margin: "0 0 10px" }}>Delivery Method</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <Toggle
                        enabled={settings.notifications?.push}
                        onChange={() => saveNotifications({ ...settings.notifications, push: !settings.notifications?.push })}
                        label="Push Notifications"
                      />
                      <Toggle
                        enabled={settings.notifications?.sms}
                        onChange={() => saveNotifications({ ...settings.notifications, sms: !settings.notifications?.sms })}
                        label="SMS Notifications"
                      />
                      <Toggle
                        enabled={settings.notifications?.email}
                        onChange={() => saveNotifications({ ...settings.notifications, email: !settings.notifications?.email })}
                        label="Email Notifications"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Section */}
              {activeSection === "preferences" && (
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 6px" }}>
                    <Palette size={18} style={{ display: "inline", marginRight: 8 }} />
                    Preferences
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: c.textSec, margin: "0 0 20px" }}>Personalize your app experience</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        <Globe size={12} style={{ display: "inline", marginRight: 4 }} /> Language
                      </label>
                      <select
                        value={settings.preferences?.language || "en"}
                        onChange={(e) => savePreferences({ ...settings.preferences, language: e.target.value })}
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        <option value="en">English</option>
                        <option value="ta">தமிழ் (Tamil)</option>
                        <option value="hi">हिन्दी (Hindi)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        <Palette size={12} style={{ display: "inline", marginRight: 4 }} /> Theme
                      </label>
                      <div style={{ display: "flex", gap: 8 }}>
                        {[
                          { value: "light", label: "Light", icon: Sun },
                          { value: "dark", label: "Dark", icon: Moon },
                          { value: "system", label: "System", icon: Smartphone },
                        ].map((theme) => {
                          const Icon = theme.icon;
                          const isActive = settings.preferences?.theme === theme.value;
                          return (
                            <button
                              key={theme.value}
                              onClick={() => savePreferences({ ...settings.preferences, theme: theme.value })}
                              style={{
                                flex: 1, padding: "10px", borderRadius: 10,
                                border: isActive ? `2px solid ${c.plum}` : "2px solid rgba(91,58,87,0.1)",
                                background: isActive ? "rgba(91,58,87,0.04)" : "white",
                                cursor: "pointer", display: "flex", flexDirection: "column",
                                alignItems: "center", gap: 4,
                              }}
                            >
                              <Icon size={18} style={{ color: isActive ? c.plum : c.textSec }} />
                              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: isActive ? c.plum : c.textSec }}>
                                {theme.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        <MapPin size={12} style={{ display: "inline", marginRight: 4 }} /> Distance Unit
                      </label>
                      <div style={{ display: "flex", gap: 8 }}>
                        {["km", "mi"].map((unit) => (
                          <button
                            key={unit}
                            onClick={() => savePreferences({ ...settings.preferences, distanceUnit: unit })}
                            style={{
                              flex: 1, padding: "10px", borderRadius: 10,
                              border: settings.preferences?.distanceUnit === unit ? `2px solid ${c.plum}` : "2px solid rgba(91,58,87,0.1)",
                              background: settings.preferences?.distanceUnit === unit ? "rgba(91,58,87,0.04)" : "white",
                              cursor: "pointer", fontSize: "0.85rem", fontWeight: 600,
                              color: settings.preferences?.distanceUnit === unit ? c.plum : c.textSec,
                            }}
                          >
                            {unit === "km" ? "Kilometers" : "Miles"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === "security" && (
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 6px" }}>
                    <Shield size={18} style={{ display: "inline", marginRight: 8 }} />
                    Security
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: c.textSec, margin: "0 0 20px" }}>Protect your account</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
                    <Toggle
                      enabled={settings.security?.loginAlerts}
                      onChange={() => saveSecurity({ ...settings.security, loginAlerts: !settings.security?.loginAlerts })}
                      label="Login Alerts"
                    />
                    <Toggle
                      enabled={settings.security?.twoFactorEnabled}
                      onChange={() => saveSecurity({ ...settings.security, twoFactorEnabled: !settings.security?.twoFactorEnabled })}
                      label="Two-Factor Authentication"
                    />
                  </div>

                  {/* Change Password */}
                  <div style={{ borderTop: "1px solid rgba(91,58,87,0.08)", paddingTop: 20 }}>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: c.text, margin: "0 0 14px" }}>
                      <Lock size={16} style={{ display: "inline", marginRight: 8 }} />
                      Change Password
                    </h3>

                    {pwMessage && (
                      <div style={{
                        padding: "10px 14px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, marginBottom: 12,
                        background: pwMessage.includes("success") ? "rgba(22,163,74,0.08)" : "rgba(220,38,38,0.08)",
                        color: pwMessage.includes("success") ? "#16A34A" : "#DC2626",
                      }}>
                        {pwMessage}
                      </div>
                    )}

                    <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <input
                        type="password"
                        placeholder="Current password"
                        value={pwForm.currentPassword}
                        onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                        required
                        style={inputStyle}
                      />
                      <input
                        type="password"
                        placeholder="New password (min 6 characters)"
                        value={pwForm.newPassword}
                        onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                        required
                        minLength={6}
                        style={inputStyle}
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={pwForm.confirmPassword}
                        onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                        required
                        minLength={6}
                        style={inputStyle}
                      />
                      <button
                        type="submit"
                        disabled={saving}
                        style={{
                          padding: "12px", borderRadius: 10, border: "none",
                          background: `linear-gradient(135deg, ${c.plum}, ${c.rose})`,
                          color: "white", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                          alignSelf: "flex-start",
                        }}
                      >
                        <Lock size={16} /> {saving ? "Changing..." : "Change Password"}
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Delivery Section */}
              {activeSection === "delivery" && (
                <div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 6px" }}>
                    <Bike size={18} style={{ display: "inline", marginRight: 8 }} />
                    Delivery Preferences
                  </h2>
                  <p style={{ fontSize: "0.8rem", color: c.textSec, margin: "0 0 20px" }}>Configure your delivery behavior</p>

                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        Max Delivery Distance (km)
                      </label>
                      <input
                        type="range"
                        min={5}
                        max={50}
                        value={settings.delivery?.maxDeliveryDistance || 15}
                        onChange={(e) => saveDelivery({ ...settings.delivery, maxDeliveryDistance: Number(e.target.value) })}
                        style={{ width: "100%", accentColor: c.plum }}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: c.textSec, marginTop: 4 }}>
                        <span>5 km</span>
                        <span style={{ fontWeight: 700, color: c.plum }}>
                          {settings.delivery?.maxDeliveryDistance || 15} km
                        </span>
                        <span>50 km</span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: c.textSec, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        Auto-Offline After (hours)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={24}
                        value={settings.delivery?.autoOfflineHours || 8}
                        onChange={(e) => saveDelivery({ ...settings.delivery, autoOfflineHours: Number(e.target.value) })}
                        style={{ ...inputStyle, width: 120 }}
                      />
                    </div>

                    <Toggle
                      enabled={settings.preferences?.autoAcceptOrders}
                      onChange={() => savePreferences({ ...settings.preferences, autoAcceptOrders: !settings.preferences?.autoAcceptOrders })}
                      label="Auto-Accept Orders"
                    />
                  </div>

                  {/* Danger Zone */}
                  <div style={{
                    marginTop: 30, padding: 18, borderRadius: 12,
                    border: "1px solid rgba(220,38,38,0.2)", background: "rgba(220,38,38,0.03)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <AlertTriangle size={16} style={{ color: "#DC2626" }} />
                      <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#DC2626", margin: 0 }}>Danger Zone</h3>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: c.textSec, margin: "0 0 12px" }}>
                      Deleting your account is permanent and cannot be undone.
                    </p>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      style={{
                        padding: "9px 18px", borderRadius: 8, border: "1px solid rgba(220,38,38,0.3)",
                        background: "rgba(220,38,38,0.06)", color: "#DC2626",
                        fontSize: "0.8rem", fontWeight: 600, cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6,
                      }}
                    >
                      <Trash2 size={14} /> Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "white", borderRadius: 16, padding: 28, maxWidth: 380, width: "90%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, background: "rgba(220,38,38,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px",
              }}>
                <AlertTriangle size={24} style={{ color: "#DC2626" }} />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: c.text, margin: "0 0 8px" }}>Delete Account?</h3>
              <p style={{ fontSize: "0.82rem", color: c.textSec, margin: "0 0 20px", lineHeight: 1.5 }}>
                This action is permanent. All your data, earnings, and history will be lost.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    flex: 1, padding: "11px", borderRadius: 10, border: "1px solid rgba(91,58,87,0.15)",
                    background: "white", color: c.textSec, fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert("Account deletion will be processed. You will be logged out.");
                    setShowDeleteConfirm(false);
                  }}
                  style={{
                    flex: 1, padding: "11px", borderRadius: 10, border: "none",
                    background: "#DC2626", color: "white", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
