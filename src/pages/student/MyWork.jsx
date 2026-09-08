import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function MyWork() {
  const [progress, setProgress] = useState(65);

  const updateProgress = () => {
    if (progress < 100) {
      setProgress(progress + 10);
    }
  };

  return (
    <DashboardLayout>

      <div className="page-header">
        <div>
          <h1>My Work 💼</h1>
          <p>Manage your ongoing freelance projects.</p>
        </div>
      </div>

      <div className="work-grid">

        {/* ================= ACTIVE PROJECT ================= */}
        <div className="work-card">

          <span className="work-status">
            In Progress
          </span>

          <h2>E-commerce Website</h2>

          <p>
            Client: TechNova
          </p>

          {/* Progress */}
          <div className="progress">
            <div
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <small>
            {progress}% completed
          </small>

          {/* Actions */}
          <div className="project-actions">

            <button
              className="primary-btn"
              onClick={updateProgress}
            >
              ⚙️ Update Progress
            </button>

            <Link
              to="/student/messages"
              className="outline-btn"
            >
              💬 Message Client
            </Link>

          </div>

        </div>


        {/* ================= COMPLETED PROJECT ================= */}
        <div className="work-card">

          <span className="completed">
            Completed
          </span>

          <h2>Social Media Design</h2>

          <p>
            Client: Brandify
          </p>

          <div className="progress complete">
            <div></div>
          </div>

          <small>
            100% completed
          </small>

          {/* Actions */}
          <div className="project-actions">

            <Link
              to="/student/projects/view/Social%20Media%20Design"
              className="outline-btn"
            >
              👁 View Project
            </Link>

            <Link
              to="/student/messages"
              className="outline-btn"
            >
              💬 Message Client
            </Link>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default MyWork;