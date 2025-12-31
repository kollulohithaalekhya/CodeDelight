import "../styles/SecuritySettings.css";

const SecuritySettings = () => {
  return (
    <div className="settings-section">
      <h2>Security Settings</h2>

      <button className="security-btn">Change Password</button>
      <button className="security-btn danger">Logout All Devices</button>
    </div>
  );
};

export default SecuritySettings;
