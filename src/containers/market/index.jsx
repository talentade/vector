import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import server from '../../services/server';
import app from '../../services/app';
import $ from 'jquery';
import Balance from '../../components/balance/index';
import Demo from '../../components/demo/index';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import Margin from '../../components/margin/index';
import Favourites from '../../components/favourites/index';
import Chart from '../../components/chart/index';
import Spinner from '../../components/spinner/index';
import Container from '../container/index';
import { FavPopup } from '../../components/popups/index';
import MarketSideBar from '../../components/marketSidebar/index';
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
      favourites: [],
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
    this.socket = window.WebSocketPlug = new WebSocket(app.hostURL("socket", 1));
  }

  fetchStock = async () => {
    // try {
    //   const market = await server.getMarketAndNewsData();
    //   let hot_stocks = market.data.pair_data;
    //   if(hot_stocks.length) {
    //     this.setState({ hotStocks: hot_stocks, showLoader: false });
    //   }
    // } catch (error) {
    //   this.setState({ showLoader: false });
    //   if (!error.response) {
    //     return error.message;
    //   }
    // }
  }

  componentWillUnmount() {
    this.realTimeListener = false;
  }

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
            let favs = [], _unfav = false;
            // console.log("--fetched [favs]");
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

    this.realTimeListener = true;
    this.setState({ selectedAccount: app.accountDetail(), accounts: app.accounts() });

    $(".balance").on("refresh", () => {
      this.setState({profile: app.profile(), selectedAccount: app.accountDetail(), accounts: app.accounts()});
      console.log(app.accountDetail().balance, "--trigger");
      this.profile = app.profile();
    });

    // try {
    //   await this.fetchStock();
    // } catch (e) {
    //   return e;
    // }
  }

  addToFav = async (pair) => {
    this.setState({showSpinner: true});

    let favs          = this.state._favouritePairs;
    let fv            = this.state.hotStocks.filter((p) => p.pair.toLowerCase().match(pair.toLowerCase()));
    favs[favs.length] = fv[0];
    this.setState({_favouritePairs: favs });

    // console.log("--addToFav");

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

  toggleSideBar = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  showMainLoader = () => {
    this.setState({showSpinner: !this.state.showSpinner});
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

  confirmBsellModal = (txt = "") => {
    this.setState({ buyandsellModal: false, buyandsellModalInfo: false, buyandsellConfirmed: true, showLoader: false, confirmtext: txt });
  }

  handleAccountChange = (e) => {
    let val = e.target.value;
    app.account(e.target.value);
    this.setState({ selectedAccountVal: e.target.value, selectedAccount: app.accountDetail(), accounts: app.accounts() });
  };

  render() {
    const { hotStocks, showLoader } = this.state;

    const stocksToDisplay = this.props.filter ? hotStocks.filter((pair) =>
      pair.pair.toLowerCase().match(this.props.filter.toLowerCase()),
    ) : hotStocks;

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
        <Spinner showSpinner={this.state.showSpinner} />
        <FavPopup show={this.state.favPopup} pair={this.state.favPopup_pair} cancel={(e) => this.setState({favPopup: false})} />
        <div className='trade-section market-section'>
          
          {this.state.buyandsellModal ? (
            <BuyandsellModal
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
          <div
            className='right big-right'
            style={{ width: this.state.clicked ? 'calc(100% - 50px)' : null }}
          >
            <div className='trade-comp-container trade-comp-container-market'>
              <div className='trade-overview-row'>
                <div className='balance-margin'>
                  <div className='balance-demo'>
                    <Balance
                      balance={`$${this.state.selectedAccount.balance}`}
                      balanceItemData={balanceItems}
                    />
                    <Demo
                      demoOptions={this.state.accounts}
                      selectValue={this.state.selectedAccountVal}
                      handleDemoChange={this.handleAccountChange}
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
