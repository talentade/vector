import React from "react";

const TableRow = ({ styles, classOne, classTwo, textLabel, data, className }) => {
  return (
    <div className={className}>
      <p className={classOne}>{textLabel}</p>
      <p className={classTwo}>{data}</p>
    </div>
  );
};

export default TableRow;
