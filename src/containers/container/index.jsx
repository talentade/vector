import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import OutterTopNav from '../../components/outterTopNav/index';
import OutterLeftNav from '../../components/outterLeft/index';
import { toggleSideNav, toggleOutterNav, toggleTransactionNav } from '../../redux/actions/index';
import { saveUserProfile } from '../../redux/actions/index';
import server from '../../services/server';
import socketPlug from '../../services/emit';
import app from '../../services/app';
import $ from 'jquery';
import './index.scss';

let dpage = window.location.pathname.replace("/", "").toLowerCase();
let isOnApp = ["book", "trade", "accounts", "profile", "forgotPassword", "changePassword", "market", "news", "transactions"].indexOf(dpage) > -1;
if(isOnApp && !app.isAdmin()) {
  (async () => {
    if(app.loggedIn()) {
      setTimeout(() => { $("#_sphs_").remove(); }, 100);
      const gp = await server.getProfile();
      app.profile(gp.data.profile);
    } else {
      window.location.href = "/login";
      process.exit(0);
    }
  })();
} else {
  $("#_sphs_").remove();
}

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badge: 0,
      selectedAccount: app.accountDetail(),
    };

    this.profile   = app.profile();
    this.id        = app.id();
    this.isAdmin   = app.isAdmin();
    this.audio = new Audio(require("../../themes/sounds/new.ogg").default);
    this.notify = new Audio(require("../../themes/sounds/note.ogg").default);
  }

  componentDidMount() {
    socketPlug();
    this.props.saveUserProfile(this.profile);
    let dis = this;

    if(this.isAdmin) {
      if(dpage != "chats") {

        this.gmc();
        
        setInterval(() => { this.gmc(); }, 1000);

        window.WebSocketPlug.addEventListener('message', ({data}) => {
          try {
            let message = JSON.parse(`${data}`);
            let payload = message.payload;
            switch(message.event) {
              case "ADMIN_UNREAD":
                if(payload.count > 0) {
                  if(payload.count != this.state.badge) {
                    // $(this.audio)[0].play();
                  }
                  this.setState({badge: payload.count});
                }
              break;
            }
          } catch (e) {
            return e;
          }
        });
      } else {
        window.WebSocketPlug.addEventListener('message', ({data}) => {
          try {
            let message = JSON.parse(`${data}`);
            let payload = message.payload;
            switch(message.event) {
              case "NEW_CHAT":
                if(payload.badge > 0) {
                  this.setState({badge: payload.badge});
                }
              break;
            }
          } catch (e) {
            return e;
          }
        });
      }


      $(".maxrow").change(function () {
        app.setMaxrow($(this).val());
        if(window.NO_AUTO_PAGER) {
          $(window).trigger("resetPager");
        } else {
          window.location.reload();
        }
      });
      
      if(!window.__toggleOutterNav) {
        this.props.toggleOutterNav();
        window.__toggleOutterNav = true;
      }
      $("html").attr("style", 'min-width: 1400px; overflow: auto !important; background: #004044;');
    }
  }

  gmc = () => {
    if(window.WebSocketPlugged) {
      window.WebSocketPlug.send(JSON.stringify({
        "event": "ADMIN_UNREAD",
        "payload": {
          admin: true
        }
      }));
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
          badge={this.state.badge}
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
