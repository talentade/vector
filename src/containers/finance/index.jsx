import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import Pagination2 from '../../components/pagination2/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';
import UsersTable from  '../../containers/users/userstable.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Finance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navi: 1
    }

  }

  selectList = (e) => {

  }

  render() {
    const { navi } = this.state;
    return (
      <Container>
      <div className="col-12" id="finance-container">
        <div className="finance-section-right">
            <Breadcrumbs breads="Home, Finance" />

            <h1 className="page-title">Finance</h1>
            <TableFilters table="lists" />

            <ul className="table-header">
              <li>NAME</li>
              <li>SIZE</li>
              <li>TYPE</li>
              <li>LAST UPDATED</li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>

            {/*<ul className="table-body _all">
              <li><span className="txt-light">Credits</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">Automatic</span></li>
              <li><span className="txt-light">Today</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>*/}

            <ul className="table-body _users">
              <li><Link to="/Withdrawals" className="txt-light">Withdrawals</Link></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">Automatic</span></li>
              <li><span className="txt-light">Today</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>

            <ul className="table-body _admins">
              <li><Link to="/Admins" className="txt-light">Deposits</Link></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">Automatic</span></li>
              <li><span className="txt-light">May 4</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>

            {/*<ul className="table-body _south">
              <li><span className="txt-info">South African Leads form</span></li>
              <li><span className="txt-info">7000</span></li>
              <li><span className="txt-info">Manual</span></li>
              <li><span className="txt-default">May 4, 2020 3:11 PM</span></li>
              <li><span className="txt-default">joe young</span></li>
              <li><span className="txt-info">0</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>*/}
            {/*<Pagination2 />*/}
        </div>
      </div>
      </Container>
    );
  }

  Thesvg = () => {
    return (
      <>
      <svg className="fil-u" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0L11.1962 6H0.803848L6 0Z" fill="#C4C4C4"/>
      </svg>
      <svg className="fil-d" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 6L0.803849 -9.78799e-07L11.1962 -7.02746e-08L6 6Z" fill="#C4C4C4"/>
      </svg>
    </>
    )
  }
};

export default Finance;