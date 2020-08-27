import React, { Component } from 'react';
import './index.scss';
import $ from 'jquery';
import CancelIcon from '../../themes/images/cancel.svg';
import CancelImage from '../../themes/images/cancel.png';
import arrowBuyIcon from '../../themes/images/arrow-buy.png';
import arrowSellIcon from '../../themes/images/arrow-sell.png';
import upVlv from '../../themes/images/up.png';
import server from '../../services/server';
import downVlv from '../../themes/images/down.png';

class AddAccount extends Component {
  constructor(props) {

    super(props);

    let info = false;
    

    this.state = {
      step : 0,
      errorMessage: ''
    };

    this.fireAccList = new CustomEvent('refreshAccList', {
      detail: {
        code: 200
      }
    });

  }

  popupOut = (e) => {
    if($(e.target).hasClass("overlay") && $(e.target).hasClass("fav")) {
      $(e.target).find(".modal-cancel").click();
    }
  }

  componentDidMount () {

  }

  btnSave = async () => {
    let nam = document.getElementById("tr-name").value;
    let sel = document.getElementById("tr-sel").value;
    let pas = document.getElementById("tr-pass").value;
    this.props.sending();
    try {
      const acc = await server.addAccount(nam, sel, pas);
      this.props.unsending();
      if(acc.status == 200 && acc.data.success) {
        document.getElementById("account-container").dispatchEvent(this.fireAccList);
        this.props.sent();
        this.props.cancelClick();
        this.props.showCreated(acc.data.account.account_id, acc.data.account.account_type);
        this.setState({errorMessage: ""});
      } else {
        this.setState({errorMessage: acc.data.message});
      }
    } catch (error) {
      this.props.unsending();
      return error.message;
    }
  }

  render () {
    const { text, cancelClick, confirmClick } = this.props;
    const { information, step } = this.state;
    return (
      <div className='overlay fav' onClick={this.popupOut}>
        <div className='modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancelClick} />
            <div className='bsell-modal-content'>
              {/*<h6>Select a trading account</h6>*/}
              <h6>Create account</h6>
              <p className="inps" style={{marginTop: "5px"}}>
                <label>Account name</label>
                <input className="accs" id="tr-name" type="text" />
                <label>Select trading account</label>
                <select className="accs" id="tr-sel"><option value="demo">Demo</option><option value="live">Live</option></select>
                <label>Confirm Password</label>
                <input className="accs" required id="tr-pass" type="password" />

                {this.state.errorMessage.length ? <span className='err'>{this.state.errorMessage}</span> : null}

                <button className="sacc" onClick={this.btnSave}>Add ACCOUNT</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default AddAccount;
