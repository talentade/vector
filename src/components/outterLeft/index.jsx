import React, { Component } from 'react';
import { connect } from 'react-redux';
import { leftNavData, adminLeftNavData } from '../../utils/dummyData';
import Lnav1 from '../../themes/images/tradeDashboard/l_nav1.svg';
import { NavLink } from 'react-router-dom';
import app from '../../services/app';
import './index.scss';

class OutterLeftNav extends Component {
  constructor(props) {
    super(props);

    this.navClickedStyles = {
      width: '60px',
      alignItems: 'center',
      overflow: 'hidden',
    };

    this.listStyles = {
      width: '35px !important',
    };
  }

  urlName (p = null) {
    return (p == null ? window.location.pathname : p).replace("/", "").toLowerCase();
  }

  render() {
    const activeStyle = {
      backgroundColor: '#00A880',
      borderRadius: '5px !important',
    };

    const isAdmin  = this.props.isAdmin;
    const navData  = isAdmin ? adminLeftNavData : leftNavData;
    let nClicked   = this.props.outterNavClicked;
    let page = window.location.pathname.replace("/", "").toLowerCase();
    let isclk = app.isVerified() || app.isAdmin();

    return (
      <div
        className={'outter-left'+(isclk ? "" : " --disabled")}
        style={nClicked ? this.navClickedStyles : null}
      >
        <ul className={'left-nav'+(isAdmin ? ' isAdmin' : '')}>
          <li onClick={this.props.handleOutterClick} className='outter-ham'>
            <img src={Lnav1} alt='' />
          </li>
          {navData.map((nav, idx) => (
            <li
              key={`${idx}-1`}
              onClick={
                nav.name === 'trade'
                  ? this.props.handleNavClick
                  : nav.name === 'transactions'
                  ? this.props.handleTransactionNavClick
                  : null
              }
              style={{width: nClicked ? '35px' : null}}
              className={'link-icons '+nav.name+(page == nav.name ? ' active' : '')}
            >
            {(nav.name === 'trade' || nav.name === 'market' || (this.urlName() === 'transactions' && this.urlName(nav.path) === 'transactions')) && isclk ?
            (
              <NavLink
                to={nav.path}
                activeStyle={activeStyle}
                className={nav.className}
                style={
                  nClicked ? this.props.listStyles : null
                }
              >
                <img src={nav.imageUrl} alt='nav-logo' />
                {!nClicked ? (
                  <p className='outter-lnav-text'>{nav.text}</p>
                ) : null}
              </NavLink>
            ) : isclk ? (
              <a
                href={nav.path}
                activeStyle={activeStyle}
                className={nav.className}
                style={
                  nClicked ? this.props.listStyles : null
                }
              >
                <img src={nav.imageUrl} alt='nav-logo' />
                {!nClicked ? (
                  <p className='outter-lnav-text'>{nav.text}</p>
                ) : null}
              </a>
            ) : 
              <a
                activeStyle={activeStyle}
                className={nav.className}
                style={
                  nClicked ? this.props.listStyles : null
                }
              >
                <img src={nav.imageUrl} alt='nav-logo' />
                {!nClicked ? (
                  <p className='outter-lnav-text'>{nav.text}</p>
                ) : null}
              </a>}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ outterNav }) => ({
  outterNavClicked: outterNav,
});

export default connect(mapStateToProps)(OutterLeftNav);
