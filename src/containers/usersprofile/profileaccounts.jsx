import React, { Component } from 'react';
import './profileaccounts.scss';
import '../../components/standard/table.scss';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-accounts"+(active ? ' _active' : '')} id="tab-row-accounts">

        <div className="acc-div">
          <button className="add-acc">Add Account</button>
        </div>
        
        <ul className="table-header for-acc">
          <li>TRADING ACCOUNT</li>
          <li>BALANCE</li>
          <li>CREDIT</li>
          <li>LEVERAGE</li>
          <li>ACTIONS</li>
        </ul>
  
        <ul className="table-body for-acc">
          <li className="acc-name">
          <span className="td"><button className="acc_type">DEMO</button>adeoyetalent@gmail.com<br /><small className="inf">732923171272</small></span></li>
          <li className=""><span className="td">101,320.43 USD</span></li>
          <li className=""><span className="td">0.00 USD</span></li>
          <li className=""><span className="td">1:200</span></li>
          <li>
            <span className="td">
              <button className="deposit">Deposit</button>
              <svg className="acc-gra" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.25 5.5H4V17.75H0.25V5.5ZM7.25 0.25H10.75V17.75H7.25V0.25ZM14.25 10.25H17.75V17.75H14.25V10.25Z" fill="#1FCF65"/>
              </svg>
            </span>
          </li>
        </ul>

        <ul className="table-body for-acc">
          <li className="acc-name">
          <span className="td"><button className="acc_type live">LIVE</button>adeoyetalent@gmail.com<br /><small className="inf">732923171272</small></span></li>
          <li className=""><span className="td">101,320.43 USD</span></li>
          <li className=""><span className="td">0.00 USD</span></li>
          <li className=""><span className="td">1:200</span></li>
          <li>
            <span className="td">
              <button className="deposit">Deposit</button>
              <svg className="acc-gra" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.25 5.5H4V17.75H0.25V5.5ZM7.25 0.25H10.75V17.75H7.25V0.25ZM14.25 10.25H17.75V17.75H14.25V10.25Z" fill="#1FCF65"/>
              </svg>
            </span>
          </li>
        </ul>

      </div>
	 )
	}

}

export default ProfileDetails;