import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Route guard for student-only pages. Waits for the initial /me check, then
// redirects anonymous visitors to /signin (remembering where they were headed).
// Works two ways:
//   <RequireAuth><Page /></RequireAuth>        (wrap a single element)
//   <Route element={<RequireAuth />}>...</Route> (layout guard, renders <Outlet/>)
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading…</div>;
  }
  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location.pathname + location.search }} />;
  }
  return children ?? <Outlet />;
}
