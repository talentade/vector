import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import ReactPhoneInput from 'react-phone-input-2';
import InputBox from '../../components/InputBox/index';
import AvarizLogo from '../../themes/images/avariz_logo.png';
import {
  addUserInformation,
  setAccountType,
  setAccounts,
  saveUserProfile,
} from '../../redux/actions/index';
import server from '../../services/server';
import Spinner from '../../components/spinner/index';
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
      password: '',
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

  handlePhoneChange = (value) => {
    this.setState({ phone: value });
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

  submitForm = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      phone,
      gender,
      email,
      password,
      confirmPassword,
      question,
    } = this.state;
    const nameRegex = /^[a-zA-Z]{3,}$/;
    const phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;

    this.clearErrors();

    if (!nameRegex.test(firstName))
      this.setState({ firstNameError: 'Invalid first name specified' });
    if (!nameRegex.test(lastName))
      this.setState({ lastNameError: 'Invalid last name specified' });
    if (!phoneRegex.test(phone))
      this.setState({ phoneNumberError: 'Invalid phone number specified' });

    if (password !== confirmPassword) {
      this.setState({ confirmPasswordError: 'Passwords must match' });
    }

    if (
      nameRegex.test(firstName) &&
      nameRegex.test(lastName) &&
      email !== '' &&
      phoneRegex.test(phone) &&
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

      try {
        const {
          data: { country_name },
        } = await axios.get('https://ipapi.co/json/');

        const response = await server.register({
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phone,
          password,
          gender,
          source: question,
          role: 'user',
          country: country_name,
        });

        const user = response.data;
        userInfo.id = user.user_id;
        userInfo.otpEmail = user.email_otp;
        userInfo.otpPhone = user.phone_number_otp;
        await server.sendEmail(firstName, lastName, email, user.email_otp);
        await server.sendSMS(phone, user.phone_number_otp);
        this.props.addUserInformation(userInfo);
        localStorage.setItem('id', user.user_id);

        localStorage.setItem('email', email);

        this.props.saveUserProfile(user.userdata);

        localStorage.setItem(
          'profile',
          JSON.stringify(user.userdata),
        );

        this.props.setAccountType(
          user.userdata.demo.demo_account_id,
        );
        localStorage.setItem(
          'accountType',
          user.userdata.demo.demo_account_id,
        );

        const accounts = [
          user.userdata.demo.demo_account_id,
          user.userdata.live.live_account_id,
        ];

        this.props.setAccounts(accounts);

        localStorage.setItem('accounts', JSON.stringify(accounts));

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
            <div className='input-flex'>
              <div className='input-box phone-reg-box'>
                <label className='phone-label'>Phone Number</label>
                <ReactPhoneInput
                  inputExtraProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true,
                  }}
                  defaultCountry={'ng'}
                  value={this.state.phone}
                  onChange={this.handlePhoneChange}
                />
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
