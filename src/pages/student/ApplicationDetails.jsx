import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ApplicationDetails() {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [withdrawn, setWithdrawn] = useState(false);

  useEffect(() => {
    const loadApplication = async () => {
      try {
        setLoading(true);
        setError("");

        // Get logged-in user
        const storedUser = localStorage.getItem("skilloraUser");

        if (!storedUser) {
          throw new Error("Please login first.");
        }

        // Get student's applications
        const user = JSON.parse(storedUser);

        const proposalResponse = await fetch(
          `https://skillora-ex4a.onrender.com/api/proposals/student/${user.id}`
        );

        if (!proposalResponse.ok) {
          throw new Error("Failed to load application.");
        }

        const proposalData = await proposalResponse.json();

        const selectedApplication = (proposalData.proposals || []).find(
          (item) => item.id === Number(id)
        );

        if (!selectedApplication) {
          throw new Error("Application not found.");
        }

        setApplication(selectedApplication);

        // Get project details
        const projectResponse = await fetch(
          `https://skillora-ex4a.onrender.com/api/projects/${selectedApplication.project_id}`
        );

        if (!projectResponse.ok) {
          throw new Error("Failed to load project details.");
        }

        const projectData = await projectResponse.json();

        setProject(projectData.project);
        setLoading(false);

      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong.");
        setLoading(false);
      }
    };

    loadApplication();
  }, [id]);

  const handleWithdraw = async () => {
  const confirmWithdraw = window.confirm(
    "Are you sure you want to withdraw this application?"
  );

  if (!confirmWithdraw) {
    return;
  }

  try {
    const response = await fetch(
      `https://skillora-ex4a.onrender.com/api/proposals/${application.id}/withdraw`,
      {
        method: "PUT",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Failed to withdraw application"
      );
    }

    setWithdrawn(true);

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  if (loading) {
    return (
      <div className="dashboard">
        <main className="dashmain">
          <div className="card">
            <h2>Loading Application...</h2>
            <p>Please wait while we fetch your application details.</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <main className="dashmain">

          <div className="card">
            <h2>❌ Unable to Load Application</h2>
            <p>{error}</p>

            <Link
              to="/student/applications"
              className="btn secondary"
            >
              ← Back to Applications
            </Link>
          </div>

        </main>
      </div>
    );
  }

  const status = withdrawn
    ? "Withdrawn"
    : application?.status || "pending";

  const displayStatus =
    status.charAt(0).toUpperCase() + status.slice(1);

  const skills = project?.skills
    ? project.skills.split(",").map((skill) => skill.trim())
    : [];

  return (
    <div className="dashboard">

      <main className="dashmain">

        {/* Header */}
        <div className="welcome">

          <div>
            <span className="eyebrow">
              MY APPLICATION
            </span>

            <h1>
              Application Details 📋
            </h1>

            <p>
              View your application and project information.
            </p>
          </div>

          <Link
            to="/student/applications"
            className="btn secondary"
          >
            ← Back to Applications
          </Link>

        </div>


        {/* Application Card */}
        <div className="card application-details-card">

          {/* Project Header */}
          <div className="details-header">

            <div className="company-logo large">
              {project?.title?.charAt(0) || "S"}
            </div>

            <div>

              <span className="category">
                {skills.length > 0
                  ? skills[0]
                  : "Project"}
              </span>

              <h2>
                {project?.title || "Project Application"}
              </h2>

              <p className="company-name">
                {project?.client_id
                  ? `Client #${project.client_id}`
                  : "Skillora Client"}
              </p>

            </div>

          </div>


          {/* Status */}
          <div className="application-status">

            <div>

              <span className="detail-label">
                Application Status
              </span>

              <span
                className={`status ${
                  status === "Withdrawn"
                    ? "rejected"
                    : "under-review"
                }`}
              >
                {displayStatus}
              </span>

            </div>


            <div>

              <span className="detail-label">
                Application ID
              </span>

              <strong>
                #{application?.id}
              </strong>

            </div>

          </div>


          {/* Project Information */}
          <div className="details-section">

            <h3>
              Project Information
            </h3>

            <div className="details-grid">

              <div className="detail-box">
                <span>💰 Budget</span>
                <strong>
                  ₹{project?.budget || "Negotiable"}
                </strong>
              </div>

              <div className="detail-box">
                <span>📊 Status</span>
                <strong>
                  {project?.status || "Open"}
                </strong>
              </div>

              <div className="detail-box">
                <span>🆔 Project ID</span>
                <strong>
                  #{project?.id}
                </strong>
              </div>

              <div className="detail-box">
                <span>💼 Work Type</span>
                <strong>
                  Remote
                </strong>
              </div>

            </div>

          </div>


          {/* Required Skills */}
          <div className="details-section">

            <h3>
              Required Skills
            </h3>

            <div className="skills-list">

              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                ))
              ) : (
                <span>
                  No specific skills mentioned
                </span>
              )}

            </div>

          </div>


          {/* Description */}
          <div className="details-section">

            <h3>
              Project Description
            </h3>

            <p className="description">
              {project?.description ||
                "No project description available."}
            </p>

          </div>


          {/* Your Application */}
          <div className="details-section">

            <h3>
              Your Application
            </h3>

            <div className="application-box">

              <div>

                <span className="detail-label">
                  Your Proposed Budget
                </span>

                <strong>
                  ₹{application?.bid_amount || "Not specified"}
                </strong>

              </div>

              <div>

                <span className="detail-label">
                  Application Status
                </span>

                <strong>
                  {displayStatus}
                </strong>

              </div>

            </div>

          </div>


          {/* Message */}
          <div className="details-section">

            <h3>
              Message Sent to Client
            </h3>

            <div className="message-box">

              <p>
                {application?.message ||
                  "No message was added to this proposal."}
              </p>

            </div>

          </div>


          {/* Actions */}
          <div className="details-actions">

            <Link
              to="/student/portfolio"
              className="btn secondary"
            >
              📁 View My Portfolio
            </Link>

            <Link
              to="/student/messages"
              className="btn primary"
            >
              💬 Message Client
            </Link>

            {!withdrawn && status !== "rejected" && (
              <button
                className="btn secondary"
                onClick={handleWithdraw}
              >
                🗑 Withdraw Application
              </button>
            )}

          </div>


          {/* Withdraw Message */}
          {withdrawn && (
            <div className="success">

              ⚠️ Your application has been withdrawn.

              <br />

              You can browse other projects from{" "}

              <Link to="/student/projects">
                Find Projects
              </Link>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default ApplicationDetails;