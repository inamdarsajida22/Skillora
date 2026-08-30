import DashboardLayout from "../../components/DashboardLayout";

function ClientReviews() {

  return (
    <DashboardLayout type="client">

      <div className="page-header">

        <div>
          <h1>Reviews ⭐</h1>
          <p>Your feedback and ratings.</p>
        </div>

      </div>

      <div className="review-card">

        <div className="review-avatar">
          👩‍💻
        </div>

        <div>

          <h3>Aarohi Sharma</h3>

          <div className="stars">
            ⭐⭐⭐⭐⭐
          </div>

          <p>
            "Great client to work with. Clear requirements
            and quick communication."
          </p>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ClientReviews;