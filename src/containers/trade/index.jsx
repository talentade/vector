import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import SideBar from '../../components/sideBar2/index';
import OpenTrade from '../../components/openTrade/index';
import ClosedTrade from '../../components/closedTrade/index';
import PendingTrade from '../../components/pendingTrade/index';
import Balance from '../../components/balance/index';
import Demo from '../../components/demo/index';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import con_buysell from '../../themes/images/con_buysell.png';
import Margin from '../../components/margin/index';
import Favourites from '../../components/favourites/index';
import TradeSection from '../../components/tradesSection/index';
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
      hideNav: false,
      accounts: [],
      all_trades: [],
      open_trades: [],
      closed_trades: [],
      pending_trades: [],
      profile: app.profile(),
      selectedAccount: app.accountDetail(),
      selectedAccountVal: app.account(),
      hotStocks: [],
      favouritePairs: [],
      favourites: [],

      buyandsellAct: 'buy',
      buyandsellModal: false,
      buyandsellModalInfo: false,
      buyandsellConfirmed: false
    };

    this.realTimeListener = true;
    this.retryCounter = 0;

    this.profile = app.profile();
    this.socket = window.WebSocketPlug = new WebSocket(app.hostURL("socket", 1));
  }

  componentWillUnmount() {
    this.realTimeListener = false;
  }

  componentDidUpdate () {}

  async componentDidMount() {
    this.socket.addEventListener('message', ({data}) => {
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        // console.log(payload);
        switch(message.event) {
          case "PAIR_DATA":
            this.fetchFavs();
            this.setState({ hotStocks: payload, showLoader: false, showSpinner: false });
          break;
          case "GET_FAVOURITES":
          if(payload.user == app.id() && payload.account == app.account()) {
            let favs = [];
            // console.log("--fetched [favs]");
            payload.favourites.forEach((fav) => {
              if(fav) {
                let fv = this.state.hotStocks.filter((pair) =>
                          pair.pair.toLowerCase().match(fav.toLowerCase()),
                        );
                favs[favs.length] = fv[0];
              }
            });
            setTimeout(() => {
              this.setState({ favourites: favs, favouritePairs: payload.favourites, showSpinner: false });
            }, 10);
          }
          break;
        }
      } catch (e) {
        throw e;
      }
    });

    this.setState({ showNav: true });
    this.realTimeListener = true;
    this.getHistory("all");
    this.setState({ selectedAccount: app.accountDetail(), accounts: app.accounts() });

    window.addEventListener('resize', this.updateDimensions);
    $(".balance").on("refresh", () => {
      this.setState({profile: app.profile(), selectedAccount: app.accountDetail(), accounts: app.accounts()});
      console.log(app.accountDetail().balance, "--trigger");
      this.profile = app.profile();
    });

    // try {
    //   await this.fetchFavs();
    // } catch (e) {
    //   return e;
    // }
  }

  getHistory = async (type, t = 3000) => {
    // if(this.realTimeListener) {
    //   try {
    //     const { data : { data: { results, profile } } } = await server.tradeHistory(type, 10, 1);
    //     if(results) {
    //       this.setState({all_trades: results});
    //       this.populateTrades();
    //     }
    //     if(profile) {
    //       this.setState({profile: app.profile(profile), selectedAccount: app.accountDetail()});
    //       console.log(app.accountDetail().balance, "--auto");
    //       this.profile = profile;
    //     }
    //   } catch (error) {
    //     console.warn(error);
    //   }
    // }
    // setTimeout(async () => {
    //   this.getHistory(type);
    // }, t);
  }

  populateTrades = () => {
    let open_trades = [];
    let closed_trades = [];
    let pending_trades = [];
    this.state.all_trades.forEach((trade, i) => {
      if(trade.status == "open") {
        open_trades.push(trade);
      }
      if(trade.status == "closed") {
        closed_trades.push(trade);
      }
      if(trade.status == "pending") {
        pending_trades.push(trade);
      }
    });
    this.setState({open_trades: open_trades, pending_trades: pending_trades, closed_trades: closed_trades});
  }

  updateDimensions = () => {
    if (window.innerWidth > 600 && this.state.currentTab === 'Balance') {
      this.setState({ currentTab: 'Trade' });
    }
  }



  addToFav = async (pair) => {
    this.setState({showSpinner: true});
    // console.log("--updating favs");
    this.socket.send(JSON.stringify({"event": "ADD_FAVOURITE", "payload": {
      pair:    pair,
      user:    app.id(),
      account: app.account(),
    }}));
  }

  remFav = async (pair) => {
    this.setState({showSpinner: true});
    // console.log("--reupdating favs");
    this.socket.send(JSON.stringify({"event": "REMOVE_FAVOURITE", "payload": {
      pair:    pair,
      user:    app.id(),
      account: app.account(),
    }}));
  }

  fetchFavs = async () => {
    if(this.realTimeListener) {
      this.setState({showSpinner: true});
      // console.log("--fetching favs");
      this.socket.send(JSON.stringify({"event": "GET_FAVOURITES", "payload": {
        user:    app.id(),
        account: app.account(),
      }}));
      this.setState({showSpinner: false});
    }
  }



  // BSELL
  cancelBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellModalInfo: false, buyandsellConfirmed: false });
  }

  showBsellModal = (e, s = "buy") => {
    this.setState({ buyandsellModal: true, buyandsellModalInfo: false, showLoader: false, buyandsellAct: s });
  }

  showBsellModal2 = (e, s = "buy") => {
    this.setState({ buyandsellModal: true, buyandsellModalInfo: true, showLoader: false, buyandsellAct: s });
  }

  confirmBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellModalInfo: false, buyandsellConfirmed: true, showLoader: false });
  }




  showMainLoader = () => {
    this.setState({showSpinner: !this.state.showSpinner});
  }

  toggleSideBar = () => {
    this.setState({ clicked: !this.state.clicked, hideNav: !this.state.hideNav });
  }

  handleClick = (e) => {
    this.setState({
      currentTab: e.currentTarget.querySelector('p').innerHTML, hideNav: !this.state.hideNav
    });
    $(".link-icons.trade").click();
  }

  handleNavClick = () => {
    this.setState({ showNav: !this.state.showNav });
  }

  handleAccountChange = (e) => {
    let val = e.target.value;
    app.account(e.target.value);
    this.setState({ selectedAccountVal: e.target.value, selectedAccount: app.accountDetail() });
    // window.location.href = "";
  };

  render() {

    const { currentTab, hotStocks, showSpinner } = this.state;

    const balanceItems = [
      {
        className: 'credit',
        heading: 'Credit',
        figure: `$${this.state.selectedAccount.credit}`,
      },
      {
        className: 'open',
        heading: 'Open P/L',
        figure: '$'+(this.state.selectedAccount.open_p_l || 0),
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
        price: '$'+(this.state.selectedAccount.free_margin || 0),
      },
      {
        margin: 'M. Level',
        price: '$'+(this.state.selectedAccount.margin_level || 0),
      },
    ];

    return (
      <Container>
        <Spinner showSpinner={showSpinner} />
        <div className='trade-section'>
          { this.state.showNav ? 
            <SideBar
              clickHandler={this.toggleSideBar}
              hideText={this.state.clicked}
              currentTab={this.state.currentTab}
              handleClick={this.handleClick}
              showNav={this.state.showNav}
              hideNav={(e) => {
                window.innerWidth <= 1200 ? $(".link-icons.trade").click() : this.setState({clicked: !this.state.clicked});
              }}
            /> : null }
          <div
            className='right'
            style={{ width: this.state.clicked ? 'calc(100% - 50px)' : null }}
          >


            {this.state.buyandsellModal ? (
              <BuyandsellModal
                text={``}
                pair={window.buyAndSellData.pair}
                buy={window.buyAndSellData.buy}
                sell={window.buyAndSellData.sell}
                act={window.buyAndSellData.act}
                cancelClick={this.cancelBsellModal}
                confirmClick={this.confirmBsellModal}
                information={this.state.buyandsellModalInfo}
              />
            ) : null}

            {this.state.buyandsellConfirmed ? (
              <BsConfirmationModal
                imageUrl={con_buysell}
                text={``}
                cancelClick={this.cancelBsellModal}
                confirmClick={()=>{}}
              />
            ) : null}

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
                <Favourites favouritePairs={this.state.favourites} remove={this.remFav} refresh={this.fetchFavs} showSpinner={this.showMainLoader} showBsellModal2={this.showBsellModal2}/>
              </div>
              {currentTab === 'Trade' ? (
                <Chart hotStocks={hotStocks} />
              ) : currentTab === 'Open Trades' ? (
                <OpenTrade filterOptions={['All Types']} history={this.state.open_trades} />
              ) : currentTab === 'Closed Trades' ? (
                <ClosedTrade filterOptions={['All Types']} history={this.state.closed_trades} />
              ) : currentTab === 'Pending Trades' ? (
                <PendingTrade filterOptions={['All Types']} history={this.state.pending_trades} />
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
                <Favourites secondClassName favouritePairs={this.state.favourites} remove={this.remFav} refresh={this.fetchFavs} showSpinner={this.showMainLoader} showBsellModal2={this.showBsellModal2}/>
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
