import React, { Component } from 'react';
import moment from 'moment';
import TableFilters from '../../components/tablefilters/index';
import folder from '../../themes/images/folder.png';
import pencil from '../../themes/images/notes/pencil.png';
import { Note } from '../../components/popups/index';
import deleteIcon from '../../themes/images/notes/delete.png';
import server from '../../services/server';
import app from '../../services/app';
import eye from '../../themes/images/notes/eye.png';
import './usersales.scss';

class UserSales extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render () {
    let active = parseInt(this.props.active);
    let sales  = [
      "Live Broadcasts", "Live Broadcasts", "Live Broadcasts",
      "Melbul", "Melbul", "Melbul",
      "Melbul", "Melbul", "Melbul",
      "Melbul", "Melbul", "Melbul"
    ];

  	return (
      <div className={"tab-row profile-sales"+(active ? ' _active' : '')} id="tab-row-sales">

        <ul className="for-sales">
          {
            sales.map((s) => (
              <li key={Math.random()+" "+Math.random()}>
                {s}
              </li>
            ))
          }
        </ul>
      </div>
	 )
	}

}

export default UserSales;