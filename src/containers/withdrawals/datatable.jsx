import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import nigeria from '../../themes/images/flags/nigeria.png';
import server from '../../services/server';
import app from '../../services/app';

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      showLoader: true
    }
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
                  <li>
                    <svg className="tb-action" width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                    </svg>
                    <svg className="tb-action" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FFE602"/>
                    </svg>
                  </li>
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