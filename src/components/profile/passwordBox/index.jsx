import React from 'react';
import './index.scss';

const PasswordBox = ({ labelName, placeholder, show, name, handleChange, error }) => {
  return (
    <div>
      {show ? (
        <div className='password-box'>
          <label>{labelName}</label>
          <input
            type='password'
            placeholder={placeholder}
            name={name}
            onChange={handleChange}
            required
          />
          <p className="error">{error ? `*${error}` : null}</p>
        </div>
      ) : null}
    </div>
  );
};

export default PasswordBox;
