import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        Skill<span>ora</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/student/projects">Projects</Link>
        <Link to="/student/ai-match">AI Match</Link>
        <Link to="/login">Login</Link>

        <Link to="/register" className="nav-register">
          Get Started
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;