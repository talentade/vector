import React, { Component } from 'react';
import axios from 'axios';
import Container from '../container/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import RestrictionNav from '../../components/restrictionNav/index';
import Spinner from '../../components/spinner/index';
import server from '../../services/server';
import './index.scss';

class Restrictions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "support specialist",
      _selectedTab: "Support Specialist"
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.id = this.profile.user_id;
    this.showSpinner = false;
  }

  async componentDidMount() {

  }

  toggleTabs = (e) => {
    this._toggleTabs(e.currentTarget.querySelector('div').innerHTML.trim());
  };

  _toggleTabs = (tab) => {
    this.setState({
      selectedTab: tab.toLowerCase(),
      _selectedTab: tab
    });
  }

  render() {
    const myProfile = JSON.parse(localStorage.getItem('profile'));
    return (
      <Container>
        <div className='restrictions-section'>
          <Spinner showSpinner={this.showSpinner} />
          <Breadcrumbs breads={"Home, Create Admins, "+(this.state._selectedTab)} />
          <RestrictionNav selectedTab={this.state.selectedTab} handleClick={this.toggleTabs} />

          <div className='restriction-box'>
            <div className='deposit'>
              <form className='restriction-action' autoComplete="new-password">
                
                <div className='deposit-flex'>
                  <div className='deposit-flex-item-1'>
                    <label>Name</label>
                    <div className='bal-sym'>
                      <input type='text' name='cs_name' autoComplete="new-password" Value=""/>
                    </div>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Email</label>
                    <div className='bal-sym'>
                      <input type='email' name='cs_email' autoComplete="new-password" Value=""/>
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
                  <div className='deposit-flex-item-1'>
                    <label>Phone Number</label>
                    <div className='bal-sym'>
                      <input type='text' name='cs_phone' autoComplete="new-password" Value=""/>
                    </div>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Select Trading Account</label>
                    <select name="country">
                      <option>Nigeria</option>
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
                </div>

                <div className='deposit-flex'>
                  <input type='button' value='NEXT' className='restriction-submit-btn'/>
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
