import React from "react";
import "./index.scss";
import UnverifiedItems from "../unverifiedItems/index";
import ShieldImage from "../../../themes/images/tradeDashboard/shield.svg";

const AccountInfo = ({ verified, unverifiedItems }) => {
  return (
    <div className="profile-account-info-section">
      <h4>Account Status</h4>
      {!verified ? (
        <div className="shield-warning">
          <img src={ShieldImage} alt="shield" />
          <p>Your account is not verified yet.</p>
        </div>
      ) : null}
      {unverifiedItems.length > 0 ? (
        <UnverifiedItems items={unverifiedItems} />
      ) : null}
    </div>
  );
};

export default AccountInfo;
