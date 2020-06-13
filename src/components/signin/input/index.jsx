import React from 'react';
import './index.scss';

const Input = ({ imageUrl, name, handleChange, type }) => {
  return(
    <div className="signin-input">
      <img src={imageUrl} alt="signin-icon" />
      <input type={type} name={name} onChange={handleChange} required />
    </div>
  )
};

export default Input;
