import React, { Component, createRef } from 'react';
// import axios from 'axios';
import { createChart, CrosshairMode } from 'lightweight-charts';
// import { CIQ } from 'chartiq';
import $ from 'jquery';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import ReactTooltip from "react-tooltip";
import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';
import candleGrf from './graph/candle.png';
import lineGrf from './graph/line.png';
import areaGrf from './graph/area.svg';
import barGrf from './graph/bar.png';
import histGrf from './graph/hist.png';

import ChartModule from '../chartModule/index';

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
    this.historyData = [];
    this.seriesIterator = 0;
    this.loadHistory = 0;
    this.lastPlotable = {};
    this.duplicator = "";
    this.graphSwitcher = false;
    this.lastServerResponse = [];
    this.dataPlotSeries = [];
    this.historySeries = [];
    this.historySeriesPair = "";
    this.realTimeListener = true;
    this.currentPairData = null;
    this.lastFetch = null;
    this.chartData1 = {graph: "candle", pair: "", level: "1d"};

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
      col: '12',
      confirmtext: "",
      historyLevel: "1M",

      historyLevel1: "1D",
      historyLevel2: "1M",
      historyLevel3: "1M",
      historyLevel4: "1M",
      historyLevel5: "1M",
      historyLevel6: "1M",

      graphType1: "candle",
      graphType2: "candle",
      graphType3: "candle",
      graphType4: "candle",
      graphType5: "candle",
      graphType6: "candle",

      selectedOption1: 'forex',
      selectedOption2: 'forex',
      selectedOption3: 'forex',
      selectedOption4: 'forex',
      selectedOption5: 'forex',
      selectedOption6: 'forex',

      pair1: "",
      pair2: "",
      pair3: "",
      pair4: "",
      pair5: "",
      pair6: "",

      buyandsellModal: false,
      buyandsellAct: 'buy',
      buyandsellConfirmed: false,
      showLoader: false,
      instruments: []
    };

  }

  switchGraphTypeTo = async (type) => {
    this.currentGrpahType  = type;
    this.graphSwitcher     = true;
    this.chart.current.removeSeries(this.chartSeries);
    this.loadHistorical(this.state.historyLevel);
  }

  loadHistorical = async (h = null) => {
    h = h ? h : this.state.historyLevel;
    this.setGraphType(this.currentGrpahType, 0);

    setTimeout(() => { $("#switch-history").removeClass("_active"); }, 10);
    let upm = {"1d": [2, "hours"], "1w": [7, "days"], "1m": [1, "months"], "6m": [6, "months"], "1y": [12, "months"]};
        upm = upm[h.toLowerCase()];

    if(this.setGraphType(this.currentGrpahType, 3)) {
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
        },
      });

      this.forceUpdate();

      try {

        const convertDateToAnotherTimeZone = (date, timezone) => {
          const dateString = date.toLocaleString('en-US', {
            timeZone: timezone
          });
          return new Date(dateString);
        }

        const getOffsetBetweenTimezonesForDate = (date, timezone1, timezone2) => {
          const timezone1Date = convertDateToAnotherTimeZone(date, timezone1);
          const timezone2Date = convertDateToAnotherTimeZone(date, timezone2);
          return timezone1Date.getHours() - timezone2Date.getHours();
        }

        let graphOffset = 0, graphOff = 0;
        let pairMaster  = this.treatPair(this.pair);

        this.historyData = [];
        this.historySeries = [];

        if(h.toLowerCase() != "1d") {
          this.historySeriesPair = "";

          this.loadSeries = false;
          this.seriesIterator = 0;

          let history = await server.historicalData(pairMaster, "1d", {
            from: moment().subtract(upm[0], upm[1]).unix(),
            to: moment().unix()
          });
          this.setState({showLoader: false});

          let data = history.data.result;

          const _off = getOffsetBetweenTimezonesForDate(new Date, Intl.DateTimeFormat().resolvedOptions().timeZone, data.meta.exchangeTimezoneName);
          graphOff  = (_off+1)*3600;

          for (let r = 0; r < data.timestamp.length; r++) {
            let plt = {
              Date:    data.timestamp[r]+graphOff,
              Open:    data.indicators.quote[0].open[r],
              High:    data.indicators.quote[0].high[r],
              Low:     data.indicators.quote[0].low[r],
              Close:   data.indicators.quote[0].close[r],
              Volume:  data.indicators.quote[0].volume[r]
            }
            this.historyData.push(this.graphData2(plt, pairMaster));
          }

          if(this.loadHistory > 0) {
            // $('.chart').html(this.duplicator);
            // this.chart.current.removeSeries(this.charSeries);
            // this.chartContainerRef = createRef();
            // this.chart = createRef();
            this.chart.current.removeSeries(this.chartSeries);
            this.setGraphType(this.currentGrpahType, 0);
            this.plotGraph(this.historyData);
            this.chart.current.timeScale().fitContent();
            this.chart.current.timeScale().scrollToPosition(1, true);
          } else {
            this.duplicator = $('.chart').html();
            this.chart.current.removeSeries(this.chartSeries);
            this.setGraphType(this.currentGrpahType, 0);
            this.plotGraph(this.historyData);
            this.chart.current.timeScale().fitContent();
            this.chart.current.timeScale().scrollToPosition(1, true);
          }
          ++this.loadHistory;
          return true;
        }

        this.historySeriesPair = pairMaster;

        let check_for_update = async (pair, firstUpdate = false) => {
          if(this.historySeriesPair == pair) {
            setTimeout(async () => {
              console.log("-- checking_for_update for", pair);
              if(this.historySeriesPair == pair) {
                try {
                  let _history = this.graphSwitcher ? this.lastServerResponse : await server.historicalData(pair, "1m", {
                    from: moment().subtract(2, "hour").unix(),
                    to: moment().unix()
                  });
                  this.lastServerResponse = _history;
                  let _data               = _history.data.result;
                  this.graphSwitcher      = false;
                  this.setState({showLoader: false});

                  const offset = getOffsetBetweenTimezonesForDate(new Date, Intl.DateTimeFormat().resolvedOptions().timeZone, _data.meta.exchangeTimezoneName);
                  graphOffset  = (offset+1)*3600;

                  let _plotHistory = () => {
                    if(this.historySeriesPair == pair) {
                      let prelength = this.historySeries.length;
                      this.historySeriesPair = pair;
                      this.historySeries = [];
                      
                      try {
                        for (let x = 0; x < _data.timestamp.length; x++) {
                          let lastOpen = x == (_data.timestamp.length - 1);
                          let _plt;
                          if(lastOpen) {
                            let gst = app.guessTimate(_data.indicators.quote[0].open[x], lastOpen);
                            _plt = {
                              Date:  _data.timestamp[x]+graphOffset, Open: gst, High: gst, Low: gst, Close: gst, Volume: _data.indicators.quote[0].volume[x]
                            };
                          } else {
                            _plt = {
                              Date:  _data.timestamp[x]+graphOffset,
                              Open:  app.guessTimate(_data.indicators.quote[0].open[x], lastOpen),
                              High:  _data.indicators.quote[0].high[x],
                              Low:  _data.indicators.quote[0].low[x],
                              Close:  _data.indicators.quote[0].close[x],
                              Volume:  _data.indicators.quote[0].volume[x]
                            }
                          }
                          let plot = this.graphData2(_plt, pair);
                          this.historySeries.push(plot);
                        }
                      } catch (error) {
                        return null;
                      }

                      if(this.historySeries.length) {
                        this.loadSeries = true;
                        this.seriesIterator = 0;
                        this.chart.current.removeSeries(this.chartSeries);
                        this.setGraphType(this.currentGrpahType, 0);
                        this.plotGraph(this.historySeries);
                        // this.plotGraph(this.historyData.concat(this.historySeries));

                        if(firstUpdate) {
                          this.chart.current.timeScale().setVisibleRange({
                            from: _data.timestamp[parseInt(_data.timestamp.length/2)]+graphOffset,
                            to: _data.timestamp[_data.timestamp.length - 1]+graphOffset
                          });
                        } else {
                          if(prelength < this.historySeries.length) {
                            this.chart.current.timeScale().scrollToPosition(1, true);
                          }
                        }
                      }
                    }
                  }
                  if(this.historySeriesPair == pair) {
                    _plotHistory();
                    if(this.historySeries.length) {
                      setTimeout(() => {
                        if(this.historySeriesPair == pair) {
                          _plotHistory();
                        }
                      }, 2.65 * 1000);
                    check_for_update(pair);
                  } else {
                    console.log("No data for", pair, "oo");
                  }
                }
                } catch (e) {
                  check_for_update(pair);
                  console.log("-- Update ERR");
                  throw e;
                  return e;
                }
              }
            }, firstUpdate ? 0 : 5 * 1000);
          }
        }

        check_for_update(pairMaster, true);

      } catch(e) {
        this.setState({showLoader: false});
        return e;
      }
      this.setState({showLoader: false});
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
            return Number(String(price).substr(0, 7));
          }
        },
    });

    return true;

    // if(!this.loadSeries && no < 3) {
    //   if(this.historySeries.length) {
    //     let dseries = this.historySeries;
    //     for (let x = 0; x < (dseries.length); x++) {
    //       this.plotGraph(dseries[x]);
    //     }
    //   }
    //   return true;
    // }

    // if(no == 3) {
    //   return true;
    // } else {
    //   if(no == 2 && this.dataPlotSeries.length) {
    //     this.realTimeListener = false;
    //     let dseries = this.dataPlotSeries;
    //     this.dataPlotSeries = [];
    //     for (let x = 0; x < dseries.length; x++) {
    //       this.plotGraph(dseries[x]);
    //     }
    //     this.realTimeListener = true;
    //     setTimeout(() => {
    //       $("#switch-graph-type").removeClass("_active");
    //     }, 10);
    //   }
    // }
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
    const stockToDisplay = this.props.hotStocks.filter((pair) => {
      if(pair.pair) {
        return pair.pair.toLowerCase().match(this.pair.toLowerCase()) || this.pair.toLowerCase() == pair.pair.toLowerCase();
      }
    });

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
    }

    // $(document).delegate(".instrument-icons li", "click", function () {
    //   if($(this).hasClass("_active")) {
    //     console.log("removeClass");
    //     $(this).removeClass("_active");
    //   } else {
    //     console.log("addClass");
    //     $(this).addClass("_active");
    //   }
    // });

    $(document).mouseup(function (e) {
      if($(".instrument-icons li").hasClass("_active")) {
        $(".instrument-icons li").removeClass("_active");
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
        pair1:          allPairs.forex[0],
        instruments:    instruments
      });

    } catch (error) {
      return error.message;
    }
  }

  treatPair = (pair) => {
    if(pair == undefined) {
      return this.pair;
    }
    return pair.indexOf(" ") > -1 ? pair.split(" ")[0].trim() : pair.trim();
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
      open:  parseFloat(data.Open),
      high:  parseFloat(data.High),
      low:   parseFloat(data.Low),
      close: parseFloat(data.Close),
      ask:   parseFloat(data.Open),
      spread:parseFloat(parseFloat(data.High) - parseFloat(data.Low)),
      bid: parseFloat(data.Open),
      pair: pair,
    };
    return ret;
  }

  plotGraphData = async (p = "") => {
    if(!p.trim().length) {
      await this.plotGraphDataInit();
    } // this.loadHistorical();
  }

  plotGraph = (data) => {
    if (typeof data === 'object' && this.treatPair(data.pair) === this.treatPair(this.pair)) {
      let plot_data = data;
      let not_raw   = Object.keys(plot_data).indexOf("time") > -1;

        if(this.currentGrpahType == "candle" || this.currentGrpahType == "bar") {
          this.seriesIterator += 1;
          this.chartSeries.setData(plot_data);
        } else {
          let plots = [];
          for (var i = 0; i < plot_data.length; i++) {
            let plot = {time: plot_data[i].time, value: plot_data[i].open, color: "#03cf9e"};
            plots.push(plot);
          }
          this.seriesIterator += 1;
          this.chartSeries.setData(plots);
        }
      
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
  }

  addComparism = () => {
    for (var i = 2; i <= 6; i++) {
      if(!$(".chart-section-"+i).length) {
        switch(i) {
          case 2:
            this.setState({pair2: this.state.selectedPair});
          break;
          case 3:
            this.setState({pair3: this.state.selectedPair});
          break;
          case 4:
            this.setState({pair4: this.state.selectedPair});
          break;
          case 5:
            this.setState({pair5: this.state.selectedPair});
          break;
          case 6:
            this.setState({pair6: this.state.selectedPair});
          break;
        }
        break;
      }
    }
    setTimeout(() => {
      this.setState({col: $(".multiple-chart-section").length > 1 ? "6" : "12"});
    }, 0);
  }

  closeComparism = (c) => {
    switch(c) {
      case 2:
        this.setState({pair2: ""});
      break;
      case 3:
        this.setState({pair3: ""});
      break;
      case 4:
        this.setState({pair4: ""});
      break;
      case 5:
        this.setState({pair5: ""});
      break;
      case 6:
        this.setState({pair6: ""});
      break;
    }
    setTimeout(() => {
      this.setState({col: $(".multiple-chart-section").length > 1 ? "6" : "12"});
    }, 0);
  }

  cancelBsellModal = (e) => {
    this.setState({ buyandsellModal: false, buyandsellConfirmed: false });
  }

  showBsellModal = (e, s) => {
    this.setState({ buyandsellModal: true, showLoader: false, buyandsellAct: s});
  }

  confirmBsellModal = (txt = "") => {
    this.setState({ buyandsellModal: false, buyandsellConfirmed: true, showLoader: false, confirmtext: txt });
  }

  render() {
    if(this.state.pair1.length) {
      const stockToDisplay = this.props.hotStocks.filter((pair) => {
        if(pair.pair) {
          return pair.pair.toLowerCase().match(this.state.pair1.toLowerCase()) || this.state.pair1.toLowerCase() == pair.pair.toLowerCase();
        }
      });
      if(stockToDisplay.length) {
        this.currentPairData = stockToDisplay[0];
      }
    }

    const _currentPairData = {
      info:   this.currentPairData ? this.currentPairData        : {},
      closed: this.currentPairData ? this.currentPairData.closed : true,
      buy:    this.currentPairData ? this.currentPairData.ask    : this.state.buy,
      sell:   this.currentPairData ? this.currentPairData.bid    : this.state.sell,
      high:   this.currentPairData ? this.currentPairData.high   : this.state.high,
      low:    this.currentPairData ? this.currentPairData.low    : this.state.low,
      type:   this.currentPairData ? this.currentPairData.type   : this.state.selectedOption,
      ask_up: this.currentPairData ? this.currentPairData.ask_up : 1,
      bid_up: this.currentPairData ? this.currentPairData.bid_up : 1,
    complete: this.currentPairData ? this.currentPairData.complete : 0,
      spread: this.currentPairData ? (this.currentPairData.high - this.currentPairData.low) : this.state.spread
    }

    let buyable = (_currentPairData.type.toLowerCase() === 'forex' || _currentPairData.type.toLowerCase() === 'crypto' || parseInt(_currentPairData.complete) === 1) && !_currentPairData.closed;

    // $(".multiple-chart-section").each(function () {
    //   console.log($(this).attr("class"), $(this).attr("uniqueId"));
    // });

    return (
      <div className='trade-comp-container'>

          {this.state.buyandsellModal ? (
            <BuyandsellModal
              info={_currentPairData.info}
              pair={this.state.pair1}
              buy={_currentPairData.buy}
              sell={_currentPairData.sell}
              type={_currentPairData.type}
              act={this.state.buyandsellAct}
              cancelClick={this.cancelBsellModal}
              confirmClick={this.confirmBsellModal}
            />
          ) : null}
          <BsConfirmationModal
            text={this.state.confirmtext}
            show={this.state.buyandsellConfirmed}
            cancel={this.cancelBsellModal}
          />

    <div className="row" style={{display: "flex"}}>
      <div className="col-md-12">
        {this.state.pair1.length ?
          <ChartModule
            col={this.state.col}
            instruments={this.state.instruments}
            changePair={(p, s) => this.setState({pair1: p, selectedOption1: s})}
            key={this.state.historyLevel1+"-"+this.state.pair1+"-1"}
            chartKey={this.state.historyLevel1+"-"+this.state.pair1}
            changeLevel={(l) => this.setState({historyLevel1: l})}
            changeGraph={(g) => this.setState({graphType1: g})}
            selectedOption={this.state.selectedOption1}
            historyLevel={this.state.historyLevel1}
            addComparism={this.addComparism}
            graph={this.state.graphType1}
            pair={this.state.pair1}
            ki={1}
          />
        : null }

        {this.state.pair2.length ?
          <ChartModule
            instruments={this.state.instruments}
            changePair={(p, s) => this.setState({pair2: p, selectedOption2: s})}
            key={this.state.historyLevel2+"-"+this.state.pair2+"-2"}
            chartKey={this.state.historyLevel2+"-"+this.state.pair2}
            changeLevel={(l) => this.setState({historyLevel2: l})}
            changeGraph={(g) => this.setState({graphType2: g})}
            selectedOption={this.state.selectedOption2}
            historyLevel={this.state.historyLevel2}
            closeComparism={this.closeComparism}
            graph={this.state.graphType2}
            pair={this.state.pair2}
            ki={2}
          />
        : null }

        {this.state.pair3.length ?
          <ChartModule
            instruments={this.state.instruments}
            changePair={(p, s) => this.setState({pair3: p, selectedOption3: s})}
            key={this.state.historyLevel3+"-"+this.state.pair3+"-3"}
            chartKey={this.state.historyLevel3+"-"+this.state.pair3}
            changeLevel={(l) => this.setState({historyLevel3: l})}
            changeGraph={(g) => this.setState({graphType3: g})}
            selectedOption={this.state.selectedOption3}
            historyLevel={this.state.historyLevel3}
            closeComparism={this.closeComparism}
            graph={this.state.graphType3}
            pair={this.state.pair3}
            ki={3}
          />
        : null }

        {this.state.pair4.length ?
          <ChartModule
            instruments={this.state.instruments}
            changePair={(p, s) => this.setState({pair4: p, selectedOption4: s})}
            key={this.state.historyLevel4+"-"+this.state.pair4+"-4"}
            chartKey={this.state.historyLevel4+"-"+this.state.pair4}
            changeLevel={(l) => this.setState({historyLevel4: l})}
            changeGraph={(g) => this.setState({graphType4: g})}
            selectedOption={this.state.selectedOption4}
            historyLevel={this.state.historyLevel4}
            closeComparism={this.closeComparism}
            graph={this.state.graphType4}
            pair={this.state.pair4}
            ki={4}
          />
        : null }

        {this.state.pair5.length ?
          <ChartModule
            instruments={this.state.instruments}
            changePair={(p, s) => this.setState({pair5: p, selectedOption5: s})}
            key={this.state.historyLevel5+"-"+this.state.pair5+"-5"}
            chartKey={this.state.historyLevel5+"-"+this.state.pair5}
            changeLevel={(l) => this.setState({historyLevel5: l})}
            changeGraph={(g) => this.setState({graphType5: g})}
            selectedOption={this.state.selectedOption5}
            historyLevel={this.state.historyLevel5}
            closeComparism={this.closeComparism}
            graph={this.state.graphType5}
            pair={this.state.pair5}
            ki={5}
          />
        : null }

        {this.state.pair6.length ?
          <ChartModule
            instruments={this.state.instruments}
            changePair={(p, s) => this.setState({pair6: p, selectedOption6: s})}
            key={this.state.historyLevel6+"-"+this.state.pair6+"-6"}
            chartKey={this.state.historyLevel6+"-"+this.state.pair6}
            changeLevel={(l) => this.setState({historyLevel6: l})}
            changeGraph={(g) => this.setState({graphType6: g})}
            selectedOption={this.state.selectedOption6}
            historyLevel={this.state.historyLevel6}
            closeComparism={this.closeComparism}
            graph={this.state.graphType6}
            pair={this.state.pair6}
            ki={6}
          />
        : null }

      </div>
    </div>


      {this.state.pair1.length ? (
        <div
          data-tip
          className='chart-cta-section'
          data-for={(_currentPairData.sell === 0 || _currentPairData.buy === 0 || !buyable) ? "" : "closed"}
          disabled={
            (_currentPairData.sell === 0 || _currentPairData.buy === 0 || !buyable)
          }>
          {
            ((_currentPairData.sell > 0 || _currentPairData.buy > 0) && !buyable)
            ? <p className="m-closed"><small>Market is closed</small></p>
            : (null)
          }
          <div
            className='chart-sell'
            onClick={(e) => {
            if(_currentPairData.sell !== 0 && _currentPairData.buy !== 0 && buyable) {
              this.showBsellModal(e, "sell")
            }
          }}>
            <div className='sell' align="center">
              <div className='sell-info' style={{minWidth: "50%"}}>
                <p>SELL</p>
                <p>{_currentPairData.sell > 0 ? app.floatFormat(_currentPairData.sell) : '-'}</p>
              </div>
              {_currentPairData.bid_up > 0 ? <img className={"directionSell up"} src={Up} /> : <img className={"directionSell down"} src={Down} />}
            </div>
            <p className='sell-left'>{_currentPairData.low > 0 ? "L: "+app.floatFormat(_currentPairData.low) : ''}</p>
          </div>
          <div className='chart-map'>
            <div className='map' data-tip data-for="comming">
              <img src={MapIcon} alt='' />
            </div>
            <ReactTooltip id="comming" type="dark" effect="solid">
              <span>AI TRADING Coming soon</span>
            </ReactTooltip>
            <p className='map-center'>{_currentPairData.high > 0 ? "S: "+app.floatFormat(_currentPairData.spread) : ''}</p>
          </div>
          <div
            className='chart-buy'
            onClick={(e) => {
            if(_currentPairData.sell !== 0 && _currentPairData.buy !== 0 && buyable) {
              this.showBsellModal(e, "buy")
            }
          }}>
            <div className='buy' align="center">
              {_currentPairData.ask_up > 0 ? <img className={"direction up"} src={Up} /> : <img className={"direction down"} src={Down} />}
              <div className='buy-info' style={{minWidth: "50%"}}>
                <p>BUY</p>
                <p>{_currentPairData.buy > 0 ? app.floatFormat(_currentPairData.buy) : '-'}</p>
              </div>
            </div>
            <p className='buy-right'>{_currentPairData.high > 0 ? "H: "+app.floatFormat(_currentPairData.high) : ''}</p>
          </div>
        </div>
      ): null}

      <ReactTooltip id="closed" type="dark" effect="solid">
        <span>Market closed</span>
      </ReactTooltip>

        <div className='chart-section hide'>
          <div className='chart-section-top'>
            <div className='chart-section-top-left'>
              <select
                className='blue-select'
                onChange={this.setNewPairData}
                value={this.state.selectedPair}
              >
                {this.state.currentPairs.map((data, key) => (
                  <option key={key}>
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
                {this.state.instruments.map((instr, key) => (
                  <option key={key}>{instr.toUpperCase()}</option>
                ))}
              </select>
              <ul className='forex-icons'>
                <li id="switch-graph-type" onClick={(e) => this.switchGraphType('switch-graph-type')}>
                  <img src={Wave} alt='' className='icon' /><img src={Tarrow} alt='' className='t-arrow' />
                  <div className="gr-dropdown">
                    <span onClick={(e) => this.switchGraphTypeTo("candle")} className={"cgt"+(this.currentGrpahType == "candle" ? " _active" : "")}><img src={candleGrf} /> Candle</span>
                    <span onClick={(e) => this.switchGraphTypeTo("line")} className={"cgt"+(this.currentGrpahType == "line" ? " _active" : "")}><img src={lineGrf} /> Line</span>
                    <span onClick={(e) => this.switchGraphTypeTo("area")} className={"cgt"+(this.currentGrpahType == "area" ? " _active" : "")}><img src={areaGrf} /> Area</span>
                    <span onClick={(e) => this.switchGraphTypeTo("bar")} className={"cgt"+(this.currentGrpahType == "bar" ? " _active" : "")}><img src={barGrf} /> Bar</span>
                    <span onClick={(e) => this.switchGraphTypeTo("hist")} className={"cgt"+(this.currentGrpahType == "hist" ? " _active" : "")}><img src={histGrf} /> Histogram</span>
                  </div>
                </li>
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
        </div>
      </div>
    );
  }
}

export default Chart;
