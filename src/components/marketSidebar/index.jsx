import React, { useState } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import './index.scss';
import FilterIcon from '../../themes/images/tradeDashboard/filter.svg';
import starIcon from '../../themes/images/fstar.svg';
import starIcon2 from '../../themes/images/tradeDashboard/star.svg';
import CommentIcon from '../../themes/images/comment.svg';
import DirectionIcon from '../../themes/images/direction.svg';
import CompassIcon from '../../themes/images/compass.svg';
import SearchIcon from '../../themes/images/micro.svg';
import { filterInstrument } from '../../redux/actions/index';

const findDiv = (pair) => {
  let id = "fav-pair-"+pair.stock.replace(/[^\w]/g, "_");
  let elem = document.getElementById(id);
  if($("#"+id).length) {
    let price = parseFloat($("#"+id).find(".p-price").text());
    $("#"+id).find(".p-price").text(pair.buy);
    $("#"+id).find(".direction."+(price > pair.buy ? 'up' : 'down')).addClass("hide");
    $("#"+id).find(".direction."+(price > pair.buy ? 'down' : 'up')).removeClass("hide");
  }
}

const MarketSideBar = ({
  sideNav,
  hideText,
  clickHandler,
  pairs,
  filter,
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
            >
              <div className='market-pair-flex'>
                <h5>{pair.stock}</h5>
                {findDiv(pair)}
                <span>
                { pair.isFav
                  ? <img src={starIcon2} alt='' onClick={(e) => { remFav(e); pairs[index].isFav = false; }} pair={pair.stock} />
                  : <img src={starIcon} alt='' onClick={(e) => { addToFav(e); pairs[index].isFav = true; }} pair={pair.stock} /> }
                  <img src={CommentIcon} alt='' onClick={(e) => { window.buyAndSellData = {pair: pair.stock, buy: pair.buy, sell: pair.sell, act: "buy"}; showBsellModal2(e)}} />
                </span>
              </div>
              <div className='market-big-flex'>
                <p className='pair-percentage'>{pair.change}</p>
                <div className='market-cta-section'>
                  <div className='market-sell' onClick={(e) => {window.buyAndSellData = {pair: pair.stock, buy: pair.buy, sell: pair.sell, act: "sell"}; showBsellModal(e)}}>
                    <div className='market-sell-data'>
                      <div className='market-sell-info'>
                        <h6>SELL</h6>
                        <p>{pair.sell}</p>
                      </div>
                      <img src={DirectionIcon} alt='' />
                    </div>
                    <p>{pair.low}</p>
                  </div>
                  <div className='market-spread'>
                    <div className='market-spread-data'>
                      <img src={CompassIcon} alt='' />
                    </div>
                    <p>{pair.spread}</p>
                  </div>
                  <div className='market-buy' onClick={(e) => {window.buyAndSellData = {pair: pair.stock, buy: pair.buy, sell: pair.sell, act: "buy"}; showBsellModal(e)}}>
                    <div className='market-buy-data'>
                      <img src={DirectionIcon} alt='' />
                      <div className='market-buy-info'>
                        <h6>BUY</h6>
                        <p>{pair.buy}</p>
                      </div>
                    </div>
                    <p>{pair.high}</p>
                  </div>
                </div>
              </div>
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
