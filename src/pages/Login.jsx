import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const login = (e) => {

    e.preventDefault();

    if (role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/client/dashboard");
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
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            👩‍🎓 Student
          </button>

          <button
            className={role === "client" ? "active" : ""}
            onClick={() => setRole("client")}
          >
            💼 Client
          </button>

        </div>

        <form onSubmit={login}>

          <label>Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
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

          <button className="primary-btn full">
            Login →
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