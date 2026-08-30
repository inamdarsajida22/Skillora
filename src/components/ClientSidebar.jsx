import { NavLink, useNavigate } from "react-router-dom";

function ClientSidebar() {

  const navigate = useNavigate();

  return (
    <aside className="sidebar">

      <div className="side-logo">
        Skill<span>ora</span>
      </div>

      <div className="user-mini">
        <div className="avatar">🏢</div>

        <div>
          <b>Client</b>
          <small>Hiring talent</small>
        </div>
      </div>

      <div className="menu-title">WORKSPACE</div>

      <NavLink to="/client/dashboard">🏠 Dashboard</NavLink>
      <NavLink to="/client/post-project">➕ Post Project</NavLink>
      <NavLink to="/client/projects">📁 My Projects</NavLink>
      <NavLink to="/client/proposals">📩 Proposals</NavLink>

      <div className="menu-title">TALENT</div>

      <NavLink to="/client/students">🔎 Find Students</NavLink>
      <NavLink to="/client/profile">👤 Company Profile</NavLink>

      <div className="menu-title">CONNECT</div>

      <NavLink to="/client/messages">💬 Messages</NavLink>
      <NavLink to="/client/reviews">⭐ Reviews</NavLink>

      <button
        className="logout-btn"
        onClick={() => navigate("/login")}
      >
        🚪 Logout
      </button>

    </aside>
  );
}

export default ClientSidebar;