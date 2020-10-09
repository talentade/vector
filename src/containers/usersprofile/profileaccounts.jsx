import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TableFilters from '../../components/tablefilters/index';
import ins_up from '../../themes/images/ins-up.png';
import ins_down from '../../themes/images/ins-down.png';
import server from '../../services/server';
import app from '../../services/app';
import './profileaccounts.scss';
import '../accounts/index.scss';
import '../../components/standard/table.scss';
import sp from '../../themes/images/circle-plus.png';
import { Created } from '../../components/popups/index';
import AddAccount from '../../components/addAccount/index';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNews: null,
      showSpinner: false,
      showCreated: false,
      addAcc: false,
      accounts: [],
      cid: "",
      filterAcc: 'all',
      ctype: "",
      email: app.email()
    }
  }

  handleClick = (e, i) => {
    document.querySelectorAll(".t-history-record").forEach(function(el) {
      el.classList.remove("_active");
    });
    document.getElementById(i).classList.add("_active");
  }

  changeLeverage = async (e, a) => {
    this.props.load();
    try {
      await server.changeLeverage(this.props.uid, a, e.target.value);
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  filterAcc = (val) => {
    this.setState({filterAcc: val.toLowerCase()});
  }

  render () {
    let active = parseInt(this.props.active);
    let accounts = this.props.accounts;
    if(this.state.filterAcc != 'all') {
      accounts  = accounts.filter((a) => a.account_type.toLowerCase() === this.state.filterAcc);
    }

  	return (
      <div className={"tab-row profile-accounts"+(active ? ' _active' : '')} id="tab-row-accounts">

      <TableFilters table="accounts" filterAcc={this.filterAcc} addTask={(e) => this.setState({addAcc: true})} />

      { this.state.addAcc ?
        <AddAccount
          admin={true}
          uid={this.props.uid}
          sending={() => this.props.load()}
          unsending={() => this.props.load()}
          sent={() => this.setState({showSpinner : false})}
          showCreated={(i, t) => this.setState({showSpinner: false, showCreated: true, cid: i, ctype: t})}
          confirmClick={(e) => { this.props.refresh(); this.setState({addAcc: false})}}
          cancelClick={(e) => this.setState({addAcc: false})}
        /> : null }

        <Created show={this.state.showCreated} type={this.state.ctype} id={this.state.cid} cancel={(e) => { this.setState({showCreated: false}); }} />

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
            <li className=""><span className="th">LEVERAGE</span><span className="td">
              <select className="lev" onChange={(e) => this.changeLeverage(e, acc.account_name)}>
                <option selected={acc.leverage == '1:50'} value="1:50">1 : 50</option>
                <option selected={acc.leverage == '1:100'} value="1:100">1 : 100</option>
                <option selected={acc.leverage == '1:200'} value="1:200">1 : 200</option>
                <option selected={acc.leverage == '1:300'} value="1:300">1 : 300</option>
                <option selected={acc.leverage == '1:400'} value="1:400">1 : 400</option>
                <option selected={acc.leverage == '1:500'} value="1:500">1 : 500</option>
              </select>
            </span></li>
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
