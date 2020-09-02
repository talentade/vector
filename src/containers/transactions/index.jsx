import React, { Component } from 'react';
import $ from 'jquery';
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
import currencies from '../../services/currencies';
import './index.scss';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: app.accounts(),
      accounts2: [],
      account: app.account(),
      currencies: Object.keys(currencies),
      selectedCurrency: 'USD',
      cards: ['VISA- 5322 2489 2479 4823'],
      email: app.email(),
      balance: app.accountDetail()["balance"],
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
      transactions: []
    };

    this.profile = app.profile();
    this.id = this.profile.user_id;
  }

  async componentDidMount() {
    if(localStorage.getItem("TSelected")) {
      this.setState({
        selectedTab: localStorage.getItem("TSelected")
      });
      this.setAccount({target: { value : this.state.account}});
      localStorage.removeItem("TSelected");
      if(localStorage.getItem("TSelectedAcc")) {
        this.setState({
          account: localStorage.getItem("TSelectedAcc"),
          balance: app.accountDetail(localStorage.getItem("TSelectedAcc"))["balance"]
        });
        this.setAccount({target: { value : localStorage.getItem("TSelectedAcc")}});
        localStorage.removeItem("TSelectedAcc");
      } else {
        this.setAccount({target: { value : this.state.account}});
      }
    } else {
      this.setAccount({target: { value : this.state.account}});
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

    try {
      await this.fetchTransactions();
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
      const transactions = await server.getTransactionHistory(this.state.page_size, this.state.page_no);
      this.setState({
        transactions: transactions.data.result,
        max_rows: transactions.data.max_rows,
        showSpinner: false
      });
    } catch (error) {
      this.setState({ showSpinner: false });
      return error.message;
    }
  };

  handleInputChange = (e) => {
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
      to: value,
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

    const transAccount = app.account();

    this.setState({ errorMessage: null });

    try {
      if (deposit <= 0) {
        return this.setState({
          errorMessage: 'You must enter an amount greater than 0',
        });
      } else {
        this.setState({ showSpinner: true });
        if (selectedTab.toLowerCase().match('deposit')) {
          await server.fundAccount(parseFloat(deposit), selectedCurrency, account);
          this.setState({ deposit: parseFloat(0.0).toFixed(2) });
        } else if (selectedTab.toLowerCase().match('transfer')) {
          await server.transferFunds(account, to, parseFloat(deposit), selectedCurrency);
        }


        let getProfile  = await server.getProfile();
        let profile     = getProfile.data.profile;
        app.profile(profile);
        await this.fetchTransactions();

        if (selectedTab.toLowerCase().match('deposit')) {
          this.setState({ showDepositModal: true });
          this.setAccount({target: { value : account}});
        } else if (selectedTab.toLowerCase().match('transfer')) {
          this.setState({ showTransferModal: true });
          this.setAccount({target: { value : account}});
          this.setAccount2({target: { value : to}});
        }
        this.setState({ showSpinner: false });
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

  handleDepositModalClick = () => {
    this.setState({ showDepositModal: false, showTransferModal: false, showSpinner: false });
    // localStorage.setItem("TSelected", this.state.selectedTab);
    // window.location.href = "";
  };

  toggleTabs = (e) => {
    $(".link-icons.transactions").click();
    this._toggleTabs(e.currentTarget.querySelector('div').innerHTML.toLowerCase());
  };

  _toggleTabs = (tab) => {
    this.setState({
      selectedCurrency: 'USD',
      deposit: parseFloat(0.0).toFixed(2),
      errorMessage: null,
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
          {/*<Spinner showSpinner={showSpinner} />*/}
          <div className='loader-container' style={{ display: this.state.showSpinner ? 'block' : 'none' }}>
            <div className='loader'></div>
          </div>
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
            handleSideBarClick={(e) => {
              $(".link-icons.transactions").click();
              // this.toggleSideBar(e)
            }}
          />
          <div className='transaction-box'>
            {selectedTab.match('deposit') ? (
              <Deposit
                accounts={accounts}
                accountList={app.accountList()}
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
                accountList={app.accountList()}
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
                accountList={app.accountList()}
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
