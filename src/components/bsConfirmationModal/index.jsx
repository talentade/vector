import React from 'react';
import $ from 'jquery';
import './index.scss';
import CancelIcon from '../../themes/images/cancel.svg';
import con_buysell from '../../themes/images/con_buysell.png';

const popupOut = (e) => {
  if($(e.target).hasClass("overlay") && $(e.target).hasClass("bsc")) {
    $(e.target).find(".modal-cancel").click();
  }
}

export default class BsConfirmationModal extends React.Component {
   render() {
    const { text, show, cancel} = this.props;
    let txt = text.length ? text : 'Your have successfully placed a buy/sell order';
    return (
      show ? (
        <div className='overlay bsc' onClick={popupOut}>
          <div className='deposit-modal-section'>
            <div className='lower-modal'>
              <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
              <img src={con_buysell} alt='' className='modal-main-img' />
              <div className='lower-modal-content'>
                <h6 style={{marginTop: "1em"}}>Your Order is Placed</h6>
                <p style={{marginTop: "1em"}}>{txt}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}
