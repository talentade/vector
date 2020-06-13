import React, { Component } from "react";
import { connect } from "react-redux";
import AvarizLogo from "../../themes/images/avariz_logo.png";
import PhoneImage from "../../themes/images/phone.svg";
import server from '../../services/server';
import Spinner from '../../components/spinner/index';
import "./index.scss";

class VerifyPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      name_2: "",
      name_3: "",
      name_4: "",
      error: null,
      showSpinner: false
    };
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  clearError = (e) => {
    this.setState({ error: null });
  }

  handleKeyPress = (e, field) => {
    if (this.state[`${field.name}`] === "" && !isNaN(e.target.value)) {
      e.preventDefault();

      if (field.name === "name") this.setState({ name: e.target.value });
      if (field.name === "name_2") this.setState({ name_2: e.target.value });
      if (field.name === "name_3") this.setState({ name_3: e.target.value });
      if (field.name === "name_4") this.setState({ name_4: e.target.value });

      let next = this.refs[field.name].nextSibling;
      if (next && next.tagName === "INPUT") {
        this.refs[field.name].nextSibling.focus();
      }
    }
  };

  verifyCode = async (e) => {
    e.preventDefault();

    const { name, name_2, name_3, name_4 } = this.state;

    this.clearError();

    this.setState({ showSpinner: true });;

    try {
      await server.verifyPhone(this.props.id, `${name}${name_2}${name_3}${name_4}`);
      this.setState({ showSpinner: false });
      this.props.history.push('/Trade');
    } catch (error) {
      const verificationError = error.response.data.message;
      this.setState({ showSpinner: false });

      this.setState({ error: verificationError });
    }
  };

  resetInput = (e, field) => {
    if (e.keyCode === 8) {
      e.preventDefault();

      if (field.name === "name") this.setState({ name: "" });
      if (field.name === "name_2") this.setState({ name_2: "" });
      if (field.name === "name_3") this.setState({ name_3: "" });
      if (field.name === "name_4") this.setState({ name_4: "" });

      let prev = this.refs[field.name].previousSibling;
      if (prev && prev.tagName === "INPUT") {
        this.refs[field.name].previousSibling.focus();
      }
    }
  };

  render() {
    const { name, name_2, name_3, name_4, showSpinner } = this.state;
    return (
      <div className="verification-container">
        <Spinner showSpinner={showSpinner} />
        <header>
          <img src={AvarizLogo} alt="" />
        </header>

        <h4 className="verification-text-header">
          We need to verify the phone number you registered to book a call with
          you at your preferred time
        </h4>

        <div className="phone-image remove-border-bottom">
          <img src={PhoneImage} alt="" />
        </div>

        <div className="verification-text">
          <p>
            Enter 4-digits code sent to <b>{this.props.phone}</b>
          </p>
        </div>

        <form className="verification-form" onSubmit={this.verifyCode}>
          <div className="input-boxes">
            <input
              type="text"
              ref="name"
              name="name"
              value={name}
              onChange={(e) => this.handleKeyPress(e, this.refs.name)}
              onKeyDown={(e) => this.resetInput(e, this.refs.name)}
            />
            <input
              type="text"
              value={name_2}
              ref="name_2"
              name="name_2"
              onChange={(e) => this.handleKeyPress(e, this.refs.name_2)}
              onKeyDown={(e) => this.resetInput(e, this.refs.name_2)}
            />
            <input
              type="text"
              value={name_3}
              ref="name_3"
              name="name_3"
              onChange={(e) => this.handleKeyPress(e, this.refs.name_3)}
              onKeyDown={(e) => this.resetInput(e, this.refs.name_3)}
            />
            <input
              type="text"
              value={name_4}
              ref="name_4"
              name="name_4"
              onChange={(e) => this.handleKeyPress(e, this.refs.name_4)}
              onKeyDown={(e) => this.resetInput(e, this.refs.name_4)}
            />
          </div>
          <p className='error'>{this.state.error}</p>
          <div className="verify-button-container">
            <input
              type="submit"
              value="CONFIRM NUMBER"
              className="verification-submit-btn"
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user: { phone, id } }) => ({
  phone,
  id
});

export default connect(mapStateToProps)(VerifyPhone);
