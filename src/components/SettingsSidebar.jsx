import "../styles/SettingsSidebar.css";

const SettingsSidebar = ({ active, setActive }) => {
  const items = [
    { id: "account", label: "Account" },
    { id: "appearance", label: "Appearance" },
    { id: "notifications", label: "Notifications" },
    { id: "privacy", label: "Privacy" },
    { id: "security", label: "Security" }
  ];

  return (
    <div className="settings-sidebar">
      {items.map(item => (
        <button
          key={item.id}
          className={active === item.id ? "active" : ""}
          onClick={() => setActive(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SettingsSidebar;
