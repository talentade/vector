import React, { Component } from 'react';
import HoverDropdown from '../hoverDropdown/index';
import Tnav1 from "../../themes/images/tradeDashboard/t_nav1.svg";
import Tnav2 from "../../themes/images/tradeDashboard/t_nav2.svg";
import Tnav3 from "../../themes/images/tradeDashboard/t_nav3.png";
import Tnav4 from "../../themes/images/tradeDashboard/t_nav4.svg";
import HeaderImage from "../../themes/images/company_logo.png";
import './index.scss';

class OutterTopNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profileImage, email, firstName, lastName, balance, handleLogout } = this.props;
    return (
      <div className='top-nav'>
        <img src={HeaderImage} alt='' />
        <ul className='top-nav-list'>
          <li><img src={Tnav1} alt='' /></li>
          <li><img src={Tnav2} alt='' /></li>
          <li className='hide-mobile'>{`${firstName} ${lastName}`}</li>
          <li className='dropdown'>
            <img src={profileImage ? profileImage : Tnav3} alt='' />
            <HoverDropdown
              name={`${firstName} ${lastName}`}
              email={email}
              balance={`$${balance}`}
            />
          </li>
          <li onClick={handleLogout} className="logout-btn"><img src={Tnav4} alt='' /></li>
        </ul>
      </div>
    );
  }
}

export default OutterTopNav;
