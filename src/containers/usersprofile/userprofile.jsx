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
        <img src={this.state.profile_image.length ? this.state.profile_image : userDp} className="udp" />
        <h2 className="proflle-name">{this.state.first_name+" "+this.state.last_name}</h2>
        <h6 className="user-id">{app.uid(this.state.user_id)}</h6>

        <ul className="profile-actions">
          <li onClick={() => this.pTabs("files")}><img src={files} /><span>Files</span></li>
          <li onClick={() => this.pTabs("notes")}><img src={notes} /><span>Notes</span></li>
          <li onClick={() => this.pTabs("tasks")}><img src={tasks} /><span>Tasks</span></li>
          <li onClick={() => this.pTabs("emails")}><img src={email} /><span>Emails</span></li>
          <li onClick={() => this.pTabs("calls")}><img src={calls} /><span>Calls</span></li>
        </ul>

        <div className="user-info">
          {/*<svg className="drp-down" width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.8469 0.816516L11.0167 0.65937L11.1865 0.816516L12.1698 1.72654L12.3681 1.91003L12.1698 2.09351L6.66981 7.18348L6.5 7.34063L6.33019 7.18348L0.830195 2.09351L0.63193 1.91003L0.830195 1.72654L1.81353 0.816516L1.98333 0.65937L2.15314 0.816516L6.5 4.83932L10.8469 0.816516Z" fill="#03CF9E" stroke="#03CF9E" stroke-width="0.5"/>
          </svg>*/}

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

          <span className="txt-default" style={{fontSize: "13px"}}>KYC Progress</span>
          <div class="w3-light-grey w3-round-xlarge">
            <div class="w3-container w3-color w3-round-xlarge" style={{width: this.state.perc+"%"}}>{this.state.perc}%</div>
          </div>

          <table>
            <tr>
              <td>
                <span className="txt-default">Account status</span>
                <span className={"td-"+(this.props.profile.kyc ? "b" : "v")}>{this.props.profile.kyc ? "" : "NOT "}VERIFIED</span>
              </td>
              <td>
                <span className="txt-default">Total Balance</span>
                <span className="td-b">USD {this.state.balance}</span>
              </td>
            </tr>
            <tr>
              <td className="full" align="center">
                <button className="btn-down" style={{cursor: "pointer", outline: "none"}} disabled={!this.state.perc} onClick={this.btnDown}><img src={down} style={{position: "relative", top: "2px"}} /> Download KYC</button>
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
