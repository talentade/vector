import React, { Component } from 'react';
import axios from 'axios';
import Container from '../container/index';
import TransactionNav from '../../components/transactionNav/index';
import Deposit from '../../components/deposit/index';
import TransactionModal from '../../components/depositModal/index';
import ConfirmationModal from '../../components/confirmationModal/index';
import CardsIcon from '../../themes/images/cards.svg';
import con_request from '../../themes/images/con_request.png';
import Spinner from '../../components/spinner/index';
import Withdraw from '../../components/withdraw/index';
import Transfer from '../../components/transfer/index';
import TransactionHistory from '../../components/history/index';
import app from '../../services/app';
import server from '../../services/server';
import './index.scss';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: app.accounts(),
      accounts2: [],
      account: app.account(),
      currencies: [],
      selectedCurrency: 'USD',
      cards: ['VISA- 5322 2489 2479 4823'],
      email: null,
      balance: '',
      balance2: '',
      max_rows: 0,
      page_no: 1,
      page_size: 8,
      deposit: parseFloat(0.0).toFixed(2),
      showDepositModal: false,
      confirmationModal: false,
      showTransferModal: false,
      showSpinner: false,
      errorMessage: null,
      selectedTab: 'deposit',
      to: '',
      minimizeSideBar: false,
      transactions: [],
      transactionsObject: {},
    };

    this.profile = app.profile();
    this.id = this.profile.user_id;
  }

  async componentDidMount() {
    this.setState({
      email: app.email(),
      balance: app.accountDetail()["balance"],
    });

    if(localStorage.getItem("TSelected")) {
      this.setState({
        selectedTab: localStorage.getItem("TSelected")
      });
      localStorage.removeItem("TSelected");
      if(localStorage.getItem("TSelectedAcc")) {
        this.setState({
          account: localStorage.getItem("TSelectedAcc"),
          balance: app.accountDetail(localStorage.getItem("TSelectedAcc"))["balance"]
        });
        localStorage.removeItem("TSelectedAcc");
      }
    }

    var dis = this;
    const navt = document.querySelectorAll('navtotransaction');

    navt.forEach(el => el.addEventListener('click', event => {
      if(localStorage.getItem("TSelected")) {
        dis.setState({ selectedTab: localStorage.getItem("TSelected") });
        dis._toggleTabs(localStorage.getItem("TSelected"));
        localStorage.removeItem("TSelected");
      }
    }));

    this.setAccount({target: { value : this.state.account}});

    try {
      const { data } = await axios.get(
        'https://openexchangerates.org/api/currencies.json',
      );

      await this.fetchTransactions();

      const currencies = Object.keys(data);

      this.setState({ currencies });
    } catch (error) {
      return error.message;
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    const { account } = this.state;
    // console.log(account, prevState.account);
    if (prevState.account !== account) {
      // await this.fetchTransactions();
    }
  }

  fetchTransactions = async () => {
    try {
      this.setState({ showSpinner: true });
      const account = app.accountDetail();
      let _deposits = [];
      const {
        data: {
          data: {
            results: { deposits },
          },
        },
      } = _deposits = await server.getTransactionHistory(app.email(), this.id, this.state.page_size, this.state.page_no, account);
      let arr = [];

      for (let key in deposits) {
        arr.push(deposits[`${key}`]);
      }

      // console.log(_deposits);

      arr = arr.flat();

      const info = arr.map((el) => {
        const base = el.external_ref.split('|');
        return {
          type:
            base[0].split('-')[0].toLowerCase() === 'tx'
              ? 'transfer'
              : base[0].split('-')[0].toLowerCase() === 'fa'
              ? 'deposit'
              : 'withdraw',
          date: el.time.split('G')[0],
          from: this.profile.email,
          to: el.tx_type === 'Credit' ? el.internal_ref.payee : el.internal_ref.payer,
          amount: el.detail.amount_equiv_USD,
          reference: base[4].split(':')[1],
        };
      });

      let max_rows = _deposits.data.data.max_rows;

      let tr_h = _deposits.data.data.results;
      let trans = [];
      for (let tr = 0; tr < tr_h.length; tr++) {
        trans[tr] = tr_h[tr];
        trans[tr].date = trans[tr].date.split("-").join("/");
      }

      this.setState({
        transactions: trans,
        max_rows: max_rows,
        showSpinner: false,
        transactionsObject: deposits,
      });
    } catch (error) {
      this.setState({ showSpinner: false });
      return error.message;
    }
  };

  handleInputChange = (e) => {
    console.log(e.target.name, e.target.value);

    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  toggleYellow = (e) => {
    e.preventDefault();

    this.setState({
      yellow: true,
      blue: false,
      pink: false,
      deposit: parseFloat(250.0).toFixed(2),
    });
  };

  toggleBlue = (e) => {
    e.preventDefault();

    this.setState({
      yellow: false,
      blue: true,
      pink: false,
      deposit: parseFloat(500.0).toFixed(2),
    });
  };

  togglePink = (e) => {
    e.preventDefault();

    this.setState({
      yellow: false,
      blue: false,
      pink: true,
      deposit: parseFloat(1000.0).toFixed(2),
    });
  };

  handleDepositModalClick = () => {
    this.setState({ showDepositModal: false, showTransferModal: false });
  };

  handleHistoryPage = (p) => {
    // console.log(p);
    this.setState({ page_no: p });
    setTimeout(() => {
      this.fetchTransactions();
    }, 10);
  };

  setAccount = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      account: value,
      balance: app.accountDetail(value)["balance"],
    });
    let pre = value.split("-")[0].toLowerCase();
    let accounts2 = [];
    this.state.accounts.forEach(function(acc) {
      if(acc.split("-")[0].toLowerCase() == pre && acc.toLowerCase() != value.toLowerCase()) {
        accounts2.push(acc);
      }
    });
    this.setState({accounts2: accounts2});
    if(accounts2.length) {
      this.setAccount2({target: { value : accounts2[0]}})
    }
  };

  setAccount2 = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      balance2: app.accountDetail(value)["balance"],
    });
  };

  toggleSideBar = () => {
    this.setState({ minimizeSideBar: !this.state.minimizeSideBar });
  };

  handleCurrencySelect = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({ selectedCurrency: value });
  };

  pre_action = (e) => {
    this.setState({ confirmationModal: true });
    e.preventDefault();
  };

  cancel_action = (e) => {
    this.setState({ confirmationModal: false });
    e.preventDefault();
  };

  deposit = async (e) => {
    e.preventDefault();
    this.setState({ confirmationModal: false });

    const {
      email,
      selectedCurrency,
      deposit,
      account,
      selectedTab,
      to,
    } = this.state;

    const transAccount = app.accountDetail();

    this.setState({ errorMessage: null });

    try {
      if (deposit <= 0) {
        return this.setState({
          errorMessage: 'You must enter an amount greater than 0',
        });
      } else {
        this.setState({ showSpinner: true });
        if (selectedTab.toLowerCase().match('deposit')) {
          await server.fundAccount(parseFloat(deposit), selectedCurrency, document.getElementById("dep-acc-sel").value);
        } else if (selectedTab.toLowerCase().match('transfer')) {
          await server.transferFunds(
            email,
            transAccount,
            selectedCurrency,
            deposit,
            to,
            this.id,
          );
        }

        const myEmail = this.profile.email;

        const {
          data: {
            data: { profile },
          },
        } = await server.getProfile();

        const newProfile = JSON.stringify(profile);
        localStorage.setItem('profile', newProfile);

        if (selectedTab.toLowerCase().match('deposit')) {
          this.setState({ showDepositModal: true });
        } else if (selectedTab.toLowerCase().match('transfer')) {
          this.setState({ showTransferModal: true });
        }
        this.setState({ showSpinner: false });
        await this.fetchTransactions();
      }
    } catch (error) {
      this.setState({ showSpinner: false });
      if (!error.response) {
        return error.message;
      }

      this.setState({ errorMessage: error.response.data.message });

      return error.response.data.message;
    }
  };

  toggleTabs = (e) => {
    this._toggleTabs(e.currentTarget.querySelector('div').innerHTML.toLowerCase());
  };

  _toggleTabs = (tab) => {
    this.setState({
      selectedCurrency: 'USD',
      deposit: parseFloat(0.0).toFixed(2),
      errorMessage: null,
      to: '',
      balance: app.accountDetail()["balance"],
      account: app.account(),
      selectedTab: tab
    });
  }

  render() {
    const {
      accounts,
      accounts2,
      currencies,
      selectedCurrency,
      cards,
      email,
      deposit,
      showDepositModal,
      confirmationModal,
      showSpinner,
      account,
      errorMessage,
      selectedTab,
      to,
      balance,
      balance2,
      showTransferModal,
      minimizeSideBar,
      transactions,
      max_rows,
      page_size,
      page_no
    } = this.state;

    const myProfile = JSON.parse(localStorage.getItem('profile'));

    // const balance = balance > 0 ? app.accountDetail()["balance"];
    return (
      <Container>
        <div className='transactions-section'>
          <Spinner showSpinner={showSpinner} />
          {showDepositModal ? (
            <TransactionModal
              imageUrl={CardsIcon}
              text={`The deposit you just made to your account was successful`}
              handleClick={this.handleDepositModalClick}
            />
          ) : null}
          {confirmationModal ? (
            <ConfirmationModal
              imageUrl={con_request}
              text={`Your request to deposit the sum of USD ${deposit} was sent successfully`}
              cancelClick={this.cancel_action}
              confirmClick={this.deposit}
            />
          ) : null}

          {showTransferModal ? (
            <TransactionModal
              imageUrl={CardsIcon}
              text={`The deposit you just made to ${to} was successful`}
              handleClick={this.handleDepositModalClick}
            />
          ) : null}

          <TransactionNav
            selectedTab={selectedTab}
            handleClick={this.toggleTabs}
            minimizeSideBar={minimizeSideBar}
            handleSideBarClick={this.toggleSideBar}
          />
          <div className='transaction-box'>
            {selectedTab.match('deposit') ? (
              <Deposit
                accounts={accounts}
                currencies={currencies}
                selectedCurrency={selectedCurrency}
                email={email}
                account={account}
                balance={balance}
                handleInputChange={this.handleInputChange}
                depositValue={deposit}
                toggleBlue={this.toggleBlue}
                togglePink={this.togglePink}
                toggleYellow={this.toggleYellow}
                handleSubmit={this.pre_action}
                selectHandler={this.setAccount}
                handleCurrencySelect={this.handleCurrencySelect}
                error={errorMessage}
              />
            ) : null}
            {selectedTab.match('transfer') ? (
              <Transfer
                accounts={accounts}
                currencies={currencies}
                selectedCurrency={selectedCurrency}
                account={account}
                accounts2={accounts2}
                handleCurrencySelect={this.handleCurrencySelect}
                balance={balance}
                balance2={balance2}
                selectHandler={this.setAccount}
                selectHandler2={this.setAccount2}
                handleInputChange={this.handleInputChange}
                depositValue={deposit}
                toggleBlue={this.toggleBlue}
                togglePink={this.togglePink}
                toggleYellow={this.toggleYellow}
                handleSubmit={this.deposit}
                toValue={to}
                error={errorMessage}
              />
            ) : null}
            {selectedTab.match('withdraw') ? (
              <Withdraw
                accounts={accounts}
                currencies={currencies}
                selectedCurrency={selectedCurrency}
                account={account}
                handleCurrencySelect={this.handleCurrencySelect}
                balance={balance}
                selectHandler={this.setAccount}
                handleInputChange={this.handleInputChange}
                depositValue={deposit}
                toggleBlue={this.toggleBlue}
                togglePink={this.togglePink}
                toggleYellow={this.toggleYellow}
                handleSubmit={this.deposit}
                toValue={to}
                cards={cards}
                error={errorMessage}
              />
            ) : null}
            {
              selectedTab.match('transaction') ? (
                <TransactionHistory
                  transactions={transactions}
                  max_rows={max_rows}
                  page_size={page_size}
                  page_no={page_no}
                  paginationChange={this.handleHistoryPage}
                />
              ) : null
            }
          </div>
        </div>
      </Container>
    );
  }
}

export default Transactions;
