import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';
import AddInstrument from '../../components/addInstrument/index';
import InstrumentsTable from  './instruments.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Instruments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ai: false,
      active: 'forex',
    }

  }

  render() {
    const { active } = this.state;
    return (
      <Container>
      <div className="col-12" id="instrument-container">
        <div className="users-section-right">
          <Breadcrumbs breads="Home, Instruments" />
          <h1 className="page-title">Instruments</h1>
          <TableFilters table="instruments" add={() => this.setState({ai: true})} switchTo={(v) => this.setState({active: v.toLowerCase()})}/>

          {this.state.ai ?
            <AddInstrument
              cancel={(e) => this.setState({ai: false})}
            />
          : null}

          <InstrumentsTable active={active}/>
        </div>
      </div>
      </Container>
    );
  }
};

export default Instruments;
