import DashboardLayout from "../../components/DashboardLayout";

function Proposals() {

  return (
    <DashboardLayout type="client">

      <div className="page-header">

        <div>
          <h1>Project Proposals 📩</h1>
          <p>Review students who applied to your projects.</p>
        </div>

      </div>

      <div className="proposal-list">

        <div className="proposal-card">

          <div className="student-avatar">
            👩‍💻
          </div>

          <div className="proposal-info">

            <h3>Aarohi Sharma</h3>

            <p>
              React Developer • ⭐ 4.9
            </p>

            <p>
              I can complete your website within 10 days.
            </p>

          </div>

          <div className="proposal-actions">

            <button className="outline-btn">
              View
            </button>

            <button className="primary-btn">
              Hire ✓
            </button>

          </div>

        </div>

        <div className="proposal-card">

          <div className="student-avatar">
            👨‍💻
          </div>

          <div className="proposal-info">

            <h3>Rahul Patil</h3>

            <p>
              Full Stack Developer • ⭐ 4.8
            </p>

            <p>
              Experienced in React and Node.js.
            </p>

          </div>

          <div className="proposal-actions">

            <button className="outline-btn">
              View
            </button>

            <button className="primary-btn">
              Hire ✓
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Proposals;