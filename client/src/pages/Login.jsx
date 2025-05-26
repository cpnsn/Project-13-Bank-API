import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    document.title = "Argent Bank | Login";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        credentials: { email: email.trim().toLowerCase(), password },
        rememberMe,
      })
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => navigate("/profile"), 0);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h2 style={{ fontSize: "3.2rem" }}>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>

            {error && (
              <p className="error-message">
                {typeof error === "string" ? error : error.message || "An error occurred"}
              </p>
            )}

            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}
