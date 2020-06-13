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
          <li>Deposit Funds</li>
          <li>Transfer Funds</li>
          <li>Withdraw Funds</li>
          <li>Transfer Funds</li>
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
