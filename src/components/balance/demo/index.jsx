import React from "react";
import './index.scss';

const Demo = ({ demoOptions }) => {
  return (
    <div className="demo">
      <select className="demo-select">
        {demoOptions.map((option) => (
          <option key={`${Math.random() * 1000000}`}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Demo;
