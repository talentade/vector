import React, { Component, createRef } from 'react';
import $ from 'jquery';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';

import UsersTable from '../users/a.jsx';
import Activity from '../usersprofile/admin-activity';
import Notes from '../usersprofile/admin-notes';
import Calls from '../usersprofile/admin-calls';
import Visits from '../usersprofile/admin-visits';
import Sales from '../usersprofile/admin-sales';

import UsersProfile from  './userprofile.jsx';

import Spinner from '../../components/spinner/index';
import server from '../../services/server';
import app from '../../services/app';

import '../../components/standard/standard.scss';
import './index.scss';

import { createChart } from 'lightweight-charts';

class AdminsProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navi: 1,
      profile: null,
      showLoader: true,
      userTab: "Assigned Users",
      uid: '',
      counter: 0
    }

    this.chartContainerRef = createRef();
  }

  async componentDidMount () {
    this.refreshTab(this.state.userTab);
  }

  graphBox = async () => {
    let w = $(this.chartContainerRef.current).innerWidth();
    const chart = createChart(this.chartContainerRef.current, { width: w, height: 300, localization: {
        priceFormatter: price =>
        // add $ sign before price

            '$' + price
        ,
    }});
    const areaSeries = chart.addAreaSeries({
      topColor: '#e58eb8',
      bottomColor: '#e7bdd1',
      lineColor: '#D80068',
      lineStyle: 0,
      lineWidth: 2,
      crosshairMarkerVisible: false,
      crosshairMarkerRadius: 3,
    });

    // set the data
    areaSeries.setData([
        { time: '2018-12-10', value: 32.51 },
        { time: '2018-12-20', value: 18.51 },
        { time: '2018-12-21', value: 32.51 },
        { time: '2018-12-23', value: 31.11 },
        { time: '2018-12-24', value: 27.02 },
        { time: '2018-12-25', value: 27.32 },
        { time: '2018-12-26', value: 25.17 },
        { time: '2018-12-27', value: 28.89 },
        { time: '2018-12-28', value: 25.46 },
        { time: '2018-12-29', value: 23.92 },
        { time: '2018-12-30', value: 22.68 },
        { time: '2018-12-31', value: 22.67 },
    ]);
    chart.timeScale().fitContent();
  }

  refreshTab = async (t) => {
    this.setState({showLoader: true});
    let u = this.props.match.params.user_id;
    let profile = await server.getAdmin(u);
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
    setTimeout(() => {
      this.graphBox();
    }, 150);
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
      <Spinner showSpinner={this.state.showLoader} />
        {/*<div className='loader-container' style={lct}>
          <div className='loader'></div>
        </div>*/}
      {profile ? <UsersProfile profile={profile} /> : null}
      {profile ?
        <div className="col-12" id="users-container">
          <div className="users-section-right shared">
            <Breadcrumbs breads={"Home, Lists, Users, "+(this.state.userTab)} />
            <Ptab tabs="Assigned Users, Activity, Sales, Tasks, Notes, Calls, Profiles Visited" handleClick={this.selectActiveTab} active={this.state.userTab} />

            <div className='chart admin-chart' style={{width: "100%", display: "flex"}} ref={this.chartContainerRef}></div>
            {this.state.userTab.toLowerCase() === "assigned users" && profile  ? <UsersTable profile={profile} uid={this.state.uid} refresh={() => this.refreshTab("Assigned Users")} load={() => this.setState({showLoader: !this.state.showLoader})} />              : null}
            {this.state.userTab.toLowerCase() === "activity"            ? <Activity active="1" tasks={profile.tasks} uid={this.state.uid} refresh={() => this.refreshTab("Activity")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "tasks"               ? <Activity active="1" tasks={profile.tasks} uid={this.state.uid} refresh={() => this.refreshTab("Tasks")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "notes"               ? <Notes active="1" notes={profile.notes} uid={this.state.uid} refresh={() => this.refreshTab("Notes")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "calls"               ? <Calls active="1" calls={null} uid={this.state.uid} refresh={() => this.refreshTab("Calls")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "sales"               ? <Sales active="1" calls={null} uid={this.state.uid} refresh={() => this.refreshTab("Sales")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
            {this.state.userTab.toLowerCase() === "profiles visited"    ? <Visits active="1" visits={null} uid={this.state.uid} refresh={() => this.refreshTab("Profiles Visited")} load={() => this.setState({showLoader: !this.state.showLoader})} />         : null}
          </div>
        </div> : null}
      </Container>
    );
  }
};

export default AdminsProfile;