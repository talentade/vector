import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import nigeria from '../../themes/images/flags/nigeria.png';

class AdminsTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
          <>
            <ul className="table-header">
              <li className="shot">ADMIN ID</li>
              <li>FULLNAME</li>
              <li>TYPE</li>
              <li>PHONE NUMBER</li>
              <li>EMAIL</li>
              <li className="shot">LAST SEEN</li>
              <li>N0. OF ASSIGNED USERS</li>
              <li className="shot">ACTION</li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>
            
            <ul className="table-body">
              <li className="shot"><Link className="txt-light" to="/usersprofile">A480248</Link></li>
              <li><span className="txt-light">Adeoye Talent Adeiye</span></li>
              <li><span className="txt-light">Support Specialist</span></li>
              <li><span className="txt-light">+449031900410</span></li>
              <li><span className="txt-light">adeoyetalent@gmail.com</span></li>
              <li className="shot"><span className="txt-light">9 hours ago</span></li>
              <li><span className="txt-default">36</span></li>
              <li className="shot">
                <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                </svg>
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>
            
            <ul className="table-body">
              <li className="shot"><Link className="txt-light" to="/usersprofile">A480248</Link></li>
              <li><span className="txt-light">Adeoye Talent Adeiye</span></li>
              <li><span className="txt-light">Support Specialist</span></li>
              <li><span className="txt-light">+449031900410</span></li>
              <li><span className="txt-light">adeoyetalent@gmail.com</span></li>
              <li className="shot"><span className="txt-default">Offline</span></li>
              <li><span className="txt-default">36</span></li>
              <li className="shot">
                <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                </svg>
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>
            
            <ul className="table-body">
              <li className="shot"><Link className="txt-light" to="/usersprofile">A480248</Link></li>
              <li><span className="txt-light">Adeoye Talent Adeiye</span></li>
              <li><span className="txt-light">Support Specialist</span></li>
              <li><span className="txt-light">+449031900410</span></li>
              <li><span className="txt-light">adeoyetalent@gmail.com</span></li>
              <li className="shot"><span className="txt-success">Online</span></li>
              <li><span className="txt-default">36</span></li>
              <li className="shot">
                <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                </svg>
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>
            
            <ul className="table-body">
              <li className="shot"><Link className="txt-light" to="/usersprofile">A480248</Link></li>
              <li><span className="txt-light">Adeoye Talent Adeiye</span></li>
              <li><span className="txt-light">Support Specialist</span></li>
              <li><span className="txt-light">+449031900410</span></li>
              <li><span className="txt-light">adeoyetalent@gmail.com</span></li>
              <li className="shot"><span className="txt-success">Online</span></li>
              <li><span className="txt-default">36</span></li>
              <li className="shot">
                <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                </svg>
              </li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
            </ul>

            <Pagination2 />
          </>
        );
  }
}

export default AdminsTable;