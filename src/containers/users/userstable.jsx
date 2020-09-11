import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import nigeria from '../../themes/images/flags/nigeria.png';
import server from '../../services/server';
import app from '../../services/app';

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  async componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    try {
      let users = await server.getAllUsers();
      this.setState({users: users.data});
    } catch(e) {
      return e;
    }

  }

  render () {
    return (
          <>
            <ul className="table-header">
              <li>USER ID</li>
              <li>FULLNAME</li>
              <li>PHONE NUMBER</li>
              <li>REGISTRATION DATE</li>
              <li>COUNTRY</li>
              <li>BALANCE</li>
              <li>ACCOUNT MANAGER</li>
              <li>SOURCE</li>
              <li>LAST SEEN</li>
              <li>ACTION</li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>

            {
              this.state.users.map((user) => (
                <ul className="table-body" key={`${Math.random()} ${Math.random()}`}>
                  <li><Link className="txt-info" to="/usersprofile">{app.uid(user.user_id)}</Link></li>
                  <li><span className="txt-info">{user.first_name+" "+user.last_name}</span></li>
                  <li><span className="txt-default">{user.phone_number}</span></li>
                  <li><span className="txt-default">10-12-2020</span></li>
                  <li>{/*<img src={nigeria} className="flag"/>*/}{user.country}</li>
                  <li><span className="txt-success">$301.34</span></li>
                  <li><span className="txt-default">Samson Oladuni</span></li>
                  <li><span className="txt-default">{user.source}</span></li>
                  <li><span className="txt-success">Online</span></li>
                  <li>
                    <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                    </svg>
                    <svg className="tb-action" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FFE602"/>
                    </svg>
                  </li>
                  <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
                </ul>
              ))
            }
            {/*<ul className="table-body">
              <li><Link className="txt-info" to="/usersprofile">T480248</Link></li>
              <li><span className="txt-info">Adeoye Talent Adeiye</span></li>
              <li><span className="txt-default">+449031900410</span></li>
              <li><span className="txt-default">10-12-2020</span></li>
              <li><img src={nigeria} className="flag"/> Nigeria</li>
              <li><span className="txt-success">$301.34</span></li>
              <li><span className="txt-default">Samson Oladuni</span></li>
              <li><span className="txt-default">Facebook ads</span></li>
              <li><span className="txt-success">Online</span></li>
              <li>
                <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                </svg>
                <svg className="tb-action" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FFE602"/>
                </svg>
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>
            <ul className="table-body">
              <li><Link className="txt-info" to="/usersprofile">T480248</Link></li>
              <li><span className="txt-info">Adeoye Talent Adeiye</span></li>
              <li><span className="txt-default">+449031900410</span></li>
              <li><span className="txt-default">10-12-2020</span></li>
              <li><img src={nigeria} className="flag"/> Nigeria</li>
              <li><span className="txt-success">$301.34</span></li>
              <li><span className="txt-default">Samson Oladuni</span></li>
              <li><span className="txt-default">Facebook ads</span></li>
              <li><span className="txt-success">Online</span></li>
              <li>
                <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                </svg>
                <svg className="tb-action" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FFE602"/>
                </svg>
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>
            <ul className="table-body">
              <li><Link className="txt-info" to="/usersprofile">T480248</Link></li>
              <li><span className="txt-info">Adeoye Talent Adeiye</span></li>
              <li><span className="txt-default">+449031900410</span></li>
              <li><span className="txt-default">10-12-2020</span></li>
              <li><img src={nigeria} className="flag"/> Nigeria</li>
              <li><span className="txt-success">$301.34</span></li>
              <li><span className="txt-default">Samson Oladuni</span></li>
              <li><span className="txt-default">Facebook ads</span></li>
              <li><span className="txt-success">Online</span></li>
              <li>
                <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                </svg>
                <svg className="tb-action" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FFE602"/>
                </svg>
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>
            <ul className="table-body">
              <li><Link className="txt-info" to="/usersprofile">T480248</Link></li>
              <li><span className="txt-info">Adeoye Talent Adeiye</span></li>
              <li><span className="txt-default">+449031900410</span></li>
              <li><span className="txt-default">10-12-2020</span></li>
              <li><img src={nigeria} className="flag"/> Nigeria</li>
              <li><span className="txt-success">$301.34</span></li>
              <li><span className="txt-default">Samson Oladuni</span></li>
              <li><span className="txt-default">Facebook ads</span></li>
              <li><span className="txt-success">Online</span></li>
              <li>
                <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                </svg>
                <svg className="tb-action" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FFE602"/>
                </svg>
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>*/}

            <Pagination2 />
          </>
        );
  }
}

export default UsersTable;