import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { prepareAvatar } from "../utils/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import "../styles/Signup.css";

// Icon per field in the details step.
const FIELD_ICON = { email: faEnvelope, name: faUser, password: faLock, confirm: faLock };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[a-zA-Z0-9_.]+$/;

// Mirrors the server-side rules so users get instant feedback.
function validate({ name, email, password, confirm }) {
  const u = name.trim();
  if (u.length < 3 || u.length > 30) return "Username must be 3-30 characters.";
  if (!USERNAME_RE.test(u)) return 'Username may only contain letters, numbers, "_" and ".".';
  if (!EMAIL_RE.test(email.trim())) return "Please enter a valid email address.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password))
    return "Password must include at least one letter and one number.";
  if (password !== confirm) return "Passwords do not match.";
  return null;
}

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";
  const { requestSignupOtp, verifySignup, uploadAvatar } = useAuth();

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirm: "" });
  const [step, setStep] = useState("details"); // "details" | "otp"
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  // Optional avatar chosen during signup; uploaded after the account is created.
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarPick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please choose an image file."); return; }
    setError("");
    try {
      // Downscale + convert to a small JPEG so large phone photos and formats
      // the server rejects (e.g. HEIC) don't fail the upload.
      const prepared = await prepareAvatar(file);
      setAvatarFile(prepared);
      setAvatarPreview(URL.createObjectURL(prepared));
    } catch (err) {
      setAvatarFile(null);
      setAvatarPreview(null);
      setError(err.message || "That image couldn't be used. Please choose a JPG or PNG photo.");
    }
  };

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const requestOtp = async () => {
    setError(""); setInfo("");
    if (!avatarFile) { setError("Please add a profile photo to continue."); return; }
    const v = validate(formData);
    if (v) { setError(v); return; }
    setSubmitting(true);
    try {
      const res = await requestSignupOtp({
        username: formData.name, email: formData.email, password: formData.password,
      });
      setStep("otp");
      setInfo(res.message || "We emailed you a 6-digit code.");
      setCooldown(60);
    } catch (err) {
      setError(err.message || "Could not send verification code.");
      if (err.data?.retryIn) setCooldown(err.data.retryIn);
    } finally {
      setSubmitting(false);
    }
  };

  const verify = async () => {
    setError(""); setInfo("");
    if (!/^\d{6}$/.test(otp)) { setError("Enter the 6-digit code."); return; }
    setSubmitting(true);
    try {
      await verifySignup({
        username: formData.name, email: formData.email, password: formData.password, otp,
      });
      // Account now exists and we're authenticated — upload the required avatar.
      if (avatarFile) {
        try {
          await uploadAvatar(avatarFile);
        } catch (e) {
          // Account is created; don't strand the user, but don't fail silently
          // either — tell them the photo didn't save so they can retry in Settings.
          setInfo("Your account is ready, but the profile photo couldn't be saved — you can add it from Settings.");
          console.warn("avatar upload failed:", e?.message);
        }
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0) return;
    await requestOtp();
  };

  return (
    <div className="auth-page signup-page">
      <div className="main-container">
        <div className="image-container">
          <lottie-player
            src="https://assets2.lottiefiles.com/packages/lf20_jtbfg2nb.json"
            background="transparent" speed="1"
            style={{ width: "100%", maxWidth: "400px" }} loop autoplay
          ></lottie-player>
        </div>

        <div className="form-container">
          <form onSubmit={(e) => { e.preventDefault(); step === "details" ? requestOtp() : verify(); }}>
            <h2>Create Account</h2>

            {error && <div className="auth-error" style={{ color: "#e11d48", marginBottom: 10 }}>{error}</div>}
            {info && <div className="auth-info" style={{ color: "#059669", marginBottom: 10 }}>{info}</div>}

            {step === "details" ? (
              <>
                {/* Profile picture (required) */}
                <div className="signup-avatar">
                  <label className="signup-avatar-picker" title="Upload profile photo">
                    <img
                      src={avatarPreview || "/images/user.png"}
                      alt="Avatar preview"
                      className={`signup-avatar-img ${avatarFile ? "has-image" : ""}`}
                    />
                    <span className="signup-avatar-badge">
                      <i className="fa-solid fa-camera"></i>
                    </span>
                    <input type="file" accept="image/*" onChange={handleAvatarPick} style={{ display: "none" }} />
                  </label>
                  <div className="signup-avatar-text">
                    <strong>Profile photo <span style={{ color: "#f43f5e" }}>*</span></strong>
                    <span>{avatarFile ? "Looks great! Tap to change." : "Tap the circle to upload (required)."}</span>
                  </div>
                </div>

                {["name", "email", "password", "confirm"].map((field) => (
                  <div className="input-icon" key={field}>
                    <FontAwesomeIcon icon={FIELD_ICON[field] || faLock} />
                    <input
                      type={field.includes("password") || field === "confirm" ? "password" : field === "email" ? "email" : "text"}
                      name={field}
                      placeholder={
                        field === "confirm" ? "Confirm Password" :
                        field === "name" ? "User Name" :
                        field === "email" ? "Email Address" : "Password"
                      }
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}
                <button type="submit" className="login-btn" disabled={submitting}>
                  {submitting ? "Sending code…" : "Send Verification Code"}
                </button>
              </>
            ) : (
              <>
                <p style={{ fontSize: 14, marginBottom: 12 }}>
                  Enter the 6-digit code sent to <strong>{formData.email}</strong>.
                </p>
                <div className="input-icon">
                  <FontAwesomeIcon icon={faShieldHalved} />
                  <input
                    type="text" inputMode="numeric" maxLength={6}
                    placeholder="6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    required
                  />
                </div>
                <button type="submit" className="login-btn" disabled={submitting}>
                  {submitting ? "Verifying…" : "Verify & Create Account"}
                </button>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 13 }}>
                  <button type="button" className="link-btn" style={{ background: "none", border: "none", color: "#2563eb", cursor: "pointer" }}
                    onClick={() => { setStep("details"); setOtp(""); setError(""); setInfo(""); }}>
                    ← Edit details
                  </button>
                  <button type="button" className="link-btn" disabled={cooldown > 0}
                    style={{ background: "none", border: "none", color: cooldown > 0 ? "#9ca3af" : "#2563eb", cursor: cooldown > 0 ? "default" : "pointer" }}
                    onClick={resend}>
                    {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
                  </button>
                </div>
              </>
            )}

            <div className="signup-text">
              Already have an account? <Link to="/signin">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
