import React from "react";
import './index.scss';

const Accounts = ({ options, selectValue, handleChange }) => {
  return (
    <div className="accs">
      <select className="accs-select" onChange={handleChange} value={selectValue}>
        {options.map(({account_name, account_label}) => (
          <option key={`${Math.random() * 1000000}`} value={account_name}>{account_label.length ? account_label : account_name.charAt(0).toUpperCase()+account_name.slice(1)}</option>
        ))}
      </select>
    </div>
  );
};

export default Accounts;