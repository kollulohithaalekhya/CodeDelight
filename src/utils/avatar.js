import { API_BASE } from "../api/client";

export const DEFAULT_AVATAR = "/images/user.png";

// profileImage is stored as a bare file name; the image is served by the same
// backend this app talks to. Older full URLs are reduced to their file name.
export function avatarUrl(profileImage) {
  if (!profileImage) return DEFAULT_AVATAR;
  if (/^(data|blob):/.test(profileImage)) return profileImage; // local previews
  const name = profileImage.split(/[?#]/)[0].split("/").pop();
  return name ? `${API_BASE}/api/images/avatars/${encodeURIComponent(name)}` : DEFAULT_AVATAR;
}

// <img onError> handler: fall back to the default avatar if the file is missing.
export function onAvatarError(e) {
  const img = e.currentTarget;
  if (!img.src.endsWith(DEFAULT_AVATAR)) img.src = DEFAULT_AVATAR;
}
