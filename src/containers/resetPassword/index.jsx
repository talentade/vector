import React, { Component } from 'react';
import qs from 'qs';
import { withRouter, Link } from 'react-router-dom';
import AvarizLogo from '../../themes/images/avariz_logo.png';
import Spinner from '../../components/spinner/index';
import ResetImage from '../../themes/images/reset.svg';
import Padlock from '../../themes/images/padlock.svg';
import server from '../../services/server';
import './index.scss';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      showSpinner: false,
      error: null,
      otp: '',
      success: '',
    };
  }

  clearErrors = () => {
    this.setState({ error: null, success: '' });
  }

  resetPassword2 = async (e) => {
    e.preventDefault();

    const { email, otp, password, confirmPassword } = this.state;

    // if (this.props.location.search === '') {
    //   return this.setState({ error: 'Unauthorized' });
    // }

    // let searchObj = this.props.location.search.split('');

    // searchObj.shift('');

    // searchObj = qs.parse(searchObj.join(''));

    // const { email } = searchObj;

    if (!email.length) {
      return this.setState({ error: 'Unauthorized' });
    }

    if (password !== confirmPassword || !password.length) {
      return this.setState({ error: 'Passwords must match' });
    }

    if (password === confirmPassword) {
      try {
        this.setState({ showSpinner: true });

        await server.resetPassword({
          email,
          otp: parseInt(otp),
          new_password: password,
        });

        this.setState({ showSpinner: false, success: 'Password reset successful' });
        setTimeout(() => {
          // this.props.history.push('/Login');
          window.location.href = "/Login";
          process.exit(0);
        }, 500);
      } catch (error) {
        if (!error.response) {
          return error.message;
        }

        this.setState({
          showSpinner: false,
          error: error.response.data.message,
        });
      }
    }
  };

  handleChange = (e) => {
    const {
      target: { name, value },
    } = e;

    this.setState({ [name]: value });
  };

  render() {
    const { showSpinner, error , success } = this.state;
    return (
      <div className='password-reset'>
        <Spinner showSpinner={showSpinner} />
        <header>
          <img src={AvarizLogo} alt='avariz' />
        </header>
        <div className='password-reset-container'>
          <div className='image'>
            <img src={ResetImage} alt='' />
          </div>
          <div className='reset-form-section'>
            <form onSubmit={this.resetPassword2}>
              <div className='reset-form-heading'>
                <img src={Padlock} alt='Padlock' />
                <div className='reset-header-text'>
                  <h2>Create new password</h2>
                  <p>Enter a new password for your account</p>
                </div>
              </div>
              <p className='error'>{error}</p>
              <p className="success">{success}</p>
              <div className='reset-form-container'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className='reset-form-container'>
                <label htmlFor='otp'>OTP</label>
                <input
                  type='number'
                  name='otp'
                  id='otp'
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className='reset-form-container'>
                <label htmlFor='password'>New password</label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className='reset-form-container'>
                <label htmlFor='confirmPassword'>Re-enter new password</label>
                <input
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  required
                  onChange={this.handleChange}
                />
              </div>

              <input type='submit' value='CONFIRM NEW PASSWORD' /><br />
              <p align="center" style={{marginTop: "10px"}}><Link to="Login">Back to Login</Link></p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
