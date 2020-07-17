import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import meeting from '../../themes/images/meeting.png';
import eye from '../../themes/images/eye.png';
import './profilemeetings.scss';
import '../../components/standard/table.scss';

class ProfileMeetings extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-meetings"+(active ? ' _active' : '')} id="tab-row-meetings">

        <TableFilters table="meets" />

        <ul className="table-header for-meetings">
          <li>TITLES</li>
          <li className="len">ATTENDEES</li>
          <li className="len">CREATED</li>
          <li className="len">SCHEDULED TIME</li>
          <li>DURATION</li>
          <li>STATUS</li>
          <li>ACTIONS</li>
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
        </ul>

        <ul className="table-body for-meetings">
          <li><span className="txt-light">Workflow</span></li>
          <li className="len"><span className="txt-light">Adetona Seun(A321218)</span><span className="txt-warning v-all">view all</span></li>
          <li className="len"><span className="txt-light">05. 04. 2020 12:43pm</span></li>
          <li className="len"><span className="txt-light">05. 04. 2020 12:43pm</span></li>
          <li><span className="txt-light">1 hour</span></li>
          <li><span className="txt-light">Active</span></li>
          <li>
            <img src={eye} />&nbsp;&nbsp;&nbsp;&nbsp;
            <img src={meeting} />
          </li>
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
        </ul>

        <ul className="table-body for-meetings">
          <li><span className="txt-light">Workflow</span></li>
          <li className="len"><span className="txt-light">Adetona Seun(A321218)</span><span className="txt-warning v-all">view all</span></li>
          <li className="len"><span className="txt-light">05. 04. 2020 12:43pm</span></li>
          <li className="len"><span className="txt-light">05. 04. 2020 12:43pm</span></li>
          <li><span className="txt-light">1 hour</span></li>
          <li><span className="txt-light">Expired</span></li>
          <li>
            <img src={eye} />&nbsp;&nbsp;&nbsp;&nbsp;
            <img src={meeting} />
          </li>
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
        </ul>

      </div>
	 )
	}

}

export default ProfileMeetings;