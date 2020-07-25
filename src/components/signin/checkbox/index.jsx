import React from "react";
import "./index.scss";

const CheckBox = (props) => (
  <div className="login-checkbox">
    <input type="checkbox" {...props}/>
    <label htmlFor="check">Keep me logged in</label>
  </div>
);

export default CheckBox;
