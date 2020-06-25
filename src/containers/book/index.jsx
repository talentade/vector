import React, { Component } from 'react';
import Container from '../container/index';
import book_call from '../../themes/images/book-call.png';
import scheduled from '../../themes/images/scheduled.png';
import check_mark from '../../themes/images/check-mark.png';
import calendar_icon from '../../themes/images/calendar-icon.png';
import './index.scss';

class BookCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookState: 1,
    }
  }

  render() {
    return (
      <Container>
        { this.state.bookState == 0 ? (
          <div className="col-12" id="book-container">
            <img src={book_call} />
            <h2 className="bcw">Book a call with a broker</h2>
            <div className="calendar-container">
              <img src={calendar_icon} className="calendar_icon" />
              <span className="brace-inp">
                <input type="number" className="inp-el" id="year-inp" Value="2020" />
                <svg className="inp-up" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.28485 4L8 3.39332L4 -1.74846e-07L-1.48327e-07 3.39332L0.715152 4L4 1.21337L7.28485 4Z" fill="white"/>
                </svg>
                <svg className="inp-down" width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.715152 -4.68309e-07L4.04649e-08 0.606683L4 4L8 0.606684L7.28485 -3.89966e-07L4 2.78663L0.715152 -4.68309e-07Z" fill="white"/>
                </svg>
              </span>

              <ul className="month-list">
                <svg id="month-to-left" width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 0.983334L5.08997 8.89959e-07L-9.61651e-07 5.5L5.08997 11L6 10.0167L1.82005 5.5L6 0.983334Z" fill="#03CF9E"/>
                </svg>
                <svg id="month-to-right" width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-8.59657e-08 10.0167L0.910026 11L6 5.5L0.910025 4.4498e-07L-8.75685e-07 0.983334L4.17995 5.5L-8.59657e-08 10.0167Z" fill="#03CF9E"/>
                </svg>
                <li>March</li>
                <li className="_active">April</li>
                <li>May</li>
                <li>June</li>
              </ul>

              <ul className="day-list">
                <svg id="day-to-left" width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1.96667L10.1799 1.77992e-06L-1.9233e-06 11L10.1799 22L12 20.0333L3.6401 11L12 1.96667Z" fill="#03CF9E"/>
                </svg>
                <svg id="day-to-right" width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.81743e-07 20.0333L1.82005 22L12 11L1.82005 -1.01739e-06L-7.97695e-07 1.96667L8.3599 11L7.81743e-07 20.0333Z" fill="#03CF9E"/>
                </svg>
                <li className="_active"><span className="d-name">M</span><span className="d-date">14</span></li>
                <li><span className="d-name">T</span><span className="d-date">15</span></li>
                <li><span className="d-name">W</span><span className="d-date">16</span></li>
                <li><span className="d-name">T</span><span className="d-date">17</span></li>
                <li><span className="d-name">F</span><span className="d-date">18</span></li>
                <li><span className="d-name">S</span><span className="d-date">19</span></li>
                <li><span className="d-name">S</span><span className="d-date">20</span></li>
              </ul>

              <div className="time-list-parent">
                <ul className="time-list">
                  <li><button className="d-time">01:00</button></li>
                  <li><button className="d-time _active">02:00</button></li>
                  <li><button className="d-time">03:00</button></li>
                  <li><button className="d-time">04:00</button></li>
                  <li><button className="d-time">05:00</button></li>
                  <li><button className="d-time">06:00</button></li>
                  <li><button className="d-time">07:00</button></li>
                  <li><button className="d-time">08:00</button></li>
                </ul>
              </div>
            </div>
          </div>
        ) : null }
        { this.state.bookState == 1 ? (
          <div className="col-12" id="book-container">
            <img src={check_mark} />
            <img src={scheduled} style={{marginTop: "10px"}}/>
            <h2 className="bcw text-center">We will activate your account after our call on:</h2>
            <div className="scheduled-date">
              <h4>14th of April, 2019</h4>
              <h5>adeoyetalent@gmail.com</h5>
              <h6>19:00</h6>
            </div>
          </div>
        ) : null}
      </Container>
    );
  }
};

export default BookCall;