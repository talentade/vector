import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';

import ProfileDetails from './profiledetails.jsx';
import ProfileAccounts from './profileaccounts.jsx';
import ProfilePayments from './profilepayments.jsx';
import TradingActivities from './tradingactivities.jsx';
import UserFiles from './userfiles.jsx';
import UserNotes from './usernotes.jsx';
import ProfileMeetings from './profilemeetings.jsx';
import UserTasks from './usertasks.jsx';
import UserCalls from './usercalls.jsx';
import UserEmails from './useremails.jsx';

import UsersProfile from  './userprofile.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class UsersProfileList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navi: 1,
      userTab: "Profile"
    }

  }

  selectActiveTab = (e) => {
    let name = e.target.getAttribute("name");
    if(name.length) this.setState({userTab: name});
  }

  render() {
    const { navi } = this.state;
    return (
      <Container>
      <UsersProfile />
      <div className="col-12" id="users-container">
        <div className="users-section-right shared">
          <Breadcrumbs breads={"Home, Lists, Users, "+(this.state.userTab)} />
          <Ptab tabs="Profile, Accounts, Payments, Trading Activity, Files, Notes, Calls, Emails, Tasks, Meeting" handleClick={this.selectActiveTab} active={this.state.userTab} />

          {this.state.userTab.toLowerCase() === "profile"             ? <ProfileDetails active="1" />    : null}
          {this.state.userTab.toLowerCase() === "accounts"            ? <ProfileAccounts active="1" />   : null}
          {this.state.userTab.toLowerCase() === "payments"            ? <ProfilePayments active="1" />   : null}
          {this.state.userTab.toLowerCase() === "trading activity"    ? <TradingActivities active="1" /> : null}
          {this.state.userTab.toLowerCase() === "files"               ? <UserFiles active="1" />         : null}
          {this.state.userTab.toLowerCase() === "notes"               ? <UserNotes active="1" />         : null}
          {this.state.userTab.toLowerCase() === "calls"               ? <UserCalls active="1" />         : null}
          {this.state.userTab.toLowerCase() === "emails"              ? <UserEmails active="1" />        : null}
          {this.state.userTab.toLowerCase() === "meeting"             ? <ProfileMeetings active="1" />   : null}
          {this.state.userTab.toLowerCase() === "tasks"               ? <UserTasks active="1" />         : null}

        </div>
        </div>
      </Container>
    );
  }
};

export default UsersProfileList;
