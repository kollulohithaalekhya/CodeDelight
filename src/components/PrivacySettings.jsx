import { useState } from "react";
import "../styles/PrivacySettings.css";

const PrivacySettings = () => {
  const [publicProfile, setPublicProfile] = useState(true);
  const [showStats, setShowStats] = useState(true);

  return (
    <div className="settings-section">
      <h2>Privacy Settings</h2>

      <div className="privacy-item">
        <span>Public Profile</span>
        <input
          type="checkbox"
          checked={publicProfile}
          onChange={(e) => setPublicProfile(e.target.checked)}
        />
      </div>

      <div className="privacy-item">
        <span>Show Coding Stats</span>
        <input
          type="checkbox"
          checked={showStats}
          onChange={(e) => setShowStats(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default PrivacySettings;
