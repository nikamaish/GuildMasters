import React from 'react';
import './summary.css';

const Summary = ({ location }) => {
  const { product } = location.state;

  return (
    <div className='summary'>
    <div className="summary-container">
      <div className="summary-left">
        <p>{product.name}</p>
        <p className="description">{product.description}</p>
        {product.rating && (
          <div className="rating">Rating: {product.rating}</div>
        )}
        {product.videoUrl && (
          <div className="video-container">
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(product.videoUrl)}?autoplay=1&loop=1&playlist=${getYouTubeId(product.videoUrl)}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Video"
            ></iframe>
          </div>
        )}
      </div>
      <div className="summary-right">
        <p className="price">{product.price}</p>
        <button className="buy-button">Buy Now</button>
        <button className="buy-button">Go Back</button>
      </div>
    </div>
    </div>
  );
};

// Function to extract YouTube video ID from URL
const getYouTubeId = (url) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match && match[1];
};

export default Summary;
