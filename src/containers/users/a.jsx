import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import exportIcon from "../../themes/images/export.png";
import Pagination from '../../components/Pagination/index';
import Assign from '../../components/re-assign/index';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import server from '../../services/server';
import app from '../../services/app';
import './a.scss';

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      admins: [],
      assign: false,
      showLoader: true,
      data: []
    }
  }

  async componentDidMount() {
    await this.getAllAdmins();
  }

  getAllAdmins = async () => {
    try {
      let users = await server.getAllAdmins();
      this.setState({admins: users.data, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  render () {
    if(!this.state.admins.length) return null;
    
    return (
          <>
            {
              this.state.assign ?
                <Assign
                  cancel={() => this.setState({assign: false})}
                  data={this.state.data}
                  admins={this.state.admins}
                /> : null
            }

            <ul className="table-header adm">
              <li>FULLNAME</li>
              <li>EMAIL</li>
              <li>PHONE NUMBER</li>
              <li>DATE ASSIGNED</li>
              <li className="act">ACTION</li>
            </ul>

            {
              this.props.users.map((user) => (
                <ul className="table-body adm" key={`${Math.random()} ${Math.random()}`}>
                  <li><Link className="txt-info" to={"/usersprofile/"+user.user_id}>{user.first_name+" "+user.last_name}</Link></li>
                  <li><small className="txt-default">{user.email}</small></li>
                  <li><span className="txt-default">{user.phone_number}</span></li>
                  <li><span className="txt-default">{app.cleanDate(user.ass_date)}</span></li>
                  <li className="act">
                    <img src={exportIcon} onClick={() => this.setState({data: user, assign: true})} className="tb-action" width="20" height="20" style={{position: "relative", left: "-2px"}} />
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

export default UsersTable;