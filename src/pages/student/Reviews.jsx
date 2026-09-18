import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [reviewerId, setReviewerId] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Logged-in student
  const storedUser = localStorage.getItem("skilloraUser");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user?.id;

  // ================= LOAD REVIEWS =================

  useEffect(() => {
    if (!userId) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    const loadReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://skillora-ex4a.onrender.com/api/reviews/${userId}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.detail || "Failed to load reviews"
          );
        }

        setReviews(data.reviews || []);

      } catch (err) {
        console.error(err);
        setError(`❌ ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [userId]);


  // ================= ADD REVIEW =================

  const addReview = async () => {
    if (!userId) {
      setError("Please login first.");
      return;
    }

    if (!reviewerId.trim()) {
      setError("Please enter client ID.");
      return;
    }

    if (!reviewText.trim()) {
      setError("Please enter review.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const params = new URLSearchParams();

      params.append("reviewer_id", reviewerId);
      params.append("reviewed_user_id", userId);
      params.append("rating", rating);
      params.append("comment", reviewText);

      const response = await fetch(
        `https://skillora-ex4a.onrender.com/api/reviews/?${params.toString()}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to add review"
        );
      }

      setReviews((prev) => [
        data.review,
        ...prev
      ]);

      setReviewerId("");
      setRating(5);
      setReviewText("");
      setShowForm(false);

      setSuccess("✅ Review added successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 2500);

    } catch (err) {
      console.error(err);
      setError(`❌ ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };


  // ================= DELETE REVIEW =================

  const deleteReview = async (reviewId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://skillora-ex4a.onrender.com/api/reviews/${reviewId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to delete review"
        );
      }

      setReviews((prev) =>
        prev.filter(
          (review) => review.id !== reviewId
        )
      );

      setSuccess("🗑️ Review deleted successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 2000);

    } catch (err) {
      console.error(err);
      setError(`❌ ${err.message}`);
    }
  };


  // ================= STARS =================

  const renderStars = (rating) => {
    return "⭐".repeat(Number(rating));
  };


  return (
    <DashboardLayout>

      {/* HEADER */}

      <div className="page-header">

        <div>
          <h1>My Reviews ⭐</h1>

          <p>
            What clients say about your work.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
          }}
        >
          {showForm
            ? "✕ Close"
            : "+ Add Review"}
        </button>

      </div>


      {/* SUCCESS */}

      {success && (
        <p className="success">
          {success}
        </p>
      )}


      {/* ERROR */}

      {error && (
        <p className="error">
          {error}
        </p>
      )}


      {/* ADD REVIEW FORM */}

      {showForm && (

        <div className="form-card">

          <h2>Add Client Review</h2>

          <input
            type="number"
            placeholder="Client User ID"
            value={reviewerId}
            onChange={(e) =>
              setReviewerId(e.target.value)
            }
          />

          <div style={{ margin: "15px 0" }}>

            <label>
              Rating:
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(e.target.value)
                )
              }
            >

              <option value={5}>
                ⭐⭐⭐⭐⭐ 5
              </option>

              <option value={4}>
                ⭐⭐⭐⭐ 4
              </option>

              <option value={3}>
                ⭐⭐⭐ 3
              </option>

              <option value={2}>
                ⭐⭐ 2
              </option>

              <option value={1}>
                ⭐ 1
              </option>

            </select>

          </div>


          <textarea
            placeholder="Write client review..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
            rows="4"
          />


          <button
            className="primary-btn"
            onClick={addReview}
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "⭐ Submit Review"}
          </button>

        </div>
      )}


      {/* REVIEWS */}

      <div className="reviews-list">

        {loading ? (

          <div className="empty-state">

            <div className="big-icon">
              ⏳
            </div>

            <h2>
              Loading Reviews...
            </h2>

            <p>
              Please wait while we fetch your reviews.
            </p>

          </div>

        ) : reviews.length > 0 ? (

          reviews.map((review) => (

            <div
              className="review-card"
              key={review.id}
            >

              <div className="review-avatar">
                🏢
              </div>


              <div style={{ flex: 1 }}>

                <h3>
                  Client #{review.reviewer_id}
                </h3>

                <div className="stars">
                  {renderStars(review.rating)}
                </div>

                <p>
                  "{review.comment || "No comment"}"
                </p>

              </div>


              <button
                className="small-btn"
                onClick={() =>
                  deleteReview(review.id)
                }
              >
                🗑 Delete
              </button>

            </div>

          ))

        ) : (

          <div className="empty-state">

            <h2>
              ⭐ No Reviews Yet
            </h2>

            <p>
              Your client reviews will appear here.
            </p>

            <button
              className="primary-btn"
              onClick={() =>
                setShowForm(true)
              }
            >
              + Add First Review
            </button>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default Reviews;