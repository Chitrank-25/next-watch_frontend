import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.posterUrl ? (
          <img src={movie.posterUrl} alt={movie.title} />
        ) : (
          <div className="poster-placeholder">
            <div className="poster-icon">🎬</div>
            <div className="poster-title">{movie.title}</div>
          </div>
        )}
      </div>
      
      <div className="movie-content">
        <div className="movie-header">
          <h3 className="movie-title">{movie.title}</h3>
          <span className="movie-year">({movie.year})</span>
        </div>
        
        <div className="movie-meta">
          <span className="movie-genre">{movie.genre}</span>
          <span className="movie-rating">⭐ {movie.rating}</span>
        </div>
        
        <p className="movie-description">{movie.description}</p>
        
        <div className="movie-details">
          <div className="detail-item">
            <strong>Director:</strong> {movie.director}
          </div>
          <div className="detail-item">
            <strong>Cast:</strong> {movie.cast?.join(', ')}
          </div>
        </div>
        
        <div className="movie-recommendation">
          <strong>Why recommended:</strong>
          <p>{movie.whyRecommended}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;