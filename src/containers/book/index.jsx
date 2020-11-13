import React, { Component } from 'react';
import $ from 'jquery';
import io from "socket.io-client";
import Container from '../container/index';
import book_call from '../../themes/images/book-call.png';
import scheduled from '../../themes/images/scheduled.png';
import check_mark from '../../themes/images/check-mark.png';
import server from '../../services/server';
import app from '../../services/app';
import Spinner from '../../components/spinner/index';
import { Booked } from '../../components/popups/index';
import calendar_icon from '../../themes/images/calendar-icon.png';
import './index.scss';

class BookCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showLoader: true,
      activeM: null,
      thisYear: 2020,
      iLoader: true,
      lastEdge: 0,
      currentHour: 1,
      currentHour2: 1,
      daysEdge: null,
      bookState: 0,
      weekDay: 7,
      maxDay: 30,
      today: 1,
      month: 0,
      days: [],
      am_pm: 'AM',
      showBooked: false,
      email: app.email(),
      meeting_date: null,
      meeting_time: null,
      meeting_id: null
    }
  }

  async componentDidMount() {

    let d = new Date();
    let m = d.getMonth();
    this.setState({thisYear: d.getFullYear()});
    this.monthList(m);

    setTimeout(() => {
      this.sevenRight(d.getDate());
    }, 100);

    try {
      let meetings = await server.getMeeting();
      if(meetings.status == 200) {
        this.setState({bookState: 1});
        this.monthListActive(m);
        let meeting = meetings.data;
        this.setState({meeting_date: meeting.meeting_date, meeting_time: meeting.meeting_time});
      }
      setTimeout(() => {
        this.setState({showLoader: false, iLoader: false});
      }, 50);
    } catch (error) {
      this.setState({ bookState: 0, showLoader: false, iLoader: false});
    }
  }

  monthList = (i = -1) => {
    this.monthListActive(i > -1 ? i : this.state.activeM);
  }

  monthListActive = (act) => {

    act = act < 0 ? 0 : (act > 11 ? 11 : act);

    this.setState({month: act});
    setTimeout(() => {
      this.dayListActive();
    }, 100);

    let last = this.state.activeM;
    let ledge = this.state.lastEdge;
    let edge = act > 8 ? 8 : act;
    let range = true;

    if(last !== null) {
      edge = last > 8 ? 8 : last;
      if(act < ledge) {
        edge = ledge-1;
        range = false;
      } else if(act > ledge+3) {
        edge = ledge+1;
        range = false;
      } else {
        range = true;
        edge = ledge;
      }
    }

    this.setState({activeM: act, lastEdge: edge});

    if(!range || last === null) {
      $("#monthList li").attr("class", "hide");
      $("#monthList li:eq("+edge+"),#monthList li:eq("+(edge+1)+"),#monthList li:eq("+(edge+2)+"),#monthList li:eq("+(edge+3)+")").removeClass("hide");
      $("#monthList li:eq("+act+")").addClass("_active");
    } else {
      $("#monthList li._active").removeClass("_active");
      $("#monthList li:eq("+act+")").addClass("_active");
    }
  }

  dayListActive = () => {
    let year = this.state.thisYear;
    let month = this.state.activeM+1;
    let last_day = new Date(year, month, 0).toString();
    let ld = last_day.split(" ")[2];
    let ldn = last_day.split(" ")[0];
    this.populateDays(ld, ldn);
  }

  populateDays = (ld, ldn) => {
    let dow = ["su", "mo", "tu", "we", "th", "fr", "sa"];
        ldn = ldn.toLowerCase().substr(0, 2);

    let mod = 7 - dow.indexOf(ldn);
    let u   = dow.indexOf(ldn) > 0 ? dow.indexOf(ldn) - (ld%7) : dow.indexOf(ldn);
    let days = [];

    for (var i = ld, k = 0; i > 0; i--, k++) {
      let ldni = dow.indexOf(ldn) - k%7;
          ldni = ldni < 0 ? 7+(parseInt(ldni)%7) : ldni;
      days[k] = {"day": dow[ldni].charAt(0).toUpperCase(), "date": i, "key": i-1};
    }

    this.setState({days: days.reverse(), weekDay: 7, today: 1, maxDay: ld});
  }

  sevenLeft = () => {
    let wd = this.state.weekDay;
    let td = this.state.today - 1;
    if(td > 0) {
      if(td <= (wd-7)) {
        wd -= 1;
      }
      this.setState({weekDay: wd, today: td});
    }
  }

  sevenRight = (d = 0) => {
    let wd = this.state.weekDay;
    let td = this.state.today + 1;
    if(d > 0) {
      wd = d > this.state.weekDay ? d : this.state.weekDay;
      td = d;
      // console.log(this.state.weekDay > d ? d : d - this.state.weekDay);
    }
    if(td > wd) {
      wd += 1;
    }
    if(wd > this.state.maxDay || td > this.state.maxDay) {
      wd = td = this.state.maxDay;
    }
    this.setState({weekDay: wd, today: td});
  }

  sevenActive = (td) => {
    this.setState({today: td}); 
  }

  yearDown = () => {
    let dy = Number(this.state.thisYear) - 1;
    this.setState({thisYear: dy});
    this.monthList();
  }

  yearUp = () => {
    let dy = Number(this.state.thisYear) + 1;
    this.setState({thisYear: dy});
    this.monthList();
  }

  twentyFour = () => {
    let tme = [];
    for (var i = 1; i <= 24; i++) {
      let j = i > 12 ? i % 12 : i;
          j = j == 0 ? 12 : j;
      tme[i] = {"ihour": i, "hour": j, "time": (j < 10 ? "0" : "")+j+":00 "+(i > 12 ? "PM" : "AM"), am_pm: i > 12 ? "PM" : "AM"};
    }
    return tme;
  }

  setCurHour = (i, h, a) => {
    $("#timeList .d-time._active").removeClass("_active");
    this.setState({currentHour2: i, currentHour: h, am_pm: a});
  }

  scheduleCall = async () => {
    this.setState({ showLoader: true });
    let m = this.state.activeM+1;
    // m = m > 9 ? m : "0"+m;
    let t = this.state.today;
    // t = t > 9 ? t : "0"+t;
    let ampm = this.state.am_pm;
    let ch = this.state.currentHour;
    // ch = ch > 9 ? ch : "0"+ch;
    try {
      const req = await server.bookMeeting(this.state.thisYear, this.state.activeM+1, t, ch, 0, ampm);
      if(req.status == 201) {
        this.setState({ bookState: 1, showLoader: false, showBooked: true });
        this.setState({ meeting_date: req.data.meeting_date, meeting_time: req.data.meeting_time});
      } else {
        this.setState({ showLoader: false });
      }
    } catch (error) {
      this.setState({ showLoader: false });
      if (!error.response) {
        return error.message;
      }
    }
  }

  rescheduleCall = async () => {
    this.setState({ bookState: 0});
    let d = new Date();
    let m = d.getMonth();
    this.setState({thisYear: d.getFullYear()});
    this.monthList(m);
    this.monthListActive(m);
    setTimeout(() => {
      this.sevenRight(d.getDate());
    }, 100);
  }

  render() {
    return (
      <Container>
        <Spinner showSpinner={this.state.showLoader} />
        <Booked show={this.state.showBooked} cancel={(e) => this.setState({showBooked: false})} />
          <div className="col-12" id="book-container" style={this.state.bookState == 1 || this.state.iLoader ? {display: "none"} : {display: "flex"}}>
            <img src={book_call} />
            <h2 className="bcw">Book a call with a broker</h2>
            <div className="calendar-container">
              <img src={calendar_icon} className="calendar_icon" />
              <span className="brace-inp">
                <input type="number" className="inp-el" id="year-inp" Value={this.state.thisYear} onChange={(e) => {this.monthList(); this.setState({thisYear: e.target.value.trim()})}}/>

                <button onClick={() => this.yearUp()} className="clear inp-up">
                  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.28485 4L8 3.39332L4 -1.74846e-07L-1.48327e-07 3.39332L0.715152 4L4 1.21337L7.28485 4Z" fill="white"/>
                  </svg>
                </button>

                <button onClick={() => this.yearDown()} className="clear inp-down">
                  <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.715152 -4.68309e-07L4.04649e-08 0.606683L4 4L8 0.606684L7.28485 -3.89966e-07L4 2.78663L0.715152 -4.68309e-07Z" fill="white"/>
                  </svg>
                </button>
              </span>

              <ul className="month-list" id="monthList">
                
                <button onClick={() => this.monthListActive(this.state.activeM-1)} id="month-to-left" className="clear">
                  <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 0.983334L5.08997 8.89959e-07L-9.61651e-07 5.5L5.08997 11L6 10.0167L1.82005 5.5L6 0.983334Z" fill="#03CF9E"/>
                  </svg>
                </button>

                <button onClick={() => this.monthListActive(this.state.activeM+1)} id="month-to-right" className="clear">
                  <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-8.59657e-08 10.0167L0.910026 11L6 5.5L0.910025 4.4498e-07L-8.75685e-07 0.983334L4.17995 5.5L-8.59657e-08 10.0167Z" fill="#03CF9E"/>
                  </svg>
                </button>

                <li className="hide" onClick={(e) => this.monthListActive(0)} data-index="0">Jan</li>
                <li className="hide" onClick={(e) => this.monthListActive(1)} data-index="1">Feb</li>
                <li className="hide" onClick={(e) => this.monthListActive(2)} data-index="2">March</li>
                <li className="hide" onClick={(e) => this.monthListActive(3)} data-index="3">April</li>
                <li className="hide" onClick={(e) => this.monthListActive(4)} data-index="4">May</li>
                <li className="hide" onClick={(e) => this.monthListActive(5)} data-index="5">June</li>
                <li className="hide" onClick={(e) => this.monthListActive(6)} data-index="6">July</li>
                <li className="hide" onClick={(e) => this.monthListActive(7)} data-index="7">August</li>
                <li className="hide" onClick={(e) => this.monthListActive(8)} data-index="8">Sept</li>
                <li className="hide" onClick={(e) => this.monthListActive(9)} data-index="9">Oct</li>
                <li className="hide" onClick={(e) => this.monthListActive(10)} data-index="10">Nov</li>
                <li className="hide" onClick={(e) => this.monthListActive(11)} data-index="11">Dec</li>
              </ul>

              <ul className="day-list">
                <button onClick={() => this.sevenLeft()} id="day-to-left" className="clear">
                  <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1.96667L10.1799 1.77992e-06L-1.9233e-06 11L10.1799 22L12 20.0333L3.6401 11L12 1.96667Z" fill="#03CF9E"/>
                  </svg>
                </button>
                <button onClick={() => this.sevenRight()} id="day-to-right" className="clear">
                  <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.81743e-07 20.0333L1.82005 22L12 11L1.82005 -1.01739e-06L-7.97695e-07 1.96667L8.3599 11L7.81743e-07 20.0333Z" fill="#03CF9E"/>
                  </svg>
                </button>
                {
                  this.state.days.map(({key, day, date}) => (
                    <li onClick={() => this.sevenActive(date)} className={(date == this.state.today ? '_active' : '')+(key > this.state.weekDay-1 || key < (this.state.weekDay - 7) ? ' hide' : '')}><span className="d-name">{day}</span><span className="d-date">{date}</span></li>
                  ))
                }
              </ul>

              <div className="time-list-parent">
                <ul className="time-list" id="timeList">
                {
                  this.twentyFour().map(({ihour, hour, time, am_pm}) => (
                    <li><button className={"d-time"+(this.state.currentHour2 == ihour ? " _active" : "")} onClick={(e) => this.setCurHour(ihour, hour, am_pm)}>{time}</button></li>
                  ))
                }
                </ul>
              </div>
            </div>

            <button className="schedule-call" onClick={() => this.scheduleCall()}>SCHEDULE CALL</button>
          </div>
        { this.state.bookState == 1 ? (
          <div className="col-12" id="book-container">
            <img src={check_mark} />
            <img src={scheduled} style={{marginTop: "10px"}}/>
            <h2 className="bcw text-center">We will activate your account<br />after our call on:</h2>
            <div className="scheduled-date">
              <h4>{this.state.meeting_date}</h4>
              <h5>{this.state.email}</h5>
              <h6>{this.state.meeting_time}</h6>
            </div>
            <button className="schedule-call re" onClick={() => this.rescheduleCall()}>RE-SCHEDULE CALL</button>
          </div>
        ) : null}
      </Container>
    );
  }
};

export default BookCall;