import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import ProjectCard from "../../components/ProjectCard";

function StudentDashboard() {
  return (
    <DashboardLayout>

      {/* ================= HEADER ================= */}
      <div className="page-header">

        <div>
          <p className="welcome">GOOD MORNING 👋</p>

          <h1>Welcome back, Student!</h1>

          <p>
            Here are opportunities matching your skills.
          </p>
        </div>

        {/* Notifications */}
        <Link
          to="/student/messages"
          className="notification"
          title="Open Messages"
        >
          🔔 <span>3</span>
        </Link>

      </div>


      {/* ================= STATS ================= */}
      <div className="dashboard-stats">

        <Link to="/student/profile">
          <span>🎯</span>
          <b>92%</b>
          <small>Profile Complete</small>
        </Link>

        <Link to="/student/applications">
          <span>📩</span>
          <b>8</b>
          <small>Applications</small>
        </Link>

        <Link to="/student/work">
          <span>💼</span>
          <b>3</b>
          <small>Active Work</small>
        </Link>

        <Link to="/student/reviews">
          <span>⭐</span>
          <b>4.8</b>
          <small>Rating</small>
        </Link>

      </div>


      {/* ================= QUICK ACTIONS ================= */}
      <div className="quick-actions">

        <Link to="/student/projects">
          🔎 Find Projects
        </Link>

        <Link to="/student/ai-match">
          🤖 AI Match
        </Link>

        <Link to="/student/portfolio">
          📁 Portfolio
        </Link>

        <Link to="/student/skill-test">
          🧪 Take Skill Test
        </Link>

      </div>


      {/* ================= RECOMMENDED PROJECTS ================= */}
      <div className="section-heading">

        <div>
          <h2>Recommended Projects</h2>

          <p>
            Based on your skills
          </p>
        </div>

        <Link to="/student/projects">
          View All →
        </Link>

      </div>


      {/* ================= PROJECT CARDS ================= */}
      <div className="project-grid">

        <ProjectCard
          title="Modern E-commerce Website"
          category="Web Development"
          budget="12,000"
          company="TechNova"
          match="96%"
        />

        <ProjectCard
          title="Social Media Content Design"
          category="Graphic Design"
          budget="7,500"
          company="CreativeHub"
          match="91%"
        />

        <ProjectCard
          title="React Dashboard Development"
          category="React.js"
          budget="15,000"
          company="StartupX"
          match="88%"
        />

      </div>

    </DashboardLayout>
  );
}

export default StudentDashboard;