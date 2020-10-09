import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import app from '../../services/app';
import './profilepayments.scss';
import '../../components/standard/table.scss';
import '../../components/history/index.scss';

class ProfilePayments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ttype: "all"
    }
  }

  handleClick = (e, i) => {
    document.querySelectorAll(".transaction-history-record").forEach(function(el) {
      el.classList.remove("_active");
    });
    document.getElementById(i).classList.add("_active");
  }

  render () {
    let active = parseInt(this.props.active);


    let history = this.props.history;
    if(this.state.ttype != 'all') {
      history  = history.filter((h) => h.type.toLowerCase() === this.state.ttype);
    }

  	return (
      <div className={"transaction-history"+(active ? ' _active' : '')} id="tab-row-payments">

        <TableFilters table="payments" ttype={(val) => this.setState({ttype: val.toLowerCase() == 'withdrawal' ? 'withdraw' : val.toLowerCase()})} />

        <div className='t-history-container'>
          <ul className='transaction-history-header' style={{marginTop: "2em", marginBottom: "1em", background: "#006066", borderRadius: "10px"}}>
            <li className="small-trans">S/N</li>
            <li className="trans-type">Transaction type</li>
            <li className="trans-date">Date</li>
            <li className='t-from'>Account(From)</li>
            <li className='t-to'>Account(To)</li>
            <li className="small-trans">Amount</li>
            <li>Reference No</li>
          </ul>

        {
          history.map((transaction, idx) => (
            <ul
              className={'transaction-history-record '+(idx == 0 ? ' _active' : '')}
              id={'transaction-history-record-'+idx}
              key={`${Math.random()}-${Math.random()}`}
              onClick={(e) => this.handleClick(e, 'transaction-history-record-'+idx)}>
              <div className="tab-sn"><div>{idx + 1}</div></div>
              <li className="small-trans">{idx + 1}</li>
              <li className="trans-type"><span className="th">Transaction type</span><span className="td"><button className={"brn ttype"+(transaction.type.toLowerCase() != "deposit" ? " "+transaction.type.toLowerCase() : " ")}>{transaction.type.toUpperCase()}</button></span></li>
              <li className="trans-date"><span className="th">Date</span><span className="td">{app.cleanDate(transaction.create_time)}</span></li>
              <li className='t-from'><div><span className="th">Account(From)</span><span className="td">{transaction.type.toLowerCase() == "deposit" ? '---' : transaction.account_from}</span></div></li>
              <li className='t-to'><span className="th">Account(To)</span><span className="td">{transaction.account_to}</span></li>
              <li className="small-trans"><span className="th">Amount</span><span className="td">{transaction.amount}</span></li>
              <li><span className="th">Reference No</span><span className="td">{transaction.reference}</span></li>
            </ul>

          ))
        }

        </div>
      </div>
	 )
	}

}

export default ProfilePayments;