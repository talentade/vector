import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';

import UsersTable from  './userstable.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          <TableFilters table="users" />
          <UsersTable />
        </div>
      </div>
      </Container>
    );
  }
};

export default Users;
