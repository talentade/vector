import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';

import SearchIcon from "../../themes/images/tradeDashboard/search.svg";
import DocumentsTable from  './documents.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ''
    }

  }

  render() {
    const { navi } = this.state;
    return (
      <Container>
      <div className="col-12" id="document-container">
        <div className="users-section-right">
          <Breadcrumbs breads="Home, Documents" />
          <h1 className="page-title">Documents
            <div className="search-container" style={{width: "280px"}}>
              <input
                type='text'
                name='search'
                placeholder='Search'
                onChange={(e) => this.setState({filter: e.target.value})}
              />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>
          </h1>
          <DocumentsTable filter={this.state.filter} />
        </div>
      </div>
      </Container>
    );
  }
};

export default Documents;
