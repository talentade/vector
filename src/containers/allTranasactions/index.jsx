import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import TableFilters from '../../components/tablefilters/index';
import TransactionHistory from  './datatable.jsx';
import server from '../../services/server';
import app from '../../services/app';
import '../../components/standard/standard.scss';
import './index.scss';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      max_rows: 0,
      page_no: 1,
      page_size: app.maxrow,
      transactions: []
    }

  }

  async componentDidMount () {
    await this.fetchTransactions();
  }

  handleHistoryPage = (p) => {
    this.setState({ page_no: p });
    setTimeout(() => {
      this.fetchTransactions();
    }, 10);
  }

  fetchTransactions = async () => {
    try {
      this.setState({ showSpinner: true });
      const transactions = await server.getTransactionHistory2(this.state.page_size, this.state.page_no);
      this.setState({
        transactions: transactions.data.result,
        max_rows: transactions.data.max_rows,
        showSpinner: false
      });
    } catch (error) {
      this.setState({ showSpinner: false });
      return error.message;
    }
  }

  render() {
    const { max_rows, page_no, page_size, transactions } = this.state;

    return (
      <Container>
      <div className="col-12" id="depo-container">
        <div className="depo-section-right">
          <Breadcrumbs breads="Home, Finance, Transactions" />
          <h1 className="page-title">All Transactions</h1>
          {/*<TableFilters table="deposits" />*/}

          <TransactionHistory
            transactions={transactions}
            max_rows={max_rows}
            page_size={page_size}
            page_no={page_no}
            paginationChange={this.handleHistoryPage}
          />

        </div>
      </div>
      </Container>
    );
  }
};

export default Transactions;