import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import server from '../../services/server';
import app from '../../services/app';
import Balance from '../../components/balance/index';
import Demo from '../../components/demo/index';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import con_buysell from '../../themes/images/con_buysell.png';
import Margin from '../../components/margin/index';
import Favourites from '../../components/favourites/index';
import AddToFav from '../../components/addToFav/index';
import Chart from '../../components/chart/index';
import Spinner from '../../components/spinner/index';
import Container from '../container/index';
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
      favourites: [],
      showLoader: false,
      showAddFav: false,
      showSpinner: false,
      buyandsellAct: 'buy',
      buyandsellModal: false,
      buyandsellModalInfo: false,
      buyandsellConfirmed: false
    };
    this.realTimeListener = true;

    this.profile = app.profile();
    this.fireFavRef = new CustomEvent('refreshFav', {
      detail: {
        code: 200
      }
    });
  }

  fetchStock = async () => {
    const userId = app.id();
    try {
      const {
        data: {
          data: { hot_stocks },
        },
      } = await server.getMarketAndNewsData(userId);

      this.setState({ hotStocks: hot_stocks, showLoader: false });
    } catch (error) {
      this.setState({ showLoader: false });
      if (!error.response) {
        return error.message;
      }
    }
  }

  componentWillUnmount() {
    this.realTimeListener = false;
  }

  async componentDidMount() {
    this.realTimeListener = true;
    this.setState({ showLoader: true });
    const accountType = app.account();

    const userId = app.id();
    
    try {
      await this.fetchStock();
      await this.fetchFavs();
    } catch (e) {
      return e;
    }

    setInterval(async () => {
      if(this.realTimeListener) {
        this.fetchStock()
      }
    }, 5000);

    if (accountType) {
      this.setState({ selectedAccount: app.accountDetail() });
    }

    const myAccounts = app.accounts();

    this.setState({ accounts: myAccounts });
  }

  fetchFavs = async () => {
    try {
      const { data: { data, code } } = await server.fetchFav();
      if(code == 200) {
        if(data.length) {
          this.setState({favourites: data});
        }
      }
    } catch (error) {
      setTimeout(() => {
        this.fetchFavs();
      }, 30 * 1000);
      console.log("-- Fetch fav err");
      return error.message;
    }
  }

  toggleSideBar = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  addFavPop = (e) => {
    this.setState({showAddFav: true});
  }

  cancelFavPop = (e) => {
    this.setState({showAddFav: false});
  }

  addToFav = async (e) => {
    this.setState({showSpinner: true});
    try {
      const { data : { data: {}, code, message } } = await server.addToFav(app.id(), app.account(), e.target.getAttribute("pair"));
      if(code == 200) {
        await this.fetchFavs();
        await this.fetchStock();
      }
    } catch(error) {
      this.setState({showSpinner: false});
      return error;
    }
    this.setState({showSpinner: false});
  }

  remFav = async (e) => {
    this.setState({showSpinner: true});
    try {
      let pair = e.target.getAttribute("pair");
      const { status, message } = await server.removeFav(app.id(), app.account(), pair);
      await this.fetchStock();
      if(status == 200) {
        let npair = [];
        this.state.favourites.forEach((fav) => {
          if(fav.pair != pair) {
            npair.push(fav);
          }
        })
        this.setState({favourites: npair});
      }
    } catch(error) {
      this.setState({showSpinner: false});
      return error;
    }
    this.setState({showSpinner: false});
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

  confirmBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellModalInfo: false, buyandsellConfirmed: true, showLoader: false });
  }

  handleAccountChange = (e) => {
    let val = e.target.value;
    app.account(e.target.value);
    this.setState({ selectedAccountVal: e.target.value });
    window.location.href = "";
  };

  render() {
    const userId = app.id();

    if (!userId) return <Redirect to='/Login' />;

    const { hotStocks, showLoader } = this.state;

    const stocksToDisplay = this.props.filter
      ? hotStocks.filter((stock) =>
          stock.stock.toLowerCase().match(this.props.filter.toLowerCase()),
        )
      : hotStocks;

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
        <Spinner showSpinner={this.state.showSpinner} />
        <div className='trade-section market-section'>
          { this.state.showAddFav ? <AddToFav cancelClick={this.cancelFavPop} /> : null}
          
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

          <MarketSideBar
            pairs={stocksToDisplay}
            clickHandler={this.toggleSideBar}
            hideText={this.state.clicked}
            showLoader={showLoader}
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
                <Favourites favouritePairs={favouriteItems} refresh={this.fetchFavs} showSpinner={this.showMainLoader} showBsellModal2={this.showBsellModal2}/>
              </div>
              <Chart />
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
