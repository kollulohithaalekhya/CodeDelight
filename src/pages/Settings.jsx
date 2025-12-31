import { useState } from "react";
import "../styles/Settings.css";

import ProfileHeader from "../components/ProfileHeader";
import SettingsSidebar from "../components/SettingsSidebar";
import AccountSettings from "../components/AccountSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import EditorSettings from "../components/EditorSettings";
import NotificationSettings from "../components/NotificationSettings";
import PrivacySettings from "../components/PrivacySettings";
import SecuritySettings from "../components/SecuritySettings";

const Settings = () => {
  const [active, setActive] = useState("account");

  const renderSection = () => {
    switch (active) {
      case "appearance": return <AppearanceSettings />;
      case "editor": return <EditorSettings />;
      case "notifications": return <NotificationSettings />;
      case "privacy": return <PrivacySettings />;
      case "security": return <SecuritySettings />;
      default: return <AccountSettings />;
    }
  };

  return (
    <div className="settings-container">
      {/* <ProfileHeader /> */}
      <SettingsSidebar active={active} setActive={setActive} />
      <div className="settings-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default Settings;
