import { useState } from "react";
import { Link } from "react-router-dom";

function ProjectCard({
  title,
  category,
  budget,
  company,
  match = "92%",
}) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div className="project-card">

      {/* Top */}
      <div className="project-top">
        <div className="company-logo">
          {company?.charAt(0) || "S"}
        </div>

        <button
          className="heart-btn"
          onClick={() => setSaved(!saved)}
          title="Save Project"
        >
          {saved ? "❤️" : "♡"}
        </button>
      </div>

      {/* Category */}
      <span className="category">
        {category}
      </span>

      {/* Project */}
      <h3>{title}</h3>

      <p className="company-name">
        {company}
      </p>

      {/* Skill Match */}
      <div className="match">
        ✨ {match} Skill Match
      </div>

      {/* Info */}
      <div className="project-info">
        <span>💰 ₹{budget}</span>
        <span>⏱ 7-15 days</span>
      </div>

      {/* Buttons */}
      <div className="project-actions">

        {/* View Project */}
        <Link
          to={`/student/projects/view/${encodeURIComponent(title)}`}
          className="view-btn"
        >
          👁 View Project
        </Link>

        {/* Apply */}
        <button
          className="apply-btn"
          onClick={() => setApplied(true)}
          disabled={applied}
        >
          {applied ? "Applied ✓" : "🚀 Apply Now"}
        </button>

      </div>

    </div>
  );
}

export default ProjectCard;