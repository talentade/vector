import React from 'react';
import TradeNotFound from '../tradeNotFound/index';
import './index.scss';

const TransactionHistory = ({ transactions }) => {
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
            <ul
              className='transaction-history-record'
              key={`${Math.random()}-${Math.random()}`}
            >
              <li className="small-trans">{`${idx + 1}.`}</li>
              <li className={`${transaction.type} trans-type`}>
                {transaction.type}
              </li>
              <li className="trans-date">{transaction.date}</li>
              <li className='t-from'>
                <div>
                  {transaction.from}
                </div>
              </li>
              <li className='t-to'>{transaction.to}</li>
              <li className="small-trans">{transaction.amount}</li>
              <li>{transaction.reference}</li>
            </ul>
          ))}
        </div>
      ) : (
        <TradeNotFound text='No Transactions yet' />
      )}
    </div>
  );
};

export default TransactionHistory;
