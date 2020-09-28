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

          {this.state.showRestrictions ?
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
          : null}

          <div className='restriction-box'>
            <div className='deposit'>
              <form className='restriction-action' autoComplete="new-password">

                <div className='deposit-flex'>
                  <div className='deposit-flex-item-1'>
                    <label>Firstname</label>
                    <div className='bal-sym'>
                      <input type='text' name='first_name' autoComplete="new-password" Value=""/>
                    </div>
                  </div>


                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Lastname</label>
                    <div className='bal-sym'>
                      <input type='text' name='last_name' autoComplete="new-password" Value=""/>
                    </div>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Email</label>
                    <div className='bal-sym'>
                      <input type='email' name='cs_email' autoComplete="new-password" Value=""/>
                    </div>
                  </div>
                </div>

                <div className='deposit-flex'>
                  <div className='deposit-flex-item-1'>
                    <label>Phone Number</label>
                    <div className='bal-sym'>
                      <input type='text' name='cs_phone' autoComplete="new-password" Value=""/>
                    </div>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Country</label>
                    <select name="country">
                      {
                        this.state.country_names.map((cn) => (
                          <option key={Math.random()+'_'+Math.random()}>{cn}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Gender</label>
                    <select name="gender">
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>

                <div className='deposit-flex'>
                  <div className='deposit-flex-item-1'>
                    <label>Password</label>
                    <div className='bal-sym'>
                      <input type='password' name='cs_pass' autoComplete="new-password" Value=""/>
                    </div>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Confirm Password</label>
                    <div className='bal-sym'>
                      <input type='password' name='cs_pass2' autoComplete="new-password" Value=""/>
                    </div>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Extension Number</label>
                    <select name="extension_no">
                      <option>0383193930 - 101</option>
                      <option>0383193930 - 102</option>
                      <option>0383193930 - 103</option>
                      <option>0383193930 - 104</option>
                      <option>0383193930 - 105</option>
                    </select>
                  </div>
                </div>

                <div className='deposit-flex'>
                  <input type='button' value='NEXT' className='restriction-submit-btn' onClick={() => this.setState({showRestrictions: true})} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default Restrictions;
