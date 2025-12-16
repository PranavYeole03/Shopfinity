import { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { FaLightbulb } from "react-icons/fa";
import { CiDark } from "react-icons/ci";

const initialSignup = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  acceptTerms: false,
};

const initialSignin = {
  email: "",
  password: "",
};

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [tab, setTab] = useState("signin"); // 'signin' | 'signup'
  const [signin, setSignin] = useState(initialSignin);
  const [signup, setSignup] = useState(initialSignup);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentUser, setCurrentUser] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  // Read current user on mount
  useEffect(() => {
    const cu = localStorage.getItem("currentUser");
    if (cu) setCurrentUser(JSON.parse(cu));
  }, []);

  // Utility: safely read/write the "users" list in localStorage
  const users = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch {
      return [];
    }
  }, [currentUser]); // re-read after changes to keep UI in sync

  const saveUsers = (list) => {
    localStorage.setItem("users", JSON.stringify(list));
  };

  const flash = (type, text, timeout = 3000) => {
    setMessage({ type, text });
    if (timeout) {
      setTimeout(() => setMessage({ type: "", text: "" }), timeout);
    }
  };

  // Sign Up Handler
  const handleSignup = (e) => {
    e.preventDefault();

    // Simple validations
    if (!signup.firstName.trim()) return flash("danger", "First name is required.");
    if (!signup.email.trim()) return flash("danger", "Email is required.");
    if (!/\S+@\S+\.\S+/.test(signup.email)) return flash("danger", "Enter a valid email.");
    if (signup.password.length < 6) return flash("danger", "Password must be at least 6 characters.");
    if (signup.password !== signup.confirmPassword)
      return flash("danger", "Passwords do not match.");
    if (!signup.acceptTerms) return flash("danger", "Please accept the terms to continue.");

    // Check duplicate email
    const exists = users.find((u) => u.email.toLowerCase() === signup.email.toLowerCase());
    if (exists) return flash("warning", "An account with this email already exists. Please sign in.");

    // Create the new user (plain password for demo only)
    const newUser = {
      id: cryptoRandomId(),
      firstName: signup.firstName.trim(),
      lastName: signup.lastName.trim(),
      email: signup.email.trim().toLowerCase(),
      phone: signup.phone.trim(),
      password: signup.password,
      address: {
        address1: signup.address1.trim(),
        address2: signup.address2.trim(),
        city: signup.city.trim(),
        state: signup.state.trim(),
        pincode: signup.pincode.trim(),
      },
      createdAt: new Date().toISOString(),
    };

    saveUsers([...users, newUser]);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setCurrentUser(newUser);

    flash("success", "🎉 Account created & signed in!");
    setSignup(initialSignup);
    setTab("signin");
  };

  // Sign In Handler
  const handleSignin = (e) => {
    e.preventDefault();

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === signin.email.trim().toLowerCase() &&
        u.password === signin.password
    );

    if (!found) return flash("danger", "Invalid email or password.");

    localStorage.setItem("currentUser", JSON.stringify(found));
    setCurrentUser(found);
    setSignin(initialSignin);
    flash("success", "✅ Signed in successfully!");
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    flash("info", "You have been signed out.");
  };

  // For demo: generate a random ID
  const cryptoRandomId = () =>
    (crypto?.randomUUID?.() || Math.random().toString(36).slice(2)) + Date.now().toString(36);

  // Animated background styles
  const bgClass = darkMode ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100";

  return (
    <div className={`${bgClass} position-relative`}>
      {/* Animated background layer */}
      <div className="animated-bg position-absolute top-0 start-0 w-100 h-100" aria-hidden="true" />

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0">Profile</h2>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-light"
              onClick={() => setDarkMode((d) => !d)}
              title="Toggle dark mode"
            >
              {darkMode ? <FaLightbulb /> : <CiDark />}
            </button>
          </div>
        </div>

        {/* Alerts */}
        {message.text && (
          <div
            className={`alert alert-${message.type} text-center`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {/* If signed in, show profile summary */}
        {currentUser ? (
          <SignedInView user={currentUser} onSignOut={handleSignOut} />
        ) : (
          <div className="card shadow-sm mx-auto" style={{ maxWidth: 820 }}>
            <div className="card-body">
              {/* Tabs */}
              <ul className="nav nav-pills mb-4 justify-content-center">
                <li className="nav-item">
                  <button
                    className={`nav-link ${tab === "signin" ? "active" : ""}`}
                    onClick={() => setTab("signin")}
                  >
                    Sign In
                  </button>
                </li>
                <li className="nav-item ms-2">
                  <button
                    className={`nav-link ${tab === "signup" ? "active" : ""}`}
                    onClick={() => setTab("signup")}
                  >
                    Create Account
                  </button>
                </li>
              </ul>

              {/* Forms */}
              {tab === "signin" ? (
                <form className="mx-auto" style={{ maxWidth: 420 }} onSubmit={handleSignin}>
                  <h3 className="mb-3 text-center">Welcome back</h3>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="signinEmail"
                      placeholder="name@example.com"
                      value={signin.email}
                      onChange={(e) => setSignin({ ...signin, email: e.target.value })}
                      required
                    />
                    <label htmlFor="signinEmail">Email address</label>
                  </div>

                  <div className="mb-3 position-relative">
                    <div className="form-floating">
                      <input
                        type={showPass ? "text" : "password"}
                        className="form-control"
                        id="signinPassword"
                        placeholder="Password"
                        value={signin.password}
                        onChange={(e) => setSignin({ ...signin, password: e.target.value })}
                        required
                      />
                      <label htmlFor="signinPassword">Password</label>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary position-absolute"
                      style={{ top: 8, right: 8 }}
                      onClick={() => setShowPass((s) => !s)}
                    >
                      {showPass ? <BiShow /> : <BiHide />}
                    </button>
                  </div>

                  <button className="btn btn-primary w-100 py-2" type="submit">
                    Sign In
                  </button>
                </form>
              ) : (
                <form className="mx-auto" style={{ maxWidth: 820 }} onSubmit={handleSignup}>
                  <h3 className="mb-3 text-center">Create your account</h3>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="First Name"
                          value={signup.firstName}
                          onChange={(e) => setSignup({ ...signup, firstName: e.target.value })}
                          required
                        />
                        <label htmlFor="firstName">First name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Last Name"
                          value={signup.lastName}
                          onChange={(e) => setSignup({ ...signup, lastName: e.target.value })}
                        />
                        <label htmlFor="lastName">Last name (optional)</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="signupEmail"
                          placeholder="name@example.com"
                          value={signup.email}
                          onChange={(e) => setSignup({ ...signup, email: e.target.value })}
                          required
                        />
                        <label htmlFor="signupEmail">Email address</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Phone"
                          value={signup.phone}
                          onChange={(e) => setSignup({ ...signup, phone: e.target.value })}
                        />
                        <label htmlFor="phone">Phone (optional)</label>
                      </div>
                    </div>

                    <div className="col-md-6 position-relative">
                      <div className="form-floating">
                        <input
                          type={showPass ? "text" : "password"}
                          className="form-control"
                          id="signupPassword"
                          placeholder="Password"
                          value={signup.password}
                          onChange={(e) => setSignup({ ...signup, password: e.target.value })}
                          required
                        />
                        <label htmlFor="signupPassword">Password</label>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary position-absolute"
                        style={{ top: 8, right: 8 }}
                        onClick={() => setShowPass((s) => !s)}
                      >
                        {showPass ? <BiShow /> : <BiHide />}
                      </button>
                    </div>

                    <div className="col-md-6 position-relative">
                      <div className="form-floating">
                        <input
                          type={showPass2 ? "text" : "password"}
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          value={signup.confirmPassword}
                          onChange={(e) => setSignup({ ...signup, confirmPassword: e.target.value })}
                          required
                        />
                        <label htmlFor="confirmPassword">Confirm password</label>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary position-absolute"
                        style={{ top: 8, right: 8 }}
                        onClick={() => setShowPass2((s) => !s)}
                      >
                        {showPass2 ? <BiShow /> : <BiHide />}
                      </button>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="address1"
                          placeholder="Address line 1"
                          value={signup.address1}
                          onChange={(e) => setSignup({ ...signup, address1: e.target.value })}
                        />
                        <label htmlFor="address1">Address line 1</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          placeholder="Address line 2"
                          value={signup.address2}
                          onChange={(e) => setSignup({ ...signup, address2: e.target.value })}
                        />
                        <label htmlFor="address2">Address line 2 (optional)</label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          placeholder="City"
                          value={signup.city}
                          onChange={(e) => setSignup({ ...signup, city: e.target.value })}
                        />
                        <label htmlFor="city">City</label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          placeholder="State"
                          value={signup.state}
                          onChange={(e) => setSignup({ ...signup, state: e.target.value })}
                        />
                        <label htmlFor="state">State</label>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="pincode"
                          placeholder="Pincode"
                          value={signup.pincode}
                          onChange={(e) => setSignup({ ...signup, pincode: e.target.value })}
                        />
                        <label htmlFor="pincode">Pincode</label>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="form-check mt-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="terms"
                          checked={signup.acceptTerms}
                          onChange={(e) =>
                            setSignup({ ...signup, acceptTerms: e.target.checked })
                          }
                        />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the Terms & Privacy Policy.
                        </label>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-success w-100 py-2 mt-3" type="submit">
                    Create account
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Local CSS for animated background */}
      <style>{`
        .animated-bg {
          pointer-events: none;
          background: radial-gradient(1200px 800px at 10% 10%, rgba(255, 99, 132, 0.25), transparent 60%),
                      radial-gradient(1000px 700px at 90% 20%, rgba(54, 162, 235, 0.25), transparent 60%),
                      radial-gradient(900px 900px at 20% 90%, rgba(75, 192, 192, 0.25), transparent 60%);
          animation: floatBg 18s ease-in-out infinite alternate;
          filter: blur(20px);
        }
        @keyframes floatBg {
          0%   { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.9; }
          50%  { transform: translateY(-20px) translateX(10px) scale(1.02); opacity: 1; }
          100% { transform: translateY(10px) translateX(-10px) scale(1); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

const SignedInView = ({ user, onSignOut }) => {
  return (
    <div className="card shadow-sm mx-auto" style={{ maxWidth: 900 }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="m-0">Hello, {user.firstName || user.email}</h3>
          <button className="btn btn-outline-danger" onClick={onSignOut}>
            Sign out
          </button>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <div className="border rounded p-3 h-100">
              <h5 className="mb-3">Account</h5>
              <p className="mb-1"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p className="mb-1"><strong>Email:</strong> {user.email}</p>
              {user.phone && <p className="mb-0"><strong>Phone:</strong> {user.phone}</p>}
            </div>
          </div>

          <div className="col-md-6">
            <div className="border rounded p-3 h-100">
              <h5 className="mb-3">Default Address</h5>
              {user.address?.address1 ? (
                <>
                  <p className="mb-1">{user.address.address1}</p>
                  {user.address.address2 && <p className="mb-1">{user.address.address2}</p>}
                  <p className="mb-1">
                    {user.address.city && `${user.address.city}, `}
                    {user.address.state && `${user.address.state} `}
                    {user.address.pincode && `- ${user.address.pincode}`}
                  </p>
                </>
              ) : (
                <p className="text-muted mb-0">No address provided.</p>
              )}
            </div>
          </div>
        </div>

        <p className="text-muted small mt-3 mb-0">
          This is a demo profile using localStorage (no real authentication).
        </p>
      </div>
    </div>
  );
};

export default Profile;