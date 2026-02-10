import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import LoadingSpinner from './components/LoadingSpinner';
import { getRecommendations, healthCheck } from './services/api';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    // Check API health on mount
    const checkAPI = async () => {
      try {
        await healthCheck();
        setApiStatus('online');
      } catch (err) {
        setApiStatus('offline');
        console.error('API health check failed:', err);
      }
    };
    checkAPI();
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setCurrentQuery(query);
    setMovies([]);

    try {
      const response = await getRecommendations(query);
      
      if (response.success && response.recommendations) {
        setMovies(response.recommendations);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to get recommendations. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">🎬</span>
          Next Watch
        </h1>
        <p className="app-subtitle">
          Discover your next favorite movie with AI-powered recommendations
        </p>
        
        {/* API Status Indicator */}
        <div className={`api-status ${apiStatus}`}>
          <span className="status-dot"></span>
          {apiStatus === 'online' ? 'Connected' : apiStatus === 'offline' ? 'Offline' : 'Connecting...'}
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Loading State */}
        {isLoading && <LoadingSpinner />}

        {/* Error State */}
        {error && (
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <p className="error-message">{error}</p>
            <button 
              className="retry-button"
              onClick={() => handleSearch(currentQuery)}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {!isLoading && !error && movies.length > 0 && (
          <div className="results-container">
            <h2 className="results-title">
              Recommended for: <span className="query-highlight">"{currentQuery}"</span>
            </h2>
            <div className="movies-grid">
              {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && movies.length === 0 && !currentQuery && (
          <div className="empty-state">
            <div className="empty-icon">🍿</div>
            <h3>Ready to find your perfect movie?</h3>
            <p>Enter your preferences above and let AI do the magic!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Powered by OpenAI & MongoDB</p>
      </footer>
    </div>
  );
}

export default App;