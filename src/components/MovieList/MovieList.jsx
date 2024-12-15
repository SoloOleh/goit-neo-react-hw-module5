import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

function MovieList({ movies, fromLocation }) {
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.listItem}>
          <Link
            to={`/movies/${movie.id}`}
            className={styles.link}
            state={{ from: fromLocation }}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
              className={styles.image}
            />
            <p className={styles.movieTitle}>
              {movie.title}{" "}
              {movie.release_date &&
                `(${new Date(movie.release_date).getFullYear()})`}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
