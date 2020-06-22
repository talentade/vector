import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { favouritePairs, marginData } from '../../utils/dummyData';
import SideBar from '../../components/sideBar2/index';
import OpenTrade from '../../components/openTrade/index';
import Balance from '../../components/balance/index';
import Demo from '../../components/demo/index';
import Margin from '../../components/margin/index';
import Favourites from '../../components/favourites/index';
import TradeSection from '../../components/tradesSection/index';
import MobileBalance from '../../components/balanceMobile/index';
import Spinner from '../../components/spinner/index';
import Chart from '../../components/chart/index';
import { saveUserProfile } from '../../redux/actions/index';
// import {
//   theaderDataClosed,
//   tbodyDataClosed,
//   tbodyDataOpen,
//   theaderDataOpen,
// } from '../../utils/dummyData';
import Container from '../container/index';
import './index.scss';

class TradeDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      currentTab: 'Trade',
      showNav: true,
      showSpinner: false,
      accounts: [],
      selectedAccount: '',
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  async componentDidMount() {
    const userId = localStorage.getItem('id');

    if (!userId) this.props.history.push('/Login');

    const accountType = localStorage.getItem('accountType');

    if (accountType) {
      this.setState({ selectedAccount: accountType });
    }

    const myAccounts = localStorage.getItem('accounts');

    this.setState({ accounts: JSON.parse(myAccounts) });

    window.addEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    if (window.innerWidth > 600 && this.state.currentTab === 'Balance') {
      this.setState({ currentTab: 'Trade' });
    }
  };

  toggleSideBar = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleClick = (e) => {
    this.setState({ currentTab: e.currentTarget.querySelector('p').innerHTML });
  };

  handleNavClick = () => {
    this.setState({ showNav: !this.state.showNav });
  };

  handleAccountChange = (e) => {
    const myAccounts = localStorage.setItem('accountType', e.target.value);
    this.setState({ selectedAccount: e.target.value });
  };

  render() {
    const userId = localStorage.getItem('id');

    if (!userId) return <Redirect to="/Login" />

    const { currentTab, showSpinner } = this.state;
    const balanceItems = [
      {
        className: 'credit',
        heading: 'Credit',
        figure: `$${
          this.state.selectedAccount.toLowerCase().match('demo')
            ? this.profile.demo.credit
            : this.profile.live.credit
        }`,
      },
      {
        className: 'open',
        heading: 'Open P/L',
        figure: `$${
          this.state.selectedAccount.toLowerCase().match('demo')
            ? this.profile.demo.open_p_l
            : this.profile.live.open_p_l
        }`,
      },
      {
        className: 'equity',
        heading: 'Equity',
        figure: `$${
          this.state.selectedAccount.toLowerCase().match('demo')
            ? this.profile.demo.equity
            : this.profile.live.equity
        }`,
      },
    ];

    const marginItems = [
      {
        margin: 'Margin',
        price: `$${
          this.state.selectedAccount.toLowerCase().match('demo')
            ? this.profile.demo.margin
            : this.profile.live.margin
        }`,
      },
      {
        margin: 'Free Margin',
        price: `$${
          this.state.selectedAccount.toLowerCase().match('demo')
            ? this.profile.demo.free_margin
            : this.profile.live.free_margin
        }`,
      },
      {
        margin: 'M. Level',
        price: `$${
          this.state.selectedAccount.toLowerCase().match('demo')
            ? this.profile.demo.margin_level
            : this.profile.live.margin_level
        }`,
      },
    ];

    const favouriteItems = this.state.selectedAccount
      .toLowerCase()
      .match('demo')
      ? this.profile.demo.favorites
      : this.profile.live.favorites;
    return (
      <Container>
        <Spinner showSpinner={showSpinner} />
        <div className='trade-section'>
          <SideBar
            clickHandler={this.toggleSideBar}
            hideText={this.state.clicked}
            currentTab={this.state.currentTab}
            handleClick={this.handleClick}
            showNav={this.state.showNav}
          />
          <div
            className='right'
            style={{ width: this.state.clicked ? 'calc(100% - 50px)' : null }}
          >
            <div className='trade-comp-container'>
              <div className='trade-overview-row'>
                <div className='balance-margin'>
                  <div className='balance-demo'>
                    <Balance
                      balance={`$${
                        this.state.selectedAccount.toLowerCase().match('demo')
                          ? this.profile.demo.demo_balance
                          : this.profile.live.live_balance
                      }`}
                      balanceItemData={balanceItems}
                    />
                    {currentTab !== 'Balance' ? (
                      <Demo
                        demoOptions={this.state.accounts}
                        selectValue={this.state.selectedAccount}
                        handleDemoChange={this.handleAccountChange}
                      />
                    ) : null}
                  </div>
                  <div className='margin-stuff'>
                    {marginItems.map((data) => (
                      <Margin {...data} key={`${Math.random() * 1000000}`} />
                    ))}
                  </div>
                </div>
                <Favourites favouritePairs={favouriteItems} />
              </div>
              {currentTab === 'Trade' ? (
                <Chart />
              ) : currentTab === 'Open Trades' ? (
                <OpenTrade type="open" filterOptions={['All Types']} />
                // <TradeSection
                  // filterOptions={['All Types']}
                  // theaderData={theaderDataOpen}
                  // tbodyData={tbodyDataOpen}
                  // text='No Open Trades Found'
                // />
              ) : currentTab === 'Closed Trades' ? (
                <OpenTrade type="closed" filterOptions={['All Types']} />
                // <TradeSection
                //   filterOptions={['All Types']}
                  // theaderData={theaderDataClosed}
                  // tbodyData={tbodyDataClosed}
                //   text='No Closed Trades Found'
                // />
              ) : currentTab === 'Pending Trades' ? (
                <OpenTrade type="pending" filterOptions={['All Types']} />
                // <TradeSection
                //   filterOptions={['All Types']}
                //   text='No Pending Trades Found'
                // />
              ) : (
                <MobileBalance
                  demoOptions={this.state.accounts}
                  balance={`$${
                    this.state.selectedAccount.toLowerCase().match('demo')
                      ? this.profile.demo.demo_balance
                      : this.profile.live.live_balance
                  }`}
                  balanceItemData={balanceItems}
                  marginItems={marginItems}
                  handleDemoChange={this.handleAccountChange}
                  selectValue={this.state.selectedAccount}
                />
              )}
              {currentTab !== 'Balance' ? (
                <Favourites favouritePairs={favouriteItems} secondClassName />
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUserProfile: (profile) => dispatch(saveUserProfile(profile)),
});

export default withRouter(connect(null, mapDispatchToProps)(TradeDashboard));
