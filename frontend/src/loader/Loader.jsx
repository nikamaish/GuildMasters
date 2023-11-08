import React from 'react';
import { CircleLoader } from 'react-spinners';
import './loader.css';

const Loader = ({ loading }) => {
  return (
    <div className="loader-container">
      <CircleLoader color={'#123abc'} loading={loading} size={150} />
    </div>
  );
};

export default Loader;
