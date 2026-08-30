import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function FindStudents() {

  const [search, setSearch] = useState("");

  const students = [
    ["👩‍💻", "Aarohi Sharma", "React • JavaScript", "4.9"],
    ["👨‍💻", "Rahul Patil", "Python • Data Science", "4.8"],
    ["👩‍🎨", "Ananya Khan", "UI/UX • Figma", "4.9"],
    ["👨‍💻", "Aditya Singh", "Java • Android", "4.7"]
  ];

  const filtered = students.filter((student) =>
    student[1].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout type="client">

      <div className="page-header">

        <div>
          <h1>Find Students 🔎</h1>
          <p>Discover talented students for your projects.</p>
        </div>

      </div>

      <div className="search-area">

        <input
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="student-grid">

        {filtered.map((student, index) => (

          <div className="student-card" key={index}>

            <div className="student-avatar">
              {student[0]}
            </div>

            <h3>{student[1]}</h3>

            <p>{student[2]}</p>

            <div className="stars">
              ⭐ {student[3]}
            </div>

            <div className="student-actions">

              <button className="outline-btn">
                View Profile
              </button>

              <button className="primary-btn">
                Contact
              </button>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default FindStudents;