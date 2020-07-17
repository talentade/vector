import React from 'react';
import './index.scss';

const RestrictionNav = ({
  selectedTab,
  handleClick,
  minimizeSideBar,
  restrictionNav,
}) => {
  return (
    <ul
      className={`restriction-nav ${
        minimizeSideBar ? 'trans-nav-min' : null
      } ${!restrictionNav ? 'hide-trans-nav' : null}`}
    >
      <li className={`first ${selectedTab.match('support specialist') ? 'selected-trans-tab' : null} ${minimizeSideBar ? 'minimize-trans' : null}`} onClick={handleClick}>
        <div>Support Specialist</div>
      </li>
      <li className={`second ${selectedTab.match('sales manager') ? 'selected-trans-tab' : null} ${minimizeSideBar ? 'minimize-trans' : null}`} onClick={handleClick}>
        <div>Sales Manager</div>
      </li>
      <li className={`third ${selectedTab.match('finance manager') ? 'selected-trans-tab' : null} ${minimizeSideBar ? 'minimize-trans' : null}`} onClick={handleClick}>
        <div>Finance Manager</div>
      </li>
      <li className={`fourth ${selectedTab.match('retention manager') ? 'selected-trans-tab' : null} ${minimizeSideBar ? 'minimize-trans' : null}`} onClick={handleClick}>
        <div>Retention Manager</div>
      </li>
      <li className={`fifth ${selectedTab.match('stakeholders') ? 'selected-trans-tab' : null} ${minimizeSideBar ? 'minimize-trans' : null}`} onClick={handleClick}>
        <div>Stakeholders</div>
      </li>
    </ul>
  );
};

export default RestrictionNav;
