import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function ProjectDetailsTemp() {
  const { title } = useParams();
  const navigate = useNavigate();

  const [applied, setApplied] = useState(false);

  const projectTitle = decodeURIComponent(title);

  const handleApply = () => {
    setApplied(true);
  };

  return (
    <DashboardLayout>

      {/* Back Button */}
      <button
        className="view-btn"
        onClick={() => navigate("/student/projects")}
      >
        ← Back to Projects
      </button>

      <div className="project-details">

        {/* Category */}
        <span className="category">
          Web Development
        </span>

        {/* Title */}
        <h1>{projectTitle}</h1>

        <p className="company-name">
          🏢 Tech Solutions Pvt. Ltd.
        </p>

        {/* Project Information */}
        <div className="details-grid">

          <div>
            <strong>💰 Budget</strong>
            <p>₹5,000</p>
          </div>

          <div>
            <strong>⏱ Duration</strong>
            <p>7-15 Days</p>
          </div>

          <div>
            <strong>✨ Skill Match</strong>
            <p>92%</p>
          </div>

        </div>

        {/* Description */}
        <h3>Project Description</h3>

        <p>
          We are looking for a talented student to work on
          our web development project. The selected student
          will get real-world project experience and an
          opportunity to work with a professional team.
        </p>

        {/* Required Skills */}
        <h3>Required Skills</h3>

        <div className="skills-list">
          <span>React JS</span>
          <span>JavaScript</span>
          <span>HTML</span>
          <span>CSS</span>
        </div>

        {/* Actions */}
        <div className="project-actions">

          {/* Apply */}
          <button
            className="apply-btn"
            onClick={handleApply}
            disabled={applied}
          >
            {applied
              ? "✅ Application Submitted"
              : "🚀 Apply Now"}
          </button>

          {/* Contact */}
          <Link
            to="/student/messages"
            className="view-btn"
          >
            💬 Contact Client
          </Link>

        </div>

        {/* Application Success */}
        {applied && (
          <div className="success">
            🎉 Application submitted successfully!
            <br />
            You can track your application from the
            Applications section.
            <br /><br />

            <Link
              to="/student/applications"
              className="primary-btn"
            >
              📩 View Application
            </Link>
          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

export default ProjectDetailsTemp;