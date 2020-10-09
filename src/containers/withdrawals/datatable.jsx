import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import check from '../../themes/images/check-mark.png';
import server from '../../services/server';
import processing from './proccessing.svg';
import app from '../../services/app';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      showLoader: true
    }
    this.status = ["Pending", "Processing", "Confirmed"];
  }

  async componentDidMount() {
    this.getAllWithdrawals();
  }

  getAllWithdrawals = async () => {
    try {
      let withdraw = await server.getAllWithdrawals();
      this.setState({transactions: withdraw.data, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  processReq = async (s, i) => {
    try {
      let pr = await server.processWReq(s, i);
      this.getAllWithdrawals();
    } catch(e) {
      return e;
    }
  }

  deletePreq = async (i, uid) => {
    try {
      let pr = await server.deletePreq(i, uid);
      this.getAllWithdrawals();
    } catch(e) {
      return e;
    }
  }

  render () {
    return (
          <>
            <ul className="table-header">
              <li>S/N</li>
              <li>USER ID</li>
              <li>Date</li>
              <li>Account(From)</li>
              <li>Account(To)</li>
              <li>Amount</li>
              <li>Reference No</li>
              <li>Status</li>
              <li>ACTION</li>
            </ul>

            {
              this.state.transactions.map((transaction, idx) => (
                <ul className="table-body" key={`${Math.random()} ${Math.random()}`}>
                  <li>{idx + 1}</li>
                  <li><Link className="txt-info" to={"/usersprofile/"+transaction.user_id}>{app.uid(transaction.user_id)}</Link></li>
                  <li>{app.cleanDate(transaction.create_time)}</li>
                  <li>{transaction.type.toLowerCase() == "deposit" ? '---' : transaction.account_from}</li>
                  <li>{transaction.account_to}</li>
                  <li>{transaction.amount}</li>
                  <li>{transaction.reference}</li>
                  <li>{this.status[transaction.status]}</li>
                  {transaction.status < 2 ?
                  <li>
                    <img className="tb-action" onClick={() => this.processReq(1, transaction.id)} src={processing} width="14" height="18" />
                      <svg className="tb-action" onClick={() => this.deletePreq(transaction.id, transaction.user_id)} width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#ff3029" />
                    </svg>
                    <img className="tb-action" onClick={() => this.processReq(2, transaction.id)} src={check} width="18" height="18" />
                  </li>: <li>--</li>}
                </ul>
              ))
            }

            <div
              className='loader-container'
              style={{ display: this.state.showLoader ? 'block' : 'none' }}
            >
              <div className='loader'></div>
            </div>

            {/*<Pagination2 />*/}
          </>
        );
  }
}

export default DataTable;