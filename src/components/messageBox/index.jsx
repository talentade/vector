import React from "react";
import { NavLink } from 'react-router-dom';
import userDp from '../../themes/images/dummydp.png';
import dbn from '../../themes/images/double-next.png';
import ppl from '../../themes/images/paper-plane.png';
import "./index.scss";

const MessageBox = ({ name, email, balance }) => {
  return (
    <div className="message-dropdown">
      <div className="section1">
        <img src={userDp} className="udp" />
        <img src={userDp} className="udp" />
        <img src={userDp} className="udp" />
        <img src={userDp} className="udp" />
        <img src={userDp} className="udp" />
        <img src={dbn} className="dbn" />
      </div>
      <div className="section2">
        <ul>
          <li className="y-msg">
            <div className="m-text">
              Hey, what’s up...
            </div><small className="m-time">9:30am</small>
          </li>
          <li className="m-msg">
            <small className="m-time">9:30am</small><div className="m-text">
              I’m doing great, you?
            </div>
          </li>
          <li className="y-msg">
            <div className="m-text">
              Hey, what’s up...
            </div><small className="m-time">9:30am</small>
          </li>
          <li className="m-msg">
            <small className="m-time">9:30am</small><div className="m-text">
              I’m doing great, you?
            </div>
          </li>
        </ul>
      </div>
      <div className="section3">
        <input type="text" spellcheck="false" /> <button className="send"><img src={ppl} /></button>
      </div>
    </div>
  );
};

export default MessageBox;
