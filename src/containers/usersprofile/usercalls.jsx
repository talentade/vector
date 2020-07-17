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
      <div className={"tab-row profile-calls"+(active ? ' _active' : '')} id="tab-row-calls">
        <TableFilters table="calls" />
        <ul className="table-header for-calls">
          <li>CONTACT</li>
          <li className="len">EXTENSION NUMBER</li>
          <li>CALL TYPE</li>
          <li>CALL STATUS</li>
          <li>DURATION</li>
          <li className="len">TIME & DATE</li>
          <li className="short">RECORD</li>
        </ul>

        <ul className="table-body for-calls">
          <li><span className="txt-light">+2349031900410</span></li>
          <li className="len"><span className="txt-light">08977697790</span></li>
          <li><span className="txt-info">Outgoing</span></li>
          <li><span className="txt-success">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.10626 7.72547C4.4089 9.29183 6.03083 10.5621 7.86368 11.4515C8.51993 11.7654 9.39396 12.1339 10.3244 12.1934C10.3654 12.1962 10.4125 12.1962 10.458 12.1962C10.8902 12.1962 11.2085 12.0632 11.4893 11.7651C11.6801 11.5449 11.882 11.3346 12.0942 11.135L9.66802 8.70891L9.00892 9.36801C8.80536 9.57156 8.57232 9.67476 8.31622 9.67476C8.16037 9.67378 8.00698 9.63574 7.86872 9.56379C7.85482 9.55684 7.8404 9.5484 7.82626 9.53953L7.82341 9.53773C7.81798 9.53484 7.81263 9.5318 7.80743 9.52855C7.72283 9.47605 7.61658 9.42309 7.50408 9.36668C7.35742 9.29611 7.2145 9.21804 7.07587 9.13277C5.99919 8.45187 5.02568 7.5673 4.10017 6.42887C4.0956 6.42387 4.09126 6.41871 4.08704 6.41324C3.56751 5.75344 3.22845 5.19949 2.98802 4.61719C2.9856 4.6113 2.98339 4.60534 2.98138 4.5993L2.9715 4.56957C2.97103 4.56824 2.9706 4.56695 2.97021 4.56566C2.92419 4.42 2.78521 3.97996 3.19497 3.55785C3.20694 3.54368 3.22016 3.5306 3.23447 3.51879L3.23564 3.51773C3.45048 3.32504 3.65134 3.12953 3.86904 2.90977L1.44548 0.486328L0.809311 1.12246C0.588609 1.33504 0.455166 1.62232 0.435092 1.92809C0.388842 2.49266 0.497241 3.09047 0.786655 3.86559C1.27197 5.1766 2.00892 6.40285 3.10626 7.72547Z" fill="#03CF9E"/>
            </svg>&nbsp;&nbsp;Success</span></li>
          <li><span className="txt-light">00: 03: 05</span></li>
          <li className="len"><span className="txt-light">05. 29. 2020@7:32:12 AM</span></li>
          {this.PlayRecord()}
        </ul>

        <ul className="table-body for-calls">
          <li><span className="txt-light">+2349031900410</span></li>
          <li className="len"><span className="txt-light">08977697790</span></li>
          <li><span className="txt-info">Outgoing</span></li>
          <li><span className="txt-danger">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.10626 7.72547C4.4089 9.29183 6.03083 10.5621 7.86368 11.4515C8.51993 11.7654 9.39396 12.1339 10.3244 12.1934C10.3654 12.1962 10.4125 12.1962 10.458 12.1962C10.8902 12.1962 11.2085 12.0632 11.4893 11.7651C11.6801 11.5449 11.882 11.3346 12.0942 11.135L9.66802 8.70891L9.00892 9.36801C8.80536 9.57156 8.57232 9.67476 8.31622 9.67476C8.16037 9.67378 8.00698 9.63574 7.86872 9.56379C7.85482 9.55684 7.8404 9.5484 7.82626 9.53953L7.82341 9.53773C7.81798 9.53484 7.81263 9.5318 7.80743 9.52855C7.72283 9.47605 7.61658 9.42309 7.50408 9.36668C7.35742 9.29611 7.2145 9.21804 7.07587 9.13277C5.99919 8.45187 5.02568 7.5673 4.10017 6.42887C4.0956 6.42387 4.09126 6.41871 4.08704 6.41324C3.56751 5.75344 3.22845 5.19949 2.98802 4.61719C2.9856 4.6113 2.98339 4.60534 2.98138 4.5993L2.9715 4.56957C2.97103 4.56824 2.9706 4.56695 2.97021 4.56566C2.92419 4.42 2.78521 3.97996 3.19497 3.55785C3.20694 3.54368 3.22016 3.5306 3.23447 3.51879L3.23564 3.51773C3.45048 3.32504 3.65134 3.12953 3.86904 2.90977L1.44548 0.486328L0.809311 1.12246C0.588609 1.33504 0.455166 1.62232 0.435092 1.92809C0.388842 2.49266 0.497241 3.09047 0.786655 3.86559C1.27197 5.1766 2.00892 6.40285 3.10626 7.72547Z" fill="#FF1E1E"/>
            </svg>&nbsp;&nbsp;Missed</span></li>
          <li><span className="txt-light">00: 03: 05</span></li>
          <li className="len"><span className="txt-light">05. 29. 2020@7:32:12 AM</span></li>
          {this.PlayRecord()}
        </ul>

      </div>
	 )
	}

}

export default UserCalls;