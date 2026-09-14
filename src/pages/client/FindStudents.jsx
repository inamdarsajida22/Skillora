import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

function FindStudents() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    {
      avatar: "👩‍💻",
      name: "Aarohi Sharma",
      skills: "React • JavaScript",
      rating: "4.9",
      college: "Pune University",
      experience: "1 Year",
      projects: "12 Projects",
      about:
        "Frontend developer passionate about building modern and responsive web applications.",
    },
    {
      avatar: "👨‍💻",
      name: "Rahul Patil",
      skills: "Python • Data Science",
      rating: "4.8",
      college: "Shivaji University",
      experience: "1 Year",
      projects: "9 Projects",
      about:
        "Python and Data Science enthusiast with experience in data analysis and machine learning.",
    },
    {
      avatar: "👩‍🎨",
      name: "Ananya Khan",
      skills: "UI/UX • Figma",
      rating: "4.9",
      college: "Mumbai University",
      experience: "2 Years",
      projects: "15 Projects",
      about:
        "Creative UI/UX designer who loves creating simple and user-friendly digital experiences.",
    },
    {
      avatar: "👨‍💻",
      name: "Aditya Singh",
      skills: "Java • Android",
      rating: "4.7",
      college: "Delhi University",
      experience: "1 Year",
      projects: "8 Projects",
      about:
        "Android developer focused on building useful and easy-to-use mobile applications.",
    },
  ];

  const filtered = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.skills.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout type="client">

      <div className="page-header">
        <div>
          <p className="welcome">TALENT DISCOVERY</p>

          <h1>Find Students 🔎</h1>

          <p>
            Discover talented students for your projects.
          </p>
        </div>
      </div>


      {/* SEARCH */}

      <div className="search-area">

        <span>🔎</span>

        <input
          type="text"
          placeholder="Search by name or skill..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <button
            className="clear-search"
            onClick={() => setSearch("")}
          >
            ✕
          </button>
        )}

      </div>


      {/* RESULT COUNT */}

      <div className="student-result-info">
        <h2>Available Students</h2>

        <span>
          {filtered.length} student
          {filtered.length !== 1 ? "s" : ""} found
        </span>
      </div>


      {/* STUDENT CARDS */}

      <div className="student-grid">

        {filtered.map((student, index) => (

          <div className="student-card" key={index}>

            <div className="student-card-top">

              <div className="student-avatar">
                {student.avatar}
              </div>

              <div className="student-rating">
                ⭐ {student.rating}
              </div>

            </div>


            <h3>{student.name}</h3>

            <p className="student-skills">
              {student.skills}
            </p>


            <div className="student-mini-info">

              <span>
                🎓 {student.college}
              </span>

              <span>
                💼 {student.experience}
              </span>

            </div>


            <div className="student-actions">

              {/* VIEW PROFILE */}

              <button
                className="outline-btn"
                onClick={() => setSelectedStudent(student)}
              >
                👁 View Profile
              </button>


              {/* CONTACT */}

              <Link
                to="/client/messages"
                className="primary-btn"
              >
                💬 Contact
              </Link>

            </div>

          </div>

        ))}

      </div>


      {/* NO RESULT */}

      {filtered.length === 0 && (
        <div className="no-students">

          <div>🔎</div>

          <h3>No students found</h3>

          <p>
            Try searching with another name or skill.
          </p>

          <button
            className="primary-btn"
            onClick={() => setSearch("")}
          >
            Show All Students
          </button>

        </div>
      )}


      {/* PROFILE POPUP */}

      {selectedStudent && (

        <div
          className="profile-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >

          <div
            className="student-profile-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setSelectedStudent(null)}
            >
              ✕
            </button>


            <div className="modal-avatar">
              {selectedStudent.avatar}
            </div>

            <h2>{selectedStudent.name}</h2>

            <p className="modal-skills">
              {selectedStudent.skills}
            </p>

            <div className="modal-rating">
              ⭐ {selectedStudent.rating} Rating
            </div>


            <div className="modal-details">

              <div>
                <span>🎓</span>

                <div>
                  <small>College</small>
                  <strong>{selectedStudent.college}</strong>
                </div>
              </div>

              <div>
                <span>💼</span>

                <div>
                  <small>Experience</small>
                  <strong>{selectedStudent.experience}</strong>
                </div>
              </div>

              <div>
                <span>📁</span>

                <div>
                  <small>Completed Projects</small>
                  <strong>{selectedStudent.projects}</strong>
                </div>
              </div>

            </div>


            <div className="modal-about">

              <h4>About</h4>

              <p>
                {selectedStudent.about}
              </p>

            </div>


            <div className="modal-actions">

              <button
                className="outline-btn"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>

              <Link
                to="/client/messages"
                className="primary-btn"
              >
                💬 Contact Student
              </Link>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>
  );
}

export default FindStudents;