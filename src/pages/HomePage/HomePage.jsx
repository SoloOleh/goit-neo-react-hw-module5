import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/movie/day", {
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
      .then((data) => setMovies(data.results || []))
      .catch((error) =>
        console.error("Error fetching trending movies:", error)
      );
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
