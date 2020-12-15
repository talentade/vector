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

  render() {
    return (
      this.props.show ?
      <div className={"notification-dropdown"+(this.state.mobile ? ' mobile' : '')+(app.isAdmin() ? ' admin' : '')}>
        <div className="nhead">
          <h6>Notifications</h6>
          <span className="clear_all">Clear all</span>
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
