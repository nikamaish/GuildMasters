import React from 'react';
import './summary.css';

const Summary = ({ location }) => {
  console.log('Location state:', location.state); // Check what's being received
  const { product } = location.state;

  return (
    <div className="summary-container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p className="price">{product.price}</p>
      {product.videoUrl && (
        <div className="additional-details">
          <p>Video URL: <a href={product.videoUrl} target="_blank" rel="noopener noreferrer">{product.videoUrl}</a></p>
        </div>
      )}
      {product.rating && (
        <div className="additional-details">
          <p className="rating">Rating: {product.rating}</p>
        </div>
      )}
      {/* Add other details as needed */}
    </div>
  );
};

export default Summary;
