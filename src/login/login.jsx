import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      setIsLoading(false);
      navigate("/Dashboard");
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Login</h2>
          <p className="auth-description">
            Enter your email and password to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="auth-content">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
              />
            </div>
          </div>
          <div className="auth-footer">
            <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
            <p className="auth-link">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
