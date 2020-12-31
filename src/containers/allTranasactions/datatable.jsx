import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TradeNotFound from '../../components/tradeNotFound/index';
import Pagination from '../../components/Pagination/index';
import app from '../../services/app';
import './index.scss';

class TransactionHistory extends Component {
  constructor(props) {
    super(props);
  }

  handleClick = (e, i) => {
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
      <div className='t-history-container'>
        <ul className='table-header'>
          <li className="small-trans">S/N</li>
          <li className="trans-type">USER ID</li>
          <li className="trans-type">Transaction type</li>
          <li className="trans-date">Date</li>
          <li className='t-from'>Account(From)</li>
          <li className='t-to'>Account(To)</li>
          <li className="small-trans">Amount</li>
          <li>Reference No</li>
        </ul>
        {transactions.map((transaction, idx) => (
          <ul
            className={'transaction-history-record'+(idx == 0 ? ' _active' : '')+" table-body"}
            id={'transaction-history-record-'+idx}
            key={`${Math.random()}-${Math.random()}`}
            onClick={(e) => this.handleClick(e, 'transaction-history-record-'+idx)}>
            <div className="tab-sn"><div>{idx + (page_size * (page_no - 1)) + 1}</div></div>
            <li className="small-trans">{idx + (page_size * (page_no - 1)) + 1}</li>
            <li className="small-trans"><Link className="txt-info" to={"/usersprofile/"+transaction.user_id}>{app.uid(transaction.user_id)}</Link></li>
            <li className="small-trans"><span className="th">Transaction type</span><span className="td"><button className={"brn ttype"+(transaction.type.toLowerCase() != "deposit" ? " "+transaction.type.toLowerCase() : " ")}>{transaction.type.toUpperCase()}</button></span></li>
            <li className="trans-date"><span className="th">Date</span><span className="td">{app.cleanDate(transaction.create_time)}</span></li>
            <li className='t-from'><div><span className="th">Account(From)</span><span className="td">{transaction.type.toLowerCase() == "deposit" ? '---' : transaction.account_from}</span></div></li>
            <li className='t-to'><span className="th">Account(To)</span><span className="td">{transaction.account_to}</span></li>
            <li className="small-trans"><span className="th">Amount</span><span className="td">{transaction.amount}</span></li>
            <li><span className="th">Reference No</span><span className="td">{app.ref(transaction.reference)}</span></li>
          </ul>
        ))}
        <Pagination length={page_size} max_rows={max_rows} page_no={page_no} paginationChange={paginationChange}/>
      </div>
    </div>
  );
};
}

export default TransactionHistory;
