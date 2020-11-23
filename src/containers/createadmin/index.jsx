import React, { Component } from 'react';
import $ from 'jquery';
import { NavLink as Link } from 'react-router-dom';
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

class CreateAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Male',
      country: '',
      password: '',
      countryCode: '',
      confirmPassword: '',
      extension_no: '0383193930 - 101',

      firstNameError: null,
      lastNameError: null,
      emailError: null,
      passwordError: null,
      phoneNumberError: null,
      confirmPasswordError: null,

      selectedTab: "support specialist",
      _selectedTab: "Support Specialist",
      country_names: [],
      showSpinner: false,
      showRestrictions: false,
    };

    this.showSpinner = false;
    this.profile = app.profile();
    this.id = this.profile.user_id;
    this.permissions = [];
  }

  async componentDidMount() {

    let permissions   = await server.savedPermissions();
    let ps            = Object.values(permissions.data.permissions);
    this.permissions  = ps;

    var country = require('country-list-js');
    var country_names = country.names().sort();
    this.setState({country_names: country_names, country: country_names[0]});
  }

  toggleTabs = (e) => {
    this._toggleTabs(e.currentTarget.querySelector('div').innerHTML.trim());
  }

  createAdmin = () => {
    this.setState({showRestrictions: false});
    this.submitForm(false);
  }

  _toggleTabs = (tab) => {
    this.setState({
      selectedTab: tab.toLowerCase(),
      _selectedTab: tab
    });
  }



  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  submitForm = async (e) => {
    e && e.preventDefault();
    const {
      firstName,
      lastName,
      phone,
      country,
      gender,
      email,
      password,
      confirmPassword,
      extension_no,
      selectedTab
    } = this.state;
    const nameRegex = /^[a-zA-Z]{3,}$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    this.clearErrors();

    let err = false;
    if (!nameRegex.test(firstName)) {
      err = true;
      this.setState({ firstNameError: 'Invalid first name specified' });
    }
    if (!nameRegex.test(lastName)) {
      err = true;
      this.setState({ lastNameError: 'Invalid last name specified' });
    }
    if (email.length < 5) {
      err = true;
      this.setState({ emailError: 'Invalid email' });
    }
    if (phone.length < 6) {
      err = true;
      this.setState({ phoneNumberError: 'Invalid phone number' });
    }
    if (!password.length) {
      err = true;
      this.setState({ passwordError: 'Invalid password' });
      if(!confirmPassword.length) {
          this.setState({ confirmPasswordError: 'Invalid confirm password' });
      }
    }
    if (password !== confirmPassword) {
      err = true;
      this.setState({ confirmPasswordError: 'Passwords must match' });
    }

    if (!err) {

      this.setState({ showSpinner: !this.state.showSpinner });

      // let nph = phone.trim();
      //     nph = nph.charAt(0) == 0 ? nph.slice(1) : nph;
      // let phone_number = countryCode+""+nph;

      let permitted = [];
      $(".p-check").each((k, v) => {
        if(v.checked) {
          permitted.push($(v).data("permit"));
        }
      });

      // console.log(permitted);

      try {
        let submit = {
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phone, // phone_number,
          password,
          gender,
          country: country,
          extension_no,
          role: selectedTab,
          permissions: permitted.join(",")
        };

        const response = await server.register(submit, true);
        window.location.href = "";
      } catch (error) {
        this.setState({ showSpinner: !this.state.showSpinner });
        if (!error.response) {
          return error;
        }

        const errorMessage = error.response.data.message;

        if (errorMessage.toLowerCase().match('password')) {
          this.setState({ passwordError: errorMessage });
        }

        if (errorMessage.toLowerCase().match('username')) {
          this.setState({ emailError: errorMessage });
        }
      }
    }
  }

  clearErrors = () => {
    this.setState({
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      phoneNumberError: null,
      genderError: null,
      passwordError: null,
      confirmPasswordError: null,
    });
  }

  render() {
    let ps = this.permissions;
    let no = parseInt(ps.length / 2);
    let p1 = ps.slice(0, no);
    let p2 = ps.slice(no);

    return (
      <Container>
        <span id="s-all-2"><Link to="/Restrictions">See all Restrictions</Link></span>
        <div className='createadmin-section'>
          <Spinner showSpinner={this.showSpinner} />
          <Breadcrumbs breads={"Home, Create Admins, "+(this.state._selectedTab)} />
          <RestrictionNav selectedTab={this.state.selectedTab} handleClick={this.toggleTabs} />


          <div className={"half-screen"+(this.state.showRestrictions ? "" : " __hide")}>
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
                        <label className="switch"><input type="checkbox" data-permit={p.toLowerCase()} className="p-check"/><span className="slider round"></span></label>
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
                  <input type='submit' value='DONE' className='restriction-submit-btn' style={{width: "100px", outline: "none"}} onClick={() => this.createAdmin()} />
                  <span id="s-all"><Link to="/Restrictions">See all Restrictions</Link></span>
                </div>
            </div>
          </div>

          <div className='createadmin-box'>
            <div className='deposit'>
              <form className='restriction-action' autoComplete="new-password" onSubmit={this.submitForm}>

                <div className='deposit-flex'>
                  <div className='deposit-flex-item-1'>
                    <label>Firstname</label>
                    <div className='bal-sym'>
                      <input type='text' name='firstName' onChange={this.handleInputChange} autoComplete="new-password" Value=""/>
                    </div>
                    <p className='red'>{this.state.firstNameError ? `*${this.state.firstNameError}` : null}</p>
                  </div>


                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Lastname</label>
                    <div className='bal-sym'>
                      <input type='text' name='lastName' onChange={this.handleInputChange} autoComplete="new-password" Value=""/>
                    </div>
                    <p className='red'>{this.state.lastNameError ? `*${this.state.lastNameError}` : null}</p>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Email</label>
                    <div className='bal-sym'>
                      <input type='email' name='email' onChange={this.handleInputChange} autoComplete="new-password" Value=""/>
                    </div>
                    <p className='red'>{this.state.emailError ? `*${this.state.emailError}` : null}</p>
                  </div>
                </div>

                <div className='deposit-flex'>
                  <div className='deposit-flex-item-1'>
                    <label>Phone Number</label>
                    <div className='bal-sym'>
                      <input type='text' name='phone' onChange={this.handleInputChange} autoComplete="new-password" Value=""/>
                    </div>
                    <p className='red'>{this.state.phoneNumberError ? `*${this.state.phoneNumberError}` : null}</p>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Country</label>
                    <select name="country" onChange={this.handleInputChange} value={this.state.country}>
                      {
                        this.state.country_names.map((cn) => (
                          <option key={Math.random()+'_'+Math.random()}>{cn}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Gender</label>
                    <select name="gender" onChange={this.handleInputChange}>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </div>

                <div className='deposit-flex'>
                  <div className='deposit-flex-item-1'>
                    <label>Password</label>
                    <div className='bal-sym'>
                      <input type='password' name='password' onChange={this.handleInputChange} autoComplete="new-password" Value=""/>
                    </div>
                    <p className='red'>{this.state.passwordError ? `*${this.state.passwordError}` : null}</p>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Confirm Password</label>
                    <div className='bal-sym'>
                      <input type='password' name='confirmPassword' onChange={this.handleInputChange} autoComplete="new-password" Value=""/>
                    </div>
                    <p className='red'>{this.state.confirmPasswordError ? `*${this.state.confirmPasswordError}` : null}</p>
                  </div>

                  <div className='deposit-flex-item-1 ml-10'>
                    <label>Extension Number</label>
                    <select name="extension_no" onChange={this.handleInputChange}>
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
                  {/*<input type='submit' value='NEXT' className='restriction-submit-btn' />*/}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default CreateAdmin;
