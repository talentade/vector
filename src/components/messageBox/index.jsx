import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import userDp from '../../themes/images/dummydp.png';
import dbn from '../../themes/images/double-next.png';
import ppl from '../../themes/images/paper-plane.png';
import server from '../../services/server';
import app from '../../services/app';
import $ from 'jquery';

import "./index.scss";

class MessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      loaded: false
    }
  }

  onShow = () => {
    setTimeout(() => {
      let element = document.getElementById("messageList");
      element.scrollTop = element.scrollHeight - element.clientHeight;
      this.setState({ loaded: true });
    }, 0);
  }

  async componentDidMount () {
    $(window).on("renewSocket", () => this.socketInit());
    if(window.WebSocketPlugged) {
      $(window).trigger("renewSocket");
    }

    if(window.innerWidth <= 670) {
      this.setState({ mobile: true });
    } else {
      this.setState({ mobile: false });
    }

    $(window).resize(() => {
      if(window.innerWidth <= 670) {
        this.setState({ mobile: true });
      } else {
        this.setState({ mobile: false });
      }
    });
  }

  socketInit = () => {
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      if(this.state.messages.length == 0) {
        window.WebSocketPlug.send(JSON.stringify({"event": "GET_MESSAGES", "payload": { user: app.id() }}));
      }
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        switch(message.event) {
          case "MESSAGES":
            if(payload.user == app.id() && payload.messages.length) {
              this.setState({ messages: payload.messages });
            }
            setTimeout(() => {
              let elem = document.getElementById("messageList");
              elem.scrollTop = elem.scrollHeight - elem.clientHeight;
            }, 0);
          break;
        }
      } catch (e) {
        return e;
      }
    });
  }

  newMessage = async () => {
    if(window.WebSocketPlugged) {
      let message = $("#messageInput").val().trim();
      if(message.length) {
        $("#messageInput").val("");
        window.WebSocketPlug.send(JSON.stringify({"event": "SEND_MESSAGE", "payload": {
          user:      app.id(),
          message:   message,
          time:      new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
        }}));
      }
    }
  }

  render() {
    if(this.props.show && !this.state.loaded && this.state.messages.length > 0) {
      this.onShow();
    }
    return (
      <div className={"message-dropdown"+(this.state.mobile ? ' mobile' : '')+(app.isAdmin() ? ' admin' : '')}>
        <div className="section1">
          <img src={userDp} className="udp" />
          {/*<img src={userDp} className="udp" />
          <img src={userDp} className="udp" />
          <img src={userDp} className="udp" />
          <img src={userDp} className="udp" />
          <img src={dbn} className="dbn" />*/}
        </div>
        <div className="section2">
          <ul id="messageList">
            {this.state.messages.length > 0 ? this.state.messages.map((msg) => (
              <li className={msg.aid.trim().length ? "y-msg" : "m-msg"}>
                {msg.aid.trim().length ? null : <small className="m-time">{app.cleanTime(msg.create_time)}</small>}
                <div className="m-text">
                  {msg.message}
                </div>
                {msg.aid.trim().length ? <small className="m-time">{app.cleanTime(msg.create_time)}</small> : null}
              </li>
            )) : (null)}
          </ul>
        </div>
        <div className="section3">
          <input type="text" spellcheck="false" id="messageInput" onKeyUp={(e) => { if(e.which == 13) this.newMessage(); }}/>
          <button className="send" onClick={this.newMessage}><img src={ppl} /></button>
        </div>
      </div>
    );
  };
}

export default MessageBox;
