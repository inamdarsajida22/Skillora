import DashboardLayout from "../../components/DashboardLayout";

function Reviews() {

  return (
    <DashboardLayout>

      <div className="page-header">
        <div>
          <h1>My Reviews ⭐</h1>
          <p>What clients say about your work.</p>
        </div>
      </div>

      <div className="review-card">

        <div className="review-avatar">
          🏢
        </div>

        <div>

          <h3>TechNova</h3>

          <div className="stars">
            ⭐⭐⭐⭐⭐
          </div>

          <p>
            "Excellent work and very professional.
            Delivered the project on time."
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Reviews;