import React, { Component } from 'react';
import $ from 'jquery';
import Container from '../container/index';
import { Link } from 'react-router-dom';
import TradeNotFound from '../../components/tradeNotFound/index';
import Pagination from '../../components/paginationTwo/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';
import TransactionHistory from  './datatable.jsx';
import server from '../../services/server';
import app from '../../services/app';
import Spinner from '../../components/spinner/index';
import '../../components/standard/standard.scss';
import './index.scss';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmID: 0,
      confirmUID: 0,
      confirmModal: false,
      page_no: 1,
      callback: false,
      page_size: app.maxrow,
      data: null,
      filter: '',
      uid: '',
      type: '',
      transactions: [],
      adminDep: false,
      showLoader: true,
    }

  }

  async componentDidMount () {
    await this.fetchTransactions();

    window.NO_AUTO_PAGER = true;

    $(window).on("resetPager", () => {
      this.setState({page_size: app.page_size(), page_no: 1});
    });
  }

  handleClick = (e, i) => {
    document.querySelectorAll(".transaction-history-record").forEach(function(el) {
      el.classList.remove("_active");
    });
    document.getElementById(i).classList.add("_active");
  }

  handleHistoryPage = (p) => {
    this.setState({ page_no: p });
  }

  fetchTransactions = async () => {
    try {
      this.setState({ showLoader: true });
      const transactions = await server.getTransactionHistory2(this.state.page_size, this.state.page_no);
      this.setState({
        transactions: transactions.data.result,
        showLoader: false
      });
    } catch (error) {
      this.setState({ showLoader: false });
      return error.message;
    }
    this.setState({ showLoader: false });
  }

  render() {
    let { page_no, page_size, transactions, filter } = this.state;

    filter = filter.toLowerCase();

    if(filter.length) {
      transactions = transactions.filter((c) => {
        return (
          c.account_to.toLowerCase().match(filter.toLowerCase()) ||
          c.account_from.toLowerCase().match(filter.toLowerCase()) ||
          c.reference.toLowerCase().match(filter.toLowerCase()) ||
          app.uid(c.user_id).toLowerCase().match(filter.toLowerCase())
        );
      });
    }

    let max_rows = transactions.length;
    let stt = (page_no-1)*page_size;
    let max = stt+page_size;
        max = max > max_rows ? max_rows : max;
      transactions = transactions.slice(stt, max > max_rows ? max_rows : max);


    return (
      <Container>
      <Spinner showSpinner={this.state.showLoader} />
      <div className="col-12" id="depo-container">
        <div className="depo-section-right">
          <Breadcrumbs breads="Home, Finance, Transactions" />
          <h1 className="page-title">Transactions</h1>
          <TableFilters table="alltrans" search={(e) => this.setState({filter: e.target.value})} />

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
                    <li className='t-from'><div><span className="th">Account(From)</span><span className="td">{transaction.type.toLowerCase() == "deposit" ? '---' : app.ref(transaction.account_from)}</span></div></li>
                    <li className='t-to'><span className="th">Account(To)</span><span className="td">{app.ref(transaction.account_to)}</span></li>
                    <li className="small-trans"><span className="th">Amount</span><span className="td">{transaction.amount}</span></li>
                    <li><span className="th">Reference No</span><span className="td">{app.ref(transaction.reference)}</span></li>
                  </ul>
                ))}

                <Pagination length={page_size} max_rows={max_rows} page_no={page_no} paginationChange={(p) => { this.handleHistoryPage(p); }}/>
              </div>
            </div>

        </div>
      </div>
      </Container>
    );
  }
};

export default Transactions;