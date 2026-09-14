import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            Skill<span>ora</span>
          </Link>

          <p>
            Skills → Projects → Experience → Career
          </p>

          <p className="footer-description">
            A platform connecting talented students with
            real clients and career opportunities.
          </p>
        </div>


        {/* STUDENTS */}
        <div className="footer-column">
          <h4>For Students</h4>

          <Link to="/student/projects">
            Find Projects
          </Link>

          <Link to="/student/ai-match">
            AI Match
          </Link>

          <Link to="/student/skills">
            Skills
          </Link>

          <Link to="/student/portfolio">
            Portfolio
          </Link>
        </div>


        {/* CLIENTS */}
        <div className="footer-column">
          <h4>For Clients</h4>

          <Link to="/client/post-project">
            Post a Project
          </Link>

          <Link to="/client/students">
            Find Students
          </Link>

          <Link to="/client/projects">
            My Projects
          </Link>

          <Link to="/client/proposals">
            Proposals
          </Link>
        </div>


        {/* CONNECT */}
        <div className="footer-column">
          <h4>Connect</h4>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Get Started
          </Link>

          <Link to="/student/messages">
            Messages
          </Link>

          <Link to="/student/reviews">
            Reviews
          </Link>
        </div>

      </div>


      {/* BOTTOM */}
      <div className="footer-bottom">

        <p>
          © 2026 Skillora. All rights reserved.
        </p>

        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

      </div>

    </footer>
  );
}

export default Footer;