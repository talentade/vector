import React, { Component } from 'react';
import $ from 'jquery';
import '../../components/standard/userprofile.scss';
import userDp from '../../themes/images/dummydp.png';
import files from "./files.svg";
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

    let perc = 0;
    
    if(this.state.dod.length) perc += 25;
    if(this.state.bank_card.length) perc += 25;
    if(this.state.identity_proof.length) perc += 25;
    if(this.state.residence_proof.length) perc += 25;

    this.state.perc = perc;
  }

  pTabs = (p) => {
    $("#ptb--"+p).trigger("click");
    setTimeout(() => {
      if($("#ptb--"+p+"--action").length) {
        $("#ptb--"+p+"--action").trigger("click");
      }
    }, 250);
  }

  btnDown = (e) => {
    if(this.state.perc > 0) {
      window.open(this.state.dod);
      setTimeout(() => {
        window.open(this.state.bank_card);
        setTimeout(() => {
          window.open(this.state.identity_proof);
          setTimeout(() => {
            window.open(this.state.residence_proof);
          }, 1000);
        }, 1000);
      }, 1000);
    }
  }

  render () {
    return (
      <div className="user-profile-body">
        <img src={this.state.profile_image.length ? this.state.profile_image : userDp} className="udp adm" />
        <h2 className="proflle-name">{this.state.first_name+" "+this.state.last_name}</h2>
        <h6 className="user-id">{app.uid(this.state.user_id)}</h6>

        <div className="user-info">

          <table>
            <tr>
              <td className="full">
                <span className="txt-default">Role</span>
                <span className="td-b">{this.state.role}</span>
              </td>
              <td className="full">
                <span className="txt-default">Email</span>
                <span className="td-v">{this.state.email}</span>
              </td>
              <td className="full">
                <span className="txt-default">Phone</span>
                <span className="td-b">{this.state.phone_number}</span>
              </td>
              <td className="full">
                <span className="txt-default">Last seen</span>
                <span className="td-b">{this.state.last_seen}</span>
              </td>
            </tr>
          </table>
        </div>

      </div>
    );
  }
}

export default UsersProfile;
