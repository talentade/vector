import React from "react";
import "./index.scss";

const GreenBar = (props) => {
  return (
    <div className="green-bar">
      {props.children}
    </div>
  );
};

export default GreenBar;
