import React, { useState, useEffect } from 'react';
import './games.css';
import { halloweenProducts, topTrendingProducts } from '../data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faGamepad } from '@fortawesome/free-solid-svg-icons';

const Games = () => {
  const PAGE_PRODUCTS = 'product';
  const PAGE_CART = 'cart';
  const [selectedGenre, setSelectedGenre] = useState('Top Trending');
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const productsByGenre = getProductsByGenre();
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
    return [];
  };

  const products = searchQuery ? filteredProducts : getProductsByGenre();

  const addToCart = (product) => {
    console.log('we are in addToCart function');
    setCart([...cart, { ...product }]);
  };

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter((product) => product !== productToRemove));
  };

  const renderProducts = () => (
    <>
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.img} alt={product.name} />
          <div className="product-details">
            <h2>{product.name}</h2>
            <div className="price-heart">
              <p>{product.price}</p>
              <button onClick={() => addToCart(product)} className="heart-button">
                <FontAwesomeIcon icon={faHeart} size="s" />
              </button>
            </div>
            <button className="buy-button">Buy Now</button>
          </div>
        </div>
      ))}
    </>
  );

  const renderCart = () => (
    <>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.name} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <div className="price-heart">
                <p>{product.price}</p>
              </div>
              <button className='remove' onClick={() => removeFromCart(product)}>Remove </button>
            </div>
          </div>
        ))
      )}
    </>
  );

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
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <header>
        <button onClick={() => navigateTo(PAGE_PRODUCTS)} className='page'>
          <FontAwesomeIcon icon={faGamepad} size='lg' />
        </button>
        <button onClick={() => navigateTo(PAGE_CART)} className='page'>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span style={{ marginLeft: '0.5rem' }}>{cart.length}</span>
        </button>
      </header>
      <div className="card-list">
        {page === PAGE_PRODUCTS && renderProducts()}
        {page === PAGE_CART && renderCart()}
      </div>
    </div>
  );
};

export default Games;
