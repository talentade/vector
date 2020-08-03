import React, { Component } from 'react';
import $ from 'jquery';
import './index.scss';
import CancelIcon from '../../themes/images/cancel.svg';
import CancelImage from '../../themes/images/cancel.png';
import arrowBuyIcon from '../../themes/images/arrow-buy.png';
import server from '../../services/server';
import app from '../../services/app';
import arrowSellIcon from '../../themes/images/arrow-sell.png';
import upVlv from '../../themes/images/up.png';
import downVlv from '../../themes/images/down.png';
import Spinner from '../../components/spinner/index';
import { Insufficient } from '../../components/popups/index';

class BuyandsellModal extends Component {
  constructor(props) {

    super(props);

    let info = false;

    if(props.information) {
      info = props.information;
    }

    this.state = {
      information : info,
      pip_str: "",
      lots: 0,
      counter: 0,
      counter2: 1,
      counter3: 3,
      changedLot: 0.01,
      changed_lot: 0.01,
      lot_str: "",
      showLoader: false,
      mode: "buy",
      live: 0,
      estimated_price1: 0,
      estimated_price2: 0,
      lot_val: 0.01,
      stop_loss: 0.01,
      showInssufficient: false,
      take_profit: 0.03,
      analysis: false,
      errorMessage: "",
      required_margin_str: ""
    };

    this.realTimeListener = true;
    this.retryCounter = 0;
  }

  handleClick = (p) => {
    this.setState({ information : p});
  }

  vlvChange = (u) => {
    let cnt = this.state.counter;
    let sum = this.state.changedLot;
    if(u == "up") {
      if(cnt > -1) cnt +=1;
      this.setState({counter: cnt, lot_val: sum + (cnt * 0.01)});
      setTimeout(() => {
        this.tradeAnalysis();
      }, 10);
    } else {
      if(cnt > 0) cnt -=1;
      this.setState({counter: cnt, lot_val: sum + (cnt * 0.01)})
      setTimeout(() => {
        this.tradeAnalysis();
      }, 10);
    }
  }

  estimate = () => {
    this.setState({
      estimated_price1: parseFloat(this.state.live - (this.state.pip_val * this.state.stop_loss)).toFixed(5),
      estimated_price2: parseFloat(this.state.live - (this.state.pip_val * this.state.take_profit)).toFixed(5)
    });
  }

  vlvChange2 = (u) => {
    let cnt = this.state.counter2;
    let sum = this.state.stop_loss;
    if(u == "up") {
      if(cnt > -1) cnt +=1;
      this.setState({counter2: cnt, stop_loss: sum + (cnt * 0.01)});
      setTimeout(() => {
        this.tradeAnalysis();
      }, 10);
    } else {
      if(cnt > 0) cnt -=1;
      this.setState({counter2: cnt, stop_loss: sum + (cnt * 0.01)});
      setTimeout(() => {
        this.tradeAnalysis();
      }, 10);
    }
  }

  btnBsell = async (i, r) => {
    if(document.getElementById(i)) {
      document.getElementById(i).classList.add("_active");
      document.getElementById(r).classList.remove("_active");
      document.getElementById(i+"-order").classList.add("_active");
      document.getElementById(r+"-order").classList.remove("_active");
      document.getElementById(i+"-price").classList.add("_active");
      document.getElementById(r+"-price").classList.remove("_active");
      this.setState({mode: i == "btnSell" ? "sell" : "buy"})
      this.tradeAnalysis();
    }
  }

  tradeAnalysis = async () => {
    try {
      this.setState({analysis: false});
      let analysis = await server.tradeAnalysis(this.props.pair, this.state.mode, this.state.lot_val);
      analysis = analysis.data.data;
      this.setState({pip_val: analysis.pip_value, live: analysis.rate, margin: analysis.required_margin, pip_str: analysis.pip_value_str, lots: analysis.lot_size, lot_str: analysis.lot_size_str, required_margin_str: analysis.required_margin_str, changed_lot: analysis.lots});
      this.setState({analysis: true});
      this.estimate();
      this.retryCounter = 0;
      // console.log(analysis);
    } catch (error) {
      if(this.retryCounter < app.retryLimit) {
        this.retryCounter += 1;
          setTimeout(() => {
            this.tradeAnalysis();
          }, 2000);
      }
      return error;
    }
  }

