import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function PostProject() {
  const [posted, setPosted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    skills: "",
    budget: "",
    deadline: "",
    description: "",
    workType: "Remote",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setPosted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      category: "",
      skills: "",
      budget: "",
      deadline: "",
      description: "",
      workType: "Remote",
    });

    setPosted(false);
  };

  return (
    <DashboardLayout type="client">

      {/* PAGE HEADER */}
      <div className="client-page-header">

        <div>
          <span className="client-eyebrow">
            CLIENT AREA
          </span>

          <h1>Post a Project 🚀</h1>

          <p>
            Tell students what you need and find the right talent.
          </p>
        </div>

        <Link
          to="/client/projects"
          className="client-outline-btn"
        >
          📁 My Projects
        </Link>

      </div>

      {/* SUCCESS MESSAGE */}
      {posted && (
        <div className="project-success">
          <div>
            <strong>🎉 Project Posted Successfully!</strong>
            <p>
              Your project is now visible to talented students.
            </p>
          </div>

          <Link to="/client/projects">
            View My Projects →
          </Link>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="post-project-layout">

        {/* FORM CARD */}
        <div className="project-form-card">

          <div className="form-card-header">
            <div className="form-header-icon">
              🚀
            </div>

            <div>
              <h2>Project Details</h2>
              <p>
                Add details about your project requirements.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            {/* TITLE */}
            <div className="form-group">
              <label>
                Project Title <span>*</span>
              </label>

              <div className="input-with-icon">
                <span>📝</span>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Example: Build a React Website"
                  required
                />
              </div>
            </div>

            {/* CATEGORY + BUDGET */}
            <div className="form-row">

              <div className="form-group">
                <label>
                  Category <span>*</span>
                </label>

                <div className="input-with-icon">
                  <span>📂</span>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option>
                      Web Development
                    </option>

                    <option>
                      App Development
                    </option>

                    <option>
                      UI/UX Design
                    </option>

                    <option>
                      Graphic Design
                    </option>

                    <option>
                      Content Writing
                    </option>

                    <option>
                      Digital Marketing
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Budget <span>*</span>
                </label>

                <div className="input-with-icon">
                  <span>₹</span>

                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="5000"
                    min="1"
                    required
                  />
                </div>
              </div>

            </div>

            {/* SKILLS */}
            <div className="form-group">
              <label>
                Required Skills <span>*</span>
              </label>

              <div className="input-with-icon">
                <span>💡</span>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, HTML, CSS"
                  required
                />
              </div>

              <small>
                Separate multiple skills using commas.
              </small>
            </div>

            {/* DEADLINE + WORK TYPE */}
            <div className="form-row">

              <div className="form-group">
                <label>
                  Deadline <span>*</span>
                </label>

                <div className="input-with-icon">
                  <span>📅</span>

                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Work Type
                </label>

                <div className="input-with-icon">
                  <span>🌐</span>

                  <select
                    name="workType"
                    value={formData.workType}
                    onChange={handleChange}
                  >
                    <option>Remote</option>
                    <option>On-site</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="form-group">
              <label>
                Project Description <span>*</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="7"
                placeholder="Describe your project, requirements, expected work and any important details..."
                required
              />
            </div>

            {/* BUTTONS */}
            <div className="form-buttons">

              <button
                type="button"
                className="reset-btn"
                onClick={handleReset}
              >
                ↻ Reset
              </button>

              <button
                type="submit"
                className="publish-btn"
              >
                🚀 Publish Project
              </button>

            </div>

          </form>
        </div>

        {/* PREVIEW CARD */}
        <div className="project-preview-card">

          <div className="preview-header">
            <div className="preview-icon">
              👁
            </div>

            <div>
              <h3>Project Preview</h3>
              <p>
                This is how students will see your project.
              </p>
            </div>
          </div>

          <div className="preview-project">

            <div className="preview-top">

              <div className="preview-company-logo">
                C
              </div>

              <span className="preview-status">
                Hiring
              </span>

            </div>

            <span className="preview-category">
              {formData.category || "Project Category"}
            </span>

            <h2>
              {formData.title || "Your Project Title"}
            </h2>

            <p className="preview-company">
              Your Company
            </p>

            <div className="preview-info">

              <span>
                💰 ₹{formData.budget || "0"}
              </span>

              <span>
                🌐 {formData.workType}
              </span>

            </div>

            <div className="preview-section">
              <h4>Required Skills</h4>

              <div className="preview-skills">

                {formData.skills
                  ? formData.skills
                      .split(",")
                      .map((skill, index) => (
                        <span key={index}>
                          {skill.trim()}
                        </span>
                      ))
                  : (
                    <>
                      <span>React</span>
                      <span>JavaScript</span>
                      <span>HTML</span>
                    </>
                  )}

              </div>
            </div>

            <div className="preview-section">

              <h4>Description</h4>

              <p>
                {formData.description ||
                  "Your project description will appear here."}
              </p>

            </div>

            <div className="preview-deadline">
              📅 Deadline:{" "}
              {formData.deadline || "Not selected"}
            </div>

            <button
              type="button"
              className="preview-apply-btn"
            >
              View Project
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default PostProject;