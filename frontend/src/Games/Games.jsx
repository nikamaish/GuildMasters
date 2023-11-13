import React, { useState, useEffect } from 'react';
import './games.css';
import Cart from '../cart/Cart.jsx';
import { halloweenProducts, topTrendingProducts } from '../data.jsx';

const Games = () => {
  const [selectedGenre, setSelectedGenre] = useState('Top Trending');
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery(''); // Clear search query when changing genres
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const productsByGenre = getProductsByGenre();
    
    // Filter products based on both genre and searchQuery
    const filtered = productsByGenre.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [selectedGenre, searchQuery]);

  const genreButtons = [
    { label: 'Top Trending', value: 'Top Trending' },
    { label: 'Halloween Spotlight', value: 'Halloween' },
  ];

  const getProductsByGenre = () => {
    if (selectedGenre === 'Top Trending') {
      return topTrendingProducts;
    } else if (selectedGenre === 'Halloween') {
      return halloweenProducts;
    }
  };

  const products = searchQuery ? filteredProducts : getProductsByGenre();

  return (
    <div className="games">
      <div className="genre-selection">
        {genreButtons.map((genreButton) => (
          <button
            key={genreButton.value}
            onClick={() => handleGenreClick(genreButton.value)}
            className={selectedGenre === genreButton.value ? 'selected' : ''}
          >
            {genreButton.label}
          </button>
        ))}
        <input className='search-bar'
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="card-list">
        {products && products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.name} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Buy Now</button>
            </div>
          </div>
        ))}
      </div>
      {/* <Cart cartItems={cartItems} /> */}
    </div>
  );
};

export default Games;
