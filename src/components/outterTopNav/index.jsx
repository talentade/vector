import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import MessageBox from '../messageBox/index';
import NotificationBox from '../notifications/index';
import HoverDropdown from '../hoverDropdown/index';
import userDp from '../../themes/images/dummydp.png';
import Tnav1 from "../../themes/images/tradeDashboard/t_nav1.svg";
import Tnav2 from "../../themes/images/tradeDashboard/t_nav2.svg";
import Tnav3 from "../../themes/images/tradeDashboard/t_nav3.png";
import Tnav4 from "../../themes/images/tradeDashboard/t_nav4.svg";
import newMessage from "../../themes/sounds/new.ogg";
import liveChat from "../../themes/images/live-chat.png";
import { Logout } from '../../components/popups/index';
import HeaderImage from "../../themes/images/avariz_logo.png";
import app from '../../services/app';
import './index.scss';

class OutterTopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      mbox: false,
      ibox: false,
      newNotice: 0,
      newMessage: 0,
      showLogout: false
    }
    this.audio = new Audio(require("../../themes/sounds/new.ogg").default);
    this.notify = new Audio(require("../../themes/sounds/note.ogg").default);
  }

  ring = (n) => {
    n = Number(n);
    this.setState({newMessage: n});
    if(n > 0) {
      $(this.audio)[0].play();
    }
  }

  ring2 = (n) => {
    n = Number(n);
    this.setState({newNotice: n});
    if(n > 0) {
      $(this.notify)[0].play();
    }
  }

  onShow = () => {
    setTimeout(() => {
      let element = document.getElementById("messageList");
      element.scrollTop = element.scrollHeight - element.clientHeight;
      window.scrollChat = true;
    }, 250);
  }

  render() {

    const { isAdmin, profileImage, email, firstName, lastName, balance, handleLogout } = this.props;
    return (
      <>
        <Logout show={this.state.showLogout} cancel={(e) => this.setState({showLogout: false})} confirm={handleLogout} />
        <div className='top-nav'>
          {isAdmin ? (null) : (
            <img src={HeaderImage} alt='' style={{width: "30px"}} />
          )}
          {isAdmin ? (
            <ul className={'top-nav-list'+(isAdmin ? " _admin" : "")} style={{width: "auto"}}>
              <li className={'dropdown'+(this.state.hover ? ' hover' : '')}>
                {this.state.hover && (
                  <div className='overlay drop' onClick={() => this.setState({mbox: false, hover: false})}></div>
                )}
                <img src={profileImage ? profileImage : userDp} style={{border: "1px solid #fff"}} alt='' onMouseEnter={() => this.setState({hover: true})} onClick={() => this.setState({hover: true})}/>
                {/*<HoverDropdown
                  name={`${firstName} ${lastName}`}
                  email={email}
                  balance={`$${balance}`}
                />*/}
              </li>
              <li style={{opacity: 1}} className='hide-mobile nav-aname'>
                <span className="fl"><Link to="/Profile" style={{color: "#fff"}}>{`${firstName} ${lastName}`}</Link></span>
                <span className="em"><Link to="/Profile" style={{color: "#fff"}}>{email}</Link></span>
              </li>
              <li style={{opacity: 1, display: "none"}}><button className="save-changes" id="save-all-changes-btn" style={{cursor: "pointer"}}>Save All Changes</button></li>
              {/*
              <li style={{opacity: 1}} className="admin-search-input">
              <input type="text" onChange={(e) => {}} name="adminSearch" placeholder="Search here" />
              </li>
              <li style={{opacity: 1}} className="admin-nav-plus">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.73074 0.369998V6.88H0.370742V9.19H6.73074V15.67H9.28074V9.19H15.6707V6.88H9.28074V0.369998H6.73074Z" fill="white"/>
                </svg>
              </li>*/}
              {/*<li style={{marginLeft: "2em"}} className={'live-chat-mbox'+(this.state.mbox ? ' mbox' : '')}>
                {this.state.mbox && (
                  <div className='overlay drop' onClick={() => this.setState({mbox: false, hover: false})}></div>
                )}
                <img src={liveChat} alt='' onMouseEnter={() => (!window.BuyandsellModalPopup) && this.setState({mbox: true})} onClick={() => { window.BuyandsellModalPopup = false; this.setState({mbox: true}) }} />
                <MessageBox
                  name={`${firstName} ${lastName}`}
                  show={this.state.mbox}
                />
              </li>*/}
              <li style={{position: "relative", cursor: "pointer", marginLeft: "2em"}}>
                {this.state.ibox && (
                  <div className='overlay drop' onClick={() => { this.setState({newMessage: 0, mbox: false, hover: false, ibox: false}); }}></div>
                )}
                <img src={Tnav2} alt='' onMouseEnter={() => { if(!window.BuyandsellModalPopup) { this.setState({mbox: false, ibox: true, newNotice: 0}); }}} onClick={() => { window.BuyandsellModalPopup = false; this.setState({mbox: false, ibox: true, newNotice: 0}); }} />
                {this.state.newNotice > 0 ? <span className="__newNotice"></span> : null}

                <NotificationBox
                  show={this.state.ibox}
                  ring={(n) => this.ring2(n)}
                />
              </li>
              {/*<li style={{marginLeft: "2em"}}><img src={Tnav2} alt='' /></li>*/}
              <li onClick={(e) => this.setState({showLogout: true})} className="logout-btn" style={{marginLeft: "2em"}}><img src={Tnav4} alt='' /></li>
            </ul>
          ) : (
          <ul className='top-nav-list'>
            <li className={'live-chat-mbox'+(this.state.mbox ? ' mbox' : '')} style={{position: "relative", cursor: "pointer"}}>
              {this.state.mbox && (
                <div className='overlay drop' onClick={() => { this.setState({newMessage: 0, mbox: false, hover: false, ibox: false}); }}></div>
              )}
              <img src={liveChat} alt='' onMouseEnter={() => { if(!window.BuyandsellModalPopup) { this.setState({mbox: true, ibox: false, newMessage: 0}); this.onShow(); }}} onClick={() => { window.BuyandsellModalPopup = false; this.setState({mbox: true, ibox: false, newMessage: 0}); this.onShow(); }} />
              {this.state.newMessage > 0 ? <span className="__newMessage">{this.state.newMessage}</span> : null}
              <MessageBox
                name={`${firstName} ${lastName}`}
                show={this.state.mbox}
                ring={(n) => this.ring(n)}
              />
            </li>
            <li style={{position: "relative", cursor: "pointer"}}>
              {this.state.ibox && (
                <div className='overlay drop' onClick={() => { this.setState({newMessage: 0, mbox: false, hover: false, ibox: false}); }}></div>
              )}
              <img src={Tnav2} alt='' onMouseEnter={() => { if(!window.BuyandsellModalPopup) { this.setState({mbox: false, ibox: true, newNotice: 0}); }}} onClick={() => { window.BuyandsellModalPopup = false; this.setState({mbox: false, ibox: true, newNotice: 0}); }} />
              {this.state.newNotice > 0 ? <span className="__newNotice"></span> : null}

              <NotificationBox
                show={this.state.ibox}
                ring={(n) => this.ring2(n)}
              />
            </li>
            <li className='hide-mobile'>{`${firstName} ${lastName}`}</li>
            <li className={'dropdown'+(this.state.hover ? ' hover' : '')}>
              {this.state.hover && (
                <div className='overlay drop' onClick={() => this.setState({hover: false})}></div>
              )}
              <img src={profileImage ? profileImage : Tnav3} style={{border: "1px solid #fff"}} alt='' onMouseEnter={() => this.setState({hover: true})} onClick={() => this.setState({hover: true})}/>
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
