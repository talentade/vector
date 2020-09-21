import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import meeting from '../../themes/images/meeting.png';
import eye from '../../themes/images/eye.png';
import app from '../../services/app';
import { Meet } from '../../components/popups/index';
import './profilemeetings.scss';
import '../../components/standard/table.scss';

class ProfileMeetings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMeet: false,
    }
  }

  render () {
    let active = parseInt(this.props.active);
    let meetings = this.props.meetings;
    console.log(meetings);
  	return (
      <div className={"tab-row profile-meetings"+(active ? ' _active' : '')} id="tab-row-meetings">

        <TableFilters table="meets" addMeet={() => this.setState({showMeet: true})} />

        <Meet show={this.state.showMeet} cancel={(e) => this.setState({showMeet: false})} />

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

        {
          meetings.map((meet) => (
            <ul className="table-body for-meetings">
              <li><span className="txt-light">{meet.title}</span></li>
              <li className="len"><span className="txt-light">{app.uid(meet.user_id)}</span><span className="txt-warning v-all">view all</span></li>
              <li className="len"><span className="txt-light">{meet.year+"/"+meet.month+"/"+meet.day+" "+meet.hour+":"+meet.minute+" "+meet.meridian}</span></li>
              <li className="len"><span className="txt-light">{app.cleanDate(meet.create_time)}</span></li>
              <li><span className="txt-light">{meet.duration}</span></li>
              <li><span className="txt-light">Active</span></li>
              <li>
                <img src={eye} />&nbsp;&nbsp;&nbsp;&nbsp;
                <img src={meeting} />
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>
          ))
        }

      </div>
	 )
	}

}

export default ProfileMeetings;