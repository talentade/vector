import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import Pagination from '../../components/paginationTwo/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';
import '../../components/standard/table.scss';
import check from '../../themes/images/check-mark.png';
import server from '../../services/server';
import processing from './proccessing.svg';
import app from '../../services/app';
import Spinner from '../../components/spinner/index';
import { CallBack, ConfirmModal } from '../../components/popups/index';
import '../../components/standard/standard.scss';
import './index.scss';

class Withdrawals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmID: 0,
      confirmUID: 0,
      confirmRef: "",
      confirmModal: false,
      page_no: 1,
      callback: false,
      callbackTxt: '',
      page_size: app.maxrow,
      data: null,
      filter: '',
      uid: '',
      type: '',
      ctype: 'all',
      transactions: [],
      adminDep: false,
      showLoader: true
    }
    this.status = ["Pending", "Processing", "Confirmed"];
  }

  async componentDidMount() {
    this.getAllWithdrawals();

    window.NO_AUTO_PAGER = true;

    $(window).on("resetPager", () => {
      this.setState({page_size: app.page_size(), page_no: 1});
    });
  }

  getAllWithdrawals = async () => {
    this.setState({showLoader: true});
    try {
      let withdraw = await server.getAllWithdrawals();
      this.setState({transactions: withdraw.data, showLoader: false});
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  processReq = async (s, i, ref) => {
    this.setState({showLoader: true});
    try {
      let pr = await server.processWReq(s, i);
      this.setState({callback: true, callbackTxt: "Request "+ref+(s == 1 ? " is now processing" : " confirmed")});
      this.getAllWithdrawals();
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  deletePreq = async (i, uid, ref) => {
    this.setState({showLoader: true});
    try {
      let pr = await server.deletePreq(i, uid);
      this.setState({callback: true, callbackTxt: "Request "+ref+" deleted"});
      this.getAllWithdrawals();
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  render () {
    let { page_no, page_size, transactions, filter, ctype } = this.state;

    filter = filter.toLowerCase();

    if(ctype != "all") {
      transactions = transactions.filter((c) => {
        return c.status == ctype;
      });
    }

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
      <div className="col-12" id="with-container">
        <div className="with-section-right">
          <Breadcrumbs breads="Home, Finance, Withdrawals" />
          <h1 className="page-title">Withdrawals</h1>
          <TableFilters table="withdrawals" search={(e) => this.setState({filter: e.target.value})} ctype={(e) => this.setState({ctype: e.target.value})} />

            <CallBack
              head="Success"
              text={this.state.callbackTxt}
              show={this.state.callback}
              cancel={(e) => this.setState({callback: false})}
            />

            <ConfirmModal
              head={"Delete request "+this.state.confirmRef+"?"}
              text="Click YES to confirm"
              show={this.state.confirmModal}
              cancel={() => this.setState({confirmModal: false})}
              confirm={() => { this.setState({confirmModal: false}); this.deletePreq(this.state.confirmID, this.state.confirmUID, this.state.confirmRef); }}
            />

            <ul className="table-header">
              <li className="sn">S/N</li>
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
              transactions.map((transaction, idx) => (
                <ul className="table-body" key={`${Math.random()} ${Math.random()}`}>
                  <li className="sn">{idx + 1}</li>
                  <li><Link className="txt-info" to={"/usersprofile/"+transaction.user_id}>{app.uid(transaction.user_id)}</Link></li>
                  <li>{app.cleanDate(transaction.create_time)}</li>
                  <li>{!transaction.account_from.trim().length ? '---' : transaction.account_from}</li>
                  <li>{transaction.account_to}</li>
                  <li>{transaction.amount}</li>
                  <li>{app.ref(transaction.reference)}</li>
                  <li>{this.status[transaction.status]}</li>
                  {transaction.status < 2 ?
                  <li className="pointers">
                    <img title="Process request" className="tb-action" onClick={() => this.processReq(1, transaction.id, app.ref(transaction.reference))} src={processing} width="14" height="18" />
                    <svg title="Delete request" className="tb-action" onClick={() => this.setState({ confirmID: transaction.id, confirmUID: transaction.user_id, confirmRef: app.ref(transaction.reference), confirmModal: true})} width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#ff3029" />
                    </svg>
                    <img title="Confirm request" className="tb-action" onClick={() => this.processReq(2, transaction.id, app.ref(transaction.reference))} src={check} width="18" height="18" />
                  </li>: <li>--</li>}
                </ul>
              ))
            }

            <Pagination length={page_size} max_rows={max_rows} page_no={page_no} paginationChange={(p) => { this.setState({page_no: p}); }}/>

        </div>
      </div>
      </Container>
    );
  }
}

export default Withdrawals;