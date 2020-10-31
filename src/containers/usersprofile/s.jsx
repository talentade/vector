import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import userDp from '../../themes/images/dummydp.png';
import TableFilters from '../../components/tablefilters/index';
import calls from "./calls.svg";
import view from "./view.svg";
import ProfileDetails from './profiledetails.jsx';
import ProfileAccounts from './profileaccounts.jsx';
import ProfilePayments from './profilepayments.jsx';
import TradingActivities from './tradingactivities.jsx';
import UserFiles from './userfiles.jsx';
import All from './all.jsx';
import ProfileMeetings from './profilemeetings.jsx';
import UserTasks from './usertasks.jsx';
import UserCalls from './usercalls.jsx';
import UserEmails from './useremails.jsx';
import UsersProfile from  './userprofile.jsx';

import AddMail from './addmail.jsx';
import AddNote from  './addnote.jsx';
import AddTask from  './addtask.jsx';

import server from '../../services/server';
import app from '../../services/app';

import '../../components/standard/standard.scss';
import './index.scss';
import './s.scss';

class UsersProfileList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      navi: 1,
      profile: null,
      showLoader: true,
      userTab: "All",
      counter: 0
    }

  }

  async componentDidMount () {
    this.refreshTab(this.state.userTab);
  }

  refreshTab = async (t) => {
    this.setState({showLoader: true});
    let u = this.props.user_id;
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
      <>
        <div className='loader-container' style={lct}>
          <div className='loader'></div>
        </div>
      {profile ?
        <div className="col-12" id="users-container">
          <div className="users-section-top">
            <img src={profile.profile_image.length ? profile.profile_image : userDp} className="udp" />
            <div className="uinfo">
              <h5>{profile.first_name+" "+profile.last_name}&nbsp;&nbsp;<img src={calls} /></h5>
              <span className="info">{profile.email}<span className="dot">&nbsp;</span>{profile.phone_number}</span>
              <span className="info">Total Balance: ${profile.balance}<span className="dot">&nbsp;</span>Total Credit: ${profile.credit}</span>
              <span className="info">Country: {profile.country}<span className="dot">&nbsp;</span>Sales Funnel: Deposit</span>
            </div>
          </div>
          <div className="users-section-right shared">
            <Ptab tabs="All, Add Note, Send Email, Add Task" handleClick={this.selectActiveTab} active={this.state.userTab} />

            {this.state.userTab.toLowerCase() === "all"                 ? <All active="1" notes={profile.notes} uid={this.state.uid} refresh={() => this.refreshTab("Notes")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "tasks"               ? <UserTasks active="1" tasks={profile.tasks} uid={this.state.uid} refresh={() => this.refreshTab("Tasks")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "send email"          ? <AddMail active="1" profile={profile} uid={this.state.uid} refresh={() => this.refreshTab("Tasks")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "add note"            ? <AddNote active="1" tasks={profile.tasks} uid={this.state.uid} refresh={() => this.refreshTab("Add Task")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "add task"            ? <AddTask active="1" tasks={profile.tasks} uid={this.state.uid} refresh={() => this.refreshTab("Add Task")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}

          </div>
        </div> : null}
      </>
    );
  }
};

export default UsersProfileList;
