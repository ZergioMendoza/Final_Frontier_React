import React, { useState } from 'react';
import { searchMovies, fetchMovieDetails } from '../utils/api';

function AppPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Función para manejar el formulario de búsqueda
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return;

    setLoading(true);
    setMovies([]);
    setError('');

    try {
      const movieList = await searchMovies(query);

      if (movieList.length > 0) {
        const movieDetailsPromises = movieList.map(async (movie) => {
          return await fetchMovieDetails(movie.id);
        });
        const moviesWithDetails = await Promise.all(movieDetailsPromises);
        setMovies(moviesWithDetails);
      } else {
        setError('No se encontraron resultados.');
      }
    } catch (err) {
      setError('Hubo un error al buscar las películas.');
    } finally {
      setLoading(false);
    }
  };

  // Función para crear las tarjetas de película
  const createMovieCard = (movie) => {
    return (
      <div key={movie.id} className="movie-card">
        <img
          className="movie-card__image"
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/default-poster.jpg'}
          alt={movie.title}
        />
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">
          Año: {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
        </p>
        <p className="movie-card__description">
          Descripción: {movie.overview || 'Descripción no disponible'}
        </p>
      </div>
    );
  };

  return (
    <div>
      {/* Formulario de búsqueda */}
      <form id="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Actualiza el estado cuando cambia el input
        />
        <button type="submit">Buscar</button>
      </form>

      {/* Contenedor de resultados */}
      <div className="movies__grid">
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {movies.length > 0 ? (
          movies.map((movie) => createMovieCard(movie)) // Muestra las tarjetas de película
        ) : (
          <p>No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

export default AppPage;

