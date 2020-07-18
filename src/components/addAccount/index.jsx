import React, { Component } from 'react';
import './index.scss';
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
      step : 0
    };

    this.fireAccList = new CustomEvent('refreshAccList', {
      detail: {
        code: 200
      }
    });

  }

  handleClick = (p) => {
    // this.setState({ information : p});
  }

  componentDidMount () {

  }

  btnSave = async () => {
    let sel = document.getElementById("tr-sel").value;
    let pas = document.getElementById("tr-pass").value;

    try {
      let resp = await server.addAccount(localStorage.getItem("id"), sel, pas);
      // const { data: { data: { profile } } } = await server.getProfile(localStorage.getItem("id"), localStorage.getItem("email"));
      // localStorage.setItem('email', localStorage.getItem("email"));
      // localStorage.setItem('id', profile.user_id);
      // this.props.saveUserProfile(profile);
      // localStorage.setItem('profile', JSON.stringify(profile));
      document.getElementById("account-container").dispatchEvent(this.fireAccList);
      this.props.cancelClick();
    } catch (error) {
      return error.message;
    }

    this.props.cancelClick();
  }

  render () {
    const { text, cancelClick, confirmClick } = this.props;
    const { information, step } = this.state;
    return (
      <div className='overlay fav'>
        <div className='modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancelClick} />
            <div className='bsell-modal-content'>
              <h6>Select a trading account</h6>
              <p className="inps">
                <select className="accs" id="tr-sel"><option value="demo">Demo</option><option value="live">Live</option></select>
                <label>Confirm Password</label>
                <input className="accs" id="tr-pass" type="password" />
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
