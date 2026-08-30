import { useState } from "react";

function PostProject() {
  const [posted, setPosted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosted(true);
  };

  return (
    <div className="dashboard">
      <main className="dashmain">

        <div className="welcome">
          <div>
            <span className="eyebrow">CLIENT AREA</span>
            <h1>Post a Project 🚀</h1>
            <p>Find talented students for your project.</p>
          </div>
        </div>

        <div className="card">

          {posted && (
            <div className="success">
              🎉 Project posted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Project Title</label>
            <input
              type="text"
              placeholder="Example: Build a React Website"
              required
            />

            <label>Category</label>
            <select required>
              <option value="">Select Category</option>
              <option>Web Development</option>
              <option>App Development</option>
              <option>UI/UX Design</option>
              <option>Graphic Design</option>
              <option>Content Writing</option>
              <option>Digital Marketing</option>
            </select>

            <label>Required Skills</label>
            <input
              type="text"
              placeholder="React, JavaScript, HTML, CSS"
              required
            />

            <label>Budget</label>
            <input
              type="number"
              placeholder="₹5000"
              required
            />

            <label>Deadline</label>
            <input type="date" required />

            <label>Project Description</label>
            <textarea
              rows="6"
              placeholder="Describe your project..."
              required
            ></textarea>

            <label>Work Type</label>
            <select>
              <option>Remote</option>
              <option>On-site</option>
              <option>Hybrid</option>
            </select>

            <button
              type="submit"
              className="btn primary full"
            >
              🚀 Publish Project
            </button>

          </form>

        </div>

      </main>
    </div>
  );
}

export default PostProject;