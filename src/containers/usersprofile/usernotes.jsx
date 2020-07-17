import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import folder from '../../themes/images/folder.png';
import pencil from '../../themes/images/notes/pencil.png';
import deleteIcon from '../../themes/images/notes/delete.png';
import eye from '../../themes/images/notes/eye.png';
import './usernotes.scss';

class UserNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: false,
    }
  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-notes"+(active ? ' _active' : '')} id="tab-row-notes">

        <TableFilters table="notes" />

        <ul className="for-notes">
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="white" fill-opacity="0.2"/>
            </svg>
            <div className="d-note">
              <h4>Attend to Mr. Solaru’s requests</h4>
              <p>Mr. Solaru’s requested that you help him deposit some amount of money in his DEMO account.</p>
            </div>
            <div className="d-act">
              <img src={pencil} />
              <img src={deleteIcon} />
              <img src={eye} />
            </div>
            <div className="d-foot">
              <p>
                <span className="creator"><i>created by:</i>&nbsp;&nbsp;<b>Ademola Seun(A3304848)</b></span>
                <span className="modified">edited yesterday 7:40pm</span>
              </p>
            </div>
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="white" fill-opacity="0.2"/>
            </svg>
            <div className="d-note">
              <h4>Attend to Mr. Solaru’s requests</h4>
              <p>Mr. Solaru’s requested that you help him deposit some amount of money in his DEMO account.</p>
            </div>
            <div className="d-act">
              <img src={pencil} />
              <img src={deleteIcon} />
              <img src={eye} />
            </div>
            <div className="d-foot">
              <p>
                <span className="creator"><i>created by:</i>&nbsp;&nbsp;<b>Ademola Seun(A3304848)</b></span>
                <span className="modified">edited yesterday 7:40pm</span>
              </p>
            </div>
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="white" fill-opacity="0.2"/>
            </svg>
            <div className="d-note">
              <h4>Attend to Mr. Solaru’s requests</h4>
              <p>Mr. Solaru’s requested that you help him deposit some amount of money in his DEMO account.</p>
            </div>
            <div className="d-act">
              <img src={pencil} />
              <img src={deleteIcon} />
              <img src={eye} />
            </div>
            <div className="d-foot">
              <p>
                <span className="creator"><i>created by:</i>&nbsp;&nbsp;<b>Ademola Seun(A3304848)</b></span>
                <span className="modified">edited yesterday 7:40pm</span>
              </p>
            </div>
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="white" fill-opacity="0.2"/>
            </svg>
            <div className="d-note">
              <h4>Attend to Mr. Solaru’s requests</h4>
              <p>Mr. Solaru’s requested that you help him deposit some amount of money in his DEMO account.</p>
            </div>
            <div className="d-act">
              <img src={pencil} />
              <img src={deleteIcon} />
              <img src={eye} />
            </div>
            <div className="d-foot">
              <p>
                <span className="creator"><i>created by:</i>&nbsp;&nbsp;<b>Ademola Seun(A3304848)</b></span>
                <span className="modified">edited yesterday 7:40pm</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
	 )
	}

}

export default UserNotes;