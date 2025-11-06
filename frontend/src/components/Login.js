import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Import the centralized API instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default role
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Registration form state
  const [registrationData, setRegistrationData] = useState({
    name: "",
    surname: "",
    email: "",
    department: "",
    floorNumber: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { user, token } = response.data;

      // Store token and user info in localStorage for session management
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Navigate based on the role from the database for security
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'agent' || user.role === 'technician') {
        navigate('/agent-dash');
      } else {
        navigate('/user-dash');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationChange = (field, value) => {
    setRegistrationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (registrationData.password !== registrationData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!registrationData.name || !registrationData.surname || !registrationData.email || !registrationData.password) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        full_name: `${registrationData.name} ${registrationData.surname}`,
        email: registrationData.email,
        password: registrationData.password,
        user_type: 'normal_user' // Explicitly set for office personnel
      });

      if (response.data.success) {
        alert("Registration successful! You can now log in.");
        closeModal();
      }
    } catch (error) {
      console.error("Registration failed:", error.response?.data?.message || error.message);
      alert(`Registration failed: ${error.response?.data?.message || 'Please try again.'}`);
    }
  };

  const closeModal = () => {
    setShowRegisterModal(false);
    setRegistrationData({
      name: "",
      surname: "",
      email: "",
      department: "",
      floorNumber: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <>
      <div id="login-page" className="login-container">
        <div className="login-left">
          <h1>IT Support System</h1>
          <p>
            Streamline your IT support operations with our comprehensive ticket
            management solution. Support agents and office personnel can
            collaborate efficiently to resolve technical issues.
          </p>
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              gap: "20px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <i className="fas fa-headset" style={{ fontSize: "3rem", marginBottom: "15px" }}></i>
              <h3>Support Agents</h3>
              <p>Manage and resolve tickets efficiently</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <i className="fas fa-users" style={{ fontSize: "3rem", marginBottom: "15px" }}></i>
              <h3>Office Personnel</h3>
              <p>Submit and track your IT requests</p>
            </div>
          </div>
        </div>

        <div className="login-right">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account</p>
            </div>

            <div className="user-type-selector">
              <div
                className={`user-type ${role === "agent" ? "active" : ""}`}
                onClick={() => setRole("agent")}
              >
                Support Agent
              </div>
              <div
                className={`user-type ${role === "user" ? "active" : ""}`}
                onClick={() => setRole("user")}
              >
                Office Personnel
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

            <button type="submit" className="btn btn-primary" id="login-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="login-footer">
              <p>
                Don't have an account?{" "}
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowRegisterModal(true);
                  }}
                  style={{color: 'var(--primary)', textDecoration: 'none', fontWeight: '500'}}
                >
                  Create Account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content register-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create Office Personnel Account</h2>
              <button className="modal-close" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleRegistrationSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">First Name *</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter your first name"
                      value={registrationData.name}
                      onChange={(e) => handleRegistrationChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="surname">Last Name *</label>
                    <input
                      type="text"
                      id="surname"
                      className="form-control"
                      placeholder="Enter your last name"
                      value={registrationData.surname}
                      onChange={(e) => handleRegistrationChange('surname', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">Email Address *</label>
                  <input
                    type="email"
                    id="reg-email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={registrationData.email}
                    onChange={(e) => handleRegistrationChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="department">Department</label>
                    <select
                      id="department"
                      className="form-control"
                      value={registrationData.department}
                      onChange={(e) => handleRegistrationChange('department', e.target.value)}
                    >
                      <option value="">Select Department</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="IT">IT</option>
                      <option value="Operations">Operations</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="floorNumber">Floor Number</label>
                    <input
                      type="number"
                      id="floorNumber"
                      className="form-control"
                      placeholder="Floor"
                      min="1"
                      max="50"
                      value={registrationData.floorNumber}
                      onChange={(e) => handleRegistrationChange('floorNumber', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-password">Password *</label>
                  <input
                    type="password"
                    id="reg-password"
                    className="form-control"
                    placeholder="Create a password"
                    value={registrationData.password}
                    onChange={(e) => handleRegistrationChange('password', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="confirmPassword">Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    placeholder="Confirm your password"
                    value={registrationData.confirmPassword}
                    onChange={(e) => handleRegistrationChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
