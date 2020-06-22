import React from "react";
import { Link } from "react-router-dom";
import BalanceItem from "./balanceItem/index";
import calendar from '../../themes/images/calendar.png';
import './index.scss';

const Balance = ({ balance, balanceItemData }) => {
  return (
    <div className="balance">
      <img src={calendar} className="calendar-icon" />
      <p className="small-text">Balance</p>
      <h2>{balance}</h2>

      <div className="flex">
        {balanceItemData.map((data) => (
          <BalanceItem {...data} key={`${Math.random() * 1000000}`}/>
        ))}
      </div>

      <div className="btn">
        <Link to="Transactions">DEPOSIT</Link>
      </div>
    </div>
  );
};

export default Balance;
