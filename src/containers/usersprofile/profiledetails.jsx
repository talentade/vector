import React, { Component } from 'react';
import userIcon from '../../themes/images/user-contacct.png';
import pencil from '../../themes/images/pencil-edit.png';
import './profiledetails.scss';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-details"+(active ? ' _active' : '')} id="tab-row-profile">

        <div className="detail-row">
          <h3><img src={userIcon} /> Personal Details</h3>
          <table>
            <tr>
              <td><span className="std">First name</span><span className="stv">Talent <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Last name</span><span className="stv">Adeoye <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Email</span><span className="stv">adeoyetalent@gmail.com <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Phone</span><span className="stv">+2348167443081 <img src={pencil} className="pencil" /></span></td>
              <td></td>
            </tr>
            <tr>
              <td><span className="std">Language</span><span className="stv">English <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Date of Birth</span><span className="stv">07. 03. 2000 <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Gender</span><span className="stv">Male <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Country</span><span className="stv">Nigeria <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Source</span><span className="stv">Facebook ads <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td colspan="2"><span className="std">Passport/Identification number</span><span className="stv">4782 1292 7723 1013 <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Passport Issued date</span><span className="stv">03. 04. 2010 <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Passport/ID expiration date</span><span className="stv">04. 12. 2012 <img src={pencil} className="pencil" /></span></td>
            </tr>
          </table>
        </div>


        <div className="detail-row">
          <h3> Banking Details</h3>
          <table>
            <tr>
              <td><span className="std">Account Name</span><span className="stv">Adeoye Talent Adeiye <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Account number</span><span className="stv">0233632363 <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Account Holder Address</span><span className="stv">23. Ayinke str. Ibadan, Oyo state. <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td><span className="std">Bank Name</span><span className="stv">GTBank <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Bank Address</span><span className="stv">47, Lagos road, Ikorodu, Lagos state <img src={pencil} className="pencil" /></span></td>
            </tr>
            <tr>
              <td><span className="std">Bank Swift Code</span><span className="stv">GTBINGLA <img src={pencil} className="pencil" /></span></td>
              <td><span className="std">Bank IBAN</span><span className="stv">GB 05 BAR 200605 <img src={pencil} className="pencil" /></span></td>
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
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li>
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
            </li>
            <li>
              <div>
                <span className="d-title">Transfer Availability</span>
                <span className="d-label">Transfer status</span>
                <div className="btn-list" style={{display: "flex", padding: "10px"}}>
                  <button className="enbtn imp">Enable</button>
                  <button className="enbtn">Save</button>
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