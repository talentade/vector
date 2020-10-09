import React, { Component } from 'react';
import $ from 'jquery';
import Container from '../container/index';
import Spinner from '../../components/spinner/index';
import SearchIcon from '../../themes/images/micro.svg';
import Send from '../../themes/images/send.png';
import person1 from '../../themes/images/person1.png';
import ppl from '../../themes/images/paper-plane.png';
import CancelIcon from '../../themes/images/cancel.svg';
import DummyImage from '../../themes/images/tradeDashboard/t_nav3.png';
import server from '../../services/server';
import app from '../../services/app';
import './index.scss';

class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      active: null,
      messages: [],
      chatList: [],
      showInfo: false
    };

    this.profile = app.profile();
    this.id = this.profile.user_id;
    this.refreshMessage = null;
  }

  chatList = async () => {
    let cl = await server.chatList();
    this.setState({chatList: cl.data});
    if(cl.data.length) {
      this.setState({active: cl.data[0]});
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
    await this.chatList();
    $(window).on("renewSocket", () => this.socketInit());
    if(window.WebSocketPlugged) {
      $(window).trigger("renewSocket");
    }
  }

  async componentWillUnmount () {
    this.isViewable = false;
    clearInterval(this.refreshMessage);
  }

  socketInit = () => {
    window.fct = 0;
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      if(this.state.messages.length == 0) {
        window.WebSocketPlug.send(JSON.stringify({"event": "GET_MESSAGES", "payload": { user: this.state.active.user_id }}));
      }

      this.refreshMessage = setInterval(() => {
        ++window.fct;
        if(window.WebSocketPlugged) {
          console.log("Will fetch oo "+window.fct);
          window.WebSocketPlug.send(JSON.stringify({"event": "GET_MESSAGES", "payload": { user: this.state.active.user_id }}));
        }
      }, 10000);

      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        switch(message.event) {
          case "MESSAGES":
            if(payload.user == this.state.active.user_id && payload.messages.length) {
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
          user:      this.state.active.user_id,
          message:   message,
          aid:       app.userid(),
          sid:       app.userid(),
          time:      new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
        }}));
      }
    }
  }

  render() {
    return (
      <Container>
        <Spinner showSpinner={this.showSpinner} />
        <div className='chat-section'>
          <div className="c-list">

            <div className='c-search'>
              <input
                type='text'
                name='search'
                placeholder='Search'
              />
              <img src={SearchIcon} alt='' />
            </div>

            <ul className="people">
            {
              this.state.chatList.map((cl, ck) => (
                <li className={ck == 0 ? "active" : ""} key={Math.random()+" "+Math.random()}>
                  <img src={cl.profile_image.length ? cl.profile_image : DummyImage} style={{borderRadius: "50%"}} />
                  <span className="online"></span>
                  <div className="p-info">
                    <h4>{cl.first_name+" "+cl.last_name}</h4>
                    <span>{cl.last_message.length > 35 ? cl.last_message.substr(0, 35)+"..." : cl.last_message}</span>
                  </div>
                </li>
              ))
            }
            </ul>
          </div>
          <div className='c-main'>

            {
              this.state.active ? (
                <div className="section1">
                  <img src={this.state.active.profile_image.length ? this.state.active.profile_image : DummyImage} style={{borderRadius: "50%"}} />
                  <div className="p2-info">
                    <h4>{this.state.active.first_name+" "+this.state.active.last_name}</h4>
                    <span>Online</span>
                  </div>
                </div>
              ) : null
            }

            <div className="section2">

              <ul id="messageList">
                {this.state.messages.length > 0 ? this.state.messages.map((msg) => (
                  <li className={msg.sid.trim() == app.userid() ? "m-msg" : "y-msg"}>
                    {msg.sid.trim() == app.userid() ? <small className="m-time">{app.cleanTime(msg.create_time)}</small> : null}
                    <div className="m-text">
                      {msg.message}
                    </div>
                    {msg.sid.trim() == app.userid() ? null : <small className="m-time">{app.cleanTime(msg.create_time)}</small>}
                  </li>
                )) : (null)}
              </ul>

            </div>
            <div className="section3">
              <div className="s3">
                <textarea type="text" spellcheck="false" id="messageInput" onKeyUp={(e) => { if(e.which == 13) this.newMessage(); }}></textarea>
                <button className="send" onClick={this.newMessage}><img src={Send} /></button>
              </div>
            </div>

          </div>
        </div>
      </Container>
    );
  }
}

export default Chats;
