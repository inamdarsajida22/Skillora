import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function ClientDashboard() {
  return (
    <DashboardLayout type="client">

      {/* HEADER */}
      <div className="page-header">

        <div>
          <p className="welcome">CLIENT WORKSPACE 👋</p>

          <h1>
            Welcome back, Client!
          </h1>

          <p>
            Manage your projects and find talented students.
          </p>
        </div>

        <Link
          to="/client/post-project"
          className="primary-btn"
        >
          ➕ Post New Project
        </Link>

      </div>


      {/* STATS */}
      <div className="dashboard-stats">

        <div>
          <span>📁</span>
          <b>12</b>
          <small>Total Projects</small>
        </div>

        <div>
          <span>📩</span>
          <b>38</b>
          <small>Total Proposals</small>
        </div>

        <div>
          <span>👩‍💻</span>
          <b>16</b>
          <small>Students Hired</small>
        </div>

        <div>
          <span>⭐</span>
          <b>4.9</b>
          <small>Client Rating</small>
        </div>

      </div>


      {/* QUICK ACTIONS */}
      <div className="quick-actions">

        <Link to="/client/post-project">
          ➕ Post Project
        </Link>

        <Link to="/client/students">
          🔎 Find Students
        </Link>

        <Link to="/client/proposals">
          📩 View Proposals
        </Link>

        <Link to="/client/messages">
          💬 Messages
        </Link>

      </div>


      {/* ACTIVE PROJECTS */}
      <div className="section-heading">

        <div>
          <h2>
            Active Projects
          </h2>

          <p>
            Manage your current projects.
          </p>
        </div>

        <Link to="/client/projects">
          View All →
        </Link>

      </div>


      <div className="client-project-list">

        {/* PROJECT 1 */}
        <div className="client-project">

          <div>
            <span className="category">
              Web Development
            </span>

            <h3>
              College Website Redesign
            </h3>

            <p>
              3 proposals • ₹20,000 budget
            </p>
          </div>

          <span className="status active-status">
            🟢 Hiring
          </span>

          <Link
            to="/client/proposals"
            className="small-btn"
          >
            👁 View Proposals
          </Link>

        </div>


        {/* PROJECT 2 */}
        <div className="client-project">

          <div>
            <span className="category">
              UI/UX Design
            </span>

            <h3>
              Mobile App UI Design
            </h3>

            <p>
              5 proposals • ₹12,000 budget
            </p>
          </div>

          <span className="status active-status">
            🔵 In Progress
          </span>

          <Link
            to="/client/projects"
            className="small-btn"
          >
            👁 View Project
          </Link>

        </div>


        {/* PROJECT 3 */}
        <div className="client-project">

          <div>
            <span className="category">
              React.js
            </span>

            <h3>
              Student Dashboard Development
            </h3>

            <p>
              8 proposals • ₹15,000 budget
            </p>
          </div>

          <span className="status active-status">
            🟢 Hiring
          </span>

          <Link
            to="/client/proposals"
            className="small-btn"
          >
            📩 Proposals
          </Link>

        </div>

      </div>


      {/* TALENT SECTION */}
      <div className="section-heading">

        <div>
          <h2>
            Find Great Talent 🚀
          </h2>

          <p>
            Discover students with the skills you need.
          </p>
        </div>

        <Link to="/client/students">
          Explore Students →
        </Link>

      </div>


      <div className="profile-grid">

        <div className="profile-card">

          <h2>
            👩‍💻 Skilled Students
          </h2>

          <p>
            Find students skilled in React, JavaScript,
            Python, UI/UX and more.
          </p>

          <Link
            to="/client/students"
            className="primary-btn"
          >
            🔎 Find Students
          </Link>

        </div>


        <div className="profile-card">

          <h2>
            📩 Review Proposals
          </h2>

          <p>
            Compare student proposals and select
            the best candidate for your project.
          </p>

          <Link
            to="/client/proposals"
            className="primary-btn"
          >
            View Proposals →
          </Link>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ClientDashboard;