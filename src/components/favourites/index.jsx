import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FavouriteCard from '../favouriteCard/index';
import server from '../../services/server';
import './index.scss';

class Favourites extends Component {
  constructor(props) {

    super(props);

    this.state = {
      pairs: [],
    };

  }

  async componentDidMount () {
  }

  render () {
    const { _favouritePairs, favouritePairs, remove, secondClassName, showSpinner, refresh, showBsellModal2 } = this.props;

    return (
      <div className={`favourites ${secondClassName ? 'show-fav-under' : ''}`}>
        <h2>Favourites</h2>
        <button style={{display: "none"}} id="favContainers-refresher" onClick={refresh}>R</button>
        {favouritePairs ? (
          <div className='favourite-flex'>
            <div className='favourite-section-containers' id="favContainers">
              {favouritePairs.map((card) => (
                  (card) ? (<FavouriteCard remove={remove} showSpinner={showSpinner} pair={card} showBsellModal2={showBsellModal2} />) : (null)
              ))}
              {_favouritePairs ? _favouritePairs.map((card) => (
                  (card) ? (<FavouriteCard fade remove={remove} showSpinner={showSpinner} pair={card} showBsellModal2={showBsellModal2} />) : (null)
              )): (null)}
            </div>
            <Link to="/Market" className='rect-box'>
              <p>+</p>
            </Link>
          </div>
        ) : (
          <div className='single-box'>
            <p>+</p>
          </div>
        )}
      </div>
    );
  }
}

export default Favourites;
