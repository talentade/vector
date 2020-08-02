import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import userDp from '../../themes/images/dummydp.png';
import dbn from '../../themes/images/double-next.png';
import ppl from '../../themes/images/paper-plane.png';
import server from '../../services/server';
import app from '../../services/app';

import "./index.scss";

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }
  }

  async componentDidMount () {
    try {
      let { data : { data }} = await server.getMessages();
      console.log(data.messages);
      this.setState({ messages : data.messages });
    } catch (e) {
      return e;
    }
  }

  newMessageThread = async () => {
    let req;
    let m = this.state.message.trim();
    if(m.length) {
      req = await server.newMessageThread(m);
    }
  }

  render() {
    return (
      <div className={"message-dropdown"+(app.isAdmin() ? ' admin' : '')}>
        <div className="section1">
          <img src={userDp} className="udp" />
          {/*<img src={userDp} className="udp" />
          <img src={userDp} className="udp" />
          <img src={userDp} className="udp" />
          <img src={userDp} className="udp" />
          <img src={dbn} className="dbn" />*/}
        </div>
        <div className="section2">
          <ul>
            {/*<li className="y-msg">
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
            </li>*/}
          </ul>
        </div>
        <div className="section3">
          <input type="text" spellcheck="false" onKeyUp={(e) => this.setState({message: e.target.value})}/> <button className="send" onClick={() => this.newMessageThread()}><img src={ppl} /></button>
        </div>
      </div>
    );
  };
}

export default MessageBox;
