import React, { Component } from 'react';
import TradeNotFound from '../tradeNotFound/index';
import Search from "../search/index";
import Filter from "../filter/index";
import Table from "../table/index";
import Pagination from '../Pagination/index';
import ins_up from '../../themes/images/ins-up.png';
import ins_down from '../../themes/images/ins-down.png';
import ai_n from '../../themes/images/ai-normal.png';
import ai_b from '../../themes/images/ai-bookmark.png';
import './index.scss';

class OpenTrade extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e, i) => {
    document.querySelectorAll(".t-history-record").forEach(function(el) {
      el.classList.remove("_active");
    });
    document.getElementById(i).classList.add("_active");
  }

  render () {
    const { type, filterOptions } = this.props;
  return (
    <div className="open-trades-container">
      <div className="open-trades-container-top">
        <Search name="keyword" placeholder="Search here" />
        <Filter selectOptions={filterOptions} />
      </div>
      <div className='trade-history'>
          <div className='t-history-container'>
            <ul className='t-history-header'>
              <li>INSTRUMENT</li>
              <li>TYPE</li>
              <li>TIME</li>
              <li>ORDER PRICE</li>
              <li>ORDER RATE</li>
              <li>S/L</li>
              <li>T/P</li>
              {type == 'open' ? (
                <>
                  <li>CURRENT RATE</li>
                  <li>PROFIT</li>
                  <li>DETAILS</li>
                  <li>ACTION</li>
                </>
              ) : null}
              {type == 'closed' ? (
                <>
                  <li>CLOSE RATE</li>
                  <li>CLOSE PRICE</li>
                  <li>DETAILS</li>
                </>
              ) : null}
              {type == 'pending' ? (
                <>
                  <li>CURRENT RATE</li>
                  <li>PROFIT</li>
                  <li>DETAILS</li>
                </>
              ) : null}
            </ul>
            <ul className='t-history-record _active' id="t-history-record-1" onClick={(e) => this.handleClick(e, 't-history-record-1')}>
              <li className="ins-name">
              <img src={ins_down} className="ins_down" />
              <img src={ins_up} className="ins_up" />
              <span className="th">INSTRUMENT</span><span className="td">AUD/USD</span></li>
              <li><span className="th">TYPE</span><span className="td">Forex</span></li>
              <li><span className="th">TIME</span><span className="td">24-Mar-2020<br /><small className="time">12:29pm</small></span></li>
              <li className="o-price"><span className="th">ORDER PRICE</span><span className="td">$3.21</span></li>
              <li className="o-rate"><span className="th">ORDER RATE</span><span className="td">0.3245</span></li>
              <li><span className="th">S/L</span><span className="td">-</span></li>
              <li><span className="th">T/P</span><span className="td">-</span></li>
              {type == 'open' ? (
                <>
                  <li className="c-rate"><span className="th">CURRENT RATE</span><span className="td">0.3245</span></li>
                  <li className="profit"><span className="th">PROFIT</span><span className="td">$3.42</span></li>
                  <li className="d-sell"><span className="th">DETAILS</span><span className="td">SELL</span></li>
                  <li><span className="th">ACTION</span><span className="td"><button className="close-trade">Close</button></span></li>
                </>
              ) : null}
              {type == 'closed' ? (
                <>
                  <li className="c-rate"><span className="th">CLOSE RATE</span><span className="td">0.3245</span></li>
                  <li className="profit"><span className="th">CLOSE PRICE</span><span className="td">$3.42</span></li>
                  <li className="d-sell"><span className="th">DETAILS</span><span className="td">SELL</span></li>
                </>
              ) : null}
              {type == 'pending' ? (
                <>
                  <li className="c-rate"><span className="th">CURRENT RATE</span><span className="td">0.3245</span></li>
                  <li className="profit"><span className="th">PROFIT</span><span className="td">$3.42</span></li>
                  <li className="d-sell"><span className="th">DETAILS</span><span className="td">SELL</span></li>
                </>
              ) : null}
            </ul>
            <ul className='t-history-record ait' id="t-history-record-2" onClick={(e) => this.handleClick(e, 't-history-record-2')}>
              <li className="ins-name">
              <img src={ins_down} className="ins_down" />
              <img src={ins_up} className="ins_up" />
              <img src={ai_b} className="ai_b" /><span className="th">INSTRUMENT</span><span className="td">AUD/USD</span></li>
              <li><span className="th">TYPE</span><span className="td">Forex</span></li>
              <li><span className="th">TIME</span><span className="td">24-Mar-2020<br /><small className="time">12:29pm</small></span></li>
              <li className="o-price"><span className="th">ORDER PRICE</span><span className="td">$3.21</span></li>
              <li className="o-rate"><span className="th">ORDER RATE</span><span className="td">0.3245</span></li>
              <li><span className="th">S/L</span><span className="td">-</span></li>
              <li><span className="th">T/P</span><span className="td">-</span></li>
              {type == 'open' ? (
                <>
                  <li className="c-rate"><span className="th">CURRENT RATE</span><span className="td">0.3245</span></li>
                  <li className="profit"><span className="th">PROFIT</span><span className="td">$3.42</span></li>
                  <li className="d-sell"><span className="th">DETAILS</span><span className="td">SELL</span></li>
                  <li><span className="th">ACTION</span><span className="td"><img src={ai_n} className="ai_n" /></span></li>
                </>
              ) : null}
              {type == 'closed' ? (
                <>
                  <li className="c-rate"><span className="th">CLOSE RATE</span><span className="td">0.3245</span></li>
                  <li className="profit"><span className="th">CLOSE PRICE</span><span className="td">$3.42</span></li>
                  <li className="d-sell"><span className="th">DETAILS</span><span className="td">SELL</span></li>
                </>
              ) : null}
              {type == 'pending' ? (
                <>
                  <li className="c-rate"><span className="th">CURRENT RATE</span><span className="td">0.3245</span></li>
                  <li className="profit"><span className="th">PROFIT</span><span className="td">$3.42</span></li>
                  <li className="d-sell"><span className="th">DETAILS</span><span className="td">SELL</span></li>
                </>
              ) : null}
            </ul>
            {/*transactions.map((transaction, idx) => (
              <ul
                className={'transaction-history-record '+(idx == 0 ? ' _active' : '')}
                id={'transaction-history-record-'+idx}
                key={`${Math.random()}-${Math.random()}`}
                onClick={(e) => this.handleClick(e, 'transaction-history-record-'+idx)}>
                <div className="tab-sn"><div>{idx + (page_size * (page_no - 1)) + 1}</div></div>
                <li className="small-trans">{idx + (page_size * (page_no - 1)) + 1}</li>
                <li className={`${transaction.type} trans-type`}><span className="th">Transaction type</span><span className="td"><button className="brn ttype">{transaction.type}</button></span></li>
                <li className="trans-date"><span className="th">Date</span><span className="td">{transaction.date}</span></li>
                <li className='t-from'><div><span className="th">Account(From)</span><span className="td">{transaction.type.toLowerCase() == "deposit" ? '---' : transaction.account_from}</span></div></li>
                <li className='t-to'><span className="th">Account(To)</span><span className="td">{transaction.account_to}</span></li>
                <li className="small-trans"><span className="th">Amount</span><span className="td">{transaction.amount}</span></li>
                <li><span className="th">Reference No</span><span className="td">{transaction.reference}</span></li>
              </ul>
            ))*/}
            <Pagination length="4" max_rows="4" page_no="1" paginationChange={() => {}}/>
          </div>
      </div>
  </div>
  );
};
}

export default OpenTrade;
