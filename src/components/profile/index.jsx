import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
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
      profile_image: '',
      showSmallSPinner: false,
      showAddCardModal: false,
    };

    this.profile         = app.profile();
    this.selectedAccount = app.accountDetail();
    this.id              = app.id();
    this.unverifiedItems = [];
  }

  async componentDidMount() {
    if (!app.id().length) this.props.history.push('/Login');

    if(window.changePassword) {
      this.setState({showBoxes: true});
      window.changePassword = false;
    }

    $(window).on("changePassword", () => {
      this.setState({showBoxes: true});
      window.changePassword = false;
    });

    const gp = await server.getProfile();
    app.profile(gp.data.profile);
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
    fd.append('profile_doc.png', current, current.name);

    this.setState({ showSmallSPinner: true });
    try {
      let pi = await server.uploadImage(fd);
      const gp = await server.getProfile();
      app.profile(gp.data.profile);
      window.location.href = "";
      // this.props.saveUserProfile(gp.data.profile);
      // this.setState({ showSmallSPinner: false, profile_image: gp.data.profile.profile_image });
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

        await server.changePassword({old_password: oldPassword, new_password: newPassword});

        this.setState({
          showSpinner: false,
          success: true,
          newPassword: '',
          oldPassword: '',
          confirmPassword: '',
        });
        $("[name=newPassword], [name=oldPassword], [name=confirmPassword]").val("");
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

  deleteCard = async (id, cardPAN) => {
    try {
      this.setState({ showSpinner: true });

      await server.deleteCard(id, cardPAN);
      const gp = await server.getProfile();
      app.profile(gp.data.profile);
      this.props.saveUserProfile(gp.data.profile);

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
      dob,
      city,
      cards,

      identity_proof,
      residence_proof,
      dod,
      bank_card,

      address_verified,
      email_verified,
      identity_verified,
      deposit_verified,
    } = this.props.userProfile;

    let balance   = this.selectedAccount.balance;
    let id        = app.id();
    let accountId = app.accountDetail().account_name;
    let uid       = app.userid().split("-");

    const userData = [
      {
        dataKey: 'Name',
        value: `${first_name} ${last_name}`,
        editable: true,
        fixed: true,
      },
      {
        dataKey: 'User ID',
        value: uid[uid.length - 1].toUpperCase(),
        editable: true,
        fixed: true,
      },
      {
        dataKey: 'Email',
        value: email,
        editable: true,
        fixed: true,
      },
      {
        dataKey: 'Phone',
        value: phone_number,
        editable: true,
        fixed: true,
      },
      {
        dataKey: 'Date of birth',
        value: dob,
        editable: true,
        fixed: false,
      },
      {
        dataKey: 'Country',
        value: country,
        editable: true,
        fixed: true,
      },
      {
        dataKey: 'City',
        value: city,
        editable: true,
        fixed: false,
      },
    ];

    const unverified = [];

    if (!parseInt(String(residence_proof).length)) {
      unverified.push('Upload Proof of Address');
    }

    if (!parseInt(String(bank_card).length)) {
      unverified.push('Upload Bank Card');
    }

    if (!parseInt(String(dod).length)) {
      unverified.push('Upload Declaration of Deposit');
    }

    if (!parseInt(String(identity_proof).length)) {
      unverified.push('Upload Proof of Identity');
    }

    // if (!email_verified) {
    //   unverified.push('Verify Email Address');
    // }

    const verificationData = [
      {
        itemHead: 'Upload Proof of Identity',
        itemContent: 'Upload ID Card or Passport',
        buttonText: 'Upload',
        folder: 'identity-proof',
        verified: parseInt(String(identity_proof).length),
        name: "doc_poi"
      },
      {
        itemHead: 'Upload Proof of Residence',
        itemContent: 'Utility Bill or Bank statement',
        buttonText: 'Upload',
        folder: 'residence-proof',
        verified: parseInt(String(residence_proof).length),
        name: "doc_por"
      },
      {
        itemHead: 'Upload Declaration of Deposit',
        itemContent: 'Document declaring deposit in account',
        buttonText: 'Upload',
        folder: 'dod',
        verified: parseInt(String(dod).length),
        name: "doc_dod"
      },
      {
        itemHead: 'Upload Bank Card',
        itemContent: 'Upload front of bank card',
        buttonText: 'Upload',
        folder: 'bank-card',
        verified: parseInt(String(bank_card).length),
        name: "doc_card"
      },
      // {
      //   itemHead: 'Email Verification',
      //   itemContent: `Verify ${email}`,
      //   buttonText: 'Request Verification',
      //   verified: email_verified,
      //   name: "email_verified"
      // },
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
            imageUrl={this.state.profile_image.length ? this.state.profile_image : profile_image}
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
                      {...data}
                      deleteCard={() => this.deleteCard(data.id, data.PAN)}
                      key={`${Math.random()}1-${Math.random()}-${Math.random()}`}
                    />
                  ))
                : null}
            </div>
          </div>

          <div className='account-details-section profile-bg'>
            <AccountDetails
              balance={`$${balance}`}
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
