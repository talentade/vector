import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import nigeria from '../../themes/images/flags/nigeria.png';
import server from '../../services/server';
import app from '../../services/app';

import Deposit from '../../components/adminDeposit/index';
import dep from './deposit.svg';
import ded from './deduct.svg';
import cred from './credit.svg';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      type: '',
      users: [],
      adminDep: false,
      showLoader: true
    }
  }

  async componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    try {
      let users = await server.getAllUsers();
      this.setState({users: users.data, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  render () {
    return (
          <>
            { this.state.adminDep ?
              <Deposit
                uid={this.state.uid}
                type={this.state.type}
                cancelClick={() => this.setState({adminDep: false})}
                confirmClick={() => { this.getAllUsers(); this.setState({adminDep: false}) }}
              /> : null }

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
              this.state.users.map((user, idx) => (
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

            <div
              className='loader-container'
              style={{ display: this.state.showLoader ? 'block' : 'none' }}
            >
              <div className='loader'></div>
            </div>

            {/*<Pagination2 />*/}
          </>
        );
  }
}

export default DataTable;