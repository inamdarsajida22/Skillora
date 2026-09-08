import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function PostProject() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    skills: "",
    budget: "",
    deadline: "",
    description: "",
    workType: "Remote",
  });

  const [posted, setPosted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPosted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formData.budget) <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    setPosted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const resetForm = () => {
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
          <div className="client-eyebrow">
            CLIENT WORKSPACE 🚀
          </div>

          <h1>Post a Project</h1>

          <p>
            Create your project and find the right student talent.
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

          <div className="success-icon">
            ✓
          </div>

          <div>
            <h3>Project Posted Successfully! 🎉</h3>

            <p>
              Your project is now visible to talented students.
            </p>
          </div>

          <Link
            to="/client/projects"
            className="success-link"
          >
            View Projects →
          </Link>

        </div>
      )}


      <div className="post-project-layout">

        {/* LEFT FORM */}
        <div className="project-form-card">

          <div className="form-card-header">

            <div className="form-header-icon">
              📋
            </div>

            <div>
              <h2>Project Details</h2>
              <p>Tell students what you need.</p>
            </div>

          </div>


          <form onSubmit={handleSubmit}>

            {/* PROJECT TITLE */}
            <div className="form-group">

              <label>
                Project Title
                <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Build a React Website"
                required
              />

              <small>
                Give your project a clear and attractive title.
              </small>

            </div>


            {/* CATEGORY */}
            <div className="form-group">

              <label>
                Category
                <span>*</span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Project Category
                </option>

                <option value="Web Development">
                  💻 Web Development
                </option>

                <option value="App Development">
                  📱 App Development
                </option>

                <option value="UI/UX Design">
                  🎨 UI/UX Design
                </option>

                <option value="Graphic Design">
                  🖌️ Graphic Design
                </option>

                <option value="Content Writing">
                  ✍️ Content Writing
                </option>

                <option value="Digital Marketing">
                  📢 Digital Marketing
                </option>

              </select>

            </div>


            {/* SKILLS */}
            <div className="form-group">

              <label>
                Required Skills
                <span>*</span>
              </label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, JavaScript, HTML, CSS"
                required
              />

              <small>
                💡 Separate skills using commas.
              </small>

            </div>


            {/* BUDGET + DEADLINE */}
            <div className="form-row">

              <div className="form-group">

                <label>
                  Budget
                  <span>*</span>
                </label>

                <div className="input-with-icon">
                  <span>₹</span>

                  <input
                    type="number"
                    name="budget"
                    min="1"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="5000"
                    required
                  />
                </div>

              </div>


              <div className="form-group">

                <label>
                  Deadline
                  <span>*</span>
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />

              </div>

            </div>


            {/* DESCRIPTION */}
            <div className="form-group">

              <label>
                Project Description
                <span>*</span>
              </label>

              <textarea
                name="description"
                rows="6"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project, requirements, expected result..."
                required
              />

              <small>
                Be specific about what you expect from the student.
              </small>

            </div>


            {/* WORK TYPE */}
            <div className="form-group">

              <label>
                Work Type
              </label>

              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
              >

                <option value="Remote">
                  🌐 Remote
                </option>

                <option value="On-site">
                  🏢 On-site
                </option>

                <option value="Hybrid">
                  🔄 Hybrid
                </option>

              </select>

            </div>


            {/* BUTTONS */}
            <div className="form-buttons">

              <button
                type="submit"
                className="publish-btn"
              >
                🚀 Publish Project
              </button>

              <button
                type="button"
                className="reset-btn"
                onClick={resetForm}
              >
                ↻ Reset
              </button>

            </div>

          </form>

        </div>


        {/* RIGHT PREVIEW */}
        <div className="project-preview-card">

          <div className="preview-header">

            <div className="preview-icon">
              👁️
            </div>

            <div>
              <h2>Live Preview</h2>

              <p>
                Student view
              </p>
            </div>

          </div>


          <div className="preview-project">

            <div className="preview-top">

              <div className="preview-company-logo">
                🏢
              </div>

              <span className="preview-status">
                NEW
              </span>

            </div>


            <span className="preview-category">
              {formData.category || "Project Category"}
            </span>


            <h2>
              {formData.title || "Your Project Title"}
            </h2>


            <p className="preview-company">
              🏢 Your Company
            </p>


            <div className="preview-info">

              <div>
                <span>💰</span>

                <div>
                  <small>Budget</small>

                  <strong>
                    {formData.budget
                      ? `₹${Number(formData.budget).toLocaleString("en-IN")}`
                      : "₹0"}
                  </strong>
                </div>
              </div>


              <div>
                <span>🌐</span>

                <div>
                  <small>Work Type</small>

                  <strong>
                    {formData.workType}
                  </strong>
                </div>
              </div>

            </div>


            <div className="preview-section">

              <h4>
                🛠 Required Skills
              </h4>

              <div className="preview-skills">

                {formData.skills ? (
                  formData.skills
                    .split(",")
                    .filter((skill) => skill.trim())
                    .map((skill, index) => (
                      <span key={index}>
                        {skill.trim()}
                      </span>
                    ))
                ) : (
                  <span>React</span>
                )}

              </div>

            </div>


            <div className="preview-section">

              <h4>
                📝 Description
              </h4>

              <p>
                {formData.description ||
                  "Your project description will appear here. Add details about your project requirements."}
              </p>

            </div>


            {formData.deadline && (
              <div className="preview-deadline">
                📅 Deadline: {formData.deadline}
              </div>
            )}


            <button
              className="preview-apply-btn"
              type="button"
              onClick={() =>
                alert("Students can apply to this project.")
              }
            >
              🚀 Apply for Project
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default PostProject;