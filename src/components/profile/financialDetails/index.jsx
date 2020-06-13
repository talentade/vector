import React from "react";
import "./index.scss";
import Wallet from "../../../themes/images/tradeDashboard/wallet.svg";

const FinancialDetails = ({ balance, handleClick }) => {
  return (
    <div className="financial-details">
      <div className="financial-info">
        <div className="wallet-section">
        <img src={Wallet} alt="wallet-icon" />
          <h4>Financial Details</h4>
        </div>
        <div className="financial-balance">
          <p>Balance</p>
          <h3>{balance}</h3>
        </div>
      </div>
      <button onClick={handleClick}>Add a Card</button>
    </div>
  );
};

export default FinancialDetails;
