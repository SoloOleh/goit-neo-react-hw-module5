import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./MoviesPage.module.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";
import { useLocation } from "react-router-dom";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const location = useLocation();

  useEffect(() => {
    if (!query) return;
    fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmNiNDA3YjU0Mzg4Zjk4ZTkzYmQxMWRjNjM0MmYyMyIsIm5iZiI6MTczNDAyNDI5Ny4wNzgsInN1YiI6IjY3NWIxYzY5ZDlkNTE5NWZhZGFhM2E1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0byKIVcLubUa-Q4fWkOw523lsjZs1Zal0hd4FOaRc9U`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error(err));
  }, [query]);

  const handleSubmit = (value) => {
    setSearchParams(value ? { query: value } : {});
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search Movies</h1>
      <SearchForm onSubmit={handleSubmit} />
      {/* Передаємо location до MovieList */}
      <MovieList movies={movies} fromLocation={location} />
    </div>
  );
}

export default MoviesPage;
