import React, { Component } from 'react';
import './index.scss';
import CancelIcon from '../../themes/images/cancel.svg';
import CancelImage from '../../themes/images/cancel.png';
import arrowBuyIcon from '../../themes/images/arrow-buy.png';
import arrowSellIcon from '../../themes/images/arrow-sell.png';
import upVlv from '../../themes/images/up.png';
import downVlv from '../../themes/images/down.png';

class AddToFav extends Component {
  constructor(props) {

    super(props);

    let info = false;
    

    this.state = {
      step : 1,
      information: 0
    };

  }

  handleClick = (p) => {
    // this.setState({ information : p});
  }

  vlvChange = (u) => {
    let vl = document.getElementById("vlv").value;
        vl = vl > 0 ? parseFloat(vl) : 0;

    if(u == "up") {
      document.getElementById("vlv").value = vl + 1;
    } else {
      document.getElementById("vlv").value = vl - 1;
    }
  }

  btnBsell = (i, r) => {
    document.getElementById(i).classList.add("_active");
    document.getElementById(r).classList.remove("_active");
    document.getElementById(i+"-order").classList.add("_active");
    document.getElementById(r+"-order").classList.remove("_active");
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
    const { information, step } = this.state;
    return (
      <div className='overlay fav'>
        <div className='modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancelClick} />
            
            { step == 1 &&
              (
                <div className='bsell-modal-content'>
                  <h6>Select a trading account</h6>
                  <p>Do you wish view open trades with this account or rou want to switch account</p>
                  <p className="btns">
                    <button className="continue" onClick={cancelClick}>Continue</button>
                    <button className="switch" onClick={() => this.setState({step: 2})}>Switch</button>
                  </p>
                </div>
              )}

            { step == 2 &&
              (
                <div className='bsell-modal-content'>
                  <h6>Select a trading account</h6>
                  <p className="inps">
                    <select className="accs"><option>Demo-37192352</option><option>Live-78236426</option></select>
                    <label>Password</label>
                    <input className="accs" type="password" />
                    <label>Confirm Password</label>
                    <input className="accs" type="password" />
                    <button className="sacc">SELECT ACCOUNT</button>
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  };
}

export default AddToFav;
