import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/PrivacySettings.css";

const PrivacySettings = () => {
  const { user, updateProfile } = useAuth();
  const [publicProfile, setPublicProfile] = useState(true);
  const [showStats, setShowStats] = useState(true);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load current preferences from the account.
  useEffect(() => {
    if (user?.privacy) {
      setPublicProfile(user.privacy.publicProfile !== false);
      setShowStats(user.privacy.showStats !== false);
    }
  }, [user]);

  const save = async (next) => {
    setSaving(true);
    setStatus(null);
    try {
      await updateProfile({ privacy: next });
      setStatus({ type: "ok", text: "Privacy settings updated." });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Could not save." });
    } finally {
      setSaving(false);
    }
  };

  const togglePublic = (val) => {
    setPublicProfile(val);
    save({ publicProfile: val, showStats });
  };
  const toggleStats = (val) => {
    setShowStats(val);
    save({ publicProfile, showStats: val });
  };

  return (
    <div className="settings-section">
      <h2>Privacy Settings</h2>

      {status && (
        <div style={{ marginBottom: 14, color: status.type === "ok" ? "#059669" : "#e11d48", fontWeight: 600 }}>
          {status.text}
        </div>
      )}

      <div className="privacy-item">
        <div>
          <span>Public Profile</span>
          <p className="privacy-hint">
            When off, other users can't view your profile at <code>/u/{user?.username || "you"}</code> —
            they'll only see your name and picture.
          </p>
        </div>
        <label className="switch">
          <input type="checkbox" checked={publicProfile} disabled={saving}
            onChange={(e) => togglePublic(e.target.checked)} />
          <span className="slider" />
        </label>
      </div>

      <div className="privacy-item">
        <div>
          <span>Show Coding Stats</span>
          <p className="privacy-hint">
            Show your quizzes, stars, streak and activity to visitors of your public profile.
          </p>
        </div>
        <label className="switch">
          <input type="checkbox" checked={showStats} disabled={saving || !publicProfile}
            onChange={(e) => toggleStats(e.target.checked)} />
          <span className="slider" />
        </label>
      </div>
    </div>
  );
};

export default PrivacySettings;
