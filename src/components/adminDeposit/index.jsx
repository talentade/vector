import React, { Component } from 'react';
import './index.scss';
import $ from 'jquery';
import CancelImage from '../../themes/images/cancel.png';
import server from '../../services/server';

class Deposit extends Component {
  constructor(props) {

    super(props);

    let info = false;


    this.state = {
      amt: 0,
      step : 0,
      accounts: [],
      sent: false,
      errorMessage: '',
      account_bal: '0',
      account_name: '',
    };
  }

  popupOut = (e) => {
    if($(e.target).hasClass("overlay") && $(e.target).hasClass("fav")) {
      $(e.target).find(".modal-cancel").click();
    }
  }

  selAcc = (e) => {
    this.state.accounts.forEach((v, k) => {
      if(v.account_name == e.target.value) {
        this.setState({account_name: e.target.value, account_bal: this.props.type == "credit" ? v.credit : v.balance});
      }
    })
  }

  fundAccount = async () => {
    if(
      this.state.amt > 0 &&
      document.getElementById("tr-pass").value.length &&
      (this.state.account_name.length || this.state.account_name != "-- Select Account --")
    ) {
      this.setState({errorMessage: "", sent: true});
      try {
        let fa = await server.fundAccount(
          this.state.amt,
          "USD",
          this.state.account_name,
          this.props.uid,
          this.props.type.toLowerCase(),
          document.getElementById("tr-pass").value
        );
        if(fa.status == 200 && fa.data.success) {
          this.props.confirmClick();
        } else {
          this.setState({errorMessage: fa.data.message, sent: false});
        }
      } catch (e) {
        return e;
      }
    } else {
      this.setState({errorMessage: "Please fill all fields", sent: false});
    }
  }

  async componentDidMount () {
    this.accountList();
  }

  accountList = async () => {
    try {
      await server.getProfile(this.props.uid).then((gp) => {
        let accs = gp.data.profile.accounts;
        this.setState({accounts: accs});
      });
      this.setState({showSpinner: false});
    } catch(e) {
      this.setState({showSpinner: false});
      return e;
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
              <h6>{this.props.type == 'deduct' ? 'Deduct balance' : 'Deposit'}</h6>
              <p className="inps" style={{marginTop: "5px"}}>
                <label>Enter Amount</label>
                <input className="accs" id="tr-amount" type="number" onChange={(e) => this.setState({amt: e.target.value})} />
                <label>Select trading account <span style={{float: "right"}}>{this.props.type == 'deduct' ? 'Current balance' : this.props.type.ucwords()}: <b>${this.state.account_bal}</b>&nbsp;</span></label>
                <select className="accs" id="tr-accs" onChange={this.selAcc}>
                  <option>-- Select Account --</option>
                  {
                    this.state.accounts.map((acc) => (
                      acc.account_type == 'live' ? <option>{acc.account_name}</option> : null
                    ))
                  }
                </select>
                <label>Enter admin password</label>
                <input className="accs" required id="tr-pass" type="password" />

                {this.state.errorMessage.length ? <span className='err'>{this.state.errorMessage}</span> : null}

                <button className="sacc" disabled={!this.state.accounts.length || this.state.sent} onClick={this.fundAccount}>{this.props.type == 'deduct' ? "Deduct balance" : "Deposit to "+this.props.type.ucwords()}</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Deposit;
