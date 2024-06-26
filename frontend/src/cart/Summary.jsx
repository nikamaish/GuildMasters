import React from 'react';
import './summary.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

const Summary = ({ location }) => {
  const product = location.state?.product;

  if (!product) {
    return <div>No product details available.</div>;
  }

  // Function to extract YouTube video ID from URL
  const getYouTubeId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match && match[1];
  };

  const payment = () => {
    swal({
      title: "Order Placed Successfully!",
      text: "Thank you for your purchase. Your order has been placed.",
      icon: "success",
      button: "OK",
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="stars">
        {Array.from({ length: 5 }, (_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={`star ${index < rating ? 'filled' : ''}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="summary">
      <div className="summary-container">
        <div className="summary-left">
          <p>{product.name}</p>
          <div className="description-rating">
            <p className="description">{product.description}</p>
            {product.rating && <div className="rating">{renderStars(product.rating)}</div>}
          </div>
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
          <button className="buy-buttons" onClick={payment}>Buy Now</button>
          <Link to="/games">
            <button className="buy-buttons">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Summary;
