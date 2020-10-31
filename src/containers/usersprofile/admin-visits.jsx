import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import './usercalls.scss';
import '../../components/standard/table.scss';

class UserCalls extends Component {
  constructor(props) {
    super(props);
  }

  PlayRecord = () => {
    return (
      <li className="short">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.7157 0 0 6.71573 0 15C0 23.2843 6.7157 30 15 30ZM13 21.9282L22 16.7321C23.3334 15.9622 23.3334 14.0378 22 13.2679L13 8.07181C11.6666 7.302 10 8.26425 10 9.80386V20.1962C10 21.7357 11.6666 22.698 13 21.9282Z" fill="#008EDE"/>
        </svg>
      </li>
    )
  }

  render () {
    let active = parseInt(this.props.active);

  	return (
      <div className={"tab-row profile-visits"+(active ? ' _active' : '')} id="tab-row-visits">
        
        {/*<TableFilters table="calls" />*/}

        <ul className="table-header for-calls">
          <li className="len">NAME</li>
          <li className="len">EMAIL</li>
          <li>PHONE NUMBER</li>
          <li className="len">REGISTRATION DATE</li>
          <li>SALES</li>
        </ul>

        <ul className="table-body for-calls">
          <li className="len"><span className="txt-light">Adeoye Talent</span></li>
          <li className="len"><span className="txt-light">adeoyetalent@gmail.com</span></li>
          <li><span className="txt-light">+2349031900410</span></li>
          <li><span className="txt-light">05. 29. 2020 @7:32:12 AM</span></li>
          <li><span className="txt-success">CONVERTED</span></li>
        </ul>

      </div>
	 )
	}

}

export default UserCalls;