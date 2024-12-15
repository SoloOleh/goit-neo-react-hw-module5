import { useEffect, useState, useRef } from "react";
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) return;
    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
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
      .then((data) => setMovie(data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <button
        onClick={() => navigate(backLink.current)}
        className={styles.goBackButton}
      >
        Go back
      </button>
      <div className={styles.detailsContainer}>
        <img
          className={styles.poster}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title}
        />
        <div className={styles.infoContainer}>
          <h1 className={styles.title}>
            {movie.title} (
            {movie.release_date && movie.release_date.split("-")[0]})
          </h1>
          <p className={styles.text}>
            <strong>User Score:</strong> {movie.vote_average * 10}%
          </p>
          <p className={styles.text}>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p className={styles.text}>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <h2 className={styles.subTitle}>Additional information</h2>
        <ul className={styles.infoList}>
          <li>
            <Link
              to="cast"
              className={styles.link}
              state={{ from: backLink.current }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              className={styles.link}
              state={{ from: backLink.current }}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
