import React, { Component } from 'react';
import axios from 'axios';
import Container from '../container/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import RestrictionNav from '../../components/restrictionNav/index';
import Spinner from '../../components/spinner/index';
import CancelIcon from '../../themes/images/cancel.svg';
import country from 'country-list-js';
import permissions from '../../utils/permissions';
import server from '../../services/server';
import app from '../../services/app';
import './index.scss';

class Restrictions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "support specialist",
      _selectedTab: "Support Specialist",
      country_names: [],
      showRestrictions: false,
    };

    this.showSpinner = false;
    this.profile = app.profile();
    this.id = this.profile.user_id;
  }

  async componentDidMount() {
    var country = require('country-list-js');
    var country_names = country.names();
    this.setState({country_names: country_names.sort()});
  }

  toggleTabs = (e) => {
    this._toggleTabs(e.currentTarget.querySelector('div').innerHTML.trim());
  };

  createAdmin = () => {
    this.setState({showRestrictions: false});
  }

  _toggleTabs = (tab) => {
    this.setState({
      selectedTab: tab.toLowerCase(),
      _selectedTab: tab
    });
  }

  render() {
    let no = parseInt(permissions.length / 2);
    let p1 = permissions.slice(0, no);
    let p2 = permissions.slice(no);

    return (
      <Container>
        <div className='restrictions-section'>
          <Spinner showSpinner={this.showSpinner} />
          <Breadcrumbs breads={"Home, Create Admins, "+(this.state._selectedTab)} />
          <RestrictionNav selectedTab={this.state.selectedTab} handleClick={this.toggleTabs} />

          <div className="half-screen">
            <div className="header">
              <h1>Restrictions</h1>
              <img src={CancelIcon} className="cancelIcon" onClick={() => this.setState({showRestrictions: false})} />
            </div>
            <div className="main">
              <div className="overscroll">
                <h3>Users</h3>
                <ul className="p-list">
                {
                  p1.map((p) => (
                    <li key={Math.random()+' '+Math.random()}>
                      <span className="permission">{p}</span>
                      <span className="toggle">
                        <label className="switch"><input type="checkbox" /><span className="slider round"></span></label>
                      </span>
                    </li>
                  ))
                }
                </ul>

                <ul className="p-list two">
                {
                  p2.map((p) => (
                    <li key={Math.random()+' '+Math.random()}>
                      <span className="permission">{p}</span>
                      <span className="toggle">
                        <label className="switch"><input type="checkbox" /><span className="slider round"></span></label>
                      </span>
                    </li>
                  ))
                }
                </ul>
                </div>
                <div className='deposit-flex' style={{marginBottom: "0", marginTop: "10px"}}>
                  <input type='button' value='DONE' className='restriction-submit-btn' style={{width: "100px", outline: "none"}} onClick={() => this.createAdmin()} />
                </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Restrictions;
