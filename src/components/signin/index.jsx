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

  handleClick = (e) => {
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
      let response = await server.login({username: email, password: password});
      const user   = response.data.profile;

      app.profile(user);
      const accounts = app.accounts();
      this.setState({ showSpinner: false });
      this.props.history.push(app.isAdmin() ? '/Lists' : (user.booked > 0 ? '/Trade' : '/Book'));
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

  componentDidMount () {
    document.getElementById('check').checked = true;
  }

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
            {app.isAdmin() ? null : <p className='forget-password'><NavLink to="/ForgotPassword">Forgot Password?</NavLink></p>}
            <CheckBox onClick={this.handleClick} id="check" />
            <input
              type='submit'
              value='Sign In'
              className='signin-submit-btn'
              style={{marginTop: "1em"}}
            />
            {app.isAdmin() ? null :
            <p className='alt-action'>
              Don't have an account?&nbsp;
              <NavLink to='/Register' className='login-link'>
                Register
              </NavLink>
            </p>}
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