  changeLot = async (e) => {
    // this.setState({lot_val: e.target.value, changedLot: e.target.value, counter: 0});
    // this.tradeAnalysis();
  }

  placeOrder = async () => {
    let order = {"pip_value": this.state.pip_val, "volume_lots": this.state.lot_val, "required_margin": this.state.margin};

    if(document.getElementById("stop_loss").checked) {
      order["stop_loss"] = this.state.stop_loss;
    }
    if(document.getElementById("take_profit").checked) {
      order["take_profit"] = this.state.stop_loss;
    }
    if(document.getElementById("only_buy_when").checked) {
      order["only_buy_sell_when"] = document.getElementById("only_buy_when_actual").value;
    }

    this.setState({showSpinner: true});

    try {
      const place_order = await server.placeOrder(this.state.mode, this.props.pair, this.state.pip_val, this.state.lots, this.state.margin, order);
      console.log(place_order.status);
      if(place_order.status == 200) {
        const { data: { data: { profile } } } = await server.getProfile();
        app.profile(profile);
        $(".balance").trigger("refresh");
        // window.location.href = "";
        // this.props.confirmClick();
      } else {
        console.log(place_order);
      }
      this.setState({showSpinner: false});
    } catch (e) {
      if(e.toString().match(/(401)/g)) {
        this.setState({showInssufficient: true});
      }
      this.setState({showSpinner: false});
      return e;
    }
  }

  async componentDidMount() {
    this.initLoader();
  }

  initLoader = async () => {
    if(this.props.act == "buy") {
      this.btnBsell("btnBuy", "btnSell");
    } else {
      this.btnBsell("btnSell", "btnBuy");
    }
  }

  handleChange = (e) => {
    var cl;
    document.querySelectorAll(".switch-ctxt").forEach(function(el) {
      el.classList.remove("_active");
    });
    let switch_ctxt = e.target.parentNode.parentNode.children[1];
    if(e.target.checked) {
      switch_ctxt.classList.remove("hide");
      switch_ctxt.classList.add("_active");
    } else {
      switch_ctxt.classList.add("hide");
      switch_ctxt.classList.remove("_active");
      document.querySelectorAll(".switch-ctxt:not(.hide)").forEach(function(el, k, l) {
        k == (l.length - 1) && el.classList.add("_active");
      });
    }
  }

