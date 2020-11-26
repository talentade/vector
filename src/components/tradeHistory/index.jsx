import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import TradeNotFound from '../tradeNotFound/index';
import Spinner from '../../components/spinner/index';
import Search from "../search/index";
import Filter from "../filter/index";
import Table from "../table/index";
import Pagination from '../Pagination/index';
import ins_up from '../../themes/images/ins-up.png';
import ins_down from '../../themes/images/ins-down.png';
import ai_n from '../../themes/images/ai-normal.png';
import server from '../../services/server';
import app from '../../services/app';
import { Closed } from '../../components/popups/index';
import ai_b from '../../themes/images/ai-bookmark.png';
import './index.scss';

class TradeHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false,
      showClosed: false,
      page_size: 5,
      page_no: 1,
      filterPair: '',
      filterType: ''
    }
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

  closeTrade = async (id, account, cr, uid = null) => {
    this.setState({showSpinner: true});
    try{
      let close = await server.closeTrade(id, account, cr, uid);
      if(close.status == 200) {
        const gp = await server.getProfile();
        app.profile(gp.data.profile);
        $(".balance").trigger("refresh");
        this.setState({showSpinner: false, showClosed: true});
      } else {
        this.setState({showSpinner: false, showClosed: false});
      }
    } catch(e) {
      this.setState({showSpinner: false, showClosed: false});
      return e;
    }
  }

  handleChange = (e) => {
    this.setState({filterPair: e.target.value.trim().toLowerCase(), page_no: 1});
  }

  onChange = (e) => {
    this.setState({filterType: e.target.value.split(" ")[0].trim().toLowerCase(), page_no: 1});
  }

  render () {
  let { type, filterOptions, history } = this.props;
  let { page_no, page_size } = this.state;

  let ft = this.state.filterType;
  let fp = this.state.filterPair;

  let fil = this.props.userprofile || false;

  if(fil) {
    ft = this.props.filterType;
    fp = this.props.filterPair;
    page_no = this.props.page_no;
  }

  if(ft.length && ft != "all") {
    history = history.filter((pair) => {
      if(pair.type) {
        return pair.type.toLowerCase().match(ft) || ft == pair.type.toLowerCase();
      }
    });
  } else if(fp.length) {
    history = history.filter((pair) => {
      if(pair.type && pair.instrument && pair.mode) {
        return (
          pair.type.toLowerCase().match(fp) || fp == pair.type.toLowerCase() ||
          pair.instrument.toLowerCase().match(fp) || fp == pair.instrument.toLowerCase() ||
          pair.mode.toLowerCase().match(fp) || fp == pair.mode.toLowerCase()
        );
      }
    });
  }

  let max_rows = history.length;
  let stt = (page_no-1)*page_size;
  let max = stt+page_size;
      max = max > max_rows ? max_rows : max;
  let _history = history.slice(stt, max > max_rows ? max_rows : max);

  return (
    <div className="open-trades-container">
      <Spinner showSpinner={this.state.showSpinner} />
      <Closed show={this.state.showClosed} cancel={(e) => this.setState({showClosed: false})} />
      {
        fil || this.props.admin ? null :
        <div className="open-trades-container-top">
          <Search name="keyword" handleChange={this.handleChange} placeholder="Search here" />
          <Filter selectOptions={filterOptions} onChange={this.onChange} />
        </div>
      }
      <div className='trade-history'>
          <div className='t-history-container'>
            <ul className='t-history-header'>
            {this.props.admin ? <li>USER</li> : null}
              <li>INSTRUMENT</li>
              <li>TYPE</li>
              <li>TIME</li>
              <li>ORDER PRICE</li>
              <li>COMMISSION</li>
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
            {_history.map((order, key) => (
                <ul className={'t-history-record'+(key == 0 ? " _active" : "")} id={"t-history-record-"+key} onClick={(e) => this.handleClick(e, 't-history-record-'+key)}>
                  {this.props.admin ? <li><span className="th">USER</span><span className="td"><Link className="txt-info" to={"/usersprofile/"+order.user_id}>{app.uid(order.user_id)}</Link></span></li> : null}
                  <li className="ins-name">
                  <img src={ins_down} className="ins_down" />
                  <img src={ins_up} className="ins_up" />
                  <span className="th">INSTRUMENT</span><span className="td">{order.instrument}</span></li>
                  <li><span className="th">TYPE</span><span className="td">{order.type.toUpperCase()}</span></li>
                  <li><span className="th">TIME</span><span className="td">{order.create_time.split(", ")[0]}<br /><small className="time">{order.create_time.split(", ")[1]}</small></span></li>
                  <li className="o-price"><span className="th">ORDER PRICE</span><span className="td">${order.order_price}</span></li>
                  <li className="o-price"><span className="th">COMMISSION</span><span className="td">${order.commission.length ? order.commission : "0.00"}</span></li>
                  <li className="o-rate"><span className="th">ORDER RATE</span><span className="td">{type == 'pending' ? order.trade_when : order.order_rate}</span></li>
                  <li><span className="th">S/L</span><span className="td">{order.stop_loss.trim().length ? order.stop_loss : '-'}</span></li>
                  <li><span className="th">T/P</span><span className="td">{order.take_profit.trim().length ? order.take_profit : '-'}</span></li>
                  {type == 'open' ? (
                    <>
                      <li className="c-rate"><span className="th">CURRENT RATE</span><span className="td">{order.current_rate}</span></li>
                      <li className="profit"><span className="th">PROFIT</span>{this.Profit(order.profit)}</li>
                      <li className="d-sell"><span className="th">DETAILS</span><span className="td">{order.mode.toUpperCase()}</span></li>
                      <li><span className="th">ACTION</span><span className="td"><button className="close-trade" onClick={(e) => this.closeTrade(order.id, order.account, order.current_rate, this.props.admin ? order.user_id : null)}>Close</button></span></li>
                    </>
                  ) : null}
                  {type == 'closed' ? (
                    <>
                      <li className="c-rate"><span className="th">CLOSE RATE</span><span className="td">{order.close_rate}</span></li>
                      <li className="profit"><span className="th">CLOSE PRICE</span>{this.Profit(order.profit)}</li>
                      <li className="d-sell"><span className="th">DETAILS</span><span className="td">{order.mode}</span></li>
                    </>
                  ) : null}
                  {type == 'pending' ? (
                    <>
                      <li className="c-rate"><span className="th">CURRENT RATE</span><span className="td">{order.current_rate}</span></li>
                      <li className="profit"><span className="th">PROFIT</span>{this.Profit(order.profit)}</li>
                      <li className="d-sell"><span className="th">DETAILS</span><span className="td">{order.mode.toUpperCase()}</span></li>
                    </>
                  ) : null}
                </ul>
              ))}
              {history.length && !this.props.admin ?
                <Pagination length={page_size} max_rows={max_rows} page_no={page_no} paginationChange={(p) => { this.setState({page_no: p}); }}/>
              : this.props.admin ? null : <TradeNotFound text={"No "+type+" trade"} /> }
              {this.props.admin && !history.length ? <TradeNotFound text={"No "+type+" trade"} /> : null}
          </div>
      </div>
  </div>
  );
};
}

export default TradeHistory;
