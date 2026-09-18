import { useState } from "react";
import { Link } from "react-router-dom";

function ProjectCard({
  id,
  title,
  category,
  budget,
  company,
  match = "92%",
  description = "",
  skills = "",
}) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("skilloraUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const studentId = user?.id;

  const submitProposal = async () => {
    if (!studentId) {
      setError("Please login first.");
      return;
    }

    if (!message.trim()) {
      setError("Please write a proposal message.");
      return;
    }

    if (!bidAmount.trim()) {
      setError("Please enter your bid amount.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams();

      params.append("project_id", id);
      params.append("student_id", studentId);
      params.append("message", message);
      params.append("bid_amount", bidAmount);

      const response = await fetch(
        `https://skillora-ex4a.onrender.com/api/proposals/?${params.toString()}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to submit proposal"
        );
      }

      setApplied(true);
      setShowForm(false);
      setMessage("");
      setBidAmount("");
      setError("");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

      {/* Description */}
      {description && (
        <p>
          {description}
        </p>
      )}

      {/* Skills */}
      {skills && (
        <p>
          <strong>Skills:</strong> {skills}
        </p>
      )}

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
          onClick={() => {
            setShowForm(true);
            setError("");
          }}
          disabled={applied}
        >
          {applied ? "Applied ✓" : "🚀 Apply Now"}
        </button>

      </div>

      {/* Proposal Form */}
      {showForm && !applied && (
        <div className="proposal-form">

          <h3>Apply for Project</h3>

          <p>
            Send your proposal to the client.
          </p>

          {error && (
            <p className="error">
              ❌ {error}
            </p>
          )}

          <textarea
            rows="5"
            placeholder="Write your proposal..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="number"
            placeholder="Your bid amount (₹)"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />

          <div className="proposal-actions">

            <button
              className="small-btn"
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
            >
              Cancel
            </button>

            <button
              className="primary-btn"
              onClick={submitProposal}
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "📨 Submit Proposal"}
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default ProjectCard;