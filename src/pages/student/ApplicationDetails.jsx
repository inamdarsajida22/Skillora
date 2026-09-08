import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ApplicationDetails() {
  const { title } = useParams();

  const [status, setStatus] = useState("Under Review");

  const projectTitle = title
    ? decodeURIComponent(title)
    : "Project Application";

  const handleWithdraw = () => {
    const confirmWithdraw = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (confirmWithdraw) {
      setStatus("Withdrawn");
    }
  };

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
              T
            </div>

            <div>

              <span className="category">
                Web Development
              </span>

              <h2>
                {projectTitle}
              </h2>

              <p className="company-name">
                TechNova Solutions
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
                {status}
              </span>

            </div>


            <div>

              <span className="detail-label">
                Applied On
              </span>

              <strong>
                30 Aug 2026
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
                <strong>₹5,000</strong>
              </div>

              <div className="detail-box">
                <span>⏱ Duration</span>
                <strong>7–15 Days</strong>
              </div>

              <div className="detail-box">
                <span>📅 Deadline</span>
                <strong>15 Sep 2026</strong>
              </div>

              <div className="detail-box">
                <span>💼 Work Type</span>
                <strong>Remote</strong>
              </div>

            </div>

          </div>


          {/* Required Skills */}
          <div className="details-section">

            <h3>
              Required Skills
            </h3>

            <div className="skills-list">

              <span>React</span>
              <span>JavaScript</span>
              <span>HTML</span>
              <span>CSS</span>

            </div>

          </div>


          {/* Description */}
          <div className="details-section">

            <h3>
              Project Description
            </h3>

            <p className="description">
              TechNova Solutions is looking for a talented
              student developer to build a modern and
              responsive React website. The project should
              include a clean user interface, responsive
              design and interactive features.
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
                  ₹4,500
                </strong>

              </div>


              <div>

                <span className="detail-label">
                  Expected Delivery
                </span>

                <strong>
                  10 Days
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
                Hello, I am interested in working on this
                project. I have experience with React,
                JavaScript and responsive web development.
                I would be happy to discuss the project
                requirements with you.
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


            {status !== "Withdrawn" && (
              <button
                className="btn secondary"
                onClick={handleWithdraw}
              >
                🗑 Withdraw Application
              </button>
            )}

          </div>


          {/* Withdraw Message */}
          {status === "Withdrawn" && (
            <div className="success">

              ⚠️ Your application has been withdrawn.

              <br />
              You can browse other projects from
              <Link to="/student/projects">
                {" "}Find Projects
              </Link>

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default ApplicationDetails;