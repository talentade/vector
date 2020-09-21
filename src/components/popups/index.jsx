import React, { Component } from 'react';
import $ from 'jquery';
import './index.scss';
import fav from '../../themes/popup/fav.PNG';
import acc from '../../themes/popup/account.PNG';
import err from '../../themes/popup/err.PNG';
import bc from '../../themes/popup/booked.PNG';
import calendar from './calendar.svg';
import time from './time.svg';
import app from '../../services/app';
import logout from "../../themes/images/tradeDashboard/t_nav4.svg";
import CancelIcon from '../../themes/images/cancel.svg';
import con_buysell from '../../themes/images/con_buysell.png';

const popupOut = (e) => {
  if($(e.target).hasClass("overlay") && $(e.target).hasClass("popups")) {
    $(e.target).find(".modal-cancel").click();
  }
}

class FavPopup extends React.Component {
   render() {
    const { pair, show, cancel } = this.props;
    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
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
        <div className='overlay popups' onClick={popupOut}>
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

class Closed extends React.Component {
   render() {
    const { text, show, cancel } = this.props;
    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
          <div className='deposit-modal-section'>
            <div className='upper-modal'>
              <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
              <img src={con_buysell} alt='' className='modal-main-img' />
            </div>
            <div className='lower-modal'>
              <div className='lower-modal-content'>
                <h6>Order Closed</h6>
                <p>You have successfully closed an order</p>
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
        <div className='overlay popups' onClick={popupOut}>
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

class Note extends React.Component {
   render() {
    const { show, cancel, type, id } = this.props;
    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
          <div className='edit-modal-section'>
            <div className='edit-header'>
              Note <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
            </div>
            <h2 className='edit-title' contentEditable="true" data-placeholder="Title"></h2>
            <div className='edit-content' contentEditable="true" spellCheck="false" data-placeholder="Start typing a note..."></div>
            <div className='edit-footer'>
              <div></div>
              <button className="action">Save Note</button>
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}

class Meet extends React.Component {
   render() {
    const { show, cancel, type, id } = this.props;
    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
          <div className='edit-modal-section'>
            <div className='edit-header'>
              Meeting <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
            </div>
            <h2 className='edit-title' contentEditable="true" data-placeholder="What are you meeting about?"></h2>
            <div className='edit-settings meet'>
              <div className='e-option'>
                <span className='option'>Attendee</span>
                <div className='field'>
                  <select>
                    <option>Attendee({app.uid(app.id())})</option>
                  </select>
                </div>
              </div>
              <div className='e-option'>
                <span className='option'>Schedule Time</span>
                <div className='field'>
                  &nbsp;&nbsp;
                  <img src={calendar} />
                  <select>
                    <option>Day</option>
                  </select>
                  &nbsp;&nbsp;
                  <img src={time} />
                  <select>
                    <option>Time</option>
                  </select>
                </div>
              </div>
              <div className='e-option'>
                <span className='option'>Duration</span>
                <div className='field'>
                  <select>
                    <option>1 hour</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='edit-content meet' contentEditable="true" spellCheck="false" data-placeholder="Meeting description"></div>
            <div className='edit-footer'>
              <div></div>
              <button className="action large">Schedule Meeting</button>
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}

class Task extends React.Component {
   render() {
    const { show, cancel, type, id } = this.props;
    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
          <div className='edit-modal-section'>
            <div className='edit-header'>
              Task <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
            </div>
            <div className='edit-settings float'>
              <div className='e-option'>
                <span className='option'>Due Date</span>
                <div className='field'>
                  &nbsp;&nbsp;
                  <img src={calendar} />
                  <select>
                    <option>Day</option>
                  </select>
                  &nbsp;&nbsp;
                  <img src={time} />
                  <select>
                    <option>Time</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='edit-content task' contentEditable="true" spellCheck="false" data-placeholder="Start typing task..."></div>
            <div className='edit-settings'>
              <div className='e-option'>
                <span className='option'>Type</span>
                <div className='field'>
                  <select>
                    <option>To-do</option>
                  </select>
                </div>
              </div>
              <div className='e-option'>
                <span className='option'>Priority</span>
                <div className='field'>
                  <select>
                    <option>None</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className='e-option'>
                <span className='option'>Assigned to</span>
                <div className='field'>
                  <select>
                    <option>Adeoye Talent(adeoyetalent@gmail.com)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='edit-settings'>
              <div className='e-option'>
                <span className='option'>Email Reminder</span>
                <div className='field'>
                  &nbsp;&nbsp;
                  <img src={calendar} />
                  <select>
                    <option>Day</option>
                  </select>
                  &nbsp;&nbsp;
                  <img src={time} />
                  <select>
                    <option>Time</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='edit-footer'>
              <div></div>
              <button className="action">Save Task</button>
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
        <div className='overlay popups' onClick={popupOut}>
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

class Logout extends React.Component {
   render() {
    const { show, cancel, confirm } = this.props;
    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
          <div className='deposit-modal-section'>
            <div className='upper-modal'>
              <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
              <img src={logout} alt='' className='modal-main-img' />
            </div>
            <div className='lower-modal'>
              <div className='lower-modal-content'>
                <h6>Logout</h6>
                <p>Are you sure</p>
                <p style={{marginTop: "1em", justifyContent: "space-between"}}>
                  <button class="cm-undo" onClick={cancel}>NO</button>
                  <button class="cm-ok" onClick={confirm}>YES</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}



export {FavPopup, Booked, Note, Task, Meet, Created, Closed, Insufficient, Logout}