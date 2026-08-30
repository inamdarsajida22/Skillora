import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function ClientDashboard() {

  return (
    <DashboardLayout type="client">

      <div className="page-header">

        <div>
          <p className="welcome">CLIENT WORKSPACE</p>
          <h1>Welcome back! 👋</h1>
          <p>Find talented students for your projects.</p>
        </div>

        <Link
          to="/client/post-project"
          className="primary-btn"
        >
          + Post Project
        </Link>

      </div>

      <div className="dashboard-stats">

        <div>
          <span>📁</span>
          <b>12</b>
          <small>Total Projects</small>
        </div>

        <div>
          <span>🔎</span>
          <b>38</b>
          <small>Proposals</small>
        </div>

        <div>
          <span>👩‍💻</span>
          <b>16</b>
          <small>Students</small>
        </div>

        <div>
          <span>⭐</span>
          <b>4.9</b>
          <small>Rating</small>
        </div>

      </div>

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

      <div className="section-heading">
        <div>
          <h2>Active Projects</h2>
          <p>Manage your current projects.</p>
        </div>

        <Link to="/client/projects">
          View All →
        </Link>
      </div>

      <div className="client-project-list">

        <div className="client-project">
          <div>
            <h3>College Website Redesign</h3>
            <p>3 proposals • ₹20,000 budget</p>
          </div>

          <span className="status active-status">
            Hiring
          </span>

          <Link to="/client/proposals" className="small-btn">
            View
          </Link>
        </div>

        <div className="client-project">
          <div>
            <h3>Mobile App UI Design</h3>
            <p>5 proposals • ₹12,000 budget</p>
          </div>

          <span className="status active-status">
            In Progress
          </span>

          <Link to="/client/projects" className="small-btn">
            View
          </Link>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default ClientDashboard;