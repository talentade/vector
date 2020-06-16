import React, { Component } from 'react';
import TradeNotFound from '../tradeNotFound/index';
import Pagination from '../Pagination/index';
import './index.scss';

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    console.log(this.props);
  const { transactions, max_rows, page_no, page_size, paginationChange } = this.props;
  return (
    <div className='transaction-history'>
      <h2>Transaction History</h2>
      {transactions.length > 0 ? (
        <div className='t-history-container'>
          <ul className='transaction-history-header'>
            <li className="small-trans">S/N</li>
            <li className="trans-type">Transaction type</li>
            <li className="trans-date">Date</li>
            <li className='t-from'>Account(From)</li>
            <li className='t-to'>Account(To)</li>
            <li className="small-trans">Amount</li>
            <li>Reference No</li>
          </ul>
          {transactions.map((transaction, idx) => (
            <ul className='transaction-history-record' key={`${Math.random()}-${Math.random()}`}>
              <li className="small-trans">{`${idx + 1}.`}</li>
              <li className={`${transaction.type} trans-type`}>{transaction.type}</li>
              <li className="trans-date">{transaction.date}</li>
              <li className='t-from'><div>{transaction.account_from}</div></li>
              <li className='t-to'>{transaction.account_to}</li>
              <li className="small-trans">{transaction.amount}</li>
              <li>{transaction.reference}</li>
            </ul>
          ))}
          <Pagination length={page_size} max_rows={max_rows} page_no={page_no} paginationChange={paginationChange}/>
        </div>
      ) : (
        <TradeNotFound text='No Transactions yet' />
      )}
    </div>
  );
};
}

export default TransactionHistory;
