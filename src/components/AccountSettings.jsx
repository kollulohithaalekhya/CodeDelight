import { useState } from "react";
import "../styles/AccountSettings.css";

const AccountSettings = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    bio: "",
    email: "",
    github: "",
    linkedin: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Account Data:", form);
  };

  return (
    <div className="settings-section">
      <h2>Account Settings</h2>

      <form onSubmit={handleSubmit} className="settings-form">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
        />

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Your username"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="your@email.com"
          disabled
        />

        <label>Bio</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Tell something about yourself"
        />

        <label>GitHub Profile</label>
        <input
          type="url"
          name="github"
          value={form.github}
          onChange={handleChange}
          placeholder="https://github.com/username"
        />

        <label>LinkedIn Profile</label>
        <input
          type="url"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AccountSettings;
