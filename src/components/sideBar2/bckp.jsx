import React, { Component } from 'react';
import NavigationLink from '../navigationLink/index';
import { connect } from 'react-redux';
import Db1Nav from '../../themes/images/tradeDashboard/db1_nav.svg';
import Db2Nav from '../../themes/images/tradeDashboard/db2_nav.svg';
import Db3Nav from '../../themes/images/tradeDashboard/db3_nav.svg';
import Db4Nav from '../../themes/images/tradeDashboard/db4_nav.svg';
import Wallet from '../../themes/images/tradeDashboard/whiteWallet.svg';
import FilterIcon from '../../themes/images/tradeDashboard/filter.svg';
import './index.scss';

class SideBar extends Component {

  componentDidMount () {
    console.log("---------");
  }

 render () {
  const {
    clickHandler,
    hideText,
    currentTab,
    handleClick,
    sideNav,
    hideNav
  } = this.props;
  return (
    <div style={{ width: hideText ? '50px' : null, overflow: 'hidden', zIndex: '1000'}} className={'left'+(sideNav ? ' display-l-nav' : '')}>
      <img
        src={FilterIcon}
        alt=''
        className='filter-img'
        onClick={hideNav}
      />
      <div className='margin-top'>
        <NavigationLink
          imageUrl={Db1Nav}
          linkName='Trade'
          secondClass={currentTab === 'Trade'}
          hideText={hideText}
          handleClick={handleClick}
        />
        <NavigationLink
          imageUrl={Db2Nav}
          linkName='Open Trades'
          secondClass={currentTab === 'Open Trades'}
          hideText={hideText}
          handleClick={handleClick}
        />
        <NavigationLink
          imageUrl={Db3Nav}
          linkName='Closed Trades'
          secondClass={currentTab === 'Closed Trades'}
          hideText={hideText}
          handleClick={handleClick}
        />
        <NavigationLink
          imageUrl={Db4Nav}
          linkName='Pending Trades'
          secondClass={currentTab === 'Pending Trades'}
          hideText={hideText}
          handleClick={handleClick}
        />
        <NavigationLink
          imageUrl={Wallet}
          linkName='Balance'
          secondClass={currentTab === 'Balance'}
          extraClass="hide-balance-desktop"
          hideText={hideText}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

}

const mapStateToProps = ({ sideNav }) => ({
  sideNav,
});

export default connect(mapStateToProps, null)(SideBar);
