import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
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
      filter: '',
      message: '',
      active: null,
      messages: [],
      chatList: [],
      rawChatList: [],
      showInfo: false
    };

    this.profile = app.profile();
    this.id = this.profile.user_id;
    this.refreshMessage = null;
  }

  chatList = async () => {
    let cl = await server.chatList();
    this.setState({chatList: cl.data, rawChatList: cl.data});
    if(cl.data.length) {
      this.changeActive(cl.data[0]);
    }
  }

  changeActive = (cl) => {
    this.setState({active: cl, messages: [], message: ''});
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
    this.refreshMessage = setInterval(() => {
      this.refreshMsg();
    }, 1000);
  }

  async componentWillUnmount () {
    this.isViewable = false;
    clearInterval(this.refreshMessage);
  }

  scrollDown = () => {
    setTimeout(() => {
      let elem = document.getElementById("messageList");
      elem.scrollTop = elem.scrollHeight - elem.clientHeight;
    }, 0);
  }

  refreshMsg = () => {
    if(window.WebSocketPlugged) {
      window.WebSocketPlug.send(JSON.stringify({
        "event": "GET_MESSAGES2",
        "payload": { admin: true, user: this.state.active.user_id, last_id: this.state.messages.length ? this.state.messages[this.state.messages.length - 1]["id"] : 0}
      }));
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

  readReciept = (uid = null) => {
    if(uid) {
      let chatList = this.state.rawChatList;
      let chl = [];
      chatList.map((ch, ck) => {
        let c = ch;
        c["unflag"] = ch.user_id == uid ? true : Boolean(this.state.chatList[ck].unflag);
        chl.push(c);
      });
      this.setState({chatList: chl});
    }
    if(window.WebSocketPlugged) {
      window.WebSocketPlug.send(JSON.stringify({
        "event": "READ_RECIEPT",
        "payload": { user: this.state.active.user_id, last_id: this.state.messages.length ? this.state.messages[this.state.messages.length - 1]["id"] : 0}
      }));
    }
  }

  socketInit = () => {
    window.fct = 0;
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        switch(message.event) {
          case "MESSAGES":
            if(payload.user == this.state.active.user_id && payload.messages.length) {
              this.setState({ messages: payload.messages });
              this.readReciept(this.state.active.user_id);
              this.scrollDown();
            }
          break;
          case "NEW_MESSAGE":
            if(payload.user == this.state.active.user_id && payload.messages.length) {
              this.setState({ messages: this.state.messages.concat(payload.messages) });
              this.readReciept(this.state.active.user_id);
              this.scrollDown();
            }
          break;
          case "NEW_CHAT":
            let chatList = this.state.chatList;
            payload.users.forEach((v, k) => {
              chatList.forEach((cl, ck) => {
                if(cl.user_id == v.user_id) {
                  chatList[ck] = v;
                }
              });
            });
            this.setState({chatList: chatList, rawChatList: chatList});
            this.readReciept(this.state.active.user_id);
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
    let clist = this.state.filter.length ? this.state.chatList.filter((c) => {
      return (
        c.first_name.toLowerCase().match(this.state.filter.toLowerCase()) ||
        c.last_name.toLowerCase().match(this.state.filter.toLowerCase()) ||
        (c.first_name + " " + c.last_name).toLowerCase().match(this.state.filter.toLowerCase()) ||
        (c.last_name + " " + c.first_name).toLowerCase().match(this.state.filter.toLowerCase())
      );
    }) : this.state.chatList;

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
                onChange={(e) => this.setState({filter: e.target.value})}
              />
              <img src={SearchIcon} alt='' />
            </div>

            <ul className="people">
            {
              clist.map((cl, ck) => (
                <li className={this.state.active && (cl.user_id == this.state.active.user_id) ? "active" : ""} key={Math.random()+" "+Math.random()} onClick={() => this.changeActive(cl)}>
                  <img src={cl.profile_image.length ? cl.profile_image : DummyImage} style={{borderRadius: "50%"}} />
                  <span className="online"></span>
                  <div className="p-info">
                    <h4>{cl.first_name+" "+cl.last_name}</h4>
                    <span style={{
                      fontWeight: cl.unflag || cl.flag > 0 ? 'normal' : 'bold',
                      color: cl.unflag || cl.flag > 0 ? 'inherit' : '#000'
                    }}>{cl.last_message.length > 35 ? cl.last_message.substr(0, 35)+"..." : cl.last_message}</span>
                    {cl.unflag || cl.flag > 0 ? null : <span className="gdot">*</span>}
                  {/* || cl.user_id == this.state.active.user_id*/}
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
                    <h4><Link className="txt-info" to={"/usersprofile/"+this.state.active.user_id}>{this.state.active.first_name+" "+this.state.active.last_name}</Link></h4>
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
