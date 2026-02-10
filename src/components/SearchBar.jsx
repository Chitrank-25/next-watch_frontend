import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const exampleQueries = [
    "Action movies with strong female lead",
    "Sci-fi movies with time travel",
    "Comedy movies from the 90s",
    "Thriller movies with plot twists",
    "Romantic movies set in Paris"
  ];

  const handleExampleClick = (example) => {
    setQuery(example);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe the kind of movie you want to watch..."
            className="search-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="search-button"
            disabled={isLoading || !query.trim()}
          >
            {isLoading ? 'Searching...' : 'Get Recommendations'}
          </button>
        </div>
      </form>

      <div className="example-queries">
        <p className="example-label">Try examples:</p>
        <div className="example-chips">
          {exampleQueries.map((example, index) => (
            <button
              key={index}
              className="example-chip"
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;