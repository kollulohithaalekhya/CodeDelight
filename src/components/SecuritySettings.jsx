import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/SecuritySettings.css";

const SecuritySettings = () => {
  const { changePassword, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setStatus(null); };

  const submit = async (e) => {
    e.preventDefault();
    if (form.next.length < 8 || !/[a-zA-Z]/.test(form.next) || !/[0-9]/.test(form.next)) {
      setStatus({ type: "error", text: "New password must be 8+ chars with a letter and a number." });
      return;
    }
    if (form.next !== form.confirm) {
      setStatus({ type: "error", text: "New passwords do not match." });
      return;
    }
    setBusy(true);
    try {
      await changePassword(form.current, form.next);
      setStatus({ type: "ok", text: "Password changed successfully." });
      setForm({ current: "", next: "", confirm: "" });
      setOpen(false);
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Could not change password." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="settings-section">
      <h2>Security Settings</h2>

      {status && (
        <div style={{ marginBottom: 14, color: status.type === "ok" ? "#059669" : "#e11d48", fontWeight: 600 }}>
          {status.text}
        </div>
      )}

      {!open ? (
        <button className="security-btn" onClick={() => { setOpen(true); setStatus(null); }}>
          Change Password
        </button>
      ) : (
        <form className="settings-form security-form" onSubmit={submit}>
          <label>Current Password</label>
          <input type="password" value={form.current} onChange={(e) => set("current", e.target.value)}
            placeholder="Current password" required autoComplete="current-password" />

          <label>New Password</label>
          <input type="password" value={form.next} onChange={(e) => set("next", e.target.value)}
            placeholder="At least 8 chars, a letter and a number" required autoComplete="new-password" />

          <label>Confirm New Password</label>
          <input type="password" value={form.confirm} onChange={(e) => set("confirm", e.target.value)}
            placeholder="Re-enter new password" required autoComplete="new-password" />

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button type="submit" disabled={busy}>{busy ? "Saving…" : "Update Password"}</button>
            <button type="button" className="security-cancel" onClick={() => { setOpen(false); setStatus(null); }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <button className="security-btn danger" onClick={logout} style={{ marginTop: 22 }}>
        Log Out
      </button>
    </div>
  );
};

export default SecuritySettings;
