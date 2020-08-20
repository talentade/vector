import React, { Component, createRef } from 'react';
// import axios from 'axios';
import { createChart, CrosshairMode } from 'lightweight-charts';
// import { CIQ } from 'chartiq';
import $ from 'jquery';
import moment from 'moment';
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import con_buysell from '../../themes/images/con_buysell.png';
import candleGrf from './graph/candle.png';
import lineGrf from './graph/line.png';
import areaGrf from './graph/area.svg';
import barGrf from './graph/bar.png';
import histGrf from './graph/hist.png';

import Up from './up.svg';
import Down from './down.svg';

import StopWatch from '../../themes/images/tradeDashboard/stopwatch.svg';
import Wave from '../../themes/images/tradeDashboard/wave.svg';
import Wave2 from '../../themes/images/tradeDashboard/wave.svg';
import Multi from '../../themes/images/tradeDashboard/multi.svg';
import Tarrow from '../../themes/images/tradeDashboard/t_arrow.svg';
import WhiteDir from '../../themes/images/tradeDashboard/white_dir.svg';
import MapIcon from '../../themes/images/tradeDashboard/map.svg';
import server from '../../services/server';
import app from '../../services/app';
import './index.scss';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.chartContainerRef = createRef();
    this.chart = createRef();
    this.resizeObserver = createRef();
    this.profile = app.profile();
    this.pair = '';
    this.data = [];
    this.loadSeries = true;
    this.currentGrpahType = "candle";
    this.lineDataSeries = [];
    this.seriesIterator = 0;
    this.lastPlotable = {};
    this.dataPlotSeries = [];
    this.historySeries = [];
    this.historySeriesPair = "";
    this.realTimeListener = true;
    this.currentPairData = null;
    this.lastFetch = null;

    this.state = {
      selectedOption: 'crypto',
      currentPairs: [],
      allPairs: app.allPairs(),
      pair: '',
      selectedPair: '',
      currentPairData: null,
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

  loadHistorical = async (h) => {
    setTimeout(() => {
      $("#switch-history").removeClass("_active");
    }, 10);
    if(h == "1D") {
      this.loadSeries = true;
      this.setState({historyLevel: h});
      this.chart.current.removeSeries(this.chartSeries);
      await this.setGraphType(this.currentGrpahType, 0);
      this.realTimeListener = true;
    } else {
      let upm = {"1w": [7, "days"], "1m": [1, "months"], "6m": [6, "months"], "1y": [12, "months"]}
          upm = upm[h.toLowerCase()] // h.slice(h.length - 1).toLowerCase();
      if(this.setGraphType("candle", 3)) {
        this.setState({showLoader: true});
        this.loadSeries = false;
        this.setState({historyLevel: h});
        this.chart.current.applyOptions({
            timeScale: {
                rightOffset: 12,
                barSpacing: 3,
                fixLeftEdge: true,
                lockVisibleTimeRangeOnResize: true,
                rightBarStaysOnScroll: true,
                borderVisible: false,
                borderColor: '#fff000',
                visible: true,
                timeVisible: true,
                secondsVisible: false,
                // tickMarkFormatter: (time, tickMarkType, locale) => {
                //     console.log(time, tickMarkType, locale);
                //     const year = LightweightCharts.isBusinessDay(time) ? time.year : new Date(time * 1000).getUTCFullYear();
                //     return String(year);
                // },
            },
        });
        try {

          const in_fn_plot = (data, replot = false) => {
            for (let x = 0; x < data.timestamp.length; x++) {
              let plot = this.graphData2({
                Date:   data.timestamp[x],
                Open:   data.indicators.quote[0].open[x],
                High:   data.indicators.quote[0].high[x],
                Low:    data.indicators.quote[0].low[x],
                Close:  data.indicators.quote[0].close[x],
                Volume: data.indicators.quote[0].volume[x]
              }, this.pair);
              this.historySeries.push(plot);
              this.historySeriesPair = this.treatPair(this.pair);
              console.log("Reploting is", replot);
              if(replot) {
                this.setGraphType(this.currentGrpahType, 0);
                this.seriesIterator = 0;
                this.plotGraph(plot);
              } else {
                this.plotGraph(plot);
              }
            }
          }

          let real_time_update = async (replot = false) => {
            console.log("Checking for updates...", replot);
            if(this.historySeriesPair != this.treatPair(this.pair) || replot) {
              this.lastFetch = null;
              let history = await server.historicalData(this.treatPair(this.pair), "1m", {
                from: moment().subtract(1, "hour").unix(),
                to: moment().unix()
              });
              this.historySeries = [];
              let data = history.data.result;
              if(data.timestamp.length > 1) {
                this.lastFetch = data.timestamp[data.timestamp.length - 1];
              }
              in_fn_plot(data, replot);
            } else {
              let hdata = this.historySeries;
              for (let x = 0; x < (hdata.length); x++) {
                this.plotGraph(hdata[x]);
              }
            }
            this.setState({showLoader: false});
            this.chart.current.timeScale().setVisibleRange({
                from: moment().subtract(1, "hour").unix(),
                to: moment().unix()
            });
          }

          real_time_update();

          setInterval(async() => {
            await real_time_update(true);
          }, 10 * 1000);


          // let check_for_update = async (pair, distance) => {
          //   console.log("-- checking_for_update");
          //   setTimeout(async () => {
          //     try {
          //       let _history = await server.historicalData(pair, distance, {
          //         from: moment().subtract(10, "minutes").unix(),
          //         to: moment().unix()
          //       });
          //       let _data      = _history.data.result;
          //       let time_stamp = [];
          //       let start      = false;
          //       if(_data.timestamp && _data.timestamp.length) {
          //         _data.timestamp.forEach((tim, ki) => {
          //           if(tim > this.lastFetch) {
          //             if(tim - this.lastFetch > 59) {
          //               time_stamp.push(tim);
          //               if(start === false) {
          //                 start = ki;
          //               }
          //             }
          //           }
          //         });
          //         if(time_stamp.length) {
          //           this.lastFetch = time_stamp[time_stamp.length - 1];
          //         }
          //         check_for_update(pair, distance);
          //         console.log("-- Update is", time_stamp.length ? "loaded" : "empty", "index =>", start);
          //         if(start) {
          //           in_fn_plot(_data, start);
          //         }
          //       }
          //     } catch (e) {
          //       check_for_update(pair, distance);
          //       console.log("-- Update ERR");
          //       return e;
          //     }
          //   }, 20 * 1000);
          // }

          // check_for_update(this.treatPair(this.pair), "1m");

          // this.chart.current.timeScale().setVisibleRange({
          //     from: moment().subtract(upm[1], upm[0]).unix(),
          //     to: moment().unix()
          // });
          // this.chart.current.timeScale().scrollToPosition(2, true);
          // this.chart.current.timeScale().fitContent();
          // console.log(upm);
        } catch(e) {
          this.setState({showLoader: false});
          return e;
        }
        this.setState({showLoader: false});
      }
    }
  }

  setGraphType = async (type, no = 1) => {
    this.seriesIterator = 0;
    var option = {
        upColor: '#00B061',
        downColor: '#FF3031',
        scaleMargins: { bottom: 0.4, top: 0.4 },
        entireTextOnly: true,
        borderDownColor: '#FF3031',
        borderUpColor: '#00B061',
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

    // setInterval(() => {
    //   console.log(this.chart.current.timeScale().options());
    // }, 2000);

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
            scaleMargins: { bottom: 0.1, top: 0.2 }
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

    if(!this.loadSeries && no < 3) {
      if(this.historySeries.length) {
        let dseries = this.historySeries;
        for (let x = 0; x < (dseries.length); x++) {
          this.plotGraph(dseries[x]);
        }
      }
      return true;
    }

    if(no == 3) {
      return true;
    } else {
      if(no == 2 && this.dataPlotSeries.length) {
        this.realTimeListener = false;
        let dseries = this.dataPlotSeries;
        this.dataPlotSeries = [];
        for (let x = 0; x < dseries.length; x++) {
          this.plotGraph(dseries[x]);
        }
        this.realTimeListener = true;
        setTimeout(() => {
          $("#switch-graph-type").removeClass("_active");
        }, 10);
      } else if(this.pair.length) {
        await this.getSeries();
      }
    }
  }

  switchGraphType = (id) => {
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

  componentWillUnmount() {
    this.realTimeListener = false;
  }

  componentWillUpdate() {

    const stockToDisplay = this.props.hotStocks.filter((pair) =>
      pair.pair.toLowerCase().match(this.pair.toLowerCase()),
    );

    if(stockToDisplay.length) {
      if(stockToDisplay[0] != this.state.currentPairData) {
        this.currentPairData = stockToDisplay[0];
      }
    }

  }

  async componentDidMount() {
    this.realTimeListener = true;

    const stockToDisplay = this.props.hotStocks.filter((pair) =>
      pair.pair.toLowerCase().match(this.pair.toLowerCase()),
    );

    if(stockToDisplay.length) {
      this.currentPairData = stockToDisplay[0];
      // this.setState({ currentPairData: stockToDisplay[0] });
    }

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

    $(".outter-ham, .filter-img").click(() => {
      if(this.realTimeListener) {
        setTimeout(() => {
          let w = this.chartContainerRef.current.clientWidth;
          let h = this.chartContainerRef.current.clientHeight;
          this.chart.current.applyOptions({width: w, height: h});
          setTimeout(() => {
            this.chart.current.timeScale().fitContent();
          }, 0);
        }, 10);
      }      
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
    this.plotGraphData();
  }

  plotGraphDataInit = async () => {
    try {
      let allPairs  = this.state.allPairs;

      if(!Object.keys(allPairs).length) {
        const req   = await server.getAllPairs();
        allPairs    = req.data;
        app.allPairs(allPairs);
      }

      const instruments = Object.keys(allPairs);
      this.pair         = allPairs.forex[0];
      this.setState({
        allPairs:       allPairs,
        currentPairs:   allPairs.forex,
        selectedPair:   allPairs.forex[0],
        instruments:    instruments
      });

    } catch (error) {
      return error.message;
    }
  }

  treatPair = (pair) => {
    return pair.split(" ")[0].trim();
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

  getSeries = async () => {
    this.dataPlotSeries = [];
    this.setState({showLoader: true});
    try {
      let { data: { data } } = await server.getSeries(this.treatPair(this.pair), 30);
      let xdata = data[0];
      for (let x = 0; x < data.length; x++) {
        // this.plotGraph(this.graphData2({Close: data[0].close, Date: data[x].when, High: data[x].high, Low: data[x].low, Open: data[x].open}, this.pair));
        this.plotGraph(this.graphData(data[x], this.pair));
      }
    } catch (e) {
      this.setState({showLoader: false});
      return e;
    }
    this.setState({showLoader: false});
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
    await this.loadHistorical("1M");
    return null;
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
      this.dataPlotSeries.push(plot_data);
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

  handleOptionsChange = (e) => {
    this.pair = this.state.allPairs[e.target.value.toLowerCase()][0];
    this.currentPairData = null;
    this.setState({
      currentPairData: null,
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

  render() {

    const _currentPairData = {
      buy:    this.currentPairData ? this.currentPairData.ask    : this.state.buy,
      sell:   this.currentPairData ? this.currentPairData.bid    : this.state.sell,
      high:   this.currentPairData ? this.currentPairData.high   : this.state.high,
      low:    this.currentPairData ? this.currentPairData.low    : this.state.low,
      ask_up: this.currentPairData ? this.currentPairData.ask_up : 1,
      bid_up: this.currentPairData ? this.currentPairData.bid_up : 1,
      spread: this.currentPairData ? (this.currentPairData.high - this.currentPairData.low) : this.state.spread
    }

    return (
      <div className='trade-comp-container'>

          {this.state.buyandsellModal ? (
            <BuyandsellModal
              pair={this.state.selectedPair}
              buy={_currentPairData.buy}
              sell={_currentPairData.sell}
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
                <li id="switch-graph-type" onClick={(e) => this.switchGraphType('switch-graph-type')}>
                  <img src={Wave} alt='' className='icon' /><img src={Tarrow} alt='' className='t-arrow' />
                  <div className="gr-dropdown">
                    <span onClick={(e) => this.setGraphType("candle", 2)} className={"cgt"+(this.currentGrpahType == "candle" ? " _active" : "")}><img src={candleGrf} /> Candle</span>
                    <span onClick={(e) => this.setGraphType("line", 2)} className={"cgt"+(this.currentGrpahType == "line" ? " _active" : "")}><img src={lineGrf} /> Line</span>
                    <span onClick={(e) => this.setGraphType("area", 2)} className={"cgt"+(this.currentGrpahType == "area" ? " _active" : "")}><img src={areaGrf} /> Area</span>
                    <span onClick={(e) => this.setGraphType("bar", 2)} className={"cgt"+(this.currentGrpahType == "bar" ? " _active" : "")}><img src={barGrf} /> Bar</span>
                    <span onClick={(e) => this.setGraphType("hist", 2)} className={"cgt"+(this.currentGrpahType == "hist" ? " _active" : "")}><img src={histGrf} /> Histogram</span>
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
                    <span onClick={(e) => this.loadHistorical("6M")} className={"cgt"+(this.state.historyLevel == "6M" ? " _active" : "")}> 6M </span>
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
              <div className='sell' align="center">
                <div className='sell-info' style={{minWidth: "50%"}}>
                  <p>SELL</p>
                  <p>{app.floatFormat(_currentPairData.sell)}</p>
                </div>
                {/*<img src={WhiteDir} alt='' />*/}
                {_currentPairData.bid_up > 0 ? <img className={"directionSell up"} src={Up} /> : <img className={"directionSell down"} src={Down} />}
              </div>
              <p className='sell-left'>L: {app.floatFormat(_currentPairData.low)}</p>
            </div>
            <div className='chart-map'>
              <div className='map'>
                <img src={MapIcon} alt='' />
              </div>
              <p className='map-center'>S: {app.floatFormat(_currentPairData.spread)}</p>
            </div>
            <div className='chart-buy' onClick={(e) => this.showBsellModal(e, "buy")}>
              <div className='buy' align="center">
                {_currentPairData.ask_up > 0 ? <img className={"direction up"} src={Up} /> : <img className={"direction down"} src={Down} />}
                <div className='buy-info' style={{minWidth: "50%"}}>
                  <p>BUY</p>
                  <p>{app.floatFormat(_currentPairData.buy)}</p>
                </div>
              </div>
              <p className='buy-right'>H: {app.floatFormat(_currentPairData.high)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chart;
