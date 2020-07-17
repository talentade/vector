import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';

// import Forms from  './forms.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Forms extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    return (
      <Container>
      <div className="col-12" id="form-container">
        <div className="users-section-right">
          <Breadcrumbs breads="Home, Forms" />
          <h1 className="page-title">Forms 
            <div className="btn-list">
              <button className="create-list">Create Form</button>
            </div>
          </h1>
          <Ptab tabs="Manage, Anaalyse" active="Manage" />



        </div>
      </div>
      </Container>
    );
  }
};

export default Forms;
