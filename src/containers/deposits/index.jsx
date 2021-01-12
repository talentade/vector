import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';
import Pagination from '../../components/paginationTwo/index';
import '../../components/standard/table.scss';
import nigeria from '../../themes/images/flags/nigeria.png';
import server from '../../services/server';
import app from '../../services/app';
import Spinner from '../../components/spinner/index';
import Deposit from '../../components/adminDeposit/index';
import dep from './deposit.svg';
import ded from './deduct.svg';
import cred from './credit.svg';
import { CallBack } from '../../components/popups/index';
import '../../components/standard/standard.scss';
import './index.scss';


class Deposits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmID: 0,
      confirmUID: 0,
      confirmModal: false,
      page_no: 1,
      callback: false,
      page_size: app.maxrow,
      data: null,
      filter: '',
      uid: '',
      type: '',
      users: [],
      adminDep: false,
      showLoader: true
    }
  }

  async componentDidMount() {
    this.getAllUsers();

    window.NO_AUTO_PAGER = true;

    $(window).on("resetPager", () => {
      this.setState({page_size: app.page_size(), page_no: 1});
    });

  }

  getAllUsers = async () => {
    this.setState({showLoader: true});
    try {
      let users = await server.getAllUsers();
      this.setState({users: users.data, showLoader: false});
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  render () {
    let { page_no, page_size, users, filter } = this.state;

    filter = filter.toLowerCase();
    users = filter.length ? users.filter((c) => {
      return (
        c.first_name.toLowerCase().match(filter.toLowerCase()) ||
        c.last_name.toLowerCase().match(filter.toLowerCase()) ||
        c.email.toLowerCase().match(filter.toLowerCase()) ||
        c.phone_number.toLowerCase().match(filter.toLowerCase()) ||
        app.uid(c.user_id).toLowerCase().match(filter.toLowerCase()) ||
        (c.first_name + " " + c.last_name).toLowerCase().match(filter.toLowerCase()) ||
        (c.last_name + " " + c.first_name).toLowerCase().match(filter.toLowerCase())
      );
    }) : users;

    let max_rows = users.length;
    let stt = (page_no-1)*page_size;
    let max = stt+page_size;
        max = max > max_rows ? max_rows : max;
      users = users.slice(stt, max > max_rows ? max_rows : max);

    return (
      <Container>
      <Spinner showSpinner={this.state.showLoader} />
      <div className="col-12" id="depo-container">
        <div className="depo-section-right">
          <Breadcrumbs breads="Home, Finance, Deposits" />
          <h1 className="page-title">Deposits</h1>
          <TableFilters table="deposits" search={(e) => this.setState({filter: e.target.value})} />
            { this.state.adminDep ?
              <Deposit
                uid={this.state.uid}
                type={this.state.type}
                cancelClick={() => this.setState({adminDep: false})}
                confirmClick={() => { this.setState({callback: true, adminDep: false}); this.getAllUsers(); }}
              /> : null }

            <CallBack
              head="Success"
              text="Transaction successfull"
              show={this.state.callback}
              cancel={(e) => this.setState({callback: false})}
            />

            <ul className="table-header">
              <li>S/N</li>
              <li>USER ID</li>
              <li>FULLNAME</li>
              <li>PHONE NUMBER</li>
              <li>LIVE ACCOUNTS</li>
              <li>TOTAL BALANCE</li>
              <li>TOTAL CREDIT</li>
              <li>ACTION</li>
            </ul>

            {
              users.map((user, idx) => (
                <ul className="table-body" key={`${Math.random()} ${Math.random()}`}>
                  <li>{idx + 1}</li>
                  <li><Link className="txt-info" to={"/usersprofile/"+user.user_id}>{app.uid(user.user_id)}</Link></li>
                  <li><Link className="txt-info" to={"/usersprofile/"+user.user_id}>{user.first_name+" "+user.last_name}</Link></li>
                  <li><span className="txt-default">{user.phone_number}</span></li>
                  <li><span className="txt-default">{user.tot}</span></li>
                  <li><span className="txt-success">${user.bal.toFixed(2)}</span></li>
                  <li><span className="txt-success">${user.cred.toFixed(2)}</span></li>
                  <li>
                    <img className="tb-action" onClick={() => this.setState({uid: user.user_id, type: "balance", adminDep: true})} src={dep} width="18" height="20" />
                    <img className="tb-action" onClick={() => this.setState({uid: user.user_id, type: "credit", adminDep: true})} src={cred} width="18" height="20" />
                    <img className="tb-action" onClick={() => this.setState({uid: user.user_id, type: "deduct", adminDep: true})} src={ded} width="18" height="18" />
                  </li>
                </ul>
              ))
            }

            <Pagination length={page_size} max_rows={max_rows} page_no={page_no} paginationChange={(p) => { this.setState({page_no: p}); }}/>
        </div>
      </div>
      </Container>
        );
  }
}

export default Deposits;