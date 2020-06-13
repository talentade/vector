import React from "react";

const BalanceItem = ({ className, heading, figure }) => {
  return (
    <div className={className}>
      <p>{heading}</p>
      <p>{figure}</p>
    </div>
  );
};

export default BalanceItem;
