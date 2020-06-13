import React from "react";
import Verified from "../../../themes/images/tradeDashboard/verifiedOne.svg";
import Unverified from "../../../themes/images/tradeDashboard/verifiedTwo.svg";
import "./index.scss";

const VerificationItem = ({ verified, itemHead, itemContent, buttonText }) => {
  return (
    <div className="verification-item">
      <div className="doc-img-info-section">
        <img src={verified ? Verified : Unverified} alt="verify-status" />
        <div className="doc-info-section">
          <p className="verify-item-head">{itemHead}</p>
          <p className="verify-item-content">{itemContent}</p>
        </div>
      </div>
      <div className="verification-btn-section">
        <label htmlFor={`${itemHead}1`}>
          <p style={{ background: verified ? '#C4C4C4' : null}}>{buttonText}</p>
        </label>
        <input type="file" id={`${itemHead}1`} disabled={verified}/>
      </div>
    </div>
  );
};

export default VerificationItem;
