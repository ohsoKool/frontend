import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";

const Dashboard = () => {
  return <Home />;
};

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    gender: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validatePassword = (password) => {
    const passwordConstraint =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
    return passwordConstraint.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = isSignUp ? "/api/auth/register" : "/api/auth/login";

      const payload = isSignUp
        ? {
            name: formData.name,
            email: formData.email,
            mobile_number: formData.mobile_number,
            gender: formData.gender,
            password: formData.password,
            confirm_password: formData.confirm_password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess(
          isSignUp
            ? "🎉 Registration successful! Redirecting..."
            : "✅ Login successful! Redirecting..."
        );
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setError(data.message || data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError(
        "Server error. Please check if the server is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsAnimating(true);
    setError("");
    setSuccess("");

    setTimeout(() => {
      setIsSignUp(!isSignUp);
      setFormData({
        name: "",
        email: "",
        mobile_number: "",
        gender: "",
        password: "",
        confirm_password: "",
      });
      setIsAnimating(false);
    }, 300);
  };

  // Add an interceptor to handle token refresh
  const handleTokenRefresh = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/token/refresh-token`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return false;
    }
  };

  // Add this to your API calls
  const apiCall = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: "include",
      });

      if (response.status === 401) {
        const refreshed = await handleTokenRefresh();
        if (refreshed) {
          // Retry the original request
          return fetch(url, {
            ...options,
            credentials: "include",
          });
        } else {
          // Redirect to login
          window.location.href = "/";
        }
      }

      return response;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };

  if (showDashboard) return <Dashboard />;

  const features = [
    {
      icon: "💻",
      text: "Interactive Coding Practice",
      color: "rgba(255, 255, 255, 0.9)",
    },
    {
      icon: "🎯",
      text: "Expert-Led Live Sessions",
      color: "rgba(255, 255, 255, 0.9)",
    },
    {
      icon: "🏆",
      text: "Industry-Recognized Certificates",
      color: "rgba(255, 255, 255, 0.9)",
    },
    {
      icon: "🚀",
      text: "Real-World Project Portfolio",
      color: "rgba(255, 255, 255, 0.9)",
    },
    {
      icon: "♾️",
      text: "Lifetime Access & Updates",
      color: "rgba(255, 255, 255, 0.9)",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .feature-item:hover {
          transform: translateX(10px);
          background: rgba(255, 255, 255, 0.15);
        }
        .feature-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          backdrop-filter: blur(5px);
        }
        .feature-text {
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        .form-control:focus, .form-select:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
          background: #f8fafc !important;
        }
        .form-control:hover, .form-select:hover {
          border-color: #64748b !important;
          transition: border-color 0.2s ease;
        }
        .btn-elegant:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4) !important;
        }
        .btn-elegant:active {
          transform: translateY(0);
        }
        .feature-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .logo-icon {
          animation: float 3s ease-in-out infinite;
        }
        .link-hover:hover {
          color: #3b82f6 !important;
          text-decoration: underline !important;
          transition: all 0.2s ease;
        }
        .password-hint {
          font-size: 0.8rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }
      `}</style>

      <div className="container-fluid p-0 min-vh-100">
        <div className="row g-0 min-vh-100">
          {/* Left Panel */}
          <div
            className="col-lg-7 d-none d-lg-flex align-items-center justify-content-center text-white position-relative"
            style={{
              background:
                "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Background pattern overlay */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
            <div
              className="text-center px-5 position-relative"
              style={{ maxWidth: "600px" }}
            >
              <div className="mb-5">
                <div
                  className="logo-icon mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 120,
                    height: 120,
                    fontSize: 48,
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                  }}
                >
                  💻
                </div>
                <h1
                  className="display-3 fw-bold mb-3"
                  style={{
                    animation: "slideInLeft 1s ease-out",
                    color: "#ffffff",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  TechLearn
                </h1>
                <h2
                  className="h3 mb-4"
                  style={{
                    animation: "slideInLeft 1s ease-out 0.2s both",
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: "300",
                  }}
                >
                  Master the Art of Coding
                </h2>
                <p
                  className="lead mb-5"
                  style={{
                    animation: "slideInLeft 1s ease-out 0.4s both",
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                  }}
                >
                  Join over 50,000 developers who chose TechLearn to accelerate
                  their programming journey with industry-leading courses and
                  hands-on projects.
                </p>
              </div>

              <div className="row g-4 mt-4">
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="col-12"
                    style={{
                      animation: `slideInLeft 0.5s ease-out ${
                        0.6 + idx * 0.1
                      }s both`,
                    }}
                  >
                    <div className="feature-item">
                      <div className="feature-icon">{item.icon}</div>
                      <div>
                        <h6 className="mb-1 feature-text">{item.text}</h6>
                        <small style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                          Industry-standard quality
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 pt-4"
                style={{ borderTop: "1px solid #475569" }}
              >
                <div className="d-flex justify-content-center gap-4">
                  <div className="text-center">
                    <div className="fw-bold fs-4" style={{ color: "#3b82f6" }}>
                      50K+
                    </div>
                    <small style={{ color: "#94a3b8" }}>Students</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold fs-4" style={{ color: "#10b981" }}>
                      95%
                    </div>
                    <small style={{ color: "#94a3b8" }}>Success Rate</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold fs-4" style={{ color: "#f59e0b" }}>
                      4.9★
                    </div>
                    <small style={{ color: "#94a3b8" }}>Rating</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div
            className="col-lg-5 col-12 d-flex align-items-center justify-content-center"
            style={{ background: "#f1f5f9", minHeight: "100vh" }}
          >
            <div
              className="card border-0 rounded-4 p-5 bg-white w-100 mx-4"
              style={{
                maxWidth: 480,
                opacity: isAnimating ? 0.7 : 1,
                transform: isAnimating ? "scale(0.95)" : "scale(1)",
                transition: "all 0.3s ease",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
                animation: "slideInRight 1s ease-out",
              }}
            >
              <div className="text-center mb-5">
                <div
                  className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: 90,
                    height: 90,
                    fontSize: 36,
                    background: isSignUp ? "#10b981" : "#3b82f6",
                    color: "white",
                    boxShadow: `0 15px 30px rgba(${
                      isSignUp ? "16, 185, 129" : "59, 130, 246"
                    }, 0.3)`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {isSignUp ? "🚀" : "🔐"}
                </div>
                <h3
                  className="fw-bold mb-2"
                  style={{ color: "#1e293b", fontSize: "1.75rem" }}
                >
                  {isSignUp ? "Join TechLearn" : "Welcome Back"}
                </h3>
                <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
                  {isSignUp
                    ? "Start your coding journey today"
                    : "Continue where you left off"}
                </p>
              </div>

              {error && (
                <div
                  className="alert alert-danger text-center py-3 mb-4 rounded-3 border-0"
                  role="alert"
                  style={{
                    animation: "shake 0.5s",
                    background: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca !important",
                  }}
                >
                  <strong>❌ {error}</strong>
                </div>
              )}

              {success && (
                <div
                  className="alert alert-success text-center py-3 mb-4 rounded-3 border-0"
                  role="alert"
                  style={{
                    animation: "pulse 0.5s",
                    background: "#f0f9ff",
                    color: "#0369a1",
                    border: "1px solid #bae6fd !important",
                  }}
                >
                  <strong>{success}</strong>
                </div>
              )}

              <div className="d-flex flex-column gap-4">
                {isSignUp && (
                  <>
                    <div>
                      <label
                        className="form-label fw-medium mb-2"
                        style={{ color: "#374151" }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg rounded-3"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          border: "2px solid #e2e8f0",
                          transition: "all 0.2s ease",
                          padding: "12px 16px",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="form-label fw-medium mb-2"
                        style={{ color: "#374151" }}
                      >
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="mobile_number"
                        className="form-control form-control-lg rounded-3"
                        placeholder="Enter your mobile number"
                        value={formData.mobile_number}
                        onChange={handleInputChange}
                        required
                        style={{
                          border: "2px solid #e2e8f0",
                          transition: "all 0.2s ease",
                          padding: "12px 16px",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="form-label fw-medium mb-2"
                        style={{ color: "#374151" }}
                      >
                        Gender
                      </label>
                      <select
                        name="gender"
                        className="form-select form-select-lg rounded-3"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        style={{
                          border: "2px solid #e2e8f0",
                          transition: "all 0.2s ease",
                          padding: "12px 16px",
                        }}
                      >
                        <option value="">Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label
                    className="form-label fw-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg rounded-3"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      border: "2px solid #e2e8f0",
                      transition: "all 0.2s ease",
                      padding: "12px 16px",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="form-label fw-medium mb-2"
                    style={{ color: "#374151" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg rounded-3"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    style={{
                      border: "2px solid #e2e8f0",
                      transition: "all 0.2s ease",
                      padding: "12px 16px",
                    }}
                  />
                  {isSignUp && (
                    <div className="password-hint">
                      Password must be 10+ characters with uppercase, lowercase,
                      number, and special character
                    </div>
                  )}
                </div>

                {isSignUp && (
                  <div>
                    <label
                      className="form-label fw-medium mb-2"
                      style={{ color: "#374151" }}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Confirm your password"
                      value={formData.confirm_password}
                      onChange={handleInputChange}
                      required
                      style={{
                        border: "2px solid #e2e8f0",
                        transition: "all 0.2s ease",
                        padding: "12px 16px",
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-lg fw-semibold py-3 mt-3 rounded-3 btn-elegant"
                  disabled={loading}
                  onClick={handleSubmit}
                  style={{
                    background: isSignUp ? "#10b981" : "#3b82f6",
                    border: "none",
                    color: "white",
                    boxShadow: `0 4px 15px rgba(${
                      isSignUp ? "16, 185, 129" : "59, 130, 246"
                    }, 0.3)`,
                    transition: "all 0.2s ease",
                    fontSize: "1.1rem",
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      {isSignUp ? "Creating Account..." : "Signing In..."}
                    </>
                  ) : isSignUp ? (
                    "🚀 Create Account"
                  ) : (
                    "🔑 Sign In"
                  )}
                </button>
              </div>

              <div className="text-center mt-4">
                <span
                  className="fw-medium link-hover"
                  role="button"
                  style={{
                    cursor: "pointer",
                    color: "#64748b",
                    fontSize: "1rem",
                  }}
                  onClick={toggleAuthMode}
                >
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </span>
              </div>

              <div
                className="d-flex justify-content-around mt-5 pt-4"
                style={{ borderTop: "1px solid #e2e8f0" }}
              >
                <div className="text-center">
                  <div
                    className="mb-1"
                    style={{ color: "#10b981", fontSize: "1.5rem" }}
                  >
                    🔒
                  </div>
                  <small className="text-muted fw-medium">Secure</small>
                </div>
                <div className="text-center">
                  <div
                    className="mb-1"
                    style={{ color: "#f59e0b", fontSize: "1.5rem" }}
                  >
                    ⚡
                  </div>
                  <small className="text-muted fw-medium">Fast</small>
                </div>
                <div className="text-center">
                  <div
                    className="mb-1"
                    style={{ color: "#8b5cf6", fontSize: "1.5rem" }}
                  >
                    🎨
                  </div>
                  <small className="text-muted fw-medium">Beautiful</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
