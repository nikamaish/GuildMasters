import React, { useState } from 'react';
import './games.css';

const Games = () => {
  const [selectedGenre, setSelectedGenre] = useState('Top Trending');

  const halloweenProducts = [
    {
      id: 1,
      img: "https://image.api.playstation.com/vulcan/ap/rnd/202208/1118/eqqPM2rRA1KnVNQuNkh4BhFn.png",
      name: 'Dead-Island',
      price: '$19.99',
      description: 'Base Game',
    },
    {
      id: 2,
      img: "https://cdn1.epicgames.com/offer/0c40923dd1174a768f732a3b013dcff2/EGS_TheLastofUsPartI_NaughtyDogLLC_S2_1200x1600-41d1b88814bea2ee8cb7986ec24713e0?h=480&quality=medium&resize=1&w=360",
      name: 'The Last Of Us',
      price: '$29.99',
      description: 'Base Game',
    },
    {
      id: 3,
      img: "https://m.media-amazon.com/images/M/MV5BMTY2YTE2ZGEtNGZhMy00YTdjLWI1ZjQtNmE4ODM2MTYzNTI3XkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg",
      name: 'Dead By Daylight',
      price: '$29.99',
      description: 'Base Game',
    },

    {
      id: 4,
      img: "https://rukminim2.flixcart.com/image/850/1000/k63xle80/code-in-the-box-game/7/y/u/pc-red-dead-redemption-2-pc-standard-edition-original-imafzmkyques8mxp.jpeg?q=90",
      name: 'Red Dead Redemption 2',
      price: '$29.99',
      description: 'Base Game',
    },
  ];

  const topTrendingProducts = [
    {
      id: 5,
      img: "https://image.api.playstation.com/vulcan/ap/rnd/202011/0919/cDHU28ds7cCvKAnVQo719gs0.png",
      name: 'Hogwards Legacy',
      price: '$39.99',
      description: 'Base Game',
    },
    {
      id:6,
      img: "https://cdn1.epicgames.com/offer/9773aa1aa54f4f7b80e44bef04986cea/EGS_RocketLeague_PsyonixLLC_S2_1200x1600-ebcb79b7c8aa2432c3ce52dfd4fc4ae0",
      name: 'Rocket League',
      price: '$39.99',
      description: 'Base Game',
    },

    {
      id: 7,
      img:"https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/5dA78458QCHaC4f5mYPGzH/e9145c8b9e5994077601f39545454fc2/ac-jade-box-no-crest.jpg",
      name: 'Assassins Creed',
      price: '$39.99',
      description: 'Base Game',
    },
    {
      id:8,
      img:"https://m.media-amazon.com/images/M/MV5BYWFhOGQwODctMDFmNC00NGEyLWI5NTUtZDliYzRmYmM4MzJlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg",
      name:'Cyberpunk 2077',
      price:'$39.99',
      description: 'Base Game',
    },
    {
      id:9,
      img:"https://image.jeuxvideo.com/medias/163129/1631287693-8700-jaquette-avant.jpg",
      name:'GTA V',
      price:'$39.99',
      description: 'Base Game',
    },
  
    
    {
      id:10,
      img:"https://upload.wikimedia.org/wikipedia/en/4/4b/Hitman_3_Packart.jpg",
      name:'Hitman 3',
      price:'$39.99',
      description: 'Base Game',
    },
    {
      id:11,
      img:"https://upload.wikimedia.org/wikipedia/en/3/35/Far_cry_6_cover.jpg",
      name:'FarCry 6',
      price:'$39.99',
      description: 'Base Game',
    },
    {
      id:12,
      img:"https://m.media-amazon.com/images/M/MV5BM2U1OWNlY2UtZmNlNi00NmExLWIwMzctMjZkMjc4NzM5MTBlXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_.jpg",
      name:'Watch Dogs',
      price:'$39.99',
      description: 'Base Game',
    }
    
  ];
  
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };

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

  const products = getProductsByGenre();

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
      </div>
      <div className="card-list">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.img} alt={product.name} />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <button>{product.price}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
