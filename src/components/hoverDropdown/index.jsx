import React from "react";
import $ from 'jquery';
import { NavLink } from 'react-router-dom';
import deposit from "../../themes/images/deposit.png";
import transfer from "../../themes/images/transfer.png";
import withdraw from "../../themes/images/withdraw.png";
import profile from "../../themes/images/profile.png";
import key from "../../themes/images/key.png";
import transaction from "../../themes/images/history.png";
import app from '../../services/app';
import "./index.scss";

const HoverDropdown = ({ name, email, balance }) => {
  let isclk = app.isVerified() || app.isAdmin();

  return (
    <div className="profile-dropdown">
      <div className="section1">
        <h3>{name}</h3>
        <p className="grey">{email}</p>
        <div>
          <p>Balance</p>
          <h2>{balance}</h2>
        </div>
      </div>
      <div className="section2">
        <p className="grey">FINANCE</p>
        <ul className={isclk ? "" : " --disabled"}>
          <li onClick={() => localStorage.setItem("TSelected", "deposit")}><img src={deposit} /><NavLink className="navtotransaction" to={isclk ? "/Transactions" : "/Book"}>Deposit Funds</NavLink></li>
          <li onClick={() => localStorage.setItem("TSelected", "transfer")}><img src={transfer} /><NavLink className="navtotransaction" to={isclk ? "/Transactions" : "/Book"}>Transfer Funds</NavLink></li>
          <li onClick={() => localStorage.setItem("TSelected", "withdraw")}><img src={withdraw} /><NavLink className="navtotransaction" to={isclk ? "/Transactions" : "/Book"}>Withdraw Funds</NavLink></li>
          <li onClick={() => localStorage.setItem("TSelected", "transaction")}><img src={transaction} /><NavLink className="navtotransaction" to={isclk ? "/Transactions" : "/Book"}>Transaction History</NavLink></li>
        </ul>
      </div>
      <div className="section3">
        <p>PROFILE</p>
        <ul>
          <li><img src={profile} /><NavLink to="/Profile">View Profile</NavLink></li>
          <li onClick={() => { $(window).trigger("changePassword"); window.changePassword = true; }}><img src={key} /><NavLink to="/Profile">Change Password</NavLink></li>
          {/*if(window.location.pathname.replace("/", "").toLowerCase() === "profile") { $(window).trigger("changePassword"); } else { window.changePassword = true; }*/}
        </ul>
      </div>
    </div>
  );
};

export default HoverDropdown;