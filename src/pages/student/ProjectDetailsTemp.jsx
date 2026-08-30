import { useParams, useNavigate } from "react-router-dom";

function ProjectDetailsTemp() {
  const { title } = useParams();
  const navigate = useNavigate();

  const projectTitle = decodeURIComponent(title);

  return (
    <div className="dashboard">

      <main className="dashmain">

        <button
          className="view-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="project-details">

          <span className="category">
            Web Development
          </span>

          <h1>{projectTitle}</h1>

          <p className="company-name">
            Tech Solutions Pvt. Ltd.
          </p>

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

          <h3>Project Description</h3>

          <p>
            We are looking for a talented student to work on
            our web development project. The selected student
            will get real-world project experience.
          </p>

          <h3>Required Skills</h3>

          <div className="skills-list">
            <span>React JS</span>
            <span>JavaScript</span>
            <span>HTML</span>
            <span>CSS</span>
          </div>

          <div className="project-actions">

            <button
              className="apply-btn"
              onClick={() => alert("Application submitted successfully! 🎉")}
            >
              🚀 Apply Now
            </button>

            <button
              className="view-btn"
              onClick={() => navigate("/student/messages")}
            >
              💬 Contact Client
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ProjectDetailsTemp;