import React, { Component } from 'react';
import Container from '../container/index';
import UsersTable from  './userstable.jsx';
import '../../components/standard/standard.scss';
import './index.scss';

import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      assign: false,
    }

  }

  render() {
    const { navi } = this.state;
    return (
      <Container>
      <div className="col-12" id="users-container">
        <div className="users-section-right">
          <Breadcrumbs breads="Home, Lists, Users" />
          <h1 className="page-title">Users</h1>
          <TableFilters table="users" assign={() => this.setState({assign: true})} search={(e) => this.setState({filter: e.target.value})} />
          <UsersTable assign={this.state.assign} filter={this.state.filter} />
        </div>
      </div>
      </Container>
    );
  }
};

export default Users;
