import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import OutterTopNav from '../../components/outterTopNav/index';
import './index.scss';
import OutterLeftNav from '../../components/outterLeft/index';
import { toggleSideNav, toggleOutterNav, toggleTransactionNav } from '../../redux/actions/index';
import { saveUserProfile } from '../../redux/actions/index';
import server from '../../services/server';
import app from '../../services/app';
import $ from 'jquery';

const socketListener = () => {
  window.WebSocketPlug = window.WebSocketPlugged ? window.WebSocketPlug : new WebSocket(app.hostURL("socket", 1));
  window.WebSocketPlug.addEventListener('open', () => {
    window.WebSocketPlugged = true;
    $(window).trigger("renewSocket");
  });
  window.WebSocketPlug.onclose = (e) => {
    window.WebSocketPlugged = false;
    setTimeout(() => {
      socketListener();
    }, 1000);
  }
}

socketListener();

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: app.accountDetail(),
    };

    this.profile   = app.profile();
    this.id        = app.id();
    this.isAdmin   = app.isAdmin();
  }

  componentDidMount() {
    this.props.saveUserProfile(this.profile);
    if(this.isAdmin) {
      if(!window.__toggleOutterNav) {
        this.props.toggleOutterNav();
        window.__toggleOutterNav = true;
      }
      $("body").attr("style", 'min-width: 1400px;');
      $("html").attr("style", 'background: #004044');
    }
  }

  logout = async () => {
    try {
      localStorage.clear();
      this.props.history.push('/Login');
    } catch (error) {
      
    }
  }

  render() {
    const userId = app.id();
    if (!(userId || false)) return <Redirect to="/Login" />
    const { first_name, last_name, profile_image } = this.props.userProfile;
    const selectedAccount = app.accountDetail();
    let balance = selectedAccount.balance;
    let id = selectedAccount.account_id;

    let isAdmin = this.isAdmin;

    return (
      <div className='dash-container'>
        <OutterLeftNav
          isAdmin={isAdmin}
          handleNavClick={this.props.toggleSideNav}
          handleOutterClick={this.props.toggleOutterNav}
          handleTransactionNavClick={this.props.toggleTransactionNav}
        />
        <div className={`right ${this.props.outterNav ? 'smaller-right' : ''}`}>
          <OutterTopNav
            isAdmin={isAdmin}
            profileImage={profile_image}
            email={app.email()}
            firstName={first_name}
            lastName={last_name}
            balance={balance}
            handleLogout={this.logout}
          />
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ outterNav, userProfile }) => ({
  outterNav,
  userProfile,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSideNav: () => dispatch(toggleSideNav()),
  toggleOutterNav: () => dispatch(toggleOutterNav()),
  saveUserProfile: (profile) => dispatch(saveUserProfile(profile)),
  toggleTransactionNav: () => dispatch(toggleTransactionNav()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));
