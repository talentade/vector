import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
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
import '../../themes/js/datepicker.min.css';
import datepicker from '../../themes/js/datepicker.js';

const popupOut = (e) => {
  if($(e.target).hasClass("overlay") && $(e.target).hasClass("popups")) {
    $(e.target).find(".modal-cancel").click();
  }
}

$(function () {

  $(document).delegate(".dpk-m", "click", function () {
    $(this).text($(this).text().trim().toLowerCase() == "am" ? "PM" : "AM");
  });

});

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
    const { note, type, show, cancel, action } = this.props;
    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
          <div className='edit-modal-section'>
            <div className='edit-header'>
              Note <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
            </div>
            <h2 className='edit-title' contentEditable="true" data-placeholder="Title">{type == 'new' ? '' : note.title}</h2>
            <div className='edit-content' contentEditable="true" spellCheck="false" data-placeholder="Start typing a note...">{type == 'new' ? '' : note.note}</div>
            <div className='edit-footer'>
              <div></div>
              {
                type == 'new'
                ? <button className="action" onClick={() => action($(".edit-title").text(), $(".edit-content").text())}>Save Note</button>
                : type == 'view'
                  ? <button className="action" onClick={cancel}>Close</button>
                  : <button className="action" onClick={() => action($(".edit-title").text(), $(".edit-content").text())}>Update</button>
              }
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}

class Task extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date1Selected: "Day",
      date2Selected: "Day",
    }
    this.updated = false;
  }

  canAct = () => {
    return (
      $(".datepicker1").text() != "Day" &&
      $(".datepicker2").text() != "Day" &&
      $(".edit-title").text().length &&
      $(".edit-content").text().length &&
      $("select[name=assigned]").val() != '- Select -'
    );
  }

  action = async () => {
    if(!this.canAct()) return alert("Please fill all fields");

    let title     =  $(".edit-title").text();
    let content   =  $(".edit-content").text();
    
    let type      =  $("select[name=type]").val();
    let priority  =  $("select[name=priority]").val();
    let assigned  =  $("select[name=assigned]").val();
    
    let time1     =  $("select[name=time1]").val();
    let time2     =  $("select[name=time2]").val();

    let ddate     =  moment($(".datepicker1").text()).format('M/D/YYYY')+" "+time1+" "+$(".dpk-m.1").text();
    let rdate     =  moment($(".datepicker2").text()).format('M/D/YYYY')+" "+time2+" "+$(".dpk-m.2").text();

    this.props.action({title, content, type, priority, assigned, ddate, rdate});
  }

  render() {
    const { show, cancel, type, id } = this.props;

    let { date1Selected, date2Selected } = this.state;

    if(this.props.type != "new") {

      date1Selected = date1Selected.toLowerCase() == "day"
                    ? new Date(this.props.data.due_date.split(" ")[0]).toDateString()
                    : date1Selected;
      date2Selected = date2Selected.toLowerCase() == "day"
                    ? new Date(this.props.data.reminder_date.split(" ")[0]).toDateString()
                    : date2Selected;

      setTimeout(() => {
        if(!this.updated) {
          $(".edit-title").text(this.props.data.title);
          $(".edit-content").text(this.props.data.note);

          $("select[name=type]").val(this.props.data.task_type);
          $("select[name=priority]").val(this.props.data.priority);
          $("select[name=assigned]").val(this.props.data.assigned);

          $("select[name=time1]").val(this.props.data.due_date.split(" ")[1]);
          $("select[name=time2]").val(this.props.data.reminder_date.split(" ")[1]);

          $(".dpk-m.1").text(this.props.data.due_date.split(" ")[2]);
          $(".dpk-m.2").text(this.props.data.reminder_date.split(" ")[2]);
          
          this.updated  = true;
        }
      }, 100);
    }

    let   dis     = this;
    const picker1 = datepicker();
    const picker2 = datepicker();

    setTimeout(() => {
      if($(".datepicker1").length) {
        picker1(".datepicker1", {
          onSelect: instance => {
            dis.setState({date1Selected: instance.dateSelected.toDateString()});
          },
          formatter: (input, date, instance) => {
            input.value = date.toDateString();
          },
        });
      }
      if($(".datepicker2").length) {
        picker1(".datepicker2", {
          onSelect: instance => {
            dis.setState({date2Selected: instance.dateSelected.toDateString()});
          },
          formatter: (input, date, instance) => {
            input.value = date.toDateString();
          },
        });
      }
    }, 1000);

    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
          <div className='edit-modal-section'>
            <div className='edit-header'>
              Task <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
            </div>
            <h2 className='edit-title task' contentEditable="true" data-placeholder="Type task title" style={{fontSize: ".9em", paddingLeft: "2.7em"}}></h2>
            <div className='edit-settings float'>
              <div className='e-option'>
                <span className='option'>Due Date</span>
                <div className='field'>
                  &nbsp;&nbsp;
                  <label className="datepicker datepicker1">
                    <img className="" src={calendar} />{date1Selected}
                  </label>
                  &nbsp;&nbsp;
                  <img src={time} className="dpk-t"/>
                  <select className="dpk-s" name="time1">
                  {
                    "1,2,3,4,5,6,7,8,9,10,11,12"
                    .split(",")
                    .map((t) => (
                      <option value={t+":00"}>&nbsp;&nbsp;&nbsp;{t+" : 00"}&nbsp;&nbsp;&nbsp;</option>
                    ))
                  }
                  </select>
                  <span className="dpk-m 1">AM</span>
                </div>
              </div>
            </div>
            <div className='edit-content task' contentEditable="true" spellCheck="false" data-placeholder="Start typing task..."></div>
            <div className='edit-settings task'>
              <div className='e-option'>
                <span className='option'>Type</span>
                <div className='field'>
                  <select name="type">
                    <option>To-do</option>
                    <option>Call</option>
                    <option>Email</option>
                    <option>Meeting</option>
                    <option>Reminder</option>
                  </select>
                </div>
              </div>
              <div className='e-option'>
                <span className='option'>Priority</span>
                <div className='field'>
                  <select name="priority">
                    <option>None</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
              <div className='e-option'>
                <span className='option'>Assigned to</span>
                <div className='field'>
                  <select name="assigned">
                    <option>- Select -</option>
                    <option>Adeoye Talent</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='edit-settings'>
              <div className='e-option'>
                <span className='option'>Email Reminder</span>
                <div className='field'>
                  &nbsp;&nbsp;
                  <label className="datepicker datepicker2">
                    <img className="" src={calendar} />{date2Selected}
                  </label>
                  &nbsp;&nbsp;
                  <img src={time} className="dpk-t"/>
                  <select className="dpk-s" name="time2">
                  {
                    "1,2,3,4,5,6,7,8,9,10,11,12"
                    .split(",")
                    .map((t) => (
                      <option value={t+":00"}>&nbsp;&nbsp;&nbsp;{t+" : 00"}&nbsp;&nbsp;&nbsp;</option>
                    ))
                  }
                  </select>
                  <span className="dpk-m 2">AM</span>
                </div>
              </div>
            </div>
            <div className='edit-footer'>
              <div></div>
              {
                this.props.type == 'new'
                ? <button className="action" onClick={() => this.action()}>Save Task</button>
                : this.props.type == 'view'
                  ? <button className="action" onClick={cancel}>Close</button>
                  : <button className="action" onClick={() => this.action()}>Update Task</button>
              }              
            </div>
          </div>
        </div>
      ) : (null)
    );
  }
}

