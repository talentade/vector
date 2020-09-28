import React, { Component } from 'react';
import userIcon from '../../themes/images/user-contacct.png';
import app from '../../services/app';
import pencil from '../../themes/images/pencil-edit.png';
import './profiledetails.scss';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.profile;
  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-details"+(active ? ' _active' : '')} id="tab-row-profile">

        <div className="detail-row">
          <h3><img src={userIcon} /> Personal Details</h3>
          <table>
            <tr>
              <td><span className="std">First name</span><span className="stv">{app.altField(this.state.first_name)} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Last name</span><span className="stv">{app.altField(this.state.last_name)} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Email</span><span className="stv">{app.altField(this.state.email)} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Phone</span><span className="stv">{app.altField(this.state.phone_number)} <img src={pencil} className="pencil" /></span></td>
              <td></td>
            </tr>
            <tr>
              <td><span className="std">Language</span><span className="stv">English <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Date of Birth</span><span className="stv">{app.altField(this.state.dob)} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Gender</span><span className="stv">{app.altField(this.state.gender)} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Country</span><span className="stv">{app.altField(this.state.country)} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Source</span><span className="stv">{app.altField(this.state.source)} <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td colspan="2"><span className="std">Passport/Identification number</span><span className="stv">{app.altField(this.state.passport_number)} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Passport Issued date</span><span className="stv">{app.altField(this.state.passport_date)} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Passport/ID expiration date</span><span className="stv">{app.altField(this.state.passport_exp)} <img src={pencil} className="pencil" /></span></td>
            </tr>
          </table>
        </div>


        <div className="detail-row">
          <h3>Banking Details</h3>
          <table>
            <tr>
              <td><span className="std">Account Name</span><span className="stv">{this.state.account_name} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Account number</span><span className="stv">{this.state.account_number} <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td><span className="std">Bank Name</span><span className="stv">GTBank <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Bank Address</span><span className="stv">{this.state.bank_address} <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td><span className="std">Bank Swift Code</span><span className="stv">{this.state.bank_SWIFT_code} <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Bank IBAN</span><span className="stv">{this.state.bank_IBAN} <img src={pencil} className="pencil" /></span></td>
            </tr>
          </table>
        </div>


        <div className="detail-row-2">
          <ul>
            <li>
              <div>
                <span className="d-title">KYC Status</span>
                <span className="d-label">Current KYC Status</span>
                <div className='det'>
                  <div className='det-flex'>
                    <div className='det-flex-item-1'>
                      <select name="extension_no">
                        <option>Approved</option>
                        <option>Disapproved</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/*<li>
              <div>
                <span className="d-title">Account Leverage</span>
                <span className="d-label">Current Leverage Status</span>
                <div className='det'>
                  <div className='det-flex'>
                    <div className='det-flex-item-1'>
                      <select name="extension_no">
                        <option>Basic: &nbsp;&nbsp;&nbsp;1:&nbsp;200</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </li>*/}
            <li>
              <div>
                <span className="d-title">Transfer Availability</span>
                <span className="d-label">Transfer status</span>
                <div className="btn-list" style={{display: "flex", padding: "10px"}}>
                  <button className="enbtn imp">Enable</button>
                  <button className="enbtn">Disabled</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
      </div>
	 )
	}

}

export default ProfileDetails;