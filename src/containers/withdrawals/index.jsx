import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';

import DataTable from  './datatable.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Withdrawals extends Component {
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
          <Breadcrumbs breads="Home, Finance, Withdrawals" />
          <h1 className="page-title">Withdrawals</h1>
          <TableFilters table="withdrawals" />
          <DataTable />
        </div>
      </div>
      </Container>
    );
  }
};

export default Withdrawals;