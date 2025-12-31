import { useState, useEffect } from "react";
import "../styles/NotificationSettings.css";

const NotificationSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [contestNotif, setContestNotif] = useState(false);

  useEffect(() => {
    setEmailNotif(localStorage.getItem("emailNotif") !== "false");
    setContestNotif(localStorage.getItem("contestNotif") === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("emailNotif", emailNotif);
    localStorage.setItem("contestNotif", contestNotif);
  }, [emailNotif, contestNotif]);

  return (
    <div className="settings-section">
      <h2>Notification Settings</h2>

      <div className="notification-item">
        <span>Email Notifications</span>
        <input
          type="checkbox"
          checked={emailNotif}
          onChange={(e) => setEmailNotif(e.target.checked)}
        />
      </div>

      <div className="notification-item">
        <span>Contest Reminders</span>
        <input
          type="checkbox"
          checked={contestNotif}
          onChange={(e) => setContestNotif(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
