import React, { useState } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import FilterIcon from '../../themes/images/tradeDashboard/filter.svg';
import CommentIcon from '../../themes/images/comment.svg';
import DirectionIcon from '../../themes/images/direction.svg';
import CompassIcon from '../../themes/images/compass.svg';
import SearchIcon from '../../themes/images/micro.svg';
import { filterInstrument } from '../../redux/actions/index';

const MarketSideBar = ({
  sideNav,
  hideText,
  clickHandler,
  pairs,
  filter,
  filterInstrument,
  showLoader
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
          {pairs.map((pair) => (
            <div
              className='market-pair'
              key={`${Math.random()}-${Math.random()}`}
            >
              <div className='market-pair-flex'>
                <h5>{pair.stock}</h5>
                <img src={CommentIcon} alt='' />
              </div>
              <div className='market-big-flex'>
                <p className='pair-percentage'>{pair.change}</p>
                <div className='market-cta-section'>
                  <div className='market-sell'>
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
                  <div className='market-buy'>
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
