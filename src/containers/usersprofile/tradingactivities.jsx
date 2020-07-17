import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import ai_n from '../../themes/images/ai-normal.png';
import ai_b from '../../themes/images/ai-bookmark.png';
import './tradingactivities.scss';
import '../../components/standard/table.scss';

class TradingActivities extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-trading"+(active ? ' _active' : '')} id="tab-row-trading">
        
        <TableFilters table="trade" />

        <ul className="table-header for-trading">
          <li className="leni">INSTRUMENT</li>
          <li className="short">TYPE</li>
          <li className="lenx">TIME</li>
          <li className="lenx">ORDER PRICE</li>
          <li className="lenx">ORDER RATE</li>
          <li className="short">S/L</li>
          <li className="short">T/P</li>
          <li className="len">CURRENT RATE</li>
          <li className="short">PROFIT</li>
          <li className="short">DETAILS</li>
          <li>ACTION</li>
        </ul>

        <ul className="table-body for-trading">
          <li className="ins-name leni">
          <span className="th">INSTRUMENT</span><span className="td">AUD/USD</span></li>
          <li className="short"><span className="td">Forex</span></li>
          <li className="lenx"><span className="td">24-Mar-2020<br /><small className="time">12:29pm</small></span></li>
          <li className="o-price lenx"><span className="td">$3.21</span></li>
          <li className="o-rate lenx"><span className="td">0.3245</span></li>
          <li className="short"><span className="td">-</span></li>
          <li className="short"><span className="td">-</span></li>
          <li className="c-rate len"><span className="td">0.3245</span></li>
          <li className="profit short"><span className="td">$3.42</span></li>
          <li className="d-sell short"><span className="td">SELL</span></li>
          <li><span className="td"><button className="close-trade">Close</button></span></li>
        </ul>

        <ul className="table-body for-trading ait">
          <li className="ins-name leni">
          <img src={ai_b} className="ai_b" />
          <span className="th">INSTRUMENT</span><span className="td">AUD/USD</span></li>
          <li className="short"><span className="td">Forex</span></li>
          <li className="lenx"><span className="td">24-Mar-2020<br /><small className="time">12:29pm</small></span></li>
          <li className="o-price lenx"><span className="td">$3.21</span></li>
          <li className="o-rate lenx"><span className="td">0.3245</span></li>
          <li className="short"><span className="td">-</span></li>
          <li className="short"><span className="td">-</span></li>
          <li className="c-rate len"><span className="td">0.3245</span></li>
          <li className="profit short"><span className="td">$3.42</span></li>
          <li className="d-sell short"><span className="td">SELL</span></li>
          <li><span className="td"><img src={ai_n} className="ai_n" /></span></li>
        </ul>
      </div>
	 )
	}

}

export default TradingActivities;