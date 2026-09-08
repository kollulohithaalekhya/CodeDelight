import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { prepareAvatar } from "../utils/image";
import "../styles/AccountSettings.css";

const AccountSettings = () => {
  const { user, updateProfile, uploadAvatar } = useAuth();
  const [form, setForm] = useState({ username: "", email: "", bio: "" });
  const [status, setStatus] = useState(null); // { type, text }
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  // Populate from the signed-in account.
  useEffect(() => {
    if (user) {
      setForm({ username: user.username || "", email: user.email || "", bio: user.bio || "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus(null);
  };

  const handleAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setStatus({ type: "error", text: "Please choose an image file." });
      return;
    }
    setUploading(true);
    setStatus(null);
    try {
      // Downscale + convert to a compact JPEG (handles large photos & HEIC).
      const prepared = await prepareAvatar(file);
      await uploadAvatar(prepared);
      setStatus({ type: "ok", text: "Profile picture updated." });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Upload failed." });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await updateProfile({ bio: form.bio });
      setStatus({ type: "ok", text: "Changes saved." });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Could not save changes." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-section">
      <h2>Account Settings</h2>

      {status && (
        <div
          className={`settings-status ${status.type}`}
          style={{ marginBottom: 12, color: status.type === "ok" ? "#059669" : "#e11d48" }}
        >
          {status.text}
        </div>
      )}

      {/* Profile picture */}
      <div className="avatar-row" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <img
          src={user?.profileImage || "/images/user.png"}
          alt="Profile"
          style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "2px solid #ddd" }}
        />
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleAvatar}
            style={{ display: "none" }}
          />
          <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "Change Picture"}
          </button>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 4 }}>PNG, JPG, WEBP or GIF · max 3 MB</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <label>Username</label>
        <input type="text" name="username" value={form.username} placeholder="Your username" disabled />

        <label>Email</label>
        <input type="email" name="email" value={form.email} placeholder="your@email.com" disabled />

        <label>Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell something about yourself"
        />

        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
