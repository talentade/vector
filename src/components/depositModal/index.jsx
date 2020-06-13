import React from 'react';
import './index.scss';
import CancelIcon from '../../themes/images/cancel.svg';

const DepositModal = ({ imageUrl, text, handleClick }) => {
  return (
    <div className='overlay'>
      <div className='deposit-modal-section'>
        <div className='upper-modal'>
          <img src={CancelIcon} alt='' className='modal-cancel' onClick={handleClick} />
          <img src={imageUrl} alt='' className='modal-main-img' />
        </div>
        <div className='lower-modal'>
          <div className='lower-modal-content'>
            <h6>Transaction Completed</h6>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
