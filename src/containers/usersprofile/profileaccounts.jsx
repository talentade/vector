import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ins_up from '../../themes/images/ins-up.png';
import ins_down from '../../themes/images/ins-down.png';
import './profileaccounts.scss';
import '../accounts/index.scss';
import '../../components/standard/table.scss';

class ProfileDetails extends Component {
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
    let active = parseInt(this.props.active);
    let accounts = this.props.accounts;

  	return (
      <div className={"tab-row profile-accounts"+(active ? ' _active' : '')} id="tab-row-accounts">

        {/*<div className="acc-div">
          <button className="add-acc">Add Account</button>
        </div>*/}
        
        <ul className='t-history-header'>
          <li className="acc-name">TRADING ACCOUNT</li>
          <li>BALANCE</li>
          <li>CREDIT</li>
          <li>LEVERAGE</li>
          <li>ACTIONS</li>
        </ul>

        {accounts.map((acc, key) => (
          <ul className={"t-history-record"+(key == 0 ? " _active" : "")} id={"t-history-record-"+key} onClick={(e) => this.handleClick(e, 't-history-record-'+key)}>
            <li className="acc-name">
            <img src={ins_down} className="ins_down" />
            <img src={ins_up} className="ins_up" />
            <span className="th">TRADING ACCOUNT</span>
            <span className="td"><button className={"acc_type"+(acc.account_type.toLowerCase() == "live" ? " live" : "")}>{acc.account_type.toUpperCase()}</button>{acc.account_label.length ? acc.account_label : "AV-"+acc.account_id}<br /><small className="inf">{acc.account_id}</small></span></li>
            <li className=""><span className="th">BALANCE</span><span className="td">{acc.balance} USD</span></li>
            <li className=""><span className="th">CREDIT</span><span className="td">{acc.credit} USD</span></li>
            <li className=""><span className="th">LEVERAGE</span><span className="td">{acc.leverage}</span></li>
            <li>
              <span className="th">ACTIONS</span>
              <span className="td">
                {/*<NavLink className="deposit navtotransaction" to="/Transactions" onClick={() => { localStorage.setItem("TSelected", "deposit"); localStorage.setItem("TSelectedAcc", acc.account_type.charAt(0).toUpperCase()+acc.account_type.slice(1)+"-"+acc.account_id); }}>Deposit</NavLink>*/}
                <svg className="acc-gra" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.25 5.5H4V17.75H0.25V5.5ZM7.25 0.25H10.75V17.75H7.25V0.25ZM14.25 10.25H17.75V17.75H14.25V10.25Z" fill="#1FCF65"/>
                </svg>
              </span>
            </li>
          </ul>
        ))}

          {/*<ul className="table-body for-acc">
            <li className="acc-name">
            <span className="td"><button className={"acc_type"+(acc.account_type.toLowerCase() == "live" ? " live" : "")}>{acc.account_type.toUpperCase()}</button>{acc.account_label.length ? acc.account_label : "AV-"+acc.account_id}<br /><small className="inf">{acc.account_id}</small></span></li>
            <li className=""><span className="td">{acc.balance} USD</span></li>
            <li className=""><span className="td">{acc.credit} USD</span></li>
            <li className=""><span className="td">{acc.leverage}</span></li>
            <li>
              <span className="td">
                <button className="deposit">Deposit</button>
                <svg className="acc-gra" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.25 5.5H4V17.75H0.25V5.5ZM7.25 0.25H10.75V17.75H7.25V0.25ZM14.25 10.25H17.75V17.75H14.25V10.25Z" fill="#1FCF65"/>
                </svg>
              </span>
            </li>
          </ul>*/}
      </div>
	 )
	}

}

export default ProfileDetails;