import React, { useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './index.scss';
import FilterIcon from '../../themes/images/tradeDashboard/filter.svg';
import starIcon from '../../themes/images/fstar.svg';
import starIcon2 from '../../themes/images/tradeDashboard/star.svg';
import CommentIcon from '../../themes/images/comment.svg';
import DirectionIcon from '../../themes/images/direction.svg';

import Up from './up.svg';
import Down from './down.svg';
import app from '../../services/app';

import CompassIcon from '../../themes/images/compass.svg';
import SearchIcon from '../../themes/images/micro.svg';
import { filterInstrument } from '../../redux/actions/index';

window.pairExBuy = [];
window.pairExSell = [];

const findDiv = (pair) => {
  // let md = "market-pair-"+pair.stock.replace(/[^\w]/g, "_");
  // setTimeout(() => {
  //   let id = "fav-pair-"+pair.stock.replace(/[^\w]/g, "_");
  //   let elem = document.getElementById(id);
  //   let price;
  //   let price2;
  //   if($("#"+id).length) {
  //     price = parseFloat($("#"+id).find(".p-price").text());
  //     $("#"+id).find(".p-price").text(pair.buy);
  //     $("#"+id+", #"+md).find(".direction."+(price > pair.buy ? 'up' : 'down')).addClass("hide");
  //     $("#"+id+", #"+md).find(".direction."+(price > pair.buy ? 'down' : 'up')).removeClass("hide");
  //   }

  //   price = window.pairExBuy[md] || 0;
  //   $("#"+id+", #"+md).find(".direction."+(price > pair.buy ? 'up' : 'down')).addClass("hide");
  //   $("#"+id+", #"+md).find(".direction."+(price > pair.buy ? 'down' : 'up')).removeClass("hide");

  //   price2 = window.pairExSell[md] || 0;
  //   $("#"+id+", #"+md).find(".directionSell."+(price > pair.buy ? 'up' : 'down')).addClass("hide");
  //   $("#"+id+", #"+md).find(".directionSell."+(price > pair.buy ? 'down' : 'up')).removeClass("hide");

  //   // console.log(pair.stock+" show "+(price > pair.buy ? 'DOWN' : 'UP'));

  //   window.pairExBuy[md] = pair.buy;
  //   window.pairExSell[md] = pair.sell;
  // }, 10);
}

const MarketSideBar = ({
  sideNav,
  hideText,
  clickHandler,
  pairs,
  filter,
  favouritePairs,
  _favouritePairs,
  filterInstrument,
  showLoader,
  showBsellModal,
  showBsellModal2,
  addToFav,
  remFav
}) => {

  return (
    <div
      style={{
        width: hideText ? '50px' : null,
        overflow: 'hidden',
      }}
      className={`left ${sideNav ? 'display-l-nav' : ''} big-left`}
    >
      <img
        src={FilterIcon}
        alt=''
        className='filter-img'
        onClick={clickHandler}
      />

      <div
        className='loader-container'
        style={{ display: showLoader ? 'block' : 'none' }}
      >
        <div className='loader'></div>
      </div>

      <div
        className='market-search'
        style={{ display: hideText ? 'none' : 'flex' }}
      >
        <input
          type='text'
          name='searchText'
          value={filter}
          onChange={(event) => filterInstrument(event.target.value)}
          placeholder='Search Instrument'
        />
        <img src={SearchIcon} alt='' />
      </div>
      <div
        className='margin-top-small'
        style={{ display: hideText ? 'none' : 'block' }}
      >
        <div className='market-pairs'>
          {pairs.map((pair, index) => (
            <div
              className='market-pair'
              key={`${Math.random()}-${Math.random()}`}
               id={"market-pair-"+pair.pair.replace(/[^\w]/g, "_")}
            >
              <div className='market-pair-flex'>
                <h5>{pair.pair}</h5>{/*<small style={{color: "#fff"}}>{pair.timestamp}</small>*/}
                <span>
                { favouritePairs.length && Object.values(favouritePairs).indexOf(pair.pair) > -1 ||
                  _favouritePairs.length && Object.values(_favouritePairs).indexOf(pair.pair) > -1
                  ? (<button type="button" className="for-star" onClick={(e) => remFav(pair.pair)}>
                      <img src={starIcon2} alt='' />
                     </button>)
                  : (<button type="button" className="for-star" onClick={(e) => addToFav(pair.pair)}>
                      <img src={starIcon} alt='' />
                     </button>)
                }
                <img src={CommentIcon} alt='' onClick={(e) => { window.buyAndSellData = {pair: pair.pair, buy: pair.ask, sell: pair.bid, act: "buy", type: pair.type}; showBsellModal2(e)}} />
                </span>
              </div>
              <div className='market-big-flex'>
                <p className='pair-percentage'>{pair._change}</p>
                <div className='market-cta-section'>
                  <div className='market-sell' onClick={(e) => {window.buyAndSellData = {pair: pair.pair, buy: pair.ask, sell: pair.bid, act: "sell", type: pair.type}; showBsellModal(e)}}>
                    <div className='market-sell-data'>
                      <div className='market-sell-info'>
                        <h6>SELL</h6>
                        <p>{app.floatFormat(pair.bid)}</p>
                      </div>
                      {pair.bid_up > 0 ? <img className={"directionSell up"} src={Up} /> : <img className={"directionSell down"} src={Down} />}
                    </div>
                    <p>{app.floatFormat(pair.low)}</p>
                  </div>
                  <div className='market-spread'>
                    <div className='market-spread-data'>
                      <img src={CompassIcon} alt='' />
                    </div>
                    <p>{app.floatFormat(pair.high - pair.low)}</p>
                  </div>
                  <div className='market-buy' onClick={(e) => {window.buyAndSellData = {pair: pair.pair, buy: pair.ask, sell: pair.bid, act: "buy"}; showBsellModal(e)}}>
                    <div className='market-buy-data'>
                      {pair.ask_up > 0 ? <img className={"direction up"} src={Up} /> : <img className={"direction down"} src={Down} />}
                      <div className='market-buy-info'>
                        <h6>BUY</h6>
                        <p id={"pair-buy-"+pair.pair.replace(/[^\w]/g, "_")}>{app.floatFormat(pair.ask)}</p>
                      </div>
                    </div>
                    <p>{app.floatFormat(pair.high)}</p>
                  </div>
                </div>
              </div>
            {/*findDiv(pair)*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ filter }) => ({
  filter,
});

const mapDispatchToProps = (dispatch) => ({
  filterInstrument: (payload) => dispatch(filterInstrument(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MarketSideBar);
