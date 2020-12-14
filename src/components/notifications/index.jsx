import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import userDp from '../../themes/images/dummydp.png';
import dbn from '../../themes/images/double-next.png';
import ppl from '../../themes/images/paper-plane.png';
import server from '../../services/server';
import app from '../../services/app';
import $ from 'jquery';

import "./index.scss";

class NotificationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      notifications: app.profile()["notifications"]
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

  render() {
    return (
      this.props.show ?
      <div className={"notification-dropdown"+(this.state.mobile ? ' mobile' : '')+(app.isAdmin() ? ' admin' : '')}>
        <div className="section2">
          <ul id="notificationList">
          {
            this.state.notifications.map(({notice, flag}) => (
              <li className={flag ? "" : "new"}>{notice}</li>
            ))
          }
          </ul>
        </div>
      </div> : null
    );
  };
}

export default NotificationBox;
