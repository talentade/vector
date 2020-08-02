import React, { Component, createRef } from 'react';
// import axios from 'axios';
import { createChart, CrosshairMode } from 'lightweight-charts';
// import { CIQ } from 'chartiq';
import $ from 'jquery';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import con_buysell from '../../themes/images/con_buysell.png';
import candleGrf from './graph/candle.png';
import lineGrf from './graph/line.png';
import areaGrf from './graph/area.svg';
import barGrf from './graph/bar.png';
import histGrf from './graph/hist.png';

import StopWatch from '../../themes/images/tradeDashboard/stopwatch.svg';
import Wave from '../../themes/images/tradeDashboard/wave.svg';
import Wave2 from '../../themes/images/tradeDashboard/wave.svg';
import Multi from '../../themes/images/tradeDashboard/multi.svg';
import Tarrow from '../../themes/images/tradeDashboard/t_arrow.svg';
import WhiteDir from '../../themes/images/tradeDashboard/white_dir.svg';
import MapIcon from '../../themes/images/tradeDashboard/map.svg';
// import { priceData } from '../../utils/index';
import server from '../../services/server';
import app from '../../services/app';
// import { instrumentsData } from '../../utils/dummyData';
import './index.scss';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.chartContainerRef = createRef();
    this.chart = createRef();
    this.resizeObserver = createRef();
    this.profile = app.profile();
    this.allPairs = app.allPairs();
    this.pair = '';
    this.data = [];
    this.loadSeries = true;
    this.currentGrpahType = "candle";
    this.lineDataSeries = [];
    this.seriesIterator = 0;
    this.lastPlotable = {};
    this.realTimeListener = true;

    this.state = {
      selectedOption: 'crypto',
      currentPairs: [],
      allPairs: {},
      pair: '',
      selectedPair: '',
      buy: 0,
      sell: 0,
      spread: 0,
      high: 0,
      low: 0,
      historyLevel: "1D",
      buyandsellModal: false,
      buyandsellAct: 'buy',
      buyandsellConfirmed: false,
      showLoader: false,
      instruments: []
    };
  }

  setGraphType = async (type, no = 1) => {
    this.seriesIterator = 0;
    var option = {
        upColor: '#26a69a',
        downColor: '#ef5350',
        scaleMargins: { bottom: 0.4, top: 0.4 },
        entireTextOnly: true,
        borderDownColor: '#ef5350',
        borderUpColor: '#26a69a',
        wickDownColor: '#c4c4c4',
        wickUpColor: '#c4c4c4',
      };
    if(no) {
      this.chart.current.removeSeries(this.chartSeries);
    }
    this.currentGrpahType = type;
    if(type == "candle") {
      this.chartSeries = this.chart.current.addCandlestickSeries(option);
    } else if(type == "line") {
      this.chartSeries = this.chart.current.addLineSeries(option);
    } else if(type == "area") {
      this.chartSeries = this.chart.current.addAreaSeries(option);
    } else if(type == "bar") {
      this.chartSeries = this.chart.current.addBarSeries(option);
    } else if(type == "hist") {
      this.chartSeries = this.chart.current.addHistogramSeries(option);
    }
    if(this.pair.length) {
      this.getSeries();
    }

    this.chart.current.applyOptions({
        watermark: {
            color: 'rgba(67, 95, 118, 0.4)',
            visible: true,
            text: '',
            fontSize: 24,
            horzAlign: 'left',
            vertAlign: 'bottom',
        },
        priceScale: {
            autoScale: true,
            alignLabels: true,
            drawTicks: true,
            scaleMargins:	{ bottom: 0.1, top: 0.2 }
        },
        localization: {
          locale: 'en-US',
          priceFormatter: (price) => {
            let flot = price - parseInt(price);
            let len = String(flot).length - 2;
            if(flot > 0) {
              if(len >= 4) {
                if(parseFloat(flot.toFixed(4)) > parseFloat(flot.toFixed(3))) {
                  return price.toFixed(4);
                } else if(parseFloat(flot.toFixed(3)) > parseFloat(flot.toFixed(2))) {
                  return price.toFixed(3);
                } else if(parseFloat(flot.toFixed(2)) > parseFloat(flot.toFixed(1))) {
                  return price.toFixed(2);
                } else {
                  return price.toFixed(1);
                }
              } else {
                return price.toFixed(len < 0 ? 0 : Number(len));
              }
            } else {
              return price;
            }
          }
        },
    });
  }

  switchGraphType = (e, id) => {
    let el = document.getElementById(id);
    if(el.className == "_active") {
      el.classList.remove("_active");
    } else {
      el.classList.add("_active");
    }
  }

  setHistoryGraph = (id) => {
    let el = document.getElementById(id);
    if(el.className == "_active") {
      el.classList.remove("_active");
    } else {
      el.classList.add("_active");
    }
  }

  async componentDidMount() {
    this.realTimeListener = true;

    $(document).mouseup(function (e) {
      if($("#switch-graph-type").hasClass("_active")) {
        $("#switch-graph-type").removeClass("_active");
      }
      if($("#switch-history").hasClass("_active")) {
        $("#switch-history").removeClass("_active");
      }
    });

    this.setState({ showLoader: true });
    this.chart.current = createChart(this.chartContainerRef.current, {
      width:  this.chartContainerRef.current.clientWidth,
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
      rightPriceScale: {
        visible: true,
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

    $(window).resize(() => {
      if(this.realTimeListener) {
        let w = this.chartContainerRef.current.clientWidth;
        let h = this.chartContainerRef.current.clientHeight;
        this.chart.current.applyOptions({width: w, height: h});
        setTimeout(() => {
          this.chart.current.timeScale().fitContent();
        }, 0);
      }
    });

    this.setGraphType("candle", 0);

    // let { data: { data } } = await server.historicalData(this.treatPair(this.pair));
    // console.log(data.length, data);

    this.plotGraphData();
  }

  componentWillUnmount() {
    this.realTimeListener = false;
  }

  plotGraphDataInit = async () => {
    try {
      let allPairs = this.allPairs;
      if(!this.allPairs) {
        const {
          data: { data },
        } = await server.getAllPairs(app.id());
        app.allPairs(data);
        allPairs = data;
      }

      const instruments = Object.keys(allPairs);
      this.pair = allPairs.crypto[0];
      this.setState({
        allPairs: allPairs,
        currentPairs: allPairs.crypto,
        selectedPair: allPairs.crypto[0],
        instruments,
      });
    } catch (error) {
      return error.message;
    }
  }

  treatPair = (pair) => {
    return pair.split(" ")[0].trim();
  }

  getSeries = async () => {
    let { data: { data } } = await server.getSeries(this.treatPair(this.pair), 30);
    // console.log(data.length, "length");
    // data = data.length > 200 ? data.slice(Math.max(data.length - 200, 0)) : data;
    let xdata = data[0];
    for (let x = 0; x < data.length; x++) {
      // (x >= (data.length - 5)) && console.log(data[x], "--- series");
      // this.plotGraph(this.graphData2({Close: data[0].close, Date: data[x].when, High: data[x].high, Low: data[x].low, Open: data[x].open}, this.pair));
      this.plotGraph(this.graphData(data[x], this.pair));
    }
  }

  graphData = (data) => {
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
  }

  graphData2 = (data, pair) => {
    let ret = {
      time: data.Date,
      open: parseFloat(data.Open),
      high: parseFloat(data.High),
      low: parseFloat(data.Low),
      close: parseFloat(data.Close),
      ask: parseFloat(data.Open),
      spread: parseFloat(data.Volume),
      bid: parseFloat(data.Open),
      pair: pair,
    };
    return ret;
  }

  plotGraphData = async (p = "") => {
    if(!p.trim().length) {
      await this.plotGraphDataInit();
    }
    this.setState({showLoader: true});
    // await this.loadHistorical("1M");
    // return null;
    await this.getSeries();
    window.realtTimeFetcher = async () => {
      if(this.realTimeListener && this.loadSeries) {
        let data = await this.handleDataChange(this.treatPair(this.pair));
        // console.log(data, "--real");
        if(this.loadSeries) {
          this.plotGraph(data);
        }
      }
    }
    this.setState({showLoader: false});
    setInterval(window.realtTimeFetcher, 10 * 1000);
  }

  plotGraph = (data) => {
    if (typeof data === 'object' && this.treatPair(data.pair) === this.treatPair(this.pair)) {
      let plot_data = data;
      if(this.currentGrpahType == "candle") {
        // default
      } else if(this.currentGrpahType == "line") {
        plot_data = {time: data.time, value: data.open};
      } else if(this.currentGrpahType == "area") {
        plot_data = {time: data.time, value: data.open};
      } else if(this.currentGrpahType == "bar") {
        // default
      } else if(this.currentGrpahType == "hist") {
        plot_data = {time: data.time, value: data.open, color: "#03cf9e"};
      }
      if(this.seriesIterator > 0) {
        this.chartSeries.update(plot_data);
      } else {
        this.seriesIterator += 1;
        this.chartSeries.setData([plot_data]);
      }

      this.setState({
        showLoader: false,
        buy: data.bid,
        sell: data.ask,
        low: data.low,
        high: data.high,
        spread: data.spread,
      });
      
      this.chart.current.timeScale().fitContent();
    }
  }

  handleDataChange = async (pair) => {
    try {
      const {
        data: { data },
      } = await server.getRealTimeData(pair, app.id());
      return this.graphData(data);
    } catch (error) {
      return error.message;
    }
  }

  handleOptionsChange = (e) => {
    this.pair = this.state.allPairs[e.target.value.toLowerCase()][0];
    this.setState({
      selectedOption: e.target.value,
      currentPairs: this.state.allPairs[e.target.value.toLowerCase()],
      selectedPair: this.pair,
    });

    this.setGraphType(this.currentGrpahType, 1);
    this.plotGraphData(this.state.selectedPair);

  };

  setNewPairData = (e) => {
    this.pair = e.target.value;
    this.setState({ selectedPair: e.target.value });
    // this.chart.current.removeSeries(this.chartSeries);
    this.setGraphType(this.currentGrpahType, 1);
    this.plotGraphData(this.state.selectedPair);
  };

  cancelBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellConfirmed: false });
  }

  showBsellModal = (e, s) => {
    this.setState({ buyandsellModal: true, showLoader: false, buyandsellAct: s});
  }

  confirmBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellConfirmed: true, showLoader: false });
  }

  loadHistorical = async (h) => {
    this.loadSeries = false;
    this.setState({historyLevel: h});
    let { data: { data } } = await server.historicalData(this.treatPair(this.pair), h);
    for (let x = 0; x < data.length; x++) {
      (x < 1) && console.log(data[x], "--- history");
      this.plotGraph(this.graphData2(data[x], this.pair));
    }
  }

  render() {
    return (
      <div className='trade-comp-container'>

          {this.state.buyandsellModal ? (
            <BuyandsellModal
              text={``}
              pair={this.state.selectedPair}
              buy={this.state.buy}
              sell={this.state.sell}
              act={this.state.buyandsellAct}
              cancelClick={this.cancelBsellModal}
              confirmClick={this.confirmBsellModal}
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
                  <option key={Math.random() + Math.random()}>{instr.toUpperCase()}</option>
                ))}
              </select>
              <ul className='forex-icons'>
                {/*<li>
                  <img src={StopWatch} alt='' className='icon' />
                  <img src={Tarrow} alt='' className='t-arrow' />
                </li>*/}
                <li id="switch-graph-type" onClick={(e) => this.switchGraphType(e, 'switch-graph-type')}>
                  <img src={Wave} alt='' className='icon' /><img src={Tarrow} alt='' className='t-arrow' />
                  <div className="gr-dropdown">
                    <span onClick={(e) => this.setGraphType("candle")} className={"cgt"+(this.currentGrpahType == "candle" ? " _active" : "")}><img src={candleGrf} /> Candle</span>
                    <span onClick={(e) => this.setGraphType("line")} className={"cgt"+(this.currentGrpahType == "line" ? " _active" : "")}><img src={lineGrf} /> Line</span>
                    <span onClick={(e) => this.setGraphType("area")} className={"cgt"+(this.currentGrpahType == "area" ? " _active" : "")}><img src={areaGrf} /> Area</span>
                    <span onClick={(e) => this.setGraphType("bar")} className={"cgt"+(this.currentGrpahType == "bar" ? " _active" : "")}><img src={barGrf} /> Bar</span>
                    <span onClick={(e) => this.setGraphType("hist")} className={"cgt"+(this.currentGrpahType == "hist" ? " _active" : "")}><img src={histGrf} /> Histogram</span>
                  </div>
                </li>
                {/*<li>
                  <img src={Multi} alt='' className='icon' />
                  <img src={Tarrow} alt='' className='t-arrow' />
                </li>
                <li>
                  <img src={Wave2} alt='' className='icon' />
                  <img src={Tarrow} alt='' className='t-arrow' />
                </li>*/}
                <li id="switch-history" onClick={(e) => this.setHistoryGraph('switch-history')}>
                  <img src={Tarrow} alt='' className='t-arrow' /> {this.state.historyLevel}
                  <div className="gr-dropdown">
                    <span onClick={(e) => this.loadHistorical("1D")} className={"cgt"+(this.state.historyLevel == "1D" ? " _active" : "")}> 1D </span>
                    <span onClick={(e) => this.loadHistorical("1W")} className={"cgt"+(this.state.historyLevel == "1W" ? " _active" : "")}> 1W </span>
                    <span onClick={(e) => this.loadHistorical("1M")} className={"cgt"+(this.state.historyLevel == "1M" ? " _active" : "")}> 1M </span>
                    <span onClick={(e) => this.loadHistorical("1Y")} className={"cgt"+(this.state.historyLevel == "1Y" ? " _active" : "")}> 1Y </span>
                  </div>
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
            <div className='chart-sell' onClick={(e) => this.showBsellModal(e, "sell")}>
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
            <div className='chart-buy' onClick={(e) => this.showBsellModal(e, "buy")}>
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
