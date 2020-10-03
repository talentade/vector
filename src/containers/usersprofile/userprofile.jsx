import React, { Component } from 'react';
import '../../components/standard/userprofile.scss';
import userDp from '../../themes/images/dummydp.png';
import notes from '../../themes/images/profile/notes.png';
import tasks from '../../themes/images/profile/tasks.png';
import email from '../../themes/images/profile/email.png';
import calls from '../../themes/images/profile/calls.png';
import down from '../../themes/images/profile/down.svg';
import meetings from '../../themes/images/profile/meetings.png';
import app from '../../services/app';

class UsersProfile extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.profile;
  }

  render () {
    return (
      <div className="user-profile-body">
        <img src={this.state.profile_image.length ? this.state.profile_image : userDp} className="udp" />
        <h2 className="proflle-name">{this.state.first_name+" "+this.state.last_name}</h2>
        <h6 className="user-id">{app.uid(this.state.user_id)}</h6>

        <ul className="profile-actions">
          <li><img src={notes} /><span>Notes</span></li>
          <li><img src={tasks} /><span>Tasks</span></li>
          <li><img src={email} /><span>Emails</span></li>
          <li><img src={calls} /><span>Calls</span></li>
          <li><img src={meetings} /><span>Meetings</span></li>
        </ul>

        <div className="user-info">
          <svg className="drp-down" width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8469 0.816516L11.0167 0.65937L11.1865 0.816516L12.1698 1.72654L12.3681 1.91003L12.1698 2.09351L6.66981 7.18348L6.5 7.34063L6.33019 7.18348L0.830195 2.09351L0.63193 1.91003L0.830195 1.72654L1.81353 0.816516L1.98333 0.65937L2.15314 0.816516L6.5 4.83932L10.8469 0.816516Z" fill="#03CF9E" stroke="#03CF9E" stroke-width="0.5"/>
          </svg>

          <h4>About User</h4>

          <ul>
            <li><span className="min-100">Account type :</span> Basic</li>
            <li><span className="min-100">Date of Birth :</span> {app.altField(this.state.dob)}</li>
            <li><span className="min-100">Gender :</span> {this.state.gender}</li>
            <li><span className="min-100">Phone :</span> {this.state.phone_number}</li>
            <li><span className="min-100">Email :</span> {this.state.email}</li>
            <li><span className="min-100">Country :</span> {this.state.country}</li>
            <li><span className="min-100">City :</span> {app.altField(this.state.city)}</li>
          </ul>

          <table>
            <tr>
              <td>
                <span className="txt-default">Account status</span>
                <span className="td-v">NOT VERIFIED</span>
              </td>
              <td>
                <span className="txt-default">Total Balance</span>
                <span className="td-b">USD {this.state.balance}</span>
              </td>
            </tr>
            <tr>
              <td className="full">
                <span className="txt-default">Questionaire</span>
                <span className="td-b">APPROVED</span>
                <span className="txt-default">on 07/04/2020 at 13:24</span>
                <button className="btn-down"><img src={down} style={{position: "relative", top: "2px"}} /> Download pdf</button>
              </td>
            </tr>
            <tr>
              <td className="full">
                <span className="txt-default">ACCOUNT MANAGER</span>
                <span className="td-b">Admin</span>
                <span className="txt-default">A47392740</span>
              </td>
            </tr>
          </table>
        </div>

      </div>
    );
  }
}

export default UsersProfile;
