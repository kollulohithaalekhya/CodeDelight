// Central API client for the Code Delight frontend.
// Base URL can be overridden with VITE_API_BASE; defaults to the deployed API.
export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://codedelightapi.jami.ltd";

const TOKEN_KEY = "cd_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

// Thin fetch wrapper: injects auth header, parses JSON, throws on non-2xx.
export async function api(path, { method = "GET", body, auth = true, headers = {} } = {}) {
  const opts = { method, headers: { ...headers } };
  if (body !== undefined) {
    if (typeof FormData !== "undefined" && body instanceof FormData) {
      // Let the browser set the multipart boundary; don't stringify.
      opts.body = body;
    } else {
      opts.headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
  }
  if (auth) {
    const t = tokenStore.get();
    if (t) opts.headers.Authorization = `Bearer ${t}`;
  }
  const res = await fetch(`${API_BASE}${path}`, opts);
  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    const message = (data && data.error) || (data && data.message) || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export const get = (p, o) => api(p, { ...o, method: "GET" });
export const post = (p, body, o) => api(p, { ...o, method: "POST", body });
export const put = (p, body, o) => api(p, { ...o, method: "PUT", body });
export const del = (p, o) => api(p, { ...o, method: "DELETE" });
