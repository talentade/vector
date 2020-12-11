import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import server from '../../services/server';
import app from '../../services/app';
import $ from 'jquery';
import Balance from '../../components/balance/index';
import Accounts from '../../components/accounts/index';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import FilterIcon from '../../themes/images/tradeDashboard/filter.svg';
import Margin from '../../components/margin/index';
import Favourites from '../../components/favourites/index';
import Chart from '../../components/chart/index';
import Spinner from '../../components/spinner/index';
import Container from '../container/index';
import { FavPopup } from '../../components/popups/index';
import SearchIcon from '../../themes/images/micro.svg';
import MarketSideBar from '../../components/marketSidebar/index';
import { filterInstrument } from '../../redux/actions/index';
import { setHotStocks } from '../../redux/actions/index';
import './index.scss';

class Market extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      currentTab: 'Trade',
      showNav: true,
      accounts: [],
      selectedAccount: app.accountDetail(),
      selectedAccountVal: app.account(),
      hotStocks: [],
      favouritePairs: [],
      _favouritePairs: [],
      open_pl: 0,
      equity: 0,
      margin: 0,
      filter: '',
      favourites: [],
      all_trades: [],
      open_trades: [],
      closed_trades: [],
      pending_trades: [],
      showLoader: true,
      showSpinner: false,
      favPopup: false,
      confirmtext: "",
      favPopup_pair: "",
      buyandsellAct: 'buy',
      buyandsellModal: false,
      buyandsellModalInfo: false,
      buyandsellConfirmed: false
    };
    this.realTimeListener = true;
    this.retryCounter = 0;

    this.profile = app.profile();
    this.fireFavRef = new CustomEvent('refreshFav', {
      detail: {
        code: 200
      }
    });

    this.refresHistory = null;
  }

  componentWillUnmount() {
    this.realTimeListener = false;
    clearInterval(this.refresHistory);
  }

  async componentDidMount() {
    $(window).on("renewSocket", () => this.socketInit());
    if(window.WebSocketPlugged) {
      $(window).trigger("renewSocket");
    }

    this.realTimeListener = true;
    this.setState({ selectedAccount: app.accountDetail(), accounts: app.accounts() });

    $(".balance").on("refresh", () => {
      this.setState({profile: app.profile(), selectedAccount: app.accountDetail(), accounts: app.accounts()});
      this.profile = app.profile();
    });

    var w = $(window).innerHeight();
    $(".market-pairs").attr("style", "height: "+(Number(w) - 180)+"px !important; min-height: "+(Number(w) - 180)+"px !important;");

    $(window).resize(() => {
      w = $(window).innerHeight();
      $(".market-pairs").attr("style", "height: "+(Number(w) - 180)+"px !important; min-height: "+(Number(w) - 180)+"px !important;");
    });
  }

  socketInit = () => {
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        // console.log(payload);
        switch(message.event) {
          case "PAIR_DATA":
            // this.fetchFavs();
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
        if(parseInt(trade.order_status) == 0) {
          open_pl += Number(trade.profit);
          margin += Number(trade.required_margin);
          open_trades.push(trade);
        }
        if(parseInt(trade.order_status) == 1) {
          pending_trades.push(trade);
        }
        if(parseInt(trade.order_status) == 2) {
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
      equity:            open_trades.length ? (Number(this.state.selectedAccount.balance) + Number(open_pl) + Number(margin)).toFixed(2) : 0
    });
  }

  addToFav = async (pair) => {
    if(window.WebSocketPlugged) {
      this.setState({showSpinner: true});

      let favs          = this.state._favouritePairs;
      let fv            = this.state.hotStocks.filter((p) => p.pair.toLowerCase().match(pair.toLowerCase()));
      favs[favs.length] = fv[0];
      this.setState({_favouritePairs: favs });

      // console.log("--addToFav");

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
      // console.log("--reupdating favs");
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
      // console.log("--fetching favs");
      window.WebSocketPlug.send(JSON.stringify({"event": "GET_FAVOURITES", "payload": {
        user:    app.id(),
        account: app.account(),
      }}));
      this.setState({showSpinner: false});
    }
  }

  toggleSideBar = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  showMainLoader = () => {
    this.setState({showSpinner: !this.state.showSpinner});
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

  confirmBsellModal = (txt = "") => {
    window.BuyandsellModalPopup = false;
    this.setState({ buyandsellModal: false, buyandsellModalInfo: false, buyandsellConfirmed: true, showLoader: false, confirmtext: txt });
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

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
      <span className={cl}>{pr+this.numberWithCommas(price.toFixed(2).toLocaleString())}</span>
    )
  }

  render() {
    const { hotStocks, showLoader, filter } = this.state;

    let fil = filter.replace(/[^\w\s]/gi, '');
    const stocksToDisplay = fil.length ? hotStocks.filter((pair) => {
      return (
        pair.name.toLowerCase().match(fil.toLowerCase()) ||
        pair.pair.toLowerCase().match(fil.toLowerCase()) ||
        (pair.name + " "+pair.pair).toLowerCase().match(fil.toLowerCase())
      )
    }) : hotStocks;

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
        margin: 'Used Margin',
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

    let altBalance = this.numberWithCommas(Number(Number(this.state.selectedAccount.balance) + Number(margin)).toFixed(2));

    return (
      <Container>
        <Spinner showSpinner={this.state.showSpinner} />
        <FavPopup show={this.state.favPopup} pair={this.state.favPopup_pair} cancel={(e) => this.setState({favPopup: false})} />
        <div className='trade-section market-section'>
          
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

          <BsConfirmationModal
            text={this.state.confirmtext}
            show={this.state.buyandsellConfirmed}
            cancel={this.cancelBsellModal}
          />


          <div style={{width: this.state.clicked ? '50px' : null, overflow: 'hidden'}} className={`left display-l-nav big-left`}>
            <img src={FilterIcon} alt='' className='filter-img' onClick={this.toggleSideBar} />
            <div className='loader-container' style={{ display: showLoader ? 'block' : 'none' }}>
              <div className='loader'></div>
            </div>
            <div className='market-search' style={{display: this.state.clicked ? 'none' : 'flex'}}>
              <input type='text' name='searchText' id="ins_search" onKeyUp={(e) => this.setState({filter: e.target.value})} placeholder='Search Instrument' /> {/*onChange={(event) => filterInstrument(event.target.value)} */}
              <img src={SearchIcon} alt='' />
            </div>
            <div className='margin-top-small' style={{ display: this.state.clicked ? 'none' : 'block' }}>
              <MarketSideBar
                pairs={stocksToDisplay}
                clickHandler={this.toggleSideBar}
                hideText={this.state.clicked}
                showLoader={showLoader}
                _favouritePairs={this.state._favouritePairs}
                favouritePairs={this.state.favouritePairs}
                showBsellModal={this.showBsellModal}
                addToFav={this.addToFav}
                remFav={this.remFav}
                showBsellModal2={this.showBsellModal2}
              />
            </div>
          </div>

          <div
            className='right big-right'
            style={{ width: this.state.clicked ? 'calc(100% - 50px)' : null }}
          >
            <div className='trade-comp-container trade-comp-container-market'>
              <div className='trade-overview-row'>
                <div className='balance-margin'>
                  <div className='balance-demo'>
                    <Balance
                      balance={`$${altBalance}`}
                      balanceItemData={balanceItems}
                    />
                    <Accounts
                      options={app.accountList()}
                      selectValue={this.state.selectedAccountVal}
                      handleChange={this.handleAccountChange}
                    />
                  </div>
                  <div className='margin-stuff'>
                    {marginItems.map((data) => (
                      <Margin {...data} key={`${Math.random() * 1000000}`} />
                    ))}
                  </div>
                </div>
                <Favourites favouritePairs={this.state.favourites} remove={this.remFav} refresh={this.fetchFavs} showSpinner={this.showMainLoader} showBsellModal2={this.showBsellModal2} />
              </div>
              <Chart hotStocks={hotStocks} />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setHotStocks: payload => dispatch(setHotStocks(payload)),
})

const mapStateToProps = ({ filter, topStocks }) => ({
  filter,
  topStocks,
});

export default connect(mapStateToProps, mapDispatchToProps)(Market);
