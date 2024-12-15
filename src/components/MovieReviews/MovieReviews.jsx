import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!movieId) return;
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNiNDA3YjU0Mzg4Zjk4ZTkzYmQxMWRjNjM0MmYyMyIsIm5iZiI6MTczNDAyNDI5Ny4wNzgsInN1YiI6IjY3NWIxYzY5ZDlkNTE5NWZhZGFhM2E1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0byKIVcLubUa-Q4fWkOw523lsjZs1Zal0hd4FOaRc9U`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setReviews(data.results || []))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.listItem}>
              <h3 className={styles.author}>Author: {review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>We have no reviews for this movie.</p>
      )}
    </div>
  );
}

export default MovieReviews;
