import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect  } from 'react-router-dom';
import OutterTopNav from '../../components/outterTopNav/index';
import './index.scss';
import OutterLeftNav from '../../components/outterLeft/index';
import { toggleSideNav, toggleOutterNav, toggleTransactionNav } from '../../redux/actions/index';
import { saveUserProfile } from '../../redux/actions/index';
import server from '../../services/server';

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: '',
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.id = localStorage.getItem('id');
  }

  componentDidMount() {
    this.props.saveUserProfile(this.profile);
  }

  logout = async () => {
    try {
      const user_id = localStorage.getItem('id');
      const email = this.profile.email;
      localStorage.clear();

      this.props.history.push('/Login');

      await server.logout(user_id, email);
    } catch (error) {
      
    }
  }

  render() {
    const userId = localStorage.getItem('id');

    if (!userId) return <Redirect to="/Login" />
  
    const { first_name, last_name, profile_image } = this.props.userProfile;

    const selectedAccount = localStorage.getItem('accountType');

    const { demo, live } = this.profile;

    let balance;
    let id;

    if (selectedAccount.toLowerCase().match('demo')) {
      if (demo) {
        balance = demo.demo_balance;
        id = demo.demo_account_id;
      }
    } else if (selectedAccount.toLowerCase().match('live')) {
      if (live) {
        balance = live.live_balance;
        id = live.live_account_id;
      }
    }

    let isAdmin = !!(localStorage.getItem("avad") || 1);

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
            email={localStorage.getItem('email')}
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
