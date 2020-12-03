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
      active: app.profile(),
      messages: app.messages(),
    }

    window.fct          = 0;
    window.lid          = 0;
    window.scrollChat   = false;
    this.refreshMessage = null;
  }

  onShow = () => {
    let element = document.getElementById("messageList");
    element.scrollTop = element.scrollHeight - element.clientHeight;
    window.scrollChat = true;
  }

  async componentDidMount () {
    window.mct = false;
    $(window).on("renewSocket", () => this.socketInit());
    if(window.WebSocketPlugged) {
      $(window).trigger("renewSocket");
    }

    this.scrollDown();

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

    this.refreshMessage = setInterval(() => {
      this.refreshMsg();
    }, 1000);
  }

  scrollDown = () => {
    setTimeout(() => {
      let elem = document.getElementById("messageList");
      elem.scrollTop = elem.scrollHeight - elem.clientHeight;
    }, 0);
  }

  refreshMsg = () => {
    if(window.WebSocketPlugged) {
      try {
        window.WebSocketPlug.send(JSON.stringify({
          "event": "GET_MESSAGES2",
          "payload": {
            admin:   false,
            user:    app.id(),
            account: app.account(),
            flag:    this.props.show,
            last_id: this.state.messages.length ? this.state.messages[this.state.messages.length - 1]["id"] : 0
          }
        }));
      } catch(e) {
        throw e;
      }
    }
  }

  refreshFlag = (uid) => {
    if(window.WebSocketPlugged) {
      window.WebSocketPlug.send(JSON.stringify({
        "event": "SET_FLAG",
        "payload": { user: uid }
      }));
    }
  }

  async componentWillUnmount () {
    window.mct = false;
    this.isViewable = false;
    clearInterval(this.refreshMessage);
  }

  readReciept = (uid = null) => {
    if(window.WebSocketPlugged) {
      window.WebSocketPlug.send(JSON.stringify({
        "event": "READ_RECIEPT_2",
        "payload": { user: this.state.active.user_id, last_id: this.state.messages.length ? this.state.messages[this.state.messages.length - 1]["id"] : 0}
      }));
    }
  }

  newMessage = async () => {
    if(window.WebSocketPlugged) {
      let message = $("#messageInput").val().trim();
      if(message.length) {
        $("#messageInput").val("");
        window.WebSocketPlug.send(JSON.stringify({"event": "SEND_MESSAGE", "payload": {
          user:      this.state.active.user_id,
          message:   message,
          time:      new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
        }}));
      }
    }
  }

  socketInit = () => {
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        switch(message.event) {
          // case "MESSAGES":
          //   if(payload.user == this.state.active.user_id && payload.messages.length) {
          //     this.setState({ messages: payload.messages });
          //     this.readReciept(this.state.active.user_id);
          //     this.scrollDown();
          //   }
          // break;
          case "NEW_MESSAGE":
            if(payload.user == this.state.active.user_id && payload.flag > 0) {
                if(!this.props.show && window.fct != payload.flag && payload.last_id > window.lid) {
                  this.props.ring(payload.flag);
                  window.fct = payload.flag;
                  window.lid = payload.last_id;
                }
            }
            if(payload.user == this.state.active.user_id && payload.messages.length) {
              let new_msgs = [];
              payload.messages.forEach((m, k) => {
                if(!$("#msg-list-"+this.state.active.id+"-"+m.id).length) {
                  new_msgs.push(m);
                }
              });
              if(new_msgs.length) {
                window.scrollChat = false;
                this.setState({ messages: this.state.messages.concat(new_msgs) });
                this.scrollDown();
              }
            }
          break;
        }
      } catch (e) {
        return e;
      }
    });
  }

  render() {
    if(this.props.show && !window.scrollChat && this.state.messages.length > 0) {
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
              <li className={msg.sid.trim() == app.userid() ? "m-msg" : "y-msg"} id={"msg-list-"+this.state.active.id+"-"+msg.id}>
                {msg.sid.trim() != app.userid() ? null : <small className="m-time">{app.cleanTime(msg.create_time)}</small>}
                <div className="m-text">
                  {msg.message}
                </div>
                {msg.sid.trim() != app.userid() ? <small className="m-time">{app.cleanTime(msg.create_time)}</small> : null}
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
