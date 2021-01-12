import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import Pagination2 from '../../components/pagination2/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import server from '../../services/server';
import app from '../../services/app';
import TableFilters from '../../components/tablefilters/index';
import UsersTable from  '../../containers/users/userstable.jsx';

import '../../components/standard/standard.scss';
import './index.scss';

class Finance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navi: 1,
      stat: {withdraw: 0, deposit: 0, transactions: 0},
      time: {withdraw: '', deposit: '', transactions: ''}
    }

  }

  async componentDidMount () {
    this.getFstat();
  }

  getFstat = async () => {
    try {
      let stat = await server.getFstat();
      this.setState({stat: stat.data.stat, time: stat.data.time, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  render() {
    const { navi } = this.state;
    return (
      <Container>
      <div className="col-12" id="finance-container">
        <div className="finance-section-right">
            <Breadcrumbs breads="Home, Finance" />

            <h1 className="page-title">Finance</h1>
            <Ptab tabs="Finance (3)" handleClick={() => {}} active="Finance (3)" />

            <ul className="table-header">
              <li>NAME</li>
              <li>SIZE</li>
              <li>TYPE</li>
              <li>LAST UPDATED</li>
              {/*<div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>*/}
            </ul>

            <Link to="/Transactions">
              <ul className="table-body _all">
                <li>Transactions</li>
                <li><span className="txt-light">{this.state.stat.transactions}</span></li>
                <li><span className="txt-light">Automatic</span></li>
                <li><span className="txt-light">{this.state.time.transactions.length ? moment(this.state.time.transactions).calendar() : '-'}</span></li>
                {/*<div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>*/}
              </ul>
            </Link>

            <Link to="/Deposits">
              <ul className="table-body _users">
                <li>Deposit</li>
                <li><span className="txt-light">{this.state.stat.deposit}</span></li>
                <li><span className="txt-light">Automatic</span></li>
                <li><span className="txt-light">{this.state.time.deposit.length ? moment(this.state.time.deposit).calendar() : '-'}</span></li>
                {/*<div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>*/}
              </ul>
            </Link>

            <Link to="/Withdrawals" className="txt-light">
              <ul className="table-body _admins">
                <li>Withdrawals</li>
                <li><span className="txt-light">{this.state.stat.withdraw}</span></li>
                <li><span className="txt-light">Automatic</span></li>
                <li><span className="txt-light">{this.state.time.withdraw.length ? moment(this.state.time.withdraw).calendar() : '-'}</span></li>
                {/*<div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>*/}
              </ul>
            </Link>

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