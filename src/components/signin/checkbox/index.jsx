import React from "react";
import "./index.scss";

const CheckBox = ({ handleClick }) => (
  <div className="login-checkbox">
    <input type="checkbox" onClick={handleClick} id="check" />
    <label htmlFor="check">Keep me logged in</label>
  </div>
);

export default CheckBox;
