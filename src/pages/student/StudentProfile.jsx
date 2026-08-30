import DashboardLayout from "../../components/DashboardLayout";

function StudentProfile() {

  return (
    <DashboardLayout>

      <div className="profile-cover">
        <div className="big-avatar">👩‍💻</div>

        <div>
          <h1>Student Name</h1>
          <p>Computer Science Student • India</p>
        </div>

        <button className="primary-btn">
          ✏️ Edit Profile
        </button>
      </div>

      <div className="profile-grid">

        <div className="profile-card">

          <h2>About Me</h2>

          <p>
            Passionate student interested in web development,
            UI/UX and building real-world projects.
          </p>

          <h3>Education</h3>
          <p>🎓 Bachelor / College Student</p>

        </div>

        <div className="profile-card">

          <h2>Skills</h2>

          <div className="skill-tags">
            <span>React.js</span>
            <span>JavaScript</span>
            <span>HTML</span>
            <span>CSS</span>
            <span>UI/UX</span>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default StudentProfile;