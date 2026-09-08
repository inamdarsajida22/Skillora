import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

function StudentSidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      <button
        className="mobile-menu-btn"
        onClick={() => setOpen(!open)}
      >
        {open ? "✕" : "☰"}
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>

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

        <NavLink to="/student/dashboard" onClick={closeMenu}>
          🏠 Dashboard
        </NavLink>

        <NavLink to="/student/projects" onClick={closeMenu}>
          🔎 Find Projects
        </NavLink>

        <NavLink to="/student/ai-match" onClick={closeMenu}>
          🤖 AI Match
        </NavLink>

        <NavLink to="/student/applications" onClick={closeMenu}>
          📩 Applications
        </NavLink>

        <NavLink to="/student/work" onClick={closeMenu}>
          💼 My Work
        </NavLink>

        <div className="menu-title">PROFILE</div>

        <NavLink to="/student/profile" onClick={closeMenu}>
          👤 My Profile
        </NavLink>

        <NavLink to="/student/skills" onClick={closeMenu}>
          ⚡ My Skills
        </NavLink>

        <NavLink to="/student/portfolio" onClick={closeMenu}>
          📁 Portfolio
        </NavLink>

        <NavLink to="/student/skill-test" onClick={closeMenu}>
          🧪 Skill Test
        </NavLink>

        <div className="menu-title">CONNECT</div>

        <NavLink to="/student/messages" onClick={closeMenu}>
          💬 Messages
        </NavLink>

        <NavLink to="/student/reviews" onClick={closeMenu}>
          ⭐ Reviews
        </NavLink>

        <button
          className="logout-btn"
          onClick={() => {
            closeMenu();
            navigate("/login");
          }}
        >
          🚪 Logout
        </button>

      </aside>
    </>
  );
}

export default StudentSidebar;