class Meet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dateSelected: "Day",
    }
  }

  componentDidMount () {}

  render() {
    const { show, cancel, type, id } = this.props;

    let dis = this;
    const picker = datepicker();
    setTimeout(() => {
      if($(".datepicker").length) {
        picker(".datepicker", {
          onSelect: instance => {
            dis.setState({dateSelected: instance.dateSelected.toDateString()});
          },
          formatter: (input, date, instance) => {
            input.value = date.toDateString();
          },
        });
      }
    }, 1000);

    return (
      show ? (
        <div className='overlay popups' onClick={popupOut}>
          <div className='edit-modal-section'>
            <div className='edit-header'>
              Meeting <img src={CancelIcon} alt='' className='modal-cancel' onClick={cancel} />
            </div>
            <h2 className='edit-title' contentEditable="true" data-placeholder="What are you meeting about?" style={{fontSize: "1em", paddingLeft: "2.2em"}}></h2>
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
                  <label className="datepicker">
                    <img className="" src={calendar} />{this.state.dateSelected}
                  </label>
                  &nbsp;&nbsp;
                  <img src={time} className="dpk-t"/>
                  <select className="dpk-s">
                  {
                    "1,2,3,4,5,6,7,8,9,10,11,12"
                    .split(",")
                    .map((t) => (
                      <option>&nbsp;&nbsp;&nbsp;{t+" : 00"}&nbsp;&nbsp;&nbsp;</option>
                    ))
                  }
                  </select>
                  <span className="dpk-m">AM</span>
                </div>
              </div>
              <div className='e-option'>
                <span className='option'>Duration</span>
                <div className='field'>
                  <select className="dpk-s2">
                  {
                    "1,2,3,4,5".split(",").map((h) => (
                      <option>{h} hour{h > 1 ? 's' : ''}</option>
                    ))
                  }
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