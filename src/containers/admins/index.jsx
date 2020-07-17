import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';

import AdminsTable from  './adminstable.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Admins extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    return (
      <Container>
      <div className="col-12" id="users-container">
        <div className="users-section-right">
          <Breadcrumbs breads="Home, Lists, Admins" />
          <h1 className="page-title">Admins</h1>
          <TableFilters table="admins" />
          <AdminsTable />
        </div>
      </div>
      </Container>
    );
  }
};

export default Admins;
