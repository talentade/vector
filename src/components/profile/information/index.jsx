import React from "react";
import EditLogo from "../../../themes/images/tradeDashboard/edit.svg";
import "./index.scss";

const UserInfo = ({ dataKey, value, editable }) => {
  return (
    <div className="information">
      <p className="key">{dataKey}</p>
      <div>
        <p className="value">{value}</p>
        { editable ? <img src={EditLogo} alt="" /> : null}
      </div>
    </div>
  );
};

export default UserInfo;
