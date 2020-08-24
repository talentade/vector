import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserAvatar from './userAvatar/index';
import { withRouter, Redirect } from 'react-router-dom';
import HorizontalBar from './passwordBar/index';
import Information from './information/index';
import { saveUserProfile, toggleAddCardModal } from '../../redux/actions/index';
import { verificationData, debitCardInfo } from '../../utils/dummyData';
import PasswordButton from './passwordButton/index';
import PasswordBox from './passwordBox/index';
import AccountDetails from './accountDetails/index';
import FinancialDetails from './financialDetails/index';
import AccountInfo from './accountInfo/index';
import DebitCard from './debitCard/index';
import VerificationGroup from './verificationGroup/index';
import Spinner from '../spinner/index';
import server from '../../services/server';
import app from '../../services/app';
import AccountModal from './addAccountModal/index';
import './index.scss';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {},
      showSpinner: false,
      selectedAccount: '',
      showBoxes: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      oldPasswordError: null,
      newPasswordError: null,
      confirmPasswordError: null,
      error: null,
      success: false,
      verified: false,
      imageUrl: '',
      image: '',
      banking_details: [], // app.profile()["banking_details"],
      showSmallSPinner: false,
      showAddCardModal: false,
    };

    this.profile         = app.profile();
    this.selectedAccount = app.accountDetail();
    this.id              = app.id();
    this.unverifiedItems = [];
  }

  async componentDidMount() {
    if (!this.id) this.props.history.push('/Login');

    const gp = await server.getProfile();
    app.profile(gp.data.profile);

    this.setState({banking_details: []}); // app.profile()["banking_details"]
    this.profile         = app.profile();
    this.selectedAccount = app.accountDetail();

    this.props.saveUserProfile(this.profile);

    // const {
    //   address_verified,
    //   cards,
    //   deposit_verified,
    //   email_verified,
    //   identity_verified,
    // } = this.props.userProfile;

    // if (
    //   !address_verified ||
    //    cards.length < 0 ||
    //   !deposit_verified ||
    //   !email_verified   ||
    //   !identity_verified
    // ) {
    //   this.setState({ verified: false });
    // }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleFileChange = async (e) => {
    const current = e.target.files[0];
    const fd = new FormData();
    fd.append('profile_pic.png', current, current.name);

    this.setState({ showSmallSPinner: true });
    try {
      // await server.uploadImage(app.id(), fd);

      const gp = await server.getProfile();
      app.profile(gp.data.profile);
      this.props.saveUserProfile(gp.data.profile);

      this.setState({ showSmallSPinner: false });
    } catch (error) {
      this.setState({ showSmallSPinner: false });
      return error.message;
    }
  };

  hidePasswordBoxes = () => {
    this.setState({
      showBoxes: !this.state.showBoxes,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      oldPasswordError: null,
      newPasswordError: null,
      confirmPasswordError: null,
      error: null,
    });
  };

  clearErrors = () => {
    this.setState({
      oldPasswordError: null,
      newPasswordError: null,
      confirmPasswordError: null,
      error: null,
      success: false,
    });
  };

  changePassword = async () => {
    this.clearErrors();
    const { oldPassword, newPassword, confirmPassword } = this.state;

    if (oldPassword === '') this.setState({ oldPasswordError: 'required' });
    if (newPassword === '') this.setState({ newPasswordError: 'required' });

    if (newPassword !== confirmPassword)
      this.setState({ confirmPasswordError: 'Passwords must match' });

    if (oldPassword && newPassword === confirmPassword) {
      try {
        this.setState({ showSpinner: true });

        const user_id = app.id();
        const email   = this.profile.email;

        await server.changePassword(
          {
            password: oldPassword,
            new_password: newPassword,
          },
          user_id,
          email
        );

        this.setState({
          showSpinner: false,
          success: true,
          newPassword: '',
          oldPassword: '',
          confirmPassword: '',
        });
      } catch (error) {
        if (!error.response) {
          return error.message;
        }
        const errorMessage = error.response.data.message;
        this.setState({ showSpinner: false, error: errorMessage });
      }
    }
  };

  toggleModalButtonClick = () => {
    this.props.toggleAddCardModal();
  };

  deleteCard = async (cardPAN) => {
    try {
      this.setState({ showSpinner: true });
      const user_id = app.id();
      const email   = this.profile.email;

      await server.deleteCard(user_id, cardPAN);

      const {
        data: {
          data: { profile },
        },
      } = await server.getProfile(user_id, email);

      localStorage.setItem('profile', JSON.stringify(profile));

      this.props.saveUserProfile(profile);
      this.setState({ showSpinner: false });
    } catch (error) {
      this.setState({ showSpinner: false });
      return error.message;
    }
  };

  render() {
    const userId = app.id();

    if (!userId) return <Redirect to='/Login' />;

    const { showSpinner } = this.state;

    const {
      profile_image,
      first_name,
      last_name,
      email,
      phone_number,
      country,
      demo,
      live,
      address_verified,
      cards,
      email_verified,
      identity_verified,
      deposit_verified,
    } = this.props.userProfile;

    let balance   = this.selectedAccount.balance;
    let id        = app.id();
    let accountId = app.accountDetail().account_id;

    const userData = [
      {
        dataKey: 'Name',
        value: `${first_name} ${last_name}`,
      },
      {
        dataKey: 'User ID',
        value: accountId,
      },
      {
        dataKey: 'Email',
        value: email,
        // editable: true,
      },
      {
        dataKey: 'Phone',
        value: phone_number,
        // editable: true,
      },
      {
        dataKey: 'Country',
        value: country,
      },
    ];

    const unverified = [];

    if (!address_verified) {
      unverified.push('Upload Proof of Address');
    }

    if (cards && cards.length <= 0) {
      unverified.push('Upload Debit and Credit Card');
    }

    if (!deposit_verified) {
      unverified.push('Upload Declaration of Deposit');
    }

    if (!identity_verified) {
      unverified.push('Upload Proof of Identity');
    }

    if (!email_verified) {
      unverified.push('Verify Email Address');
    }

    const verificationData = [
      {
        itemHead: 'Upload Proof of Identity',
        itemContent: 'Upload ID Card or Passport',
        buttonText: 'Upload',
        verified: identity_verified,
      },
      {
        itemHead: 'Upload Proof of Residence',
        itemContent: 'Utility Bill or Bank statement',
        buttonText: 'Upload',
        verified: address_verified,
      },
      {
        itemHead: 'Upload Declaration of Deposit',
        itemContent: 'Document declaring deposit in account',
        buttonText: 'Upload',
        verified: deposit_verified,
      },
      {
        itemHead: 'Upload Credit and Debit Card',
        itemContent: 'Upload front and back image of debit and credit card',
        buttonText: 'Upload',
        verified: cards && cards.length > 0,
      },
      {
        itemHead: 'Email Verification',
        itemContent: `Verify ${email}`,
        buttonText: 'Request Verification',
      },
    ];

    return (
      <div className='profile-section-container'>
        {this.props.showAddCardModal ? (
          <AccountModal
            handleClick={this.toggleModalButtonClick}
            showAddCardModal={this.props.showAddCardModal}
          />
        ) : null}
        {this.state.showSpinner ? <Spinner showSpinner={showSpinner} /> : null}

        <div className='profile-left-section'>
          <UserAvatar
            imageUrl={profile_image}
            handleChange={this.handleFileChange}
            showSpinner={this.state.showSmallSPinner}
          />

          <div className='user-information-section'>
            {userData.map((data) => (
              <Information
                key={`${data.dataKey}-1-${Math.random()}-${Math.random()}`}
                {...data}
              />
            ))}
          </div>
          <div className='password-actions-section'>
            <HorizontalBar showBoxes={this.hidePasswordBoxes} />
            <PasswordBox
              labelName='Current Password'
              placeholder='Enter your current password'
              name='oldPassword'
              handleChange={this.handleInputChange}
              show={this.state.showBoxes}
              error={this.state.oldPasswordError}
            />
            <PasswordBox
              labelName='New Password'
              placeholder='Enter your new password'
              name='newPassword'
              handleChange={this.handleInputChange}
              show={this.state.showBoxes}
              error={this.state.newPasswordError}
            />
            <PasswordBox
              labelName='Confirm Password'
              placeholder='Confirm your new password'
              name='confirmPassword'
              handleChange={this.handleInputChange}
              show={this.state.showBoxes}
              error={this.state.confirmPasswordError}
            />
            <PasswordButton
              show={this.state.showBoxes}
              handleSubmit={this.changePassword}
            />
            <p className='errorMessage'>{this.state.error}</p>
            <p
              className='success-message'
              style={{ display: this.state.success ? 'block' : 'none' }}
              onClick={() =>
                this.setState({
                  success: false,
                })
              }
            >
              Password Changed succesfully
            </p>
          </div>
        </div>
        <div className='profile-right-section'>
          <div className='profile-bg'>
            <AccountInfo
              unverifiedItems={unverified}
              verified={this.state.verified}
            />
            <VerificationGroup items={verificationData} />
          </div>

          <div className='financial-details-section profile-bg'>
            <FinancialDetails
              balance={`$${balance}`}
              handleClick={this.toggleModalButtonClick}
            />
            <div className='my-cards'>
              {cards
                ? cards.map((data) => (
                    <DebitCard
                      key={`${Math.random()}1-${Math.random()}-${Math.random()}`}
                      {...data}
                      deleteCard={() => this.deleteCard(data.PAN)}
                    />
                  ))
                : null}
            </div>
            <AccountDetails
              balance={`$${balance}`}
              details={this.state.banking_details}
              handleClick={this.toggleModalButtonClick}
              showSpinner={(e) => this.setState({showSpinner: !this.state.showSpinner})}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userProfile, showAddCardModal }) => ({
  userProfile,
  showAddCardModal,
});

const mapDispatchToProps = (dispatch) => ({
  saveUserProfile: (profile) => dispatch(saveUserProfile(profile)),
  toggleAddCardModal: () => dispatch(toggleAddCardModal()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile),
);
