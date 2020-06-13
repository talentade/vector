import React from 'react';
import './index.scss';
import GreenBar from '../greenBar/index';

const PasswordButton = ({ show, handleSubmit }) => {
  return (
    <div>
      {show ? <GreenBar>
        <button className='profile-submit-btn' onClick={handleSubmit}>Save password</button>
      </GreenBar> : false}
    </div>
  );
};

export default PasswordButton;
