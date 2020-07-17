import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import './profilepayments.scss';
import '../../components/standard/table.scss';

class ProfilePayments extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-payments"+(active ? ' _active' : '')} id="tab-row-payments">

        <TableFilters table="payments" />

        <ul className="table-header for-payment">
          <li className="small-trans">S/N</li>
          <li className="trans-type">Transaction type</li>
          <li className="trans-date">Date</li>
          <li className='t-from'>Account(From)</li>
          <li className='t-to'>Account(To)</li>
          <li className="small-trans">Amount</li>
          <li>Status</li>
        </ul>

        <ul className="table-body for-payment">
          <li className="small-trans">1</li>
          <li className="trans-type"><span className="td"><button className="brn ttype">DEPOSIT</button></span></li>
          <li className="trans-date"><span className="td">24-03-2020</span></li>
          <li className='t-from'><div><span className="td">---</span></div></li>
          <li className='t-to'><span className="td">77899-ID1437843</span></li>
          <li className="small-trans"><span className="td">100, 000 USD</span></li>
          <li><span className="td txt-success">Completed</span></li>
        </ul>

        <ul className="table-body for-payment">
          <li className="small-trans">2</li>
          <li className="trans-type"><span className="td"><button className="brn ttype withdrawal">WITHDRAWAL</button></span></li>
          <li className="trans-date"><span className="td">24-03-2020</span></li>
          <li className='t-from'><div><span className="td">---</span></div></li>
          <li className='t-to'><span className="td">77899-ID1437843</span></li>
          <li className="small-trans"><span className="td">100, 000 USD</span></li>
          <li><span className="td txt-success">Completed</span></li>
        </ul>

        <ul className="table-body for-payment">
          <li className="small-trans">3</li>
          <li className="trans-type"><span className="td"><button className="brn ttype transfer">TRANSFER</button></span></li>
          <li className="trans-date"><span className="td">24-03-2020</span></li>
          <li className='t-from'><div><span className="td">---</span></div></li>
          <li className='t-to'><span className="td">77899-ID1437843</span></li>
          <li className="small-trans"><span className="td">100, 000 USD</span></li>
          <li><span className="td txt-success">Completed</span></li>
        </ul>
      </div>
	 )
	}

}

export default ProfilePayments;