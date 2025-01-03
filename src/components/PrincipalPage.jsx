import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../utils/api';
import { useNavigate } from 'react-router-dom';
// import '../components/principal.css';

import './blocks/popup.css';

function PrincipalPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) {
      alert('Debes iniciar sesión primero.');
      navigate('/login'); // Redirige al login si no está autenticado
    }
  }, [userEmail, navigate]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!query) return;

    setLoading(true);
    setMovies([]);
    setError('');

    try {
      const movieList = await fetchMovies(query);

      if (movieList.length > 0) {
        setMovies(movieList);
      } else {
        setError('No se encontraron películas.');
      }
    } catch (err) {
      setError('Error al cargar los resultados. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleFavoriteToggle = (movie) => {
    let updatedFavorites = [...favorites];
    const movieIndex = updatedFavorites.findIndex(fav => fav.id === movie.id);

    if (movieIndex > -1) {
      updatedFavorites.splice(movieIndex, 1); // Eliminar de favoritos
    } else {
      updatedFavorites.push(movie); // Agregar a favoritos
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleFavoritesPopup = () => {
    const popup = document.getElementById('popupFavorites');
    popup.style.display = 'flex';
  };

  const closePopup = () => {
    const popup = document.getElementById('popupFavorites');
    popup.style.display = 'none';
  };

  const createMovieCard = (movie) => {
    const isFavorite = favorites.some(fav => fav.id === movie.id);

    return (
      <div key={movie.id} className="movie-card">
        <img
          className="movie-card__image"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
        <p className="movie-card__description">{movie.overview || 'Descripción no disponible'}</p>
        <button
          className={`movie-card__save ${isFavorite ? 'saved' : ''}`}
          onClick={() => handleFavoriteToggle(movie)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
    );
  };

  const loadFavorites = () => {
    return favorites.length > 0 ? (
      favorites.map(movie => (
        <div key={movie.id} className="favorite-movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="favorite-movie-card__image"
          />
          <h4 className="favorite-movie-card__title">{movie.title}</h4>
          <button
            className="remove-favorite"
            onClick={() => handleFavoriteToggle(movie)}
          >
            Eliminar
          </button>
        </div>
      ))
    ) : (
      <p>No tienes películas favoritas guardadas.</p>
    );
  };

  return (
    <div className="page page--main">
      <header className="header header--main">
        <div className="header__container">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSphFr1Ay6uVgEhvW590zUO80z6wcKMj4CmHA&s"
            alt="Logo"
            className="header__logo"
          />
          <nav className="header__nav">
            <a href="https://www.imdb.com" target="_blank" className="header__link">
              <img src="/images/film.svg" alt="Más películas" className="header__icon" />More Movies IMDb
            </a>
            <a href="#" className="header__link" id="favorites-btn" onClick={handleFavoritesPopup}>
              <img src="/images/briefcase.svg" alt="Favoritos" className="header__icon" />Favorites
            </a>
          </nav>
          <form className="search__form" id="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search__input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar película o serie..."
              required
            />
            <button type="submit" className="search__button">Buscar</button>
          </form>
        </div>
      </header>
      <div id="popupFavorites" className="popup-favorites">
        <div className="popup-favorites__content">
          <button className="popup-favorites__close" onClick={closePopup}>×</button>
          <div className="popup-content popup-favorites__movies">
            {loadFavorites()}
          </div>
        </div>
      </div>

      <main className="main-content">
        <div className="welcome-message">
          {userEmail && <h2>¡Bienvenido, {userEmail}!</h2>}
        </div>
        <div className="movies__grid">
          {loading ? <p>Cargando...</p> : error ? <p>{error}</p> : movies.map(createMovieCard)}
        </div>
      </main>

      

      <footer className="footer">
        <button className="header__logout" onClick={handleLogout}>
          Cerrar Sesión
          <img src="/images/log-out.svg" alt="Cerrar sesión" className="header__logout-icon" />
        </button>
        <p className="footer__text">© 2024 Final Frontier. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default PrincipalPage;
