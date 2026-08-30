import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const register = (e) => {

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

        <h1>Create Account 🚀</h1>

        <p>
          Join the Skillora community.
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

        <form onSubmit={register}>

          <label>Full Name</label>

          <input
            placeholder="Enter your name"
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            required
          />

          {role === "student" && (
            <>
              <label>College</label>

              <input
                placeholder="Your college name"
              />
            </>
          )}

          {role === "client" && (
            <>
              <label>Company / Organization</label>

              <input
                placeholder="Company name"
              />
            </>
          )}

          <label>Password</label>

          <input
            type="password"
            placeholder="Create password"
            required
          />

          <button className="primary-btn full">
            Create Account →
          </button>

        </form>

        <p className="auth-bottom">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;