import React from "react";
import "./index.scss";
import CardBottomImg from "../../../themes/images/tradeDashboard/cardBottom.svg";

const DebitCard = ({ PAN, info, deleteCard }) => {
  const colors = ["#03CF9E", "#C624FF"]
  return (
    <div className="debit-card" style={{ background: colors[Math.floor(Math.random()) * 2] }}>
      <img src={CardBottomImg} alt="" />
      <button onClick={deleteCard}>Remove</button>

      <h3>{PAN}</h3>

      <div className="exp-info">
        <div className="exp-text">
          <p>VALID</p>
          <p>THRU</p>
        </div>
        <p className="expiry-date">{info.valid_thru}</p>
      </div>
    </div>
  );
};

export default DebitCard;
