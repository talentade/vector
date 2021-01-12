import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import UsersTable from  './userstable.jsx';
import '../../components/standard/standard.scss';
import './index.scss';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';
import exportIcon from "../../themes/images/export.png";
import check from '../../themes/images/check-mark.png';
import Pagination from '../../components/paginationTwo/index';
import Spinner from '../../components/spinner/index';
import Assign from '../../components/re-assign/index';
import { ConfirmModal, CallBack } from '../../components/popups/index';
import '../../components/standard/table.scss';
import server from '../../services/server';
import app from '../../services/app';


class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page_no: 1,
      callback: false,
      page_size: app.maxrow,
      filter: '',
      assign: false,
      users: [],
      admins: [],
      assign: false,
      showLoader: true,
      data: [],
      callback: false,
      callbackTxt: '',
      soft_delete: "all",
      utype: "all",
      restore: false,
      confirmID: '',
      confirmModal: false,
    }
  }

  async componentDidMount() {
    await this.getAllAdmins();
    await this.getAllUsers();

    window.NO_AUTO_PAGER = true;

    $(window).on("resetPager", () => {
      this.setState({page_size: app.page_size(), page_no: 1});
    });
  }

  getAllUsers = async () => {
    try {
      let users = await server.getAllUsers();
      this.setState({users: users.data, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  getAllAdmins = async () => {
    try {
      let users = await server.getAllAdmins();
      this.setState({admins: users.data, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  deleteUser = async () => {
    this.setState({showLoader: true});
    try {
      let del = await server.deleteUser(this.state.confirmID);
      this.setState({showLoader: false, callback: true, callbackTxt: 'Delete successfull'});
      await this.getAllUsers();
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  restoreUser = async () => {
    this.setState({showLoader: true});
    try {
      let del = await server.restoreUser(this.state.confirmID);
      this.setState({showLoader: false, callback: true, callbackTxt: 'Restore successfull'});
      await this.getAllUsers();
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  accManager = (aid) => {
    let assto = this.state.admins.filter((o) => {
      return o.user_id == aid
    })[0];
    return (assto.first_name+" "+assto.last_name).ucwords();
  }

  render() {
    let { page_no, page_size, users, filter, soft_delete, utype } = this.state;

    filter = filter.toLowerCase();

    if(filter.length) {
      users = users.filter((c) => {
        return (
          c.first_name.toLowerCase().match(filter.toLowerCase()) ||
          c.last_name.toLowerCase().match(filter.toLowerCase()) ||
          c.email.toLowerCase().match(filter.toLowerCase()) ||
          c.source.toLowerCase().match(filter.toLowerCase()) ||
          c.phone_number.toLowerCase().match(filter.toLowerCase()) ||
          app.uid(c.user_id).toLowerCase().match(filter.toLowerCase()) ||
          (c.first_name + " " + c.last_name).toLowerCase().match(filter.toLowerCase()) ||
          (c.last_name + " " + c.first_name).toLowerCase().match(filter.toLowerCase())
        );
      });
    }
    if(soft_delete != "all") {
      users = users.filter((c) => {
        return c.soft_delete == soft_delete;
      });
    }

    let max_rows = users.length;
    let stt = (page_no-1)*page_size;
    let max = stt+page_size;
        max = max > max_rows ? max_rows : max;
      users = users.slice(stt, max > max_rows ? max_rows : max);

    return (
      <Container>
      <Spinner showSpinner={this.state.showLoader} />
      <div className="col-12" id="users-container">
        <div className="users-section-right">
          <Breadcrumbs breads="Home, Lists, Users" />
          <h1 className="page-title">Users</h1>
          <TableFilters table="users" assign={() => this.setState({assign: true})} sd={(e) => this.setState({soft_delete: e.target.value, page_no: 1})} search={(e) => this.setState({filter: e.target.value})} />
          {
              this.state.assign ?
                <Assign
                  cancel={() => this.setState({assign: false})}
                  success={() => { this.setState({assign: false, callback: true, callbackTxt: 'Assigned successfully'}); this.getAllUsers(); }}
                  data={this.state.data}
                  admins={this.state.admins}
                /> : null
            }

            <ConfirmModal
              head={(this.state.restore ? "Restore" : "Delete")+" this user?"}
              text="Click YES to confirm"
              show={this.state.confirmModal}
              cancel={() => this.setState({confirmModal: false})}
              confirm={() => { this.setState({confirmModal: false}); this.state.restore ? this.restoreUser() : this.deleteUser(); }}
            />

            <CallBack
              head="Success"
              show={this.state.callback}
              text={this.state.callbackTxt}
              cancel={(e) => this.setState({callback: false})}
            />

            <ul className="table-header">
              <li>USER ID</li>
              <li>FULLNAME</li>
              <li>PHONE NUMBER</li>
              <li>REGISTRATION DATE</li>
              <li>COUNTRY</li>
              <li>BALANCE</li>
              <li>ACCOUNT MANAGER</li>
              <li>SOURCE</li>
              <li>ACTION</li>
            </ul>

            {
              users.map((user) => (
                <ul className="table-body" key={`${Math.random()} ${Math.random()}`}>
                  <li><Link className="txt-info" to={"/usersprofile/"+user.user_id}>{app.uid(user.user_id)}</Link></li>
                  <li><Link className="txt-info" to={"/usersprofile/"+user.user_id}>{user.first_name+" "+user.last_name}</Link></li>
                  <li><span className="txt-default">{user.phone_number}</span></li>
                  <li><span className="txt-default">{user.create_time.length ? (app.cleanDate(user.create_time).split(" ")[0]+" "+app.cleanDate(user.create_time).split(" ")[1]) : "NOT STATED"}</span></li>
                  <li>{user.country.length ? user.country : '--'}</li>
                  <li><span className="txt-success">${user.bal.toFixed(2)}</span></li>
                  <li><span className="txt-default">{user.aid.length ? this.accManager(user.aid) : '--'}</span></li>
                  <li><span className="txt-default">{user.source == 'undefined' ? "CRM" : user.source}</span></li>
                  <li>
                    <Link className="tb-action" to={"/usersprofile/"+user.user_id} style={{position: "relative", top: "3px"}}>
                      <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                      </svg>
                    </Link>
                    <img src={exportIcon} onClick={() => this.setState({data: user, assign: true})} className="tb-action" width="20" height="20" style={{position: "relative", left: "-2px"}} />
                    {user.soft_delete > 0 ? (
                      <img src={check} onClick={() => this.setState({confirmID: user.user_id, confirmModal: true, restore: true})} style={{height: "19px", width: "20px", marginLeft: "10px", cursor: "pointer"}} />
                    ) : (
                      <svg onClick={() => this.setState({confirmID: user.user_id, confirmModal: true, restore: false})} className="tb-action" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FFE602"/>
                      </svg>
                    )}
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
};

export default Users;
