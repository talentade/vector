import React from "react";
import "./index.scss";

const UnverifiedItems = ({ items }) => {
  return (
    <div className="unverified-items">
      <h5>To verify your account, do the following:</h5>
      <ul>
        {
          items.map(item => <li key={`${item}-1`}>{item}</li>)
        }
      </ul>
    </div>
  );
};

export default UnverifiedItems;
