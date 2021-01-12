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

class Lists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navi: 1,
      stat: {users: 0, admin: 0},
      time: {users: '', admin: '', all: ''}
    }

  }

  selectList = (e) => {
    
  }

  async componentDidMount () {
    this.getUstat();
  }

  getUstat = async () => {
    try {
      let stat = await server.getUstat();
      this.setState({stat: stat.data.stat, time: stat.data.time, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  render() {
    const { navi } = this.state;
    return (
      <Container>
      <div className="col-12" id="lists-container">
        <div className="lists-section-right">
            <Breadcrumbs breads="Home, Lists" />

            <h1 className="page-title">Lists
              {/*<div className="btn-list">
                <button className="create-list imp">Import</button>
                <button className="create-list">Create List</button>
              </div>*/}
            </h1>

            <Ptab tabs="Lists library (3)" handleClick={() => {}} active="Lists library (3)" />
            {/*<TableFilters table="lists" />*/}

              <ul className="table-header">
                <li>NAME</li>
                <li>SIZE</li>
                <li>TYPE</li>
                <li>LAST UPDATED</li>
                <li>CREATOR</li>
                <li>USED IN</li>
              </ul>

            <Link to="/Users">
              <ul className="table-body _all">
                <li><span className="txt-light">All</span></li>
                <li><span className="txt-light">{this.state.stat.users+this.state.stat.admin}</span></li>
                <li><span className="txt-light">Automatic</span></li>
                <li><span className="txt-light">{this.state.time.all.length ? moment(this.state.time.all).calendar() : '-'}</span></li>
                <li><span className="txt-light">-</span></li>
                <li><span className="txt-default">0</span></li>
                {/*<div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>*/}
              </ul>
            </Link>

            <Link to="/Users">
              <ul className="table-body _users">
                <li><Link to="/Users" className="txt-light">Users</Link></li>
                <li><span className="txt-light">{this.state.stat.users}</span></li>
                <li><span className="txt-light">Automatic</span></li>
                <li><span className="txt-light">{this.state.time.users.length ? moment(this.state.time.users).calendar() : '-'}</span></li>
                <li><span className="txt-light">-</span></li>
                <li><span className="txt-default">0</span></li>
                {/*<div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>*/}
              </ul>
            </Link>

            <Link to="/Admins">
              <ul className="table-body _admins">
                <li><Link to="/Admins" className="txt-light">Admins</Link></li>
                <li><span className="txt-light">{this.state.stat.admin}</span></li>
                <li><span className="txt-light">Automatic</span></li>
                <li><span className="txt-light">{this.state.time.admin.length ? moment(this.state.time.admin).calendar() : '-'}</span></li>
                <li><span className="txt-light">-</span></li>
                <li><span className="txt-default">0</span></li>
                {/*<div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>*/}
              </ul>
            </Link>
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

export default Lists;
