import React from 'react';
import './index.scss';
import CancelIcon from '../../themes/images/cancel.svg';

const ConfirmationModal = ({ imageUrl, text, cancelClick, confirmClick }) => {
  return (
    <div className='overlay cfm'>
      <div className='deposit-modal-section'>
        <div className='upper-modal'>
          <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancelClick} />
        </div>
        <div className='lower-modal'>
          <img src={imageUrl} alt='' className='modal-main-img' style={{position: "absolute", top: "-5em"}}/>
          <div className='lower-modal-content'>
            <h6>Request Sent</h6>
            <p>{text}</p>
            <p style={{marginTop: "1em"}}>
              <button class="cm-undo" onClick={cancelClick}>UNDO</button>
              <button class="cm-ok" onClick={confirmClick}>OK</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
