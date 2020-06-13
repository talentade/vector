import React from "react";
import GreenBar from "../greenBar/index";
import RightCaret from "../../../themes/images/tradeDashboard/right_caret.svg";
import "./index.scss";

const PasswordBar = ({ showBoxes }) => {
  return (
    <GreenBar>
      <div className="horizontal-bar" onClick={showBoxes}>
        <p>Change Password</p>
        <img src={RightCaret} alt="right-caret" />
      </div>
    </GreenBar>
  );
};

export default PasswordBar;
