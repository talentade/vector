import React from "react";
import { NavLink } from 'react-router-dom';
import "./index.scss";

const HoverDropdown = ({ name, email, balance }) => {
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
        <ul>
          <li onClick={() => localStorage.setItem("TSelected", "deposit")}><NavLink className="navtotransaction" to="/Transactions">Deposit Funds</NavLink></li>
          <li onClick={() => localStorage.setItem("TSelected", "transfer")}><NavLink className="navtotransaction" to="/Transactions">Transfer Funds</NavLink></li>
          <li onClick={() => localStorage.setItem("TSelected", "withdraw")}><NavLink className="navtotransaction" to="/Transactions">Withdraw Funds</NavLink></li>
          <li onClick={() => localStorage.setItem("TSelected", "transaction")}><NavLink className="navtotransaction" to="/Transactions">Transaction History</NavLink></li>
        </ul>
      </div>
      <div className="section3">
        <p>PROFILE</p>
        <ul>
          <li><NavLink to="/Profile">View Profile</NavLink></li>
          <li>Change Password</li>
        </ul>
      </div>
    </div>
  );
};

export default HoverDropdown;
