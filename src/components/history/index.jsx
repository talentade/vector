import React, { Component } from 'react';
import TradeNotFound from '../tradeNotFound/index';
import Pagination from '../Pagination/index';
import app from '../../services/app';
import './index.scss';

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e, i) => {
    // console.log(e.target, i);
    document.querySelectorAll(".transaction-history-record").forEach(function(el) {
      el.classList.remove("_active");
    });
    document.getElementById(i).classList.add("_active");
  }

  render () {
  const { transactions, max_rows, page_no, page_size, paginationChange } = this.props;
  var cu_id;
  return (
    <div className='transaction-history'>
      <h2 style={{marginTop: "10px"}}>Transaction History</h2>
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
              className={'transaction-history-record '+(idx == 0 ? ' _active' : '')}
              id={'transaction-history-record-'+idx}
              key={`${Math.random()}-${Math.random()}`}
              onClick={(e) => this.handleClick(e, 'transaction-history-record-'+idx)}>
              <div className="tab-sn"><div>{idx + (page_size * (page_no - 1)) + 1}</div></div>
              <li className="small-trans">{idx + (page_size * (page_no - 1)) + 1}</li>
              <li className="trans-type"><span className="th">Transaction type</span><span className="td"><button className={"brn ttype"+(transaction.type.toLowerCase() != "deposit" ? " "+transaction.type.toLowerCase() : " ")}>{transaction.type.toUpperCase()}</button></span></li>
              <li className="trans-date"><span className="th">Date</span><span className="td">{app.cleanDate(transaction.create_time)}</span></li>
              <li className='t-from'><div><span className="th">Account(From)</span><span className="td">{transaction.type.toLowerCase() == "deposit" ? '---' : transaction.account_from}</span></div></li>
              <li className='t-to'><span className="th">Account(To)</span><span className="td">{transaction.account_to}</span></li>
              <li className="small-trans"><span className="th">Amount</span><span className="td">{transaction.amount}</span></li>
              <li><span className="th">Reference No</span><span className="td">{transaction.reference}</span></li>
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
