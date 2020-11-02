import React, { Component } from 'react';
import $ from "jquery";
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import ReactPhoneInput from 'react-phone-input-2';
import InputBox from '../../components/InputBox/index';
import AvarizLogo from '../../themes/images/avariz_logo.png';
import  './assets/intlTelInput.css';
import { appendScript } from './assets/appendScript';
import {
  addUserInformation,
  setAccountType,
  setAccounts,
  saveUserProfile,
} from '../../redux/actions/index';
import server from '../../services/server';
import app from '../../services/app';
import Spinner from '../../components/spinner/index';
import "./assets/dbip.js";
import './index.scss';


class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      country: '',
      password: '',
      countryCode: '',
      confirmPassword: '',
      question: '',
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      phoneNumberError: null,
      genderError: null,
      passwordError: null,
      confirmPasswordError: null,
      questionError: null,
      showSpinner: false,
    };
  }

  handlePhoneChange = (e) => {
    this.setState({ phone:  e.target.value });
  };

  handleGenderChange = (e) => {
    this.setState({ gender: e.target.value });
  };

  handleQuetionChange = (e) => {
    this.setState({ question: e.target.value });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  clearErrors = () => {
    this.setState({
      firstNameError: null,
      lastNameError: null,
      emailError: null,
      phoneNumberError: null,
      genderError: null,
      questionError: null,
      passwordError: null,
      confirmPasswordError: null,
    });
  };

  async componentDidMount () {
    let intlTelInput = require("../../../node_modules/intl-tel-input/build/js/intlTelInput.js");
    let utilsScript  = require("../../../node_modules/intl-tel-input/build/js/utils.js");
    var input = document.querySelector("#phone");
    intlTelInput(input, utilsScript);
    this.ccPhone();

    $(".fc-number").keyup(function () {
    let val = $(this).val().trim();
        val = val.replace(/[^\d+]+/gi, '');
        $(this).val(val).focus();
    });
    
    $(".fc-number").mouseout(function () {
    let val = $(this).val().trim();
        val = val.replace(/[^\d+]+/gi, '');
        $(this).val(val).focus();
    });
    
    $(".fc-number").change(function () {
    let val = $(this).val().trim();
        val = val.replace(/[^\d+]+/gi, '');
        $(this).val(val).focus();
    });

  }

  ccPhone = () => {
    let that = this;
    setTimeout(() => {
      let code = "";
      $("li[data-country-code]").click(function () {
        let ct = $(this).find(".iti__country-name").text();
        let cc = $(this).find(".iti__dial-code").text();
        that.setState({
          country:      ct,
          countryCode:  cc
        });
      });

      $(document).keyup(function (e) {
        if($("li.iti__country.iti__highlight").length) {
          let ct = $("li.iti__country.iti__highlight .iti__country-name").text();
          let cc = $("li.iti__country.iti__highlight .iti__dial-code").text();
          // if(cc == "+1" && that.state.countryCode.length) {} else
          if(ct.length && e.which == 13) {
            that.setState({
              country:      ct,
              countryCode:  cc
            });
          }
        }
      });
 
      window.dbip.getVisitorInfo().then(info => {
       code = (info.countryCode || "").toLowerCase();
       if(code != null) {
        $(".iti__selected-flag, li[data-country-code="+code+"]").click();
       }
      });
      $(".iti__selected-flag").css({opacity: "1"});
    }, 0);
  }

  submitForm = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      phone,
      country,
      countryCode,
      gender,
      email,
      password,
      confirmPassword,
      question,
    } = this.state;
    const nameRegex = /^[a-zA-Z]{3,}$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    this.clearErrors();

    if (!nameRegex.test(firstName))
      this.setState({ firstNameError: 'Invalid first name specified' });
    if (!nameRegex.test(lastName))
      this.setState({ lastNameError: 'Invalid last name specified' });
    if (phone.length < 6)
      this.setState({ phoneNumberError: 'Invalid phone number' });

    if (password !== confirmPassword) {
      this.setState({ confirmPasswordError: 'Passwords must match' });
    }

    if (
      nameRegex.test(firstName) &&
      nameRegex.test(lastName) &&
      email !== '' &&
      phone.length &&
      ['Male', 'Female'].includes(gender) &&
      password === confirmPassword
    ) {
      const userInfo = {
        firstName,
        lastName,
        email,
        phone,
        gender,
      };

      this.setState({ showSpinner: !this.state.showSpinner });

      let nph = phone.trim();
          nph = nph.charAt(0) == 0 ? nph.slice(1) : nph;
      let phone_number = countryCode+""+nph;

      try {
        const response = await server.register({
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phone_number,
          password,
          gender,
          source: question,
          role: 'user',
          country: country,
          country_code: countryCode,
        });

        const user        = response.data.profile;
        userInfo.id       = user.user_id;
        userInfo.otpEmail = user.email_otp;
        userInfo.otpPhone = user.phone_otp;

        app.profile(user);
        const accounts   = app.accounts();

        this.props.saveUserProfile(user);
        this.props.setAccountType(accounts[0]);
        this.props.setAccounts(accounts);

        this.setState({ showSpinner: !this.state.showSpinner });

        this.props.history.push('/VerifyEmail');
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
  };

  render() {
    const {
      firstNameError,
      lastNameError,
      emailError,
      phoneNumberError,
      genderError,
      passwordError,
      confirmPasswordError,
      questionError,
      showSpinner,
    } = this.state;
    return (
      <div className='register-container'>
        <Spinner showSpinner={showSpinner} />
        <div className='register-bg-image'></div>
        <header>
          <img src={AvarizLogo} alt='avariz-logo' />
        </header>
        <div className='register-big-box'>
          <form className='register-box' onSubmit={this.submitForm}>
            <h2>Sign Up</h2>

            <InputBox
              label='First Name'
              name='firstName'
              type='text'
              handleInputChange={this.handleInputChange}
              error={firstNameError}
            />
            <InputBox
              label='Last Name'
              name='lastName'
              handleInputChange={this.handleInputChange}
              type='text'
              error={lastNameError}
            />
            <InputBox
              label='Email'
              name='email'
              type='email'
              handleInputChange={this.handleInputChange}
              error={emailError}
            />
          {/*<ReactPhoneInput
                inputExtraProps={{
                  name: 'phone',
                  required: true,
                  autoFocus: true,
                }}
                defaultCountry={'ng'}
                value={this.state.phone}
                onChange={this.handlePhoneChange}
              /> maxlength="11"*/}
            <div className='input-flex'>
              <div className='input-box phone-reg-box'>
                <label className='phone-label'>Phone Number</label>

                <div className="react-tel-input">
                  <input type="" name="phone" id="phone" className="form-control fc-number" style={{height: "2.5rem !important"}} onChange={this.handlePhoneChange} required="true" />
                </div>
                <p className='error red'>
                  {phoneNumberError ? `*${phoneNumberError}` : null}
                </p>
              </div>
              <div className='gender-reg-box'>
                <InputBox
                  label='Gender'
                  selectItems={['Male', 'Female']}
                  defaultText='Gender'
                  onChange={this.handleGenderChange}
                  error={genderError}
                />
              </div>
            </div>

            <InputBox
              label='Password'
              name='password'
              type='password'
              handleInputChange={this.handleInputChange}
              error={passwordError}
            />
            <InputBox
              label='Confirm Password'
              name='confirmPassword'
              type='password'
              handleInputChange={this.handleInputChange}
              error={confirmPasswordError}
            />

            <InputBox
              label='How did you find out about avariz?'
              defaultText='Please Select'
              selectItems={[
                'Facebook ads',
                'Google ads',
                'Google Search',
                'From a friend',
                'Other',
              ]}
              onChange={this.handleQuetionChange}
              error={questionError}
            />

            <input
              type='submit'
              value='Sign Up'
              className='register-submit-btn'
            />

            <p className='alt-action'>
              Already have an account?{' '}
              <NavLink to='/Login' className='login-link'>
                Login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUserInformation: (userInfo) => dispatch(addUserInformation(userInfo)),
  saveUserProfile: (profile) => dispatch(saveUserProfile(profile)),
  setAccountType: (type) => dispatch(setAccountType(type)),
  setAccounts: (type) => dispatch(setAccounts(type)),
});

export default withRouter(connect(null, mapDispatchToProps)(Register));
