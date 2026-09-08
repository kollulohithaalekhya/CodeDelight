import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { api, post, put, tokenStore } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!tokenStore.get()) {
      setUser(null);
      setLoading(false);
      return null;
    }
    try {
      const { user } = await api("/api/auth/me");
      setUser(user);
      return user;
    } catch {
      tokenStore.clear();
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (identifier, password) => {
    const { token, user } = await post(
      "/api/auth/login",
      { username: identifier, password },
      { auth: false }
    );
    tokenStore.set(token);
    setUser(user);
    return user;
  };

  // Step 1 of signup: request an email OTP (also used for "resend").
  const requestSignupOtp = async ({ username, email, password }) => {
    return post(
      "/api/auth/signup/request-otp",
      { username, email, password },
      { auth: false }
    );
  };

  // Step 2 of signup: verify the OTP; the account is created server-side.
  const verifySignup = async ({ username, email, password, otp }) => {
    const { token, user } = await post(
      "/api/auth/signup/verify",
      { username, email, password, otp },
      { auth: false }
    );
    tokenStore.set(token);
    setUser(user);
    return user;
  };

  const updateProfile = async (patch) => {
    const { user } = await put("/api/auth/profile", patch);
    setUser(user);
    return user;
  };

  const changePassword = async (currentPassword, newPassword) => {
    return put("/api/auth/password", { currentPassword, newPassword });
  };

  // Uploads an avatar image file (multipart). Returns the new URL.
  const uploadAvatar = async (file) => {
    const fd = new FormData();
    fd.append("avatar", file);
    const { url, user } = await post("/api/auth/profile/avatar", fd);
    if (user) setUser(user);
    return url;
  };

  const logout = () => {
    tokenStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, requestSignupOtp, verifySignup, logout, updateProfile, uploadAvatar, changePassword, refresh }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
