import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-icon">🎬</div>
      </div>
      <p className="loading-text">Finding perfect movies for you...</p>
    </div>
  );
};

export default LoadingSpinner;