import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = localStorage.getItem("skilloraUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const studentId = user?.id;

  useEffect(() => {
    if (!studentId) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch(
      `http://127.0.0.1:8000/api/proposals/student/${studentId}`
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to load applications");
        }

        const data = await response.json();

        const formattedApplications = (data.proposals || []).map(
          (proposal) => ({
            id: proposal.id,
            projectId: proposal.project_id,
            project: `Project #${proposal.project_id}`,
            message: proposal.message,
            bidAmount: proposal.bid_amount,
            status: proposal.status,
          })
        );

        setApplications(formattedApplications);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("❌ Unable to connect to backend.");
        setLoading(false);
      });
  }, [studentId]);

  const getStatusClass = (status) => {
    if (status === "shortlisted") {
      return "status-1";
    }

    if (status === "rejected") {
      return "status-2";
    }

    return "status-0";
  };

  return (
    <DashboardLayout>

      <div className="page-header">
        <div>
          <h1>My Applications 📩</h1>
          <p>Track all your project applications.</p>
        </div>
      </div>

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      <div className="table-card">

        {loading ? (
          <div className="empty-state">
            <div className="big-icon">⏳</div>
            <h2>Loading Applications...</h2>
            <p>Please wait while we fetch your applications.</p>
          </div>
        ) : applications.length > 0 ? (

          applications.map((application) => (

            <div
              className="application-row"
              key={application.id}
            >

              {/* Project */}
              <div>
                <b>{application.project}</b>

                <small>
                  Bid Amount: ₹{application.bidAmount || "Not specified"}
                </small>
              </div>

              {/* Status */}
<span
  className={`status ${getStatusClass(application.status)}`}
>
  {application.status === "shortlisted"
    ? "🟢 Shortlisted"
    : application.status === "rejected"
    ? "🔴 Rejected"
    : application.status === "withdrawn"
    ? "⚠️ Withdrawn"
    : "🟡 Pending"}
</span>

              {/* View Application */}
              <Link
                to={`/student/applications/view/${application.id}`}
                className="small-btn"
              >
                👁 View
              </Link>

            </div>

          ))

        ) : (

          <div className="empty-state">

            <div className="big-icon">
              📩
            </div>

            <h2>No Applications Yet</h2>

            <p>
              You haven't applied to any projects yet.
            </p>

            <Link
              to="/student/projects"
              className="primary-btn"
            >
              🔎 Find Projects
            </Link>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default Applications;