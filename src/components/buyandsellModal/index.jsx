import React, { Component } from 'react';
import './index.scss';
import CancelIcon from '../../themes/images/cancel.svg';
import CancelImage from '../../themes/images/cancel.png';
import arrowBuyIcon from '../../themes/images/arrow-buy.png';
import arrowSellIcon from '../../themes/images/arrow-sell.png';

class BuyandsellModal extends Component {
  constructor(props) {

    super(props);

    let info = false;
    
    if(props.information) {
      info = props.information;
    }

    this.state = {
      information : info
    };

  }

  handleClick = (p) => {
    this.setState({ information : p});
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
    const { text, cancelClick, confirmClick } = this.props;
    const { information } = this.state;
    return (
      <div className='overlay bs'>
        <div className='deposit-modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancelClick} />
            <ul className="imarket">
              <li className={information ? '_active' : ''} onClick={() => this.handleClick(true)}><span>Information</span></li>
              <li className={information ? '' : '_active'} onClick={() => this.handleClick(false)}><span>Markets</span></li>
            </ul>
            { information ? <div className='bsell-modal-content'>
              <h6>BTCUSD</h6>
              <p>Bitcoin vs US Dollar</p>
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
              <h6>BTCUSD</h6>
              <ul className="info-list">
                <li style={{height: "50px", marginBottom: "2em"}}>
                <span className="text-success">
                  <button className="btn btn-sell">SELL</button>
                  <button className="btn btn-buy">BUY</button>
                </span><span style={{paddingTop: "1em"}}>Current Price: <font className="text-success">0.42729</font></span></li>
              </ul>
              <p>Volume (lots)</p>
              <p className="mt1 nolot">
                <input type="number" placeholder="0.01" />
              </p>
              <ul className="info-list">
                <li className=""><span className="text-success">Pip Value:</span><span className="text-success">0.10 $</span></li>
                <li className=""><span className="text-success">0.01 lots:</span><span className="text-success">1000.00 BTC</span></li>
                <li className=""><span className="text-success">Required Margin:</span><span className="text-success">3.25 USD</span></li>
              </ul>
              <div className="phr">
                <span>
                  Set stop loss
                  <label className="switch"><input type="checkbox" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <small>Pips</small>
                    <input type="number" placeholder="3.23" />
                    <small>Estimated Price</small>
                    <input type="number" placeholder="1.09432" />
                  </span>
                </span>
                <span>
                  Only buy/sell when <label className="switch"><input type="checkbox" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <small>Rate</small>
                    <input type="number" placeholder="3.23" />
                  </span>
                </span>
                <span>
                  Set take profit <label className="switch"><input type="checkbox" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <small>Pips</small>
                    <input type="number" placeholder="3.23" />
                    <small>Estimated Price</small>
                    <input type="number" placeholder="1.09432" />
                  </span>
                </span>
              </div>
              <p align="center">
                <button className="btn place_order" onClick={confirmClick}>Place Sell Order</button>
              </p>
            </div> : null }
          </div>
        </div>
      </div>
    );
  };
}

export default BuyandsellModal;
