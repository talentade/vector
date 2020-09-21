import React, { Component } from 'react';
import MessageBox from '../messageBox/index';
import HoverDropdown from '../hoverDropdown/index';
import userDp from '../../themes/images/dummydp.png';
import Tnav1 from "../../themes/images/tradeDashboard/t_nav1.svg";
import Tnav2 from "../../themes/images/tradeDashboard/t_nav2.svg";
import Tnav3 from "../../themes/images/tradeDashboard/t_nav3.png";
import Tnav4 from "../../themes/images/tradeDashboard/t_nav4.svg";
import liveChat from "../../themes/images/live-chat.png";
import { Logout } from '../../components/popups/index';
import HeaderImage from "../../themes/images/company_logo.png";
import './index.scss';

class OutterTopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      mbox: false,
      showLogout: false
    }
  }

  render() {
    const { isAdmin, profileImage, email, firstName, lastName, balance, handleLogout } = this.props;
    return (
      <>
        <Logout show={this.state.showLogout} cancel={(e) => this.setState({showLogout: false})} confirm={handleLogout} />
        <div className='top-nav'>
          {isAdmin ? (null) : (
            <img src={HeaderImage} alt='' />
          )}
          {isAdmin ? (
            <ul className={'top-nav-list'+(isAdmin ? " _admin" : "")} style={{width: "auto"}}>
              <li className={'dropdown'+(this.state.hover ? ' hover' : '')}>
                {this.state.hover && (
                  <div className='overlay drop' onClick={() => this.setState({mbox: false, hover: false})}></div>
                )}
                <img src={profileImage ? userDp : userDp} alt='' onMouseEnter={() => this.setState({hover: true})} onClick={() => this.setState({hover: true})}/>
                {/*<HoverDropdown
                  name={`${firstName} ${lastName}`}
                  email={email}
                  balance={`$${balance}`}
                />*/}
              </li>
              <li style={{opacity: 0}} className='hide-mobile nav-aname'><span className="fl">{`${firstName} ${lastName}`}</span><span className="em">{email}</span></li>
              <li style={{opacity: 0}}><button className="save-changes">Save All Changes</button></li>
              <li style={{opacity: 0}} className="admin-search-input">
              <input type="text" onChange={(e) => {}} name="adminSearch" placeholder="Search here" /></li>
              <li style={{opacity: 0}} className="admin-nav-plus">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.73074 0.369998V6.88H0.370742V9.19H6.73074V15.67H9.28074V9.19H15.6707V6.88H9.28074V0.369998H6.73074Z" fill="white"/>
                </svg>
              </li>
              <li style={{marginLeft: "2em"}} className={'live-chat-mbox'+(this.state.mbox ? ' mbox' : '')}>
                {this.state.mbox && (
                  <div className='overlay drop' onClick={() => this.setState({mbox: false, hover: false})}></div>
                )}
                <img src={liveChat} alt='' onMouseEnter={() => (!window.BuyandsellModalPopup) && this.setState({mbox: true})} onClick={() => { window.BuyandsellModalPopup = false; this.setState({mbox: true}) }} />
                <MessageBox
                  name={`${firstName} ${lastName}`}
                  show={this.state.mbox}
                />
              </li>
              <li style={{marginLeft: "2em"}}><img src={Tnav2} alt='' /></li>
              <li onClick={(e) => this.setState({showLogout: true})} className="logout-btn" style={{marginLeft: "2em"}}><img src={Tnav4} alt='' /></li>
            </ul>
          ) : (
          <ul className='top-nav-list'>
            <li className={'live-chat-mbox'+(this.state.mbox ? ' mbox' : '')}>
              {this.state.mbox && (
                <div className='overlay drop' onClick={() => this.setState({mbox: false, hover: false})}></div>
              )}
              <img src={liveChat} alt='' onMouseEnter={() => (!window.BuyandsellModalPopup) && this.setState({mbox: true})} onClick={() => { window.BuyandsellModalPopup = false; this.setState({mbox: true}) }}/>
              <MessageBox
                name={`${firstName} ${lastName}`}
                show={this.state.mbox}
              />
            </li>
            <li><img src={Tnav2} alt='' /></li>
            <li className='hide-mobile'>{`${firstName} ${lastName}`}</li>
            <li className={'dropdown'+(this.state.hover ? ' hover' : '')}>
              {this.state.hover && (
                <div className='overlay drop' onClick={() => this.setState({hover: false})}></div>
              )}
              <img src={profileImage ? profileImage : Tnav3} alt='' onMouseEnter={() => this.setState({hover: true})} onClick={() => this.setState({hover: true})}/>
              <HoverDropdown
                name={`${firstName} ${lastName}`}
                email={email}
                balance={`$${balance}`}
              />
            </li>
            <li onClick={(e) => this.setState({showLogout: true})} className="logout-btn"><img src={Tnav4} alt='' /></li>
          </ul>)}
        </div>
      </>
    );
  }
}

export default OutterTopNav;
