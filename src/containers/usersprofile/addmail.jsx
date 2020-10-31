import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import { Email } from '../../components/popups/index';
import './useremails.scss';
import '../../components/standard/table.scss';

class UserEmails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props.profile,
      emails: false,
      data: null,
      nid: 0,
      type: 'new',
      filter: 'all',
      showEmail: false
    }

  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-email"+(active ? ' _active' : '')} id="tab-row-email">
        <Email
          show={true}
          action={(t) => console.log(t)}
          email={this.state.profile.email}
          funnel={true}
          cancel={(e) => this.setState({showEmail: false})}
        />

      </div>
	 )
	}
}

export default UserEmails;