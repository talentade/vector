import React, { Component } from 'react';
import $ from 'jquery';
import '../../utils/cursor.js';
import userIcon from '../../themes/images/user-contacct.png';
import app from '../../services/app';
import server from '../../services/server';
import pencil from '../../themes/images/pencil-edit.png';
import './profiledetails.scss';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount () {
    $(".valu").prop("readonly", true);
    $(".pencil").click(function () {
      let valu  = $(this).parents("td").find(".valu");
      let name  = valu.attr("name");
      valu.attr({"spellcheck": false});
      valu.prop("readonly", false);
      valu.focus().setCursorPosition(valu.val().length);
    });
  }

  kyc = async (e) => {
    this.props.load();
    try {
      await server.KYCStatus(this.props.uid, e.target.value);
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  tstat = async (s) => {
    this.props.load();
    try {
      await server.changeTransferStatus(this.props.uid, s);
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  render () {
    let active = parseInt(this.props.active);
    let state = this.props.profile;
  	return (
      <div className={"tab-row profile-details"+(active ? ' _active' : '')} id="tab-row-profile">

        <div className="detail-row">
          <h3><img src={userIcon} /> Personal Details</h3>
          <table>
            <tr>
              <td><span className="std">First name</span><span className="stv"><input className="valu" name="first_name" defaultValue={app.altField(state.first_name)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Last name</span><span className="stv"><input className="valu" name="last_name" defaultValue={app.altField(state.last_name)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Email</span><span className="stv"><input className="valu" name="email" defaultValue={app.altField(state.email)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Phone</span><span className="stv"><input className="valu" name="phone_number" defaultValue={app.altField(state.phone_number)} /> <img src={pencil} className="pencil" /></span></td>
              <td></td>
            </tr>
            <tr>
              <td><span className="std">Language</span><span className="stv"><input className="valu" name="" defaultValue={app.altField("English")} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Date of Birth</span><span className="stv"><input className="valu" name="dob" defaultValue={app.altField(state.dob)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Gender</span><span className="stv"><input className="valu" name="gender" defaultValue={app.altField(state.gender)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Country</span><span className="stv"><input className="valu" name="country" defaultValue={app.altField(state.country)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Source</span><span className="stv"><input className="valu" name="source" defaultValue={app.altField(state.source)} /> <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td colspan="2"><span className="std">Passport/Identification number</span><span className="stv"><input className="valu" name="passport_number" defaultValue={app.altField(state.passport_number)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Passport Issued date</span><span className="stv"><input className="valu" name="passport_date" defaultValue={app.altField(state.passport_date)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Passport/ID expiration date</span><span className="stv"><input className="valu" name="passport_exp" defaultValue={app.altField(state.passport_exp)} /> <img src={pencil} className="pencil" /></span></td>
            </tr>
          </table>
        </div>


        <div className="detail-row">
          <h3>Banking Details</h3>
          <table>
            <tr>
              <td><span className="std">Account Name</span><span className="stv"><input className="valu" name="account_name" defaultValue={app.altField(state.account_name)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Account number</span><span className="stv"><input className="valu" name="account_number" defaultValue={app.altField(state.account_number)} /> <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td><span className="std">Bank Name</span><span className="stv"><input className="valu" name="bank_name" defaultValue={app.altField(state.bank_name)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Bank Address</span><span className="stv"><input className="valu" name="bank_address" defaultValue={app.altField(state.bank_address)} /> <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td><span className="std">Bank Swift Code</span><span className="stv"><input className="valu" name="bank_SWIFT_code" defaultValue={app.altField(state.bank_SWIFT_code)} /> <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Bank IBAN</span><span className="stv"><input className="valu" name="bank_IBAN" defaultValue={app.altField(state.bank_IBAN)} /> <img src={pencil} className="pencil" /></span></td>
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
                      <select name="kyc" onChange={this.kyc} defaultValue={state.kyc}>
                        <option value="1">Approved</option>
                        <option value="0">Disapproved</option>
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
                  <button className={"enbtn"+(state.can_transfer > 0 ? "" : " imp")} type="button" onClick={(e) => this.tstat(1)} style={{cursor: "pointer", outline: "none"}}>Enable</button>
                  <button className={"enbtn"+(state.can_transfer > 0 ? " imp" : "")} type="button" onClick={(e) => this.tstat(0)} style={{cursor: "pointer", outline: "none"}}>Disabled</button>
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
