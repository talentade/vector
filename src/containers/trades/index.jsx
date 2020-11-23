import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import $ from 'jquery';
import SideBar from '../../components/sideBar2/index';
import OpenTrade from '../../components/openTrade/index';
import ClosedTrade from '../../components/closedTrade/index';
import PendingTrade from '../../components/pendingTrade/index';
import Balance from '../../components/balance/index';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import con_buysell from '../../themes/images/con_buysell.png';
import Spinner from '../../components/spinner/index';
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
      currentTab: 'Open Trades',
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
          admin:   true
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
            this.setState({ hotStocks: payload, showLoader: false, showSpinner: false });
          break;
          case "TRADE_HISTORY":
            if(payload.user == app.id() && payload.admin) {
              this.setState({ all_trades: payload.history });
              this.populateTrades(payload.history);
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
    });
  }

  updateDimensions = () => {
    if (window.innerWidth > 600 && this.state.currentTab === 'Balance') {
      this.setState({ currentTab: 'Trade' });
    }
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

  render() {

    const { currentTab, hotStocks, showSpinner } = this.state;

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
              admin={true}
              hideNav={(e) => {
                window.innerWidth <= 1200 ? $(".link-icons.trade").click() : this.setState({clicked: !this.state.clicked});
              }}
            /> : null }
          <div
            className='right'
            style={{ width: this.state.clicked ? 'calc(100% - 50px)' : null }}
          >
            <div className='trade-comp-container'>
              {currentTab === 'Open Trades' ? (
                <OpenTrade filterOptions={this.state.filterOptions} admin={true} history={this.state.open_trades} />
              ) : currentTab === 'Closed Trades' ? (
                <ClosedTrade filterOptions={this.state.filterOptions} admin={true} history={this.state.closed_trades} />
              ) : currentTab === 'Pending Trades' ? (
                <PendingTrade filterOptions={this.state.filterOptions} admin={true} history={this.state.pending_trades} />
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
