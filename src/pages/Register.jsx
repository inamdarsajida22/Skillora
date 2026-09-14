import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    company: "",
    password: "",
  });

  const [created, setCreated] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setCreated(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCreated(true);

    setTimeout(() => {
      if (role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    }, 1000);
  };

  return (
    <main className="register-page">

      <div className="register-container">

        {/* LEFT SIDE */}

        <div className="register-info">

          <div className="register-logo">
            Skill<span>ora</span>
          </div>

          <span className="register-badge">
            🚀 JOIN SKILLORA
          </span>

          <h1>
            Build your future with
            <span> real opportunities.</span>
          </h1>

          <p>
            Create your free Skillora account and connect
            with students, clients and exciting projects.
          </p>

          <div className="register-benefits">

            <div>
              <span>🎯</span>
              <div>
                <strong>Find the right opportunities</strong>
                <small>
                  Discover projects that match your skills.
                </small>
              </div>
            </div>

            <div>
              <span>💼</span>
              <div>
                <strong>Build real experience</strong>
                <small>
                  Work on projects and grow your portfolio.
                </small>
              </div>
            </div>

            <div>
              <span>🤝</span>
              <div>
                <strong>Connect with people</strong>
                <small>
                  Meet talented students and real clients.
                </small>
              </div>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="register-card">

          <div className="register-card-header">

            <h2>Create Account 🚀</h2>

            <p>
              Join the Skillora community.
            </p>

          </div>


          {/* ROLE */}

          <div className="role-selector">

            <button
              type="button"
              className={
                role === "student"
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() => setRole("student")}
            >
              🎓 Student
            </button>

            <button
              type="button"
              className={
                role === "client"
                  ? "role-btn active"
                  : "role-btn"
              }
              onClick={() => setRole("client")}
            >
              💼 Client
            </button>

          </div>


          {/* SUCCESS */}

          {created && (
            <div className="register-success">
              ✅ Account created successfully!
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="register-field">

              <label>
                {role === "student"
                  ? "Full Name"
                  : "Contact Name"}
              </label>

              <div className="register-input">

                <span>👤</span>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="register-field">

              <label>Email Address</label>

              <div className="register-input">

                <span>✉️</span>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>


            {/* COLLEGE */}

            {role === "student" && (
              <div className="register-field">

                <label>College Name</label>

                <div className="register-input">

                  <span>🎓</span>

                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    placeholder="Enter your college name"
                    required
                  />

                </div>

              </div>
            )}


            {/* COMPANY */}

            {role === "client" && (
              <div className="register-field">

                <label>Company Name</label>

                <div className="register-input">

                  <span>🏢</span>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    required
                  />

                </div>

              </div>
            )}


            {/* PASSWORD */}

            <div className="register-field">

              <label>Password</label>

              <div className="register-input">

                <span>🔒</span>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  minLength="6"
                  required
                />

              </div>

              <small>
                Password must contain at least 6 characters.
              </small>

            </div>


            {/* BUTTON */}

            <button
              type="submit"
              className="register-submit"
            >
              Create{" "}
              {role === "student"
                ? "Student"
                : "Client"}{" "}
              Account →
            </button>

          </form>


          <div className="register-login">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Register;