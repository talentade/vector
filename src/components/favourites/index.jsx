import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FavouriteCard from '../favouriteCard/index';
import server from '../../services/server';
import './index.scss';

class Favourites extends Component {
  constructor(props) {

    super(props);

    this.state = {
      cards: []
    };

  }

  async componentDidMount () {
    let that = this;
    if(document.getElementById("favContainers")) {
       document.getElementById("favContainers").addEventListener('refreshFav', async (e) => {
        that.props.refresh();
      });
    }
  }

  // fetchFavs = async () => {
  //   try {
  //     const { data: { data, code } } = await server.fetchFav();
  //     if(code == 200) {
  //       if(data.length) {
  //         this.setState({cards: data});
  //       }
  //     }
  //   } catch (error) {
  //     setTimeout(() => {
  //       this.fetchFavs();
  //     }, 30 * 1000);
  //     console.log("Fav is err");
  //     return error.message;
  //   }
  // }

  render () {
    const { favouritePairs, secondClassName, showSpinner, refresh } = this.props;
    return (
      <div className={`favourites ${secondClassName ? 'show-fav-under' : ''}`}>
        <h2>Favourites</h2>
        <button style={{display: "none"}} id="favContainers-refresher" onClick={refresh}>R</button>
        {favouritePairs ? (
          <div className='favourite-flex'>
            <div className='favourite-section-containers' id="favContainers">
              {favouritePairs.length ?
                favouritePairs.map((card) => (
                  (card) ? (<FavouriteCard showSpinner={showSpinner} direction="up" color="" pair={card.pair} price={card.open} />) : (null)
                )) : (null)
              }
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
