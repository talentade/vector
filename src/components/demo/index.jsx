import React from "react";
import './index.scss';

const Demo = ({ demoOptions, selectValue, handleDemoChange }) => {
  return (
    <div className="demo">
      <select className="demo-select" onChange={handleDemoChange} value={selectValue}>
        {demoOptions.map((option) => (
          <option key={`${Math.random() * 1000000}`}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Demo;
