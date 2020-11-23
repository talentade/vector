import React, { Component } from 'react';
import moment from 'moment';
import TableFilters from '../../components/tablefilters/index';
import { Email } from '../../components/popups/index';
import server from '../../services/server';
import app from '../../services/app';
import './useremails.scss';
import '../../components/standard/table.scss';

class UserEmails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props.profile,
      emails: false,
      data: null,
      nid: 0,
      type: 'new',
      filter: 'all',
      showEmail: false
    }

  }

  sendEmail = async (e, f, c) => {
    this.props.load();
    try {
      let sm = await server.sendEmail({uid: this.props.uid, email: e, from: f, content: c});
      this.setState({showEmail: false});
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  render () {
    let active = parseInt(this.props.active);

  	return (
      <div className={"tab-row profile-email"+(active ? ' _active' : '')} id="tab-row-email">

        <TableFilters
          table="emails"
          change={(e) => this.setState({filter: e.target.value.toLowerCase()})}
          compose={() => this.setState({data: null, type: 'new', showEmail: true})}
        />

        <Email
          show={this.state.showEmail}
          action={(t) => console.log(t)}
          email={this.state.profile.email}
          action={this.sendEmail}
          cancel={(e) => this.setState({showEmail: false})}
        />


        {
          this.props.emails.map((em) => (
            <ul className="table-header for-email">
              <li className="e-act">
                <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
                {this.StarIcon(0)}
              </li>
              <li className="e-name">{(this.props.profile.first_name+" "+this.props.profile.last_name).ucwords()}</li>
              <li className="e-mail">{em.content.length > 30 ? em.content.substr(0, 29)+"..." : em.content}</li>
              <li className="e-time">{moment(em.create_time).calendar()}</li>
            </ul>
          ))
        }
        
        {/*<ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(0)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
        <ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(0)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
        <ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(0)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
        <ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(1)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
        <ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(1)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
        <ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(1)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
        <ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(0)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
        <ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(1)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
        <ul className="table-header for-email">
          <li className="e-act">
            <label class="checkbox-container checkbox-container-2"><input type="checkbox" /><span class="checkmark"></span></label>
            {this.StarIcon(0)}
          </li>
          <li className="e-name">Adeoye Talent</li>
          <li className="e-mail">Hello, you made a request for a deposit of $300k and...</li>
          <li className="e-time">3:44 PM</li>
        </ul>
      */}

      </div>
	 )
	}

  StarIcon = (x) => {
    return (x ?
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.10326 0.816986C9.47008 0.0737407 10.5299 0.0737401 10.8967 0.816986L13.0001 5.07896C13.1458 5.37411 13.4274 5.57868 13.7531 5.62601L18.4565 6.30945C19.2767 6.42863 19.6042 7.4366 19.0107 8.01514L15.6073 11.3326C15.3716 11.5624 15.264 11.8934 15.3197 12.2178L16.1231 16.9021C16.2632 17.719 15.4058 18.342 14.6722 17.9563L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.32784 17.9563C4.59421 18.342 3.73677 17.719 3.87688 16.9021L4.68032 12.2178C4.73596 11.8934 4.62841 11.5624 4.39272 11.3326L0.989329 8.01514C0.395812 7.4366 0.723321 6.42863 1.54354 6.30945L6.24691 5.62601C6.57262 5.57868 6.85419 5.37411 6.99985 5.07896L9.10326 0.816986Z" fill="#FFE602"/>
      </svg> : 
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.55163 1.03827C9.73504 0.666646 10.265 0.666646 10.4484 1.03827L12.5518 5.30025C12.7703 5.74296 13.1926 6.04982 13.6812 6.12081L18.3846 6.80425C18.7947 6.86384 18.9584 7.36783 18.6617 7.65709L15.2583 10.9746C14.9047 11.3192 14.7434 11.8157 14.8269 12.3023L15.6303 16.9866C15.7004 17.3951 15.2717 17.7066 14.9048 17.5137L10.698 15.3021C10.261 15.0723 9.73897 15.0723 9.30199 15.3021L5.09516 17.5137C4.72835 17.7066 4.29963 17.3951 4.36969 16.9866L5.17312 12.3023C5.25658 11.8157 5.09525 11.3192 4.74173 10.9746L1.33833 7.6571C1.04158 7.36783 1.20533 6.86384 1.61544 6.80425L6.31881 6.12081C6.80738 6.04982 7.22973 5.74296 7.44822 5.30025L9.55163 1.03827Z" stroke="#C4C4C4"/>
      </svg>
    );
  }
}

export default UserEmails;