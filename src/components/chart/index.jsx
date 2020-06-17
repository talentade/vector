import React, { Component, createRef } from 'react';
// import axios from 'axios';
import { createChart, CrosshairMode } from 'lightweight-charts';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import con_buysell from '../../themes/images/con_buysell.png';
import StopWatch from '../../themes/images/tradeDashboard/stopwatch.svg';
import Wave from '../../themes/images/tradeDashboard/wave.svg';
import Wave2 from '../../themes/images/tradeDashboard/wave.svg';
import Multi from '../../themes/images/tradeDashboard/multi.svg';
import Tarrow from '../../themes/images/tradeDashboard/t_arrow.svg';
import WhiteDir from '../../themes/images/tradeDashboard/white_dir.svg';
import MapIcon from '../../themes/images/tradeDashboard/map.svg';
// import { priceData } from '../../utils/index';
import server from '../../services/server';
// import { instrumentsData } from '../../utils/dummyData';
import './index.scss';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.chartContainerRef = createRef();
    this.chart = createRef();
    this.resizeObserver = createRef();
    this.profile = JSON.parse(localStorage.getItem('profile'));
    this.allPairs = localStorage.getItem('allPairs');
    this.pair = '';
    this.data = [];

    this.state = {
      selectedOption: 'forex',
      currentPairs: [],
      allPairs: {},
      selectedPair: '',
      buy: 0,
      sell: 0,
      spread: 0,
      high: 0,
      low: 0,
      buyandsellModal: false,
      buyandsellConfirmed: false,
      showLoader: false,
      instruments: [],
    };
  }

  async componentDidMount() {
    this.setState({ showLoader: true });
    this.chart.current = createChart(this.chartContainerRef.current, {
      width: this.chartContainerRef.current.clientWidth,
      height: this.chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: '#006066',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: '#A09F9F',
        },
        horzLines: {
          color: '#A09F9F',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: '#A09F9F',
      },
      timeScale: {
        borderColor: '#A09F9F',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    this.candleSeries = this.chart.current.addCandlestickSeries({
      upColor: '#03CF9E',
      downColor: '#FF1E1E',
      borderDownColor: '#FF1E1E',
      borderUpColor: '#03CF9E',
      wickDownColor: '#c4c4c4',
      wickUpColor: '#c4c4c4',
    });

    this.resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      this.chart.current.applyOptions({ width, height });
      setTimeout(() => {
        this.chart.current.timeScale().fitContent();
      }, 0);
    });

    try {
      if (!this.allPairs) {
        const user_id = localStorage.getItem('id');

        const {
          data: { data },
        } = await server.getAllPairs(user_id);

        localStorage.setItem('allPairs', JSON.stringify(data));

        const instruments = Object.keys(data);

        this.pair = data.forex[0];

        this.setState({
          allPairs: data,
          currentPairs: data.forex,
          selectedPair: data.forex[0],
          instruments,
        });
      } else {
        const allPairsParsed = JSON.parse(this.allPairs);
        const instruments = Object.keys(allPairsParsed);
        this.setState({
          allPairs: allPairsParsed,
          currentPairs: allPairsParsed.forex,
          selectedPair: allPairsParsed.forex[0],
          instruments,
        });

        this.pair = allPairsParsed.forex[0];
      }
    } catch (error) {
      return error.message;
    }

    setInterval(async () => {
      const data = await this.handleDataChange(this.pair);

      if (typeof data === 'object' && data.pair === this.pair) {
        this.candleSeries.update(data);

        this.setState({
          showLoader: false,
          buy: data.bid,
          sell: data.ask,
          low: data.low,
          high: data.high,
          spread: data.spread,
        });
      }
    }, 1000); // 1000

    this.resizeObserver.current.observe(this.chartContainerRef.current);

    return () => this.resizeObserver.current.disconnect();
  }

  handleOptionsChange = (e) => {
    this.pair = this.state.allPairs[e.target.value.toLowerCase()][0];
    this.setState({
      selectedOption: e.target.value,
      showLoader: true,
      currentPairs: this.state.allPairs[e.target.value.toLowerCase()],
      selectedPair: this.state.allPairs[e.target.value.toLowerCase()][0],
    });

    this.chart.current.removeSeries(this.candleSeries);
    this.candleSeries = this.chart.current.addCandlestickSeries({
      upColor: '#03CF9E',
      downColor: '#FF1E1E',
      borderDownColor: '#FF1E1E',
      borderUpColor: '#03CF9E',
      wickDownColor: '#c4c4c4',
      wickUpColor: '#c4c4c4',
    });
  };

  handleDataChange = async (pair) => {
    const id = localStorage.getItem('id');

    try {
      const {
        data: { data },
      } = await server.getRealTimeData(pair, id);

      return {
        time: data.when / 1000,
        open: parseFloat(data.open),
        high: parseFloat(data.high),
        low: parseFloat(data.low),
        close: parseFloat(data.close),
        ask: parseFloat(data.ask),
        spread: parseFloat(data.spread),
        bid: parseFloat(data.bid),
        pair: data.pair,
      };
    } catch (error) {
      return error.message;
    }
  };

  setNewPairData = (e) => {
    this.pair = e.target.value;
    this.setState({ selectedPair: e.target.value, showLoader: true });
    this.chart.current.removeSeries(this.candleSeries);
    this.candleSeries = this.chart.current.addCandlestickSeries({
      upColor: '#03CF9E',
      downColor: '#FF1E1E',
      borderDownColor: '#FF1E1E',
      borderUpColor: '#03CF9E',
      wickDownColor: '#c4c4c4',
      wickUpColor: '#c4c4c4',
    });
  };

  cancelBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellConfirmed: false });
  }

  showBsellModal = (e) => {
    this.setState({ buyandsellModal: true, showLoader: false });
  }

  confirmBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellConfirmed: true, showLoader: false });
  }

  render() {
    return (
      <div className='trade-comp-container'>

          {this.state.buyandsellModal ? (
            <BuyandsellModal
              text={``}
              cancelClick={this.cancelBsellModal}
              confirmClick={this.confirmBsellModal}
            />
          ) : null}

          {this.state.buyandsellConfirmed ? (
            <BsConfirmationModal
              imageUrl={con_buysell}
              text={`Your request to withdraw the sum of USD was sent successfully`}
              cancelClick={this.cancelBsellModal}
              confirmClick={()=>{}}
            />
          ) : null}

        <div className='chart-section'>
          <div className='chart-section-top'>
            <div className='chart-section-top-left'>
              <select
                className='blue-select'
                onChange={this.setNewPairData}
                value={this.state.selectedPair}
              >
                {this.state.currentPairs.map((data) => (
                  <option key={`${Math.random()} ${Math.random()}`}>
                    {data}
                  </option>
                ))}
              </select>
              <button>Add Comparison</button>
            </div>
            <div className='chart-section-top-right'>
              <select
                className='green-select'
                onChange={this.handleOptionsChange}
                value={this.state.selectedOption}
              >
                {this.state.instruments.map((instr) => (
                  <option key={Math.random() + Math.random()}>{instr}</option>
                ))}
              </select>
              <ul className='forex-icons'>
                <li>
                  <img src={StopWatch} alt='' className='icon' />
                  <img src={Tarrow} alt='' className='t-arrow' />
                </li>
                <li>
                  <img src={Wave} alt='' className='icon' />
                  <img src={Tarrow} alt='' className='t-arrow' />
                </li>
                <li>
                  <img src={Multi} alt='' className='icon' />
                  <img src={Tarrow} alt='' className='t-arrow' />
                </li>
                <li>
                  <img src={Wave2} alt='' className='icon' />
                  <img src={Tarrow} alt='' className='t-arrow' />
                </li>
                <li>
                  1H
                  <img src={Tarrow} alt='' className='t-arrow' />
                </li>
              </ul>
            </div>
          </div>
          <div className='chart' ref={this.chartContainerRef}>
            <div
              className='loader-container'
              style={{ display: this.state.showLoader ? 'block' : 'none' }}
            >
              <div className='loader'></div>
            </div>
          </div>
          <div className='chart-cta-section'>
            <div className='chart-sell' onClick={this.showBsellModal}>
              <div className='sell'>
                <div className='sell-info'>
                  <p>SELL</p>
                  <p>{this.state.sell}</p>
                </div>
                <img src={WhiteDir} alt='' />
              </div>
              <p className='sell-left'>L: {this.state.low}</p>
            </div>
            <div className='chart-map'>
              <div className='map'>
                <img src={MapIcon} alt='' />
              </div>
              <p className='map-center'>S: {this.state.spread}</p>
            </div>
            <div className='chart-buy' onClick={this.showBsellModal}>
              <div className='buy'>
                <img src={WhiteDir} alt='' />
                <div className='buy-info'>
                  <p>BUY</p>
                  <p>{this.state.buy}</p>
                </div>
              </div>
              <p className='buy-right'>H: {this.state.high}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
