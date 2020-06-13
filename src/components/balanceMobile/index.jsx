import React, { Component } from 'react';
import Balance from '../balance/index';
import Demo from '../demo/index';
import Margin from '../margin/index';
import Activity from './activity/index';
import Select from '../selectBox/index';
import { balanceItemData, marginData } from '../../utils/dummyData';
import './index.scss';

class MobileBalance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDateSelection: 'Today',
    };
  }

  render() {
    const recentActivities = [
      {
        transactionType: 'transfer',
        senderAcct: '083282282 ',
        receiverAcct: '328292928',
        amount: '2,370 USD',
      },
      {
        transactionType: 'withdrawal',
        senderAcct: '083282282 ',
        amount: '-2,370 USD',
      },
    ];
    return (
      <div className='mobile-balance-section'>
        <div className='mobile-flex'>
          <Demo
            demoOptions={this.props.demoOptions}
            handleDemoChange={this.props.handleDemoChange}
            selectValue={this.props.selectValue}
          />
        </div>
        <div className='mobile-balance'>
          <Balance
            balance={this.props.balance}
            balanceItemData={this.props.balanceItemData}
          />
        </div>
        <div className='mobile-margin'>
          {this.props.marginItems.map((data) => (
            <Margin
              {...data}
              key={`${Math.random() * 1000000}-${Math.random()}`}
            />
          ))}
        </div>

        <div className='recent-activities'>
          <div className='recent-flex'>
            <h6>Recent Activities</h6>
            <Select selectOptions={['Today', 'This Week', 'This Month']} />
          </div>

          <p className='current-date-selection'>
            {this.state.currentDateSelection}
          </p>

          {recentActivities.map((data) => (
            <Activity
              {...data}
              key={`${Math.random() * 1000000}-${Math.random()}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MobileBalance;
