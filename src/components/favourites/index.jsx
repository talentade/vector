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

    document.getElementById("favContainers").addEventListener('refreshFav', async (e) => {
      that.fetchFavs();
    })
  }

  fetchFavs = async () => {
    let user_id = localStorage.getItem('id');
    let account = localStorage.getItem('accountType').split("-")[0].toLowerCase();
    const { data: { data, code } } = await server.fetchFav(user_id, account);
    if(code == 200) {
      if(data.length) {
        this.setState({cards: data});
      }
    }
  }

  render () {
    const { showClick, favouritePairs, secondClassName } = this.props;
    return (
      <div className={`favourites ${secondClassName ? 'show-fav-under' : ''}`}>
        <h2>Favourites</h2>
        {favouritePairs.length > 0 || 1 ? (
          <div className='favourite-flex'>
            <div className='favourite-section-containers' id="favContainers">
              {
                this.state.cards.map((card) => (
                  <FavouriteCard direction="up" color="" pair={card.pair} price={card.open} />
                ))
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
