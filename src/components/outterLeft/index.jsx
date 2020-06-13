import React, { Component } from 'react';
import { connect } from 'react-redux';
import { leftNavData } from '../../utils/dummyData';
import Lnav1 from '../../themes/images/tradeDashboard/l_nav1.svg';
import { NavLink } from 'react-router-dom';
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

  render() {
    const activeStyle = {
      backgroundColor: '#00A880',
      borderRadius: '5px !important',
    };

    return (
      <div
        className='outter-left'
        style={this.props.outterNavClicked ? this.navClickedStyles : null}
      >
        <ul className='left-nav'>
          <li onClick={this.props.handleOutterClick} className='outter-ham'>
            <img src={Lnav1} alt='' />
          </li>
          {leftNavData.map((nav, idx) => (
            <li
              key={`${idx}-1`}
              onClick={
                nav.name === 'trade'
                  ? this.props.handleNavClick
                  : nav.name === 'transactions'
                  ? this.props.handleTransactionNavClick
                  : null
              }
              style={{ width: this.props.outterNavClicked ? '35px' : null }}
              className='link-icons'
            >
              <NavLink
                to={nav.path}
                activeStyle={activeStyle}
                className={nav.className}
                style={
                  this.props.outterNavClicked ? this.props.listStyles : null
                }
              >
                <img src={nav.imageUrl} alt='nav-logo' />
                {!this.props.outterNavClicked ? (
                  <p className='outter-lnav-text'>{nav.text}</p>
                ) : null}
              </NavLink>
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
