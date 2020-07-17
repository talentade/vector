import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';

import InstrumentsTable from  './instruments.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Instruments extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    const { navi } = this.state;
    return (
      <Container>
      <div className="col-12" id="instrument-container">
        <div className="users-section-right">
          <Breadcrumbs breads="Home, Instruments" />
          <h1 className="page-title">Instruments</h1>
          <TableFilters table="instruments" />
          <InstrumentsTable />
        </div>
      </div>
      </Container>
    );
  }
};

export default Instruments;
