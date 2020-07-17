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
    this.fetchFavs();
    if(document.getElementById("favContainers")) {
       document.getElementById("favContainers").addEventListener('refreshFav', async (e) => {
        that.fetchFavs();
      });
    }
  }

  fetchFavs = async () => {
    let user_id = localStorage.getItem('id');
    let account = localStorage.getItem('accountType').split("-")[0].toLowerCase();
    try {
      const { data: { data, code } } = await server.fetchFav(user_id, account);
      if(code == 200) {
        if(data.length) {
          this.setState({cards: data});
        }
      }
    } catch (error) {
      setTimeout(() => {
        this.fetchFavs();
      }, 2000);
      console.log("Fav is err");
      return error.message;
    }
  }

  render () {
    const { showClick, favouritePairs, secondClassName } = this.props;
    return (
      <div className={`favourites ${secondClassName ? 'show-fav-under' : ''}`}>
        <h2>Favourites</h2>
        {favouritePairs ? (
          <div className='favourite-flex'>
            <div className='favourite-section-containers' id="favContainers">
              {this.state.cards && this.state.cards.length ?
                this.state.cards.map((card) => (
                  <FavouriteCard direction="up" color="" pair={card.pair} price={card.open} />
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
