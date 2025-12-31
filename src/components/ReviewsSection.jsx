import React from "react";
import "../styles/ReviewsSection.css";

const reviews = [
  {
    text: "Challenges and quizzes helped me apply what I learned quickly. I enjoyed clarity of each lesson.",
    author: "K. Lohitha Alekhya",
    rating: "★★★★★",
  },
  {
    text: "The modules are structured really well. Everything builds up smoothly, and the short format made it easy.",
    author: "K. Sai Lakshmi Durga",
    rating: "★★★★☆",
  },
  {
    text: "I liked how visual the platform was. It helped me understand programming concepts that I used to find hard before.",
    author: "G. Ashrita",
    rating: "★★★★★",
  },
  {
    text: "Fun, easy, and consistent. Every lesson felt rewarding and pushed me to stay on track without losing interest.",
    author: "K. Kavya Santhoshi",
    rating: "★★★★★",
  },
  {
    text: "Clean interface and helpful feedback after each quiz. I improved my understanding and confidence over time.",
    author: "K. Hema Durga",
    rating: "★★★★☆",
  },
  {
    text: "A fantastic platform that makes coding exciting. The balance of visuals, theory, and practice kept me engaged!",
    author: "R. Nikhila",
    rating: "★★★★★",
  },
];

const ReviewsSection = () => {
  return (
    <section className="reviews-section">
      <h2 className="reviews-heading">What Our Learners Say</h2>
      <div className="carousel-wrapper">
        <div className="reviews-viewport">
          <div className="reviews-container">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <p className="review-text">"{review.text}"</p>
                <div className="review-author">– {review.author}</div>
                <div className="review-rating">{review.rating}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
