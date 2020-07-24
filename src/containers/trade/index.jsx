import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SideBar from '../../components/sideBar2/index';
import OpenTrade from '../../components/openTrade/index';
import ClosedTrade from '../../components/closedTrade/index';
import PendingTrade from '../../components/pendingTrade/index';
import Balance from '../../components/balance/index';
import Demo from '../../components/demo/index';
import Margin from '../../components/margin/index';
import Favourites from '../../components/favourites/index';
import TradeSection from '../../components/tradesSection/index';
import AddToFav from '../../components/addToFav/index';
import MobileBalance from '../../components/balanceMobile/index';
import Spinner from '../../components/spinner/index';
import Chart from '../../components/chart/index';
import server from '../../services/server';
import app from '../../services/app';
import { saveUserProfile } from '../../redux/actions/index';
import Container from '../container/index';
import './index.scss';

class TradeDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      currentTab: 'Trade',
      showSpinner: false,
      showNav: true,
      accounts: [],
      favourites: [],
      showAddFav: false,
      selectedAccount: app.accountDetail(),
      selectedAccountVal: app.account()
    };

    this.realTimeListener = true;
    this.retryCounter = 0;

    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  componentWillUnmount() {
    this.realTimeListener = false;
  }

  async componentDidMount() {
    this.realTimeListener = true;
    if (!app.id()) {
      this.props.history.push('/Login');
      return;
    }
    // this.setState({ selectedAccount: app.accountDetail() });
    const myAccounts = app.accounts();
    this.setState({ accounts: app.accounts() });
    window.addEventListener('resize', this.updateDimensions);
    try {
      await this.fetchFavs();
    } catch (e) {
      return e;
    }
  }

  addFavPop = (e) => {
    this.setState({showAddFav: true});
  }

  cancelFavPop = (e) => {
    this.setState({showAddFav: false});
  }

  updateDimensions = () => {
    if (window.innerWidth > 600 && this.state.currentTab === 'Balance') {
      this.setState({ currentTab: 'Trade' });
    }
  }

  fetchFavs = async () => {
    if(this.realTimeListener) {
      try {
        this.retryCounter = 0;
        const { data: { data, code } } = await server.fetchFav();
        if(code == 200) {
          if(data.length) {
            this.setState({favourites: data});
          }
        }
      } catch (error) {
        if(this.retryCounter < app.retryLimit) {
          this.retryCounter += 1;
          setTimeout(() => {
            this.fetchFavs();
          }, 30 * 1000);
        }
        return error.message;
      }
    }
  }

  toggleSideBar = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  handleClick = (e) => {
    this.setState({ currentTab: e.currentTarget.querySelector('p').innerHTML });
  }

  handleNavClick = () => {
    this.setState({ showNav: !this.state.showNav });
  }

  handleAccountChange = (e) => {
    let val = e.target.value;
    app.account(e.target.value);
    this.setState({ selectedAccountVal: e.target.value });
    window.location.href = "";
  };

  render() {
    const userId = localStorage.getItem('id');

    if (!userId) return <Redirect to="/Login" />

    const { currentTab, showSpinner } = this.state;
    const balanceItems = [
      {
        className: 'credit',
        heading: 'Credit',
        figure: `$${this.state.selectedAccount.credit}`,
      },
      {
        className: 'open',
        heading: 'Open P/L',
        figure: `$${this.state.selectedAccount.open_p_l}`,
      },
      {
        className: 'equity',
        heading: 'Equity',
        figure: `$${this.state.selectedAccount.equity}`,
      },
    ];

    const marginItems = [
      {
        margin: 'Margin',
        price: `$${this.state.selectedAccount.margin}`,
      },
      {
        margin: 'Free Margin',
        price: `$${this.state.selectedAccount.free_margin}`,
      },
      {
        margin: 'M. Level',
        price: `$${this.state.selectedAccount.margin_level}`,
      },
    ];

    // const favouriteItems = this.state.selectedAccount.favorites;
    const favouriteItems = this.state.favourites;
    return (
      <Container>
        <Spinner showSpinner={showSpinner} />
        <div className='trade-section'>
          { this.state.showAddFav ? <AddToFav cancelClick={this.cancelFavPop} /> : null}
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
                      balance={`$${this.state.selectedAccount.balance}`}
                      balanceItemData={balanceItems}
                    />
                    {currentTab !== 'Balance' ? (
                      <Demo
                        demoOptions={this.state.accounts}
                        selectValue={this.state.selectedAccountVal}
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
                <Favourites favouritePairs={favouriteItems} refresh={this.fetchFavs}/>
              </div>
              {currentTab === 'Trade' ? (
                <Chart />
              ) : currentTab === 'Open Trades' ? (
                <OpenTrade filterOptions={['All Types']} />
              ) : currentTab === 'Closed Trades' ? (
                <ClosedTrade filterOptions={['All Types']} />
              ) : currentTab === 'Pending Trades' ? (
                <PendingTrade filterOptions={['All Types']} />
              ) : (
                <MobileBalance
                  demoOptions={this.state.accounts}
                  balance={`$${this.state.selectedAccount.balance}`}
                  balanceItemData={balanceItems}
                  marginItems={marginItems}
                  handleDemoChange={this.handleAccountChange}
                  selectValue={this.state.selectedAccount}
                />
              )}
              {currentTab !== 'Balance' ? (
                <Favourites favouritePairs={favouriteItems} secondClassName refresh={this.fetchFavs}/>
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
