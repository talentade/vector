import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.scss';
import AvarizLogo from '../../themes/images/avariz_logo.png';
import Input from './input/index';
import EmailIcon from '../../themes/images/signin_email.svg';
import PasswordIcon from '../../themes/images/password.svg';
import CheckBox from './checkbox/index';
import server from '../../services/server';
import app from '../../services/app';
import Spinner from '../spinner/index';
import { saveUserProfile, setAccountType, setAccounts } from '../../redux/actions/index';
import { profileImage } from '../../redux/reducers/reducers';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errorMessage: '',
      checked: false,
      showSpinner: false,
      signinError: null,
    };
  }

  handleClick = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  clearErrors = () => {
    this.setState({ signinError: null });
  };

  loginUser = async (e) => {
    e.preventDefault();

    this.clearErrors();

    const { email, password } = this.state;

    try {
      this.setState({ showSpinner: true });

      const { data: { data: { profile } } } = await server.login({username: email, password: password});    

      localStorage.setItem('email', email);

      localStorage.setItem('id', profile.user_id);

      this.props.saveUserProfile(profile);

      localStorage.setItem('profile', JSON.stringify(profile));

      this.props.setAccountType(app.accounts()[0]);

      localStorage.setItem('accountType', app.accounts()[0]);

      const { data: { data: { accounts } } } = await server.getAccounts(profile.user_id);

      Object.entries(accounts).forEach(([key, val]) => {
        accounts[key] = val.charAt(0).toUpperCase()+val.slice(1);
      });

      this.props.setAccounts(accounts);

      localStorage.setItem('accounts', JSON.stringify(accounts));

      this.setState({ showSpinner: false });

      this.props.history.push((profile.booking_history.data.length) ? '/Trade' : '/Book');
    } catch (error) {
      this.setState({ showSpinner: false });

      if (!error.response) {
        return error;
      }

      const errorMessage = error.response.data.message;

      this.setState({ signinError: errorMessage });
    }
  };

  handleChange = (e) => {
    const {
      target: { value, name },
    } = e;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { showSpinner, signinError } = this.state;
    return (
      <div>
        <Spinner showSpinner={showSpinner} />
        <header>
          <img src={AvarizLogo} alt='avariz-logo' />
        </header>
        <div className='login-bg-image'></div>
        <div className='login-section'>
          <form className='signin-form' onSubmit={this.loginUser}>
            <h2>Welcome Back</h2>{' '}
            <Input
              name='email'
              type='email'
              imageUrl={EmailIcon}
              handleChange={this.handleChange}
            />
            <Input
              name='password'
              type='password'
              imageUrl={PasswordIcon}
              handleChange={this.handleChange}
            />
            <p className='error'>{signinError}</p>
            <p className='forget-password'><NavLink to="/ForgotPassword">Forgot Password?</NavLink></p>
            <CheckBox handleClick={this.handleClick} />
            <input
              type='submit'
              value='Sign In'
              className='signin-submit-btn'
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveUserProfile: profile => dispatch(saveUserProfile(profile)),
  setAccountType: type => dispatch(setAccountType(type)),
  setAccounts: type => dispatch(setAccounts(type)),
})

export default withRouter(connect(null, mapDispatchToProps)(SignIn));
