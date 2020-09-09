import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import SideBar from '../../components/sideBar2/index';
import OpenTrade from '../../components/openTrade/index';
import ClosedTrade from '../../components/closedTrade/index';
import PendingTrade from '../../components/pendingTrade/index';
import Balance from '../../components/balance/index';
import Accounts from '../../components/accounts/index';
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
      open_pl: 0,
      equity: 0,
      margin: 0,
      filterOptions: ['ALL TYPES'],
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
      _favouritePairs: [],
      favourites: [],

      buyandsellAct: 'buy',
      buyandsellModal: false,
      buyandsellModalInfo: false,
      buyandsellConfirmed: false
    };

    this.realTimeListener = true;
    this.retryCounter = 0;

    this.profile = app.profile();
  }

  componentWillUnmount() {
    this.realTimeListener = false;
  }

  componentDidUpdate () {}

  async componentDidMount() {
    $(window).on("renewSocket", () => this.socketInit());
    if(window.WebSocketPlugged) {
      $(window).trigger("renewSocket");
    }

    this.setState({ showNav: true });
    this.realTimeListener = true;
    this.setState({ selectedAccount: app.accountDetail(), accounts: app.accounts() });

    window.addEventListener('resize', this.updateDimensions);
    $(".balance").on("refresh", () => {
      this.setState({profile: app.profile(), selectedAccount: app.accountDetail(), accounts: app.accounts()});
      console.log(app.accountDetail().balance, "--trigger");
      this.profile = app.profile();
    });

    setInterval(() => {
      if(this.realTimeListener && window.WebSocketPlugged) {
        window.WebSocketPlug.send(JSON.stringify({"event": "TRADE_HISTORY", "payload": {
          user:    app.id(),
          account: app.account(),
        }}));
      }
    }, 1000);

    setTimeout(() => {
      let filterOptions = Object.keys(app.allPairs());
      let f = [];
      for (var i = 0; i <= filterOptions.length; i++) {
        f[i] = (i == 0 ? "ALL TYPES" : filterOptions[i - 1]).toUpperCase();
      }
      this.setState({filterOptions : f});
    }, 1000);
  }


  socketInit = () => {
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        // console.log(payload);
        switch(message.event) {
          case "PAIR_DATA":
            this.fetchFavs();
            this.setState({ hotStocks: payload, showLoader: false, showSpinner: false });
          break;
          case "TRADE_HISTORY":
            if(payload.user == app.id() && payload.account == app.account()) {
              this.setState({ all_trades: payload.history });
              this.populateTrades(payload.history);
            }
          break;
          case "GET_FAVOURITES":
          if(payload.user == app.id() && payload.account == app.account()) {
            let favs = [], _unfav = false;
            payload.favourites.forEach((fav) => {
              if(fav) {
                let fv = this.state.hotStocks.filter((pair) => pair.pair.toLowerCase().match(fav.toLowerCase()));
                favs[favs.length] = fv[0];
                if(this.state._favouritePairs.length) {
                  let _fv = [];
                  Object.values(this.state._favouritePairs).forEach((_pair) => {
                    if(fav.toLowerCase() == _pair.pair.toLowerCase()) {
                      _unfav = true;
                    }
                  });
                }
              }
            });
            setTimeout(() => {
              if(_unfav) {
                this.setState({_favouritePairs: []});
              }
              this.setState({ favourites: favs, favouritePairs: payload.favourites, showSpinner: false });
            }, 10);
          }
          break;
        }
      } catch (e) {
        throw e;
      }
    });
  }

  populateTrades = (trades = false) => {
    let all_trades = trades ? trades : this.state.all_trades;
    let open_trades = [];
    let closed_trades = [];
    let pending_trades = [];
    let open_pl = 0;
    let margin = 0;

    all_trades.forEach((trade, i) => {
      let rate = this.state.hotStocks.filter((pair) => {
        if(pair.pair) {
          return pair.pair.toLowerCase().match(trade.instrument.toLowerCase()) || trade.instrument.toLowerCase() == pair.pair.toLowerCase();
        }
      });
      if(rate.length) {
        let brate = app.floatFormat(rate ? rate[0].ask : 0);
        let srate = app.floatFormat(rate ? rate[0].bid : 0);
        trade.current_rate = trade.mode == "buy" ? brate : srate;
        if(trade.order_status == 0) {
          open_pl += Number(trade.profit);
          margin += Number(trade.required_margin);
          open_trades.push(trade);
        }
        if(trade.order_status == 1) {
          pending_trades.push(trade);
        }
        if(trade.order_status == 2) {
          closed_trades.push(trade);
        }
      }
    });

    this.setState({
      open_trades:       open_trades,
      pending_trades:    pending_trades,
      closed_trades:     closed_trades,
      open_pl:           open_pl.toFixed(2),
      margin:            Number(margin).toFixed(2),
      equity:            open_trades.length ? (Number(this.state.selectedAccount.balance) + Number(open_pl)).toFixed(2) : 0
    });
  }

  updateDimensions = () => {
    if (window.innerWidth > 600 && this.state.currentTab === 'Balance') {
      this.setState({ currentTab: 'Trade' });
    }
  }

  addToFav = async (pair) => {
    if(window.WebSocketPlugged) {
      this.setState({showSpinner: true});
      window.WebSocketPlug.send(JSON.stringify({"event": "ADD_FAVOURITE", "payload": {
        pair:    pair,
        user:    app.id(),
        account: app.account(),
      }}));
    }
  }

  remFav = async (pair) => {
    if(window.WebSocketPlugged) {
      this.setState({showSpinner: true});
      window.WebSocketPlug.send(JSON.stringify({"event": "REMOVE_FAVOURITE", "payload": {
        pair:    pair,
        user:    app.id(),
        account: app.account(),
      }}));
    }
  }

  fetchFavs = async () => {
    if(this.realTimeListener && window.WebSocketPlugged) {
      this.setState({showSpinner: true});
      window.WebSocketPlug.send(JSON.stringify({"event": "GET_FAVOURITES", "payload": {
        user:    app.id(),
        account: app.account(),
      }}));
      this.setState({showSpinner: false});
    }
  }



  // BSELL
  cancelBsellModal = (e) => {
    window.BuyandsellModalPopup = false;
    this.setState({ buyandsellModal: false, buyandsellModalInfo: false, buyandsellConfirmed: false });
  }

  showBsellModal = (e, s = "buy") => {
    this.setState({ buyandsellModal: true, buyandsellModalInfo: false, showLoader: false, buyandsellAct: s });
  }

  showBsellModal2 = (e, s = "buy") => {
    this.setState({ buyandsellModal: true, buyandsellModalInfo: true, showLoader: false, buyandsellAct: s });
  }

  confirmBsellModal = (e) => {
    window.BuyandsellModalPopup = false;
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
    this.setState({
      accounts: app.accounts(),
      selectedAccountVal: e.target.value,
      selectedAccount: app.accountDetail(),
      favouritePairs: [],
      favourites: [],
      all_trades: [],
      open_trades: [],
      closed_trades: [],
      pending_trades: [],
      open_pl: 0,
      equity: 0,
      margin: 0
    });
  }

  showPrice = (p) => {
    let cl, pr;
    if(p > 0) {
      pr = '$';
      cl = 'txt-success';
    } else if(p < 0) {
      pr = '-$';
      cl = 'txt-danger';
    } else {
      pr = '$';
      cl = 'txt-light';
    }
    let price = p < 0 ? -1 * Number(p) : Number(p);
    return (
      <span className={cl}>{pr+price.toFixed(2).toLocaleString()}</span>
    )
  }

  render() {

    const { currentTab, hotStocks, showSpinner } = this.state;

    let credit = Number(this.state.selectedAccount.credit);
    let open_pl = Number(this.state.open_pl);
    let equity = Number(this.state.equity);
    let margin = Number(this.state.margin);
    let fmargin = Number(this.state.equity - this.state.margin);

    const balanceItems = [
      {
        className: 'credit',
        heading: 'Credit',
        figure: this.showPrice(credit)
      },
      {
        className: 'open',
        heading: 'Open P/L',
        figure: this.showPrice(open_pl)
      },
      {
        className: 'equity',
        heading: 'Equity',
        figure: this.showPrice(equity)
      },
    ];

    const marginItems = [
      {
        margin: 'Margin',
        price: this.showPrice(margin),
      },
      {
        margin: 'Free Margin',
        price: this.showPrice(fmargin),
      },
      {
        margin: 'M. Level',
        price: (
          (Number(this.state.equity) + Number(this.state.margin) == 0) ? 0 :
          ((Number(this.state.equity) / Number(this.state.margin) * 100) || 0)
        ).toFixed(2)+"%",
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
                info={window.buyAndSellData.info}
                pair={window.buyAndSellData.pair}
                buy={window.buyAndSellData.buy}
                sell={window.buyAndSellData.sell}
                act={window.buyAndSellData.act}
                type={window.buyAndSellData.type}
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
                      balance={`$${Number(this.state.selectedAccount.balance).toLocaleString()}`}
                      balanceItemData={balanceItems}
                    />
                    {currentTab !== 'Balance' ? (
                      <Accounts
                        options={app.accountList()}
                        selectValue={this.state.selectedAccountVal}
                        handleChange={this.handleAccountChange}
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
                <OpenTrade filterOptions={this.state.filterOptions} history={this.state.open_trades} />
              ) : currentTab === 'Closed Trades' ? (
                <ClosedTrade filterOptions={this.state.filterOptions} history={this.state.closed_trades} />
              ) : currentTab === 'Pending Trades' ? (
                <PendingTrade filterOptions={this.state.filterOptions} history={this.state.pending_trades} />
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
