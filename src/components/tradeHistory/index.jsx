import React, { Component } from 'react';
import TradeNotFound from '../tradeNotFound/index';
import Search from "../search/index";
import Filter from "../filter/index";
import Table from "../table/index";
import Pagination from '../Pagination/index';
import ins_up from '../../themes/images/ins-up.png';
import ins_down from '../../themes/images/ins-down.png';
import ai_n from '../../themes/images/ai-normal.png';
import server from '../../services/server';
import app from '../../services/app';
import ai_b from '../../themes/images/ai-bookmark.png';
import './index.scss';

class TradeHistory extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e, i) => {
    document.querySelectorAll(".t-history-record").forEach(function(el) {
      el.classList.remove("_active");
    });
    document.getElementById(i).classList.add("_active");
  }

  Profit = (p) => {
    let cl, pr;
    if(p > 0) {
      pr = '$';
      cl = 'td txt-success';
    } else if(p < 0) {
      pr = '-$';
      cl = 'td txt-danger';
    } else {
      pr = '$';
      cl = 'td txt-default';
    }
    let profit = p < 0 ? -1 * Number(p) : Number(p);
    return (
      <span className={cl}>{pr+profit.toFixed(2)}</span>
    )
  }

  closeTrade = async (no, instrument) => {
    // let clt = await server.closeTrade(no, instrument);
  }

  render () {
  const { type, filterOptions, history } = this.props;
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
            { history.map((order, key) => (
                <ul className={'t-history-record'+(key == 0 ? " _active" : "")} id={"t-history-record-"+key} onClick={(e) => this.handleClick(e, 't-history-record-'+key)}>
                  <li className="ins-name">
                  <img src={ins_down} className="ins_down" />
                  <img src={ins_up} className="ins_up" />
                  <span className="th">INSTRUMENT</span><span className="td">{order.instrument}</span></li>
                  <li><span className="th">TYPE</span><span className="td">{order.type.toUpperCase()}</span></li>
                  <li><span className="th">TIME</span><span className="td">{order.create_time.split(", ")[0]}<br /><small className="time">{order.create_time.split(", ")[1]}</small></span></li>
                  <li className="o-price"><span className="th">ORDER PRICE</span><span className="td">${order.order_price}</span></li>
                  <li className="o-rate"><span className="th">ORDER RATE</span><span className="td">{order.order_rate}</span></li>
                  <li><span className="th">S/L</span><span className="td">{order.stop_loss.trim().length ? order.stop_loss : '-'}</span></li>
                  <li><span className="th">T/P</span><span className="td">{order.take_profit.trim().length ? order.take_profit : '-'}</span></li>
                  {type == 'open' ? (
                    <>
                      <li className="c-rate"><span className="th">CURRENT RATE</span><span className="td">{order.current_rate}</span></li>
                      <li className="profit"><span className="th">PROFIT</span>{this.Profit(order.profit)}</li>
                      <li className="d-sell"><span className="th">DETAILS</span><span className="td">{order.mode.toUpperCase()}</span></li>
                      <li><span className="th">ACTION</span><span className="td"><button className="close-trade" onClick={(e) => this.closeTrade(order.order_number, order.instrument)}>Close</button></span></li>
                    </>
                  ) : null}
                  {type == 'closed' ? (
                    <>
                      <li className="c-rate"><span className="th">CLOSE RATE</span><span className="td">{order.current_rate}</span></li>
                      <li className="profit"><span className="th">CLOSE PRICE</span>{this.Profit(order.profit)}</li>
                      <li className="d-sell"><span className="th">DETAILS</span><span className="td">{order.mode}</span></li>
                    </>
                  ) : null}
                  {type == 'pending' ? (
                    <>
                      <li className="c-rate"><span className="th">CURRENT RATE</span><span className="td">{order.current_rate}</span></li>
                      <li className="profit"><span className="th">PROFIT</span>{this.Profit(order.profit)}</li>
                      <li className="d-sell"><span className="th">DETAILS</span><span className="td">{order.mode}</span></li>
                    </>
                  ) : null}
                </ul>
              )) }
              {!history.length ? (
                <TradeNotFound text={"No "+type+" trade"} />
              ) : (null)}
            <Pagination length="4" max_rows="4" page_no="1" paginationChange={() => {}}/>
          </div>
      </div>
  </div>
  );
};
}

export default TradeHistory;
