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

    return (
      <div className='profile-section-container'>
        {this.state.showSpinner ? <Spinner showSpinner={showSpinner} /> : null}

        <div className='profile-right-section admin'>
          <div className='profile-bg end'>
            <button className="btn-save" type="button">Save</button>
          </div>

          <div className='account-details-section profile-bg'>
            <UserAvatar
              admin={true}
              name={app.name()}
              email={this.profile.email}
              role={this.profile.role}
              imageUrl={this.state.profile_image.length ? this.state.profile_image : profile_image}
              handleChange={this.handleFileChange}
              showSpinner={this.state.showSmallSPinner}
            />
            <ul className="adm-ptab">
              <li>
                <div className="c">Email:</div>
                <div className="v"><input type="text" spellCheck="false" defaultValue={app.email()} readOnly="true" /></div>
              </li>
              <li>
                <div className="c">Password:</div>
                <div className="v"><input type="password" spellCheck="false" defaultValue="" /></div>
              </li>
              <li>
                <div className="c">Firstname:</div>
                <div className="v"><input type="text" spellCheck="false" defaultValue={this.profile.first_name} readOnly="true" /></div>
              </li>
              <li>
                <div className="c">Lastname:</div>
                <div className="v"><input type="text" spellCheck="false" defaultValue={this.profile.last_name} readOnly="true" /></div>
              </li>
              <li>
                <div className="c">Language:</div>
                <div className="v"><input type="text" spellCheck="false" defaultValue="English" readOnly="true" /></div>
              </li>
            </ul>
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
