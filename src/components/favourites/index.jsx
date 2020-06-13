import React from 'react';
import FavouriteCard from '../favouriteCard/index';
import './index.scss';

const Favourites = ({ favouritePairs, secondClassName }) => {
  return (
    <div className={`favourites ${secondClassName ? 'show-fav-under' : ''}`}>
      <h2>Favourites</h2>
      {favouritePairs.length > 0 ? (
        <div className='favourite-flex'>
          <div className='favourite-section-containers'>
            {favouritePairs.map(({ ...props }, idx) => (
              <FavouriteCard {...props} key={`${idx}-1`} />
            ))}
          </div>
          <div className='rect-box'>
            <p>+</p>
          </div>
        </div>
      ) : (
        <div className='single-box'>
          <p>+</p>
        </div>
      )}
    </div>
  );
};

export default Favourites;
