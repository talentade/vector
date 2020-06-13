import React from "react";

const Margin = ({ margin, price }) => (
  <div className="margin">
    <h6>{margin}</h6>
    <p>{price}</p>
  </div>
);

export default Margin;
