import React, { createContext, useContext, useEffect, useState } from "react";
import { get } from "../api/client";
import { tokenStore } from "../api/client";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tokenStore.get()) { setLoading(false); return; }
    get("/api/profile/me")
      .then((d) => setProfile(d.profile))
      .catch(() => setProfile(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext) || { profile: null, loading: false };
}
