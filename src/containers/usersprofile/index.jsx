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
import server from '../../services/server';
import app from '../../services/app';

import '../../components/standard/standard.scss';
import './index.scss';

class UsersProfileList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navi: 1,
      profile: null,
      showLoader: true,
      userTab: "Profile",
      uid: '',
      counter: 0
    }

  }

  async componentDidMount () {
    this.refreshTab(this.state.userTab);
  }

  refreshTab = async (t) => {
    this.setState({showLoader: true});
    let u = this.props.match.params.user_id;
    let profile = await server.getUser(u);
    let _p = profile.data.profile;
    _p.notes = [];
    _p.tasks = [];
    _p.todos.forEach((p, i) => {
      if(p.type > 0) {
        _p.tasks.push(p);
      } else {
        _p.notes.push(p);
      }
    });

    this.setState({profile: _p, uid: u, showLoader: false, userTab: t, counter: ++this.state.counter});
  }

  selectActiveTab = (e) => {
    let name = e.target.getAttribute("name");
    if(name.length) this.setState({userTab: name});
  }

  render() {
    const { navi, profile } = this.state;
    let lct = this.state.counter ? { position: "absolute",	right: "3em",	top: "0em" } : {marginTop: "20%"};
        lct.display = this.state.showLoader ? 'block' : 'none';

    return (
      <Container>
        <div className='loader-container' style={lct}>
          <div className='loader'></div>
        </div>
      {profile ? <UsersProfile profile={profile} /> : null}
      {profile ?
        <div className="col-12" id="users-container">
          <div className="users-section-right shared">
            <Breadcrumbs breads={"Home, Lists, Users, "+(this.state.userTab)} />
            {/*Meeting*/}
            <Ptab tabs="Profile, Accounts, Transaction History, Trading Activity, Files, Notes, Calls, Emails, Tasks" handleClick={this.selectActiveTab} active={this.state.userTab} />

            {this.state.userTab.toLowerCase() === "profile" && profile  ? <ProfileDetails active="1" profile={profile} uid={this.state.uid} refresh={() => this.refreshTab("Profile")} load={() => this.setState({showLoader: !this.state.showLoader})} />              : null}
            {this.state.userTab.toLowerCase() === "accounts"            ? <ProfileAccounts active="1" accounts={profile.accounts} uid={this.state.uid} refresh={() => this.refreshTab("Accounts")} load={() => this.setState({showLoader: !this.state.showLoader})} />   : null}
            {this.state.userTab.toLowerCase() === "transaction history" ? <ProfilePayments active="1" history={profile.history} uid={this.state.uid} refresh={() => this.refreshTab("Transaction History")} load={() => this.setState({showLoader: !this.state.showLoader})} />   : null}
            {this.state.userTab.toLowerCase() === "trading activity"    ? <TradingActivities active="1" trade={profile.trade} uid={this.state.uid} refresh={() => this.refreshTab("Trading Activity")} load={() => this.setState({showLoader: !this.state.showLoader})} /> : null}
            {this.state.userTab.toLowerCase() === "files"               ? <UserFiles active="1" files={profile.documents} uid={this.state.uid} refresh={() => this.refreshTab("Files")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "notes"               ? <UserNotes active="1" notes={profile.notes} uid={this.state.uid} refresh={() => this.refreshTab("Notes")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "calls"               ? <UserCalls active="1" calls={null} uid={this.state.uid} refresh={() => this.refreshTab("Calls")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "emails"              ? <UserEmails active="1" emails={null} uid={this.state.uid} refresh={() => this.refreshTab("Emails")} load={() => this.setState({showLoader: !this.state.showLoader})} />        : null}
            {this.state.userTab.toLowerCase() === "meeting"             ? <ProfileMeetings active="1" meetings={profile.meetings} uid={this.state.uid} refresh={() => this.refreshTab("Meeting")} load={() => this.setState({showLoader: !this.state.showLoader})} />   : null}
            {this.state.userTab.toLowerCase() === "tasks"               ? <UserTasks active="1" tasks={profile.tasks} uid={this.state.uid} refresh={() => this.refreshTab("Tasks")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}

          </div>
        </div> : null}
      </Container>
    );
  }
};

export default UsersProfileList;
