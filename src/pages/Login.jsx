import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        email: email,
        password: password,
      });

      const response = await fetch(
        `https://skillora-ex4a.onrender.com/api/auth/login?${params.toString()}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      if (data.success) {
        // Check selected role
        if (data.user.role !== role) {
          setError(
            `This account is registered as ${data.user.role}. Please select the correct role.`
          );
          return;
        }

        // Save logged-in user
        localStorage.setItem(
          "skilloraUser",
          JSON.stringify(data.user)
        );

        // Navigate according to role
        if (role === "student") {
          navigate("/student/dashboard");
        } else {
          navigate("/client/dashboard");
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-box">

        <div className="auth-logo">
          Skill<span>ora</span>
        </div>

        <h1>Welcome Back 👋</h1>

        <p>
          Login and continue your journey.
        </p>

        <div className="role-switch">

          <button
            type="button"
            className={role === "student" ? "active" : ""}
            onClick={() => {
              setRole("student");
              setError("");
            }}
          >
            👩‍🎓 Student
          </button>

          <button
            type="button"
            className={role === "client" ? "active" : ""}
            onClick={() => {
              setRole("client");
              setError("");
            }}
          >
            💼 Client
          </button>

        </div>

        {/* ERROR MESSAGE */}

        {error && (
          <div
            style={{
              color: "#d32f2f",
              background: "#ffeaea",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            ❌ {error}
          </div>
        )}

        <form onSubmit={login}>

          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />

          <div className="remember">

            <label>
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#forgot">
              Forgot password?
            </a>

          </div>

          <button
            type="submit"
            className="primary-btn full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

        </form>

        <p className="auth-bottom">
          Don't have an account?
          <Link to="/register"> Create Account</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;