  render () {
    const { text, cancelClick, confirmClick, pair, buy, sell, act } = this.props;
    const { information, analysis } = this.state;
    return (
      <>
      <div className='overlay bs'>
        <div className='deposit-modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancelClick} />
            <ul className="imarket">
              <li className={information ? '_active' : ''} onClick={() => this.handleClick(true)}><span>Information</span></li>
              <li className={information ? '' : '_active'} onClick={() => { this.handleClick(false); setTimeout(() => { this.initLoader(); }, 10) }}><span>Markets</span></li>
            </ul>
            { information ? <div className='bsell-modal-content'>
              <h6>{pair}</h6>
              {/*<p>Bitcoin vs US Dollar</p>*/}
              <ul className="info-list">
                <li className="mt1"><span className="text-success">Quote Asset</span><span className="text-success">USD</span></li>
                <li><span>PIp Size:</span><span>0.01 (2digits)</span></li>
                <li><span>Lot Size:</span><span></span></li>
                <li><span>MIN Price Change:</span><span>0.001</span></li>
                <li className="mt1"><span className="text-primary">MIN Volume:</span><span className="text-primary">1000</span></li>
                <li><span className="text-primary">MAX Volume:</span><span className="text-primary">1000</span></li>
                <li className="mt1"><span>Stops Level:</span><span>0.0</span></li>
                <li className="mt1"><span className="text-success">Swaps Long:</span><span className="text-success">4.266</span></li>
                <li><span className="text-success">Swaps Short:</span><span className="text-success">-13.244</span></li>
                <li className="mt1"><span>Leverage</span><span>1:200</span></li>
              </ul>
              <p align="center">
                <span className="buy-pos"><img src={arrowBuyIcon} />BUY Positions<span>0</span></span>
                <span className="sell-pos"><img src={arrowSellIcon} />SELL Positions<span>0</span></span>
              </p>
            </div> : null }

            { !this.state.information ? <div className='bsell-modal-content'>
              <h6>{pair}</h6>
              <p>{this.state.errorMessage}</p>
              <ul className="info-list">
                <li style={{height: "50px", marginBottom: "2em"}}>
                <span className="text-success">
                  <button className="btn btn-sell _active" id="btnSell" onClick={(e) => this.btnBsell("btnSell", "btnBuy")}>SELL</button>
                  <button className="btn btn-buy" id="btnBuy" onClick={(e) => this.btnBsell("btnBuy", "btnSell")}>BUY</button>
                </span><span style={{paddingTop: "1em"}}>Current Price: <font className="text-success" id="btnSell-price">{sell}</font><font className="text-success" id="btnBuy-price">{buy}</font></span></li>
              </ul>
              <p>Volume (lots)</p>
              <p className="mt1 nolot" style={{position: "relative"}}>
                <input type="number" id="vlv" placeholder="0.01" value={this.state.lot_val} onKeyUp={this.changeLot}/>
                <img src={upVlv} className="uvlv" onClick={(e) => this.vlvChange("up")} />
                <img src={downVlv} className="dvlv" onClick={(e) => this.vlvChange("down")} />
              </p>
              <ul className="info-list">
                <li className=""><span className="text-success">Pip Value:</span><span className="text-success">{this.state.pip_str}</span></li>
                <li className=""><span className="text-success">{this.state.changed_lot} lots:</span><span className="text-success">{this.state.lot_str}</span></li>
                <li className=""><span className="text-success">Required Margin:</span><span className="text-success">{this.state.required_margin_str}</span></li>
              </ul>
              <div className="phr">
                <span>
                  Set stop loss
                  <label className="switch"><input type="checkbox" id="stop_loss" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <small>Pips</small>
                    <p className="stop_loss">
                      <input type="number" placeholder="0.01" value={this.state.stop_loss} />
                      <img src={upVlv} className="uvlv" onClick={(e) => { this.setState({stop_loss: 0.01 * this.state.counter2, counter2: this.state.counter2 + 1}); setTimeout(() => { this.estimate(); }, 10); }} />
                      <img src={downVlv} className="dvlv" onClick={(e) => { this.setState({stop_loss: 0.01 * this.state.counter2, counter2: this.state.counter2 - 1}); setTimeout(() => { this.estimate(); }, 10); }} />
                    </p>
                    <small>Estimated Price</small>
                    <input type="number" placeholder="" value={this.state.estimated_price1} />
                  </span>
                </span>
                <span>
                  Only buy/sell when <label className="switch"><input type="checkbox" id="only_buy_when" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <small>Rate</small>
                    <input type="number" placeholder="3.23" id="only_buy_when_actual" value={this.state.live*1.1} />
                  </span>
                </span>
                <span>
                  Set take profit <label className="switch"><input type="checkbox"id="take_profit" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <small>Pips</small>
                    <p className="take_profit">
                      <input type="number" placeholder="0.01" value={this.state.take_profit} />
                      <img src={upVlv} className="uvlv" onClick={(e) => { this.setState({take_profit: 0.01 * this.state.counter3, counter3: this.state.counter3 + 1}); setTimeout(() => { this.estimate(); }, 10);  }} />
                      <img src={downVlv} className="dvlv" onClick={(e) => { this.setState({take_profit: 0.01 * this.state.counter3, counter3: this.state.counter3 - 1}); setTimeout(() => { this.estimate(); }, 10);  }} />
                    </p>
                    <small>Estimated Price</small>
                    <input type="number" placeholder="" value={this.state.estimated_price2} />
                  </span>
                </span>
              </div>
              <p align="center">
                <button className="btn place_order _active" id="btnSell-order"  disabled={!analysis} style={analysis ? {opacity: 1} : {opacity: 0.4}} onClick={this.placeOrder}>Place Sell Order</button>
                <button className="btn place_order" id="btnBuy-order" disabled={!analysis} style={analysis ? {opacity: 1} : {opacity: 0.4}} onClick={this.placeOrder}>Place Buy Order</button>
              </p>
            </div> : null }
          </div>
        </div>
        <Spinner showSpinner={this.state.showSpinner} />
      </div>
      <Insufficient show={this.state.showInssufficient} cancel={(e) => this.setState({showInssufficient: false})} />
    </>
    );
  };
}

export default BuyandsellModal;
