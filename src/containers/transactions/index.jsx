import React, { Component } from 'react';
import axios from 'axios';
import Container from '../container/index';
import TransactionNav from '../../components/transactionNav/index';
import Deposit from '../../components/deposit/index';
import TransactionModal from '../../components/depositModal/index';
import CardsIcon from '../../themes/images/cards.svg';
import Spinner from '../../components/spinner/index';
import Withdraw from '../../components/withdraw/index';
import Transfer from '../../components/transfer/index';
import TransactionHistory from '../../components/history/index';
import server from '../../services/server';
import './index.scss';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: JSON.parse(localStorage.getItem('accounts')),
      account: JSON.parse(localStorage.getItem('accounts'))[0],
      currencies: [],
      selectedCurrency: 'USD',
      cards: ['VISA- 5322 2489 2479 4823'],
      email: null,
      balance: '',
      deposit: parseFloat(0.0).toFixed(2),
      showDepositModal: false,
      showTransferModal: false,
      showSpinner: false,
      errorMessage: null,
      selectedTab: 'deposit',
      to: '',
      minimizeSideBar: false,
      transactions: [],
      transactionsObject: {},
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.id = this.profile.user_id;
  }

  async componentDidMount() {
    this.setState({
      email: this.profile.email,
      balance: this.profile.demo.demo_balance,
    });

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
    console.log(account, prevState.account);
    if (prevState.account !== account) {
      await this.fetchTransactions();
    }
  }

  fetchTransactions = async () => {
    try {
      this.setState({ showSpinner: true });
      const account = this.state.account.toLowerCase().match('demo')
        ? 'demo'
        : 'live';
      const {
        data: {
          data: {
            results: { deposits },
          },
        },
      } = await server.getTransactionHistory(
        this.profile.email,
        this.id,
        account,
      );
      let arr = [];

      for (let key in deposits) {
        arr.push(deposits[`${key}`]);
      }

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
      console.log(5555, info);
      this.setState({
        transactions: info,
        showSpinner: false,
        transactionsObject: deposits,
      });
    } catch (error) {
      this.setState({ showSpinner: false });
      return error.message;
    }
  };

  handleInputChange = (e) => {
    console.log(e.target.value);
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

  setAccount = (e) => {
    const {
      target: { value },
    } = e;

    this.setState({
      account: value,
      balance: value.toLowerCase().match('demo')
        ? this.profile.demo.demo_balance
        : this.profile.live.live_balance,
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

  deposit = async (e) => {
    e.preventDefault();

    const {
      email,
      selectedCurrency,
      deposit,
      account,
      selectedTab,
      to,
    } = this.state;

    const transAccount = account.toLowerCase().match('demo') ? 'demo' : 'live';

    this.setState({ errorMessage: null });

    try {
      if (deposit <= 0) {
        return this.setState({
          errorMessage: 'You must enter an amount greater than 0',
        });
      } else {
        this.setState({ showSpinner: true });
        if (selectedTab.toLowerCase().match('deposit')) {
          await server.fundAccount(
            email,
            parseFloat(deposit),
            selectedCurrency,
            this.id,
            transAccount,
          );
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
        } = await server.getProfile(this.id, myEmail);

        const newProfile = JSON.stringify(profile);
        localStorage.setItem('profile', newProfile);

        if (selectedTab.toLowerCase().match('deposit')) {
          this.setState({ showDepositModal: true });
        } else if (selectedTab.toLowerCase().match('transfer')) {
          this.setState({ showTransferModal: true });
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

  toggleTabs = (e) => {
    this.setState({
      selectedCurrency: 'USD',
      deposit: parseFloat(0.0).toFixed(2),
      errorMessage: null,
      to: '',
      balance: this.profile.demo.demo_balance,
      account: JSON.parse(localStorage.getItem('accounts'))[0],
      selectedTab: e.currentTarget.querySelector('div').innerHTML.toLowerCase(),
    });
  };

  render() {
    const {
      accounts,
      currencies,
      selectedCurrency,
      cards,
      email,
      deposit,
      showDepositModal,
      showSpinner,
      account,
      errorMessage,
      selectedTab,
      to,
      showTransferModal,
      minimizeSideBar,
      transactions,
    } = this.state;

    const myProfile = JSON.parse(localStorage.getItem('profile'));

    const balance = account.toLowerCase().match('demo')
      ? myProfile.demo.demo_balance
      : account.toLowerCase().match('live')
      ? myProfile.live.live_balance
      : '';
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
                handleSubmit={this.deposit}
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
                <TransactionHistory transactions={transactions} />
              ) : null
            }
          </div>
        </div>
      </Container>
    );
  }
}

export default Transactions;
