import { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";

function Reviews() {

  const [reviews, setReviews] = useState([
    {
      client: "TechNova",
      rating: 5,
      text: "Excellent work and very professional. Delivered the project on time."
    },
    {
      client: "Brandify",
      rating: 4,
      text: "Good communication and creative work. Would definitely work again."
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [client, setClient] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const addReview = () => {

    if (!client.trim() || !reviewText.trim()) {
      alert("Please enter client name and review.");
      return;
    }

    const newReview = {
      client: client.trim(),
      rating: rating,
      text: reviewText.trim()
    };

    setReviews([...reviews, newReview]);

    setClient("");
    setRating(5);
    setReviewText("");
    setShowForm(false);
  };


  const deleteReview = (index) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (confirmDelete) {
      setReviews(
        reviews.filter((_, i) => i !== index)
      );
    }
  };


  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };


  return (
    <DashboardLayout>

      <div className="page-header">

        <div>
          <h1>My Reviews ⭐</h1>
          <p>What clients say about your work.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "✕ Close" : "+ Add Review"}
        </button>

      </div>


      {/* ADD REVIEW FORM */}

      {showForm && (
        <div className="form-card">

          <h2>Add Client Review</h2>

          <input
            type="text"
            placeholder="Client name"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />

          <div style={{ margin: "15px 0" }}>

            <label>
              Rating:
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(Number(e.target.value))
              }
            >
              <option value={5}>⭐⭐⭐⭐⭐ 5</option>
              <option value={4}>⭐⭐⭐⭐ 4</option>
              <option value={3}>⭐⭐⭐ 3</option>
              <option value={2}>⭐⭐ 2</option>
              <option value={1}>⭐ 1</option>
            </select>

          </div>


          <textarea
            placeholder="Write client review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
          />


          <button
            className="primary-btn"
            onClick={addReview}
          >
            ⭐ Submit Review
          </button>

        </div>
      )}


      {/* REVIEWS */}

      <div className="reviews-list">

        {reviews.map((review, index) => (

          <div
            className="review-card"
            key={index}
          >

            <div className="review-avatar">
              🏢
            </div>


            <div style={{ flex: 1 }}>

              <h3>{review.client}</h3>

              <div className="stars">
                {renderStars(review.rating)}
              </div>

              <p>
                "{review.text}"
              </p>

            </div>


            <button
              className="small-btn"
              onClick={() => deleteReview(index)}
            >
              🗑 Delete
            </button>

          </div>

        ))}

      </div>


      {/* EMPTY STATE */}

      {reviews.length === 0 && (
        <div className="empty-state">

          <h2>⭐ No Reviews Yet</h2>

          <p>
            Your client reviews will appear here.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            + Add First Review
          </button>

        </div>
      )}

    </DashboardLayout>
  );
}

export default Reviews;