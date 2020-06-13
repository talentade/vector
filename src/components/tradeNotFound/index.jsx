import React from "react";
import Image from "../../themes/images/tradeDashboard/open_box.svg";
import "./index.scss";

const TradeNotFound = ({ text }) => {
  return (
    <div className="trade-not-found-box">
      <img src={Image} alt="box" />
      <p>{text}</p>
    </div>
  );
};

export default TradeNotFound;
