import React from 'react';
import { connect } from 'react-redux';
import './index.scss';
import FilterIcon from '../../themes/images/filter.svg';

const TransactionNav = ({
  selectedTab,
  handleClick,
  minimizeSideBar,
  handleSideBarClick,
  transactionNav,
}) => {
  return (
    <ul
      className={`transactions-nav ${
        minimizeSideBar ? 'trans-nav-min' : null
      } ${!transactionNav ? 'hide-trans-nav' : null}`}
    >
      <li className='trans-filter' onClick={handleSideBarClick}>
        <img src={FilterIcon} alt='' />
      </li>
      <li
        className={`first ${
          selectedTab.match('deposit') ? 'selected-trans-tab' : null
        } ${minimizeSideBar ? 'minimize-trans' : null}`}
        onClick={handleClick}
      >
        <div>Deposit Funds</div>
      </li>
      <li
        className={`second ${
          selectedTab.match('withdraw') ? 'selected-trans-tab' : null
        } ${minimizeSideBar ? 'minimize-trans' : null}`}
        onClick={handleClick}
      >
        <div>Withdraw Funds</div>
      </li>
      <li
        className={`third ${
          selectedTab.match('transfer') ? 'selected-trans-tab' : null
        } ${minimizeSideBar ? 'minimize-trans' : null}`}
        onClick={handleClick}
      >
        <div>Transfer Funds</div>
      </li>
      <li
        className={`fourth ${
          selectedTab.match('transaction') ? 'selected-trans-tab' : null
        } ${minimizeSideBar ? 'minimize-trans' : null}`}
        onClick={handleClick}
      >
        <div>Transaction History</div>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ transactionNav }) => ({
  transactionNav,
});

export default connect(mapStateToProps)(TransactionNav);
