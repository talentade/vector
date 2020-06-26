import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import server from '../../services/server';
import Balance from '../../components/balance/index';
import Demo from '../../components/demo/index';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import con_buysell from '../../themes/images/con_buysell.png';
import Margin from '../../components/margin/index';
import Favourites from '../../components/favourites/index';
import AddToFav from '../../components/addToFav/index';
import Chart from '../../components/chart/index';
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
      selectedAccount: '',
      hotStocks: [],
      showLoader: false,
      showAddFav: false,
      buyandsellModal: false,
      buyandsellModalInfo: false,
      buyandsellConfirmed: false
    };

    this.profile = JSON.parse(localStorage.getItem('profile'));
  }

  async componentDidMount() {
    this.setState({ showLoader: true });
    const accountType = localStorage.getItem('accountType');

    const userId = localStorage.getItem('id');

    setInterval(async () => {
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
    }, 1000);

    if (accountType) {
      this.setState({ selectedAccount: accountType });
    }

    const myAccounts = localStorage.getItem('accounts');

    this.setState({ accounts: JSON.parse(myAccounts) });
  }

  toggleSideBar = () => {
    this.setState({ clicked: !this.state.clicked });
  };


  cancelBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellModalInfo: false, buyandsellConfirmed: false });
  }

  showBsellModal = (e) => {
    this.setState({ buyandsellModal: true, buyandsellModalInfo: false, showLoader: false });
  }

  addFavPop = (e) => {
    this.setState({showAddFav: true});
  }

  cancelFavPop = (e) => {
    this.setState({showAddFav: false});
  }

  showBsellModal2 = (e) => {
    this.setState({ buyandsellModal: true, buyandsellModalInfo: true, showLoader: false });
  }

  confirmBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellModalInfo: false, buyandsellConfirmed: true, showLoader: false });
  }

  render() {
    const userId = localStorage.getItem('id');

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
        <div className='trade-section market-section'>
          { this.state.showAddFav ? <AddToFav cancelClick={this.cancelFavPop} /> : null}
          {this.state.buyandsellModal ? (
            <BuyandsellModal
              text={``}
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
                      balance={`$${
                        this.state.selectedAccount.toLowerCase().match('demo')
                          ? this.profile.demo.demo_balance
                          : this.profile.live.live_balance
                      }`}
                      balanceItemData={balanceItems}
                    />
                    <Demo
                      demoOptions={this.state.accounts}
                      selectValue={this.state.selectedAccount}
                      handleDemoChange={this.handleAccountChange}
                    />
                  </div>
                  <div className='margin-stuff'>
                    {marginItems.map((data) => (
                      <Margin {...data} key={`${Math.random() * 1000000}`} />
                    ))}
                  </div>
                </div>
                <Favourites showClick={this.addFavPop} favouritePairs={favouriteItems} />
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
