import DashboardLayout from "../../components/DashboardLayout";
import { Link } from "react-router-dom";

function Applications() {

  const applications = [
    ["React Website", "TechNova", "Under Review"],
    ["Logo Design", "Brandify", "Shortlisted"],
    ["Python Project", "DataWorks", "Rejected"]
  ];

  return (
    <DashboardLayout>

      <div className="page-header">
        <div>
          <h1>My Applications 📩</h1>
          <p>Track all your project applications.</p>
        </div>
      </div>

      <div className="table-card">

        {applications.map((item, index) => (

          <div
            className="application-row"
            key={index}
          >

            {/* Project */}
            <div>
              <b>{item[0]}</b>
              <small>{item[1]}</small>
            </div>

            {/* Status */}
            <span className={`status status-${index}`}>
              {item[2]}
            </span>

            {/* View Application */}
            <Link
              to={`/student/applications/view/${encodeURIComponent(item[0])}`}
              className="small-btn"
            >
              👁 View
            </Link>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Applications;