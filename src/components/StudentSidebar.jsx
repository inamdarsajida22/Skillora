import { NavLink, useNavigate } from "react-router-dom";

function StudentSidebar() {

  const navigate = useNavigate();

  const logout = () => {
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="side-logo">
        Skill<span>ora</span>
      </div>

      <div className="user-mini">
        <div className="avatar">👩‍💻</div>
        <div>
          <b>Student</b>
          <small>Available for work</small>
        </div>
      </div>

      <div className="menu-title">MAIN MENU</div>

      <NavLink to="/student/dashboard">🏠 Dashboard</NavLink>
      <NavLink to="/student/projects">🔎 Find Projects</NavLink>
      <NavLink to="/student/ai-match">🤖 AI Match</NavLink>
      <NavLink to="/student/applications">📩 Applications</NavLink>
      <NavLink to="/student/work">💼 My Work</NavLink>

      <div className="menu-title">MY PROFILE</div>

      <NavLink to="/student/profile">👤 Profile</NavLink>
      <NavLink to="/student/skills">⚡ Skills</NavLink>
      <NavLink to="/student/skill-test">🧪 Skill Test</NavLink>
      <NavLink to="/student/portfolio">📁 Portfolio</NavLink>
      <NavLink to="/student/reviews">⭐ Reviews</NavLink>

      <div className="menu-title">CONNECT</div>

      <NavLink to="/student/messages">💬 Messages</NavLink>

      <button className="logout-btn" onClick={logout}>
        🚪 Logout
      </button>

    </aside>
  );
}

export default StudentSidebar;