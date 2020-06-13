import React, { Component } from 'react';
import AvarizLogo from '../../themes/images/avariz_logo.png';
import ForgotPasswordImage from '../../themes/images/forgot.svg';
import Spinner from '../../components/spinner/index';
import server from '../../services/server';
import './index.scss';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: null,
      successMessage: false,
      showSpinner: false,
    };
  }

  handleChange = (e) => {
    const { target: { name, value } } = e;

    this.setState({
      [name]: value,
    })
  }

  clearMessages = () => {
    this.setState({
      emailError: null,
      successMessage: false,
    })
  }

  resetPassword = async (e) => {
    e.preventDefault();

    const { email } = this.state;

    this.clearMessages();

    try {
      this.setState({ showSpinner: true });

      await server.sendResetEmail(email);

      this.setState({ showSpinner: false, successMessage: true });
    } catch (error) {
      if (!error.response) {
        return error.message;
      }
      
      this.setState({ showSpinner: false });

      const errorMessage = error.response.data.message;

      this.setState({ emailError: errorMessage });
    }
  }

  render() {
    const { emailError, email, successMessage, showSpinner } = this.state;
    return (
      <div className='forgot-password'>
        <Spinner showSpinner={showSpinner}/>
        <header>
          <img src={AvarizLogo} alt='avariz-logo' />
        </header>
        <div className='forgot-password-container'>
          <div className='image'>
            <h2>Forgot password?</h2>
            <img src={ForgotPasswordImage} alt='' />
          </div>
          <div className='forgot-password-form'>
            <form onSubmit={this.resetPassword}>
              <h2>Forgot password?</h2>
              <p
                className='error'
                style={{ display: emailError ? 'block' : 'none' }}
              >
                {emailError}
              </p>
              <p
                className='success'
                style={{ display: successMessage ? 'block' : 'none' }}
              >
                A link to the password reset has been sent to {email}
              </p>
              <div className='section'>
                <label htmlFor='email'>Enter Email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  onChange={this.handleChange}
                  required
                />
              </div>
              <input type='submit' value='RESET PASSWORD' />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
