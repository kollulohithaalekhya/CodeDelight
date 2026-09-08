import { useState } from "react";
import "../styles/Settings.css";

import ProfileHeader from "../components/ProfileHeader";
import Footer from "../components/FooterSection";
import SettingsSidebar from "../components/SettingsSidebar";
import AccountSettings from "../components/AccountSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import NotificationSettings from "../components/NotificationSettings";
import PrivacySettings from "../components/PrivacySettings";
import SecuritySettings from "../components/SecuritySettings";

const TITLES = {
  account: "Account",
  appearance: "Appearance",
  notifications: "Notifications",
  privacy: "Privacy",
  security: "Security",
};

const Settings = () => {
  const [active, setActive] = useState("account");

  const renderSection = () => {
    switch (active) {
      case "appearance": return <AppearanceSettings />;
      case "notifications": return <NotificationSettings />;
      case "privacy": return <PrivacySettings />;
      case "security": return <SecuritySettings />;
      default: return <AccountSettings />;
    }
  };

  return (
    <div className="cd-settings">
      {/* Scope the shared header styles (all under .profile-page) to just the header. */}
      <div className="profile-page">
        <ProfileHeader />
      </div>

      <div className="cd-settings-body">
        <div className="cd-settings-head">
          <h1>Settings</h1>
          <p>Manage your account, appearance and preferences</p>
        </div>

        <div className="settings-container">
          <SettingsSidebar active={active} setActive={setActive} />
          <div className="settings-content">
            <div className="cd-panel-title">{TITLES[active]}</div>
            {renderSection()}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
