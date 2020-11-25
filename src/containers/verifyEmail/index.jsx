import React, { Component } from 'react';
import { connect } from 'react-redux';
import AvarizLogo from '../../themes/images/avariz_logo.png';
import EmailImage from '../../themes/images/email.svg';
import './index.scss';
import server from '../../services/server';
import app from '../../services/app';
import Spinner from '../../components/spinner/index';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      name_2: '',
      name_3: '',
      name_4: '',
      error: null,
      user_id: app.userid(),
      showSpinner: false
    };
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  handleKeyPress = (e, field) => {
    if (this.state[`${field.name}`] === '' && !isNaN(e.target.value)) {
      e.preventDefault();

      if (field.name === 'name') this.setState({ name: e.target.value });
      if (field.name === 'name_2') this.setState({ name_2: e.target.value });
      if (field.name === 'name_3') this.setState({ name_3: e.target.value });
      if (field.name === 'name_4') this.setState({ name_4: e.target.value });

      let next = this.refs[field.name].nextSibling;
      if (next && next.tagName === 'INPUT') {
        this.refs[field.name].nextSibling.focus();
      }
    }
  };

  clearError = (e) => {
    this.setState({ error: null });
  }

  verifyCode = async (e) => {
    e.preventDefault();

    const { name, name_2, name_3, name_4 } = this.state;

    this.clearError();

    this.setState({ showSpinner: true });

    try {
      await server.verifyEmail(`${name}${name_2}${name_3}${name_4}`);
      this.setState({ showSpinner: false });
      this.props.history.push('/VerifyPhone');
    } catch (error) {
      this.setState({ showSpinner: false });
      const verificationError = error.response.data.message;
      this.setState({ error: verificationError });
    }
  }

  resendOTP = async () => {
    this.setState({ showSpinner: true });
    try {
      await server.resendOTP("e");
      this.setState({ showSpinner: false });
    } catch (error) {
      this.setState({ showSpinner: false });
    }
  }

  resetInput = (e, field) => {
    if (e.keyCode === 8) {
      e.preventDefault();

      if (field.name === 'name') this.setState({ name: '' });
      if (field.name === 'name_2') this.setState({ name_2: '' });
      if (field.name === 'name_3') this.setState({ name_3: '' });
      if (field.name === 'name_4') this.setState({ name_4: '' });

      let prev = this.refs[field.name].previousSibling;
      if (prev && prev.tagName === 'INPUT') {
        this.refs[field.name].previousSibling.focus();
      }
    }
  };

  render() {
    const { name, name_2, name_3, name_4, showSpinner } = this.state;
    return (
      <div className='verification-container'>
        <Spinner showSpinner={showSpinner} />
        <header>
          <img src={AvarizLogo} alt='avariz-logo' />
        </header>

        <div className='verification-image'>
          <img src={EmailImage} alt='' />
        </div>

        <div className='verification-text'>
          <p>
            Enter 4-digits code sent to <b>{app.email()}</b>
          </p>
        </div>

        <form className='verification-form' onSubmit={this.verifyCode}>
          <div className='input-boxes'>
            <input
              type='text'
              ref='name'
              name='name'
              value={name}
              onChange={(e) => this.handleKeyPress(e, this.refs.name)}
              onKeyDown={(e) => this.resetInput(e, this.refs.name)}
            />
            <input
              type='text'
              value={name_2}
              ref='name_2'
              name='name_2'
              onChange={(e) => this.handleKeyPress(e, this.refs.name_2)}
              onKeyDown={(e) => this.resetInput(e, this.refs.name_2)}
            />
            <input
              type='text'
              value={name_3}
              ref='name_3'
              name='name_3'
              onChange={(e) => this.handleKeyPress(e, this.refs.name_3)}
              onKeyDown={(e) => this.resetInput(e, this.refs.name_3)}
            />
            <input
              type='text'
              value={name_4}
              ref='name_4'
              name='name_4'
              onChange={(e) => this.handleKeyPress(e, this.refs.name_4)}
              onKeyDown={(e) => this.resetInput(e, this.refs.name_4)}
            />
          </div>

          <p className='error'>{this.state.error}</p>
          <div className='verify-button-container'>
            <input
              type='submit'
              value='CONFIRM EMAIL'
              className='verification-submit-btn'
            />
          </div>
          <center><a onClick={this.resendOTP} style={{fontFamily: 'Poppins', position: 'relative', top: "10px", cursor: "pointer", color: "#218d4c"}}>Didn't get OTP?</a></center>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { email, id } }) => ({
  email,
  id
});

export default connect(mapStateToProps)(VerifyEmail);
