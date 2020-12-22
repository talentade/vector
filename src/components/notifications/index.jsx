import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import userDp from '../../themes/images/dummydp.png';
import dbn from '../../themes/images/double-next.png';
import ppl from '../../themes/images/paper-plane.png';
import server from '../../services/server';
import app from '../../services/app';
import moment from 'moment';
import $ from 'jquery';

import "./index.scss";

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      notifications: app.profile()["notifications"] || []
    }

    window.nread = 0;
    window.newNotice = false;
    let len = (app.profile()["notifications"] || []).length;
    window.lastnid = len ? app.profile()["notifications"][0]["id"] : 0;
    if(len) {
      if(app.profile()["notifications"][0]["flag"] == 0) {
        this.props.ring(1);
        window.newNotice = true;
      }
    }
    this.refreshNotice = null;
  }

  async componentDidMount () {
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

    $(window).on("renewSocket", () => this.socketInit());
    if(window.WebSocketPlugged) {
      $(window).trigger("renewSocket");
    }
  }

  socketInit = () => {
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        switch(message.event) {
          case "NEW_NOTIFICATION":
            if(payload.user == app.id() && payload.lastnid > window.lastnid) {
              // alert(payload.lastnid +" > "+ window.lastnid+" === "+payload.notifications.length);
              window.lastnid = payload.lastnid;
              window.newNotice = true;
              this.props.ring(payload.notifications.length);
              this.setState({ notifications: payload.notifications.concat(this.state.notifications) });
            }
          break;
          case "NEW_CLEAR":
            if(payload.user == app.id()) {
              this.refP();
              window.nread = 0;
              window.newNotice = false;
              this.setState({ notifications: [] });
            }
          break;
        }
      } catch (e) {
        return e;
      }
    });
  }

  gotoN = (g) => {
    if(g.length) {
      g = g.split("/");
      if(g.length > 1) {
        localStorage.setItem(g[0].toLowerCase() == "transactions" ? "TSelected" : "RSelected", g[1]);
      }
      window.location.href = g[0];
    }
  }

  refP = async () => {
    const gp = await server.getProfile();
    app.profile(gp.data.profile);
  }

  render() {
    window.nread = this.props.show;
    if(window.nread && window.newNotice) {
      window.newNotice = false;
      this.refP();
    }
    return (
      this.props.show ?
      <div className={"notification-dropdown"+(this.state.mobile ? ' mobile' : '')+(app.isAdmin() ? ' admin' : '')}>
        <div className="nhead">
          <h6>Notifications</h6>
          <span className="clear_all" onClick={() => {window.nclear = true;}}>Clear all</span>
        </div>
        <div className="section2">
          <ul id="notificationList">
          {
            this.state.notifications.map((n) => (
              <li className={n.flag ? "" : "new"} onClick={() => this.gotoN(n.goto)} style={n.goto.length ? {cursor: "ponter"} : null}>
                {n.notice}
                <span>{moment(n.create_time).calendar()}</span>
              </li>
            ))
          }
          {this.state.notifications.length ? null : <li>No new notification</li>}
          </ul>
        </div>
      </div> : null
    );
  };
}

export default NotificationBox;
