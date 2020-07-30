import React, { Component } from 'react';
import './index.scss';
import fav from '../../themes/popup/fav.PNG';
import acc from '../../themes/popup/account.PNG';
import err from '../../themes/popup/err.PNG';
import bc from '../../themes/popup/booked.PNG';
import CancelIcon from '../../themes/images/cancel.svg';


class FavPopup extends React.Component {
   render() {
    const { pair, show, cancel } = this.props;
    return (
      show ? (
        <div className='overlay popups'>
          <div className='deposit-modal-section'>
            <div className='upper-modal'>
              <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
              <img src={fav} alt='' className='modal-main-img' />
            </div>
            <div className='lower-modal'>
              <div className='lower-modal-content'>
                <h6>Favorite Added</h6>
                <p><span style={{color: "#03CF9E"}}>{pair}</span> has been added to your favourite instruments</p>
              </div>
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}

class Booked extends React.Component {
   render() {
    const { text, show, cancel } = this.props;
    return (
      show ? (
        <div className='overlay popups'>
          <div className='deposit-modal-section'>
            <div className='upper-modal'>
              <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
              <img src={bc} alt='' className='modal-main-img' />
            </div>
            <div className='lower-modal'>
              <div className='lower-modal-content'>
                <h6>Call Booked</h6>
                <p>You have successfully scheduled a call with us after which your account will be activated </p>
              </div>
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}

class Created extends React.Component {
   render() {
    const { show, cancel, type, id } = this.props;
    return (
      show ? (
        <div className='overlay popups'>
          <div className='deposit-modal-section'>
            <div className='upper-modal'>
              <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
              <img src={acc} alt='' className='modal-main-img' />
            </div>
            <div className='lower-modal'>
              <div className='lower-modal-content'>
                <h6>Account Created</h6>
                <p>You have successfully created a new {type} account with ID {id}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}

class Insufficient extends React.Component {
   render() {
    const { show, cancel, type, id } = this.props;
    return (
      show ? (
        <div className='overlay popups'>
          <div className='deposit-modal-section'>
            <div className='upper-modal'>
              <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
              <img src={err} alt='' className='modal-main-img' />
            </div>
            <div className='lower-modal'>
              <div className='lower-modal-content'>
                <h6>Insufficient Balance</h6>
                <p>Please deposit more funds to your account</p>
              </div>
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}

export {FavPopup, Booked, Created, Insufficient}
