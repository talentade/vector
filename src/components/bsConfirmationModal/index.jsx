import React from 'react';
import './index.scss';
import CancelIcon from '../../themes/images/cancel.svg';

const BsConfirmationModal = ({ imageUrl, text, cancelClick, confirmClick }) => {
  return (
    <div className='overlay bsc'>
      <div className='deposit-modal-section'>
        <div className='lower-modal'>
          <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancelClick} />
          <img src={imageUrl} alt='' className='modal-main-img' />
          <div className='lower-modal-content'>
            <h6 style={{marginTop: "1em"}}>Your Order is Placed</h6>
            <p style={{marginTop: "1em"}}>Your have successfully placed a buy/sell order</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BsConfirmationModal;
