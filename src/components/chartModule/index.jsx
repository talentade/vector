import React, { Component, createRef } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import $ from 'jquery';
import moment from 'moment';
import moment_tz from 'moment-timezone';
import server from '../../services/server';
import app from '../../services/app';
import './index.scss';

import BuyandsellModal from '../../components/buyandsellModal/index';
import BsConfirmationModal from '../../components/bsConfirmationModal/index';

import candleGrf from './graph/candle.png';
import lineGrf from './graph/line.png';
import areaGrf from './graph/area.svg';
import barGrf from './graph/bar.png';
import histGrf from './graph/hist.png';

import Tarrow from '../../themes/images/tradeDashboard/t_arrow.svg';
import Wave from '../../themes/images/tradeDashboard/wave.svg';
import Wave2 from '../../themes/images/tradeDashboard/wave.svg';

class ChartModule extends Component {
  constructor(props) {
    super(props);

    this.chartContainerRef = createRef();
    this.chart = createRef();
    this.resizeObserver = createRef();
    this.profile = app.profile();
    this.pair = this.props.pair;
    this.data = [];
    this.loadSeries = true;
    this.currentGrpahType = this.props.graph;
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
    this.destroyGraph = false;
    this.col = this.props.ki > 1 ? '6' : this.props.col;

    this.historyLevel = this.props.historyLevel;

    this.state = {
      selectedOption: this.props.selectedOption,
      allPairs: app.allPairs(),
      currentPairs: app.allPairs().forex,
      pair: '',
      selectedPair: this.props.pair,
      currentPairData: null,
      buy: 0,
      sell: 0,
      spread: 0,
      high: 0,
      low: 0,
      confirmtext: "",
      historyLevel: this.props.historyLevel,
      buyandsellModal: false,
      buyandsellAct: 'buy',
      buyandsellConfirmed: false,
      showLoader: false,
      instruments: this.props.instruments
    };

  }

  switchGraphTypeTo = async (type) => {
    this.props.changeGraph(type);
    this.currentGrpahType  = type;
    this.graphSwitcher     = true;
    this.chart.current.removeSeries(this.chartSeries);
    this.loadHistorical();
  }

  loadHistorical = async (h = null) => {
    h = h ? h : this.state.historyLevel;
    this.setGraphType(this.currentGrpahType, 0);

    setTimeout(() => {
      $(".instrument-icons li").removeClass("_active");
    }, 10);

    let upm = {"1d": [2, "hours"], "1w": [7, "days"], "1m": [1, "months"], "6m": [6, "months"], "1y": [12, "months"], "2y": [2, "years"]};
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

          this.chart.current.removeSeries(this.chartSeries);
          this.setGraphType(this.currentGrpahType, 0);
          this.plotGraph(this.historyData);
          this.chart.current.timeScale().fitContent();
          this.chart.current.timeScale().scrollToPosition(1);
          
          ++this.loadHistory;
          return true;
        }

        this.historySeriesPair = pairMaster;

        let check_for_update = async (pair, firstUpdate = false, _from = false, _pre = null) => {
          if(!this.realTimeListener || this.destroyGraph || this.historyData.length) {
            console.log("Update overuled");
            return true;
          }
          if(this.historySeriesPair == pair && this.realTimeListener && !this.destroyGraph) {
            setTimeout(async () => {
              // console.log("-- checking_for_update for", pair);
              if(this.historySeriesPair == pair) {
                try {
                  let _unit = _from.end;
                  if(_from) {
                    if(_from.end > moment().unix()) {
                      _unit = _pre.end;
                      // console.log("(-)", _from.end, "(>)", _unit);
                    }
                  }
                  let _history = this.graphSwitcher ? this.lastServerResponse : await server.historicalData(pair, "1m", {
                    from: _from ? _unit - (3600 * 6) : moment().subtract(2, "hour").unix(),
                    to: _from ? _unit : moment().unix()
                  });
                  this.lastServerResponse = _history;
                  let _data               = _history.data.result;
                  this.graphSwitcher      = false;
                  this.setState({showLoader: false});

                  // console.log(_history.data.result.meta.currentTradingPeriod, _from);

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
                          if(_from) {
                            this.chart.current.timeScale().setVisibleRange({
                              from: _data.timestamp[_data.timestamp.length - 1]+graphOffset - (this.props.selectedOption.toLowerCase() == "forex" ? ((3600 * 4) - 1800) : 3600),
                              to: _data.timestamp[_data.timestamp.length - 1]+graphOffset - (this.props.selectedOption.toLowerCase() == "forex" ? ((3600 * 3) - 1800) : 0)
                            });
                          } else {
                            this.chart.current.timeScale().setVisibleRange({
                              from: _data.timestamp[parseInt(_data.timestamp.length/2)]+graphOffset,
                              to: _data.timestamp[_data.timestamp.length - 1]+graphOffset
                            });
                          }
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
                    if(!this.historySeries.length && !_from) {
                      console.log("No data for", pair, "oo");
                      check_for_update(
                        pair,
                        true,
                        _history.data.result.meta.currentTradingPeriod.post,
                        _history.data.result.meta.currentTradingPeriod.pre
                      );
                    } else if(!_from) {
                      setTimeout(() => {
                        if(this.historySeriesPair == pair) {
                          _plotHistory();
                        }
                      }, 2.65 * 1000);
                      check_for_update(pair);
                    }
                  }
                } catch (e) {
                  setTimeout(() => {
                    check_for_update(pair);
                  }, 100);
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
  }

  componentWillUnmount() {
    this.realTimeListener = false;
  }

  componentWillUpdate() {
    if(this.props.historyLevel != this.historyLevel) {
      this.destroyGraph = true;
    }
    if(this.props.ki == 1 && this.col != this.props.col) {
      this.col = this.props.col;
      setTimeout(() => {
        this.chart.current.timeScale().fitContent();
        this.chart.current.timeScale().scrollToPosition(1);
        $(window).trigger("resize");
      }, 100);
    }
  }

  async componentDidMount() {
    this.realTimeListener = true;
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

    $(".outter-ham, .a-comp, .filter-img").click(() => {
      if(this.realTimeListener && !this.destroyGraph) {
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
      if(this.realTimeListener && !this.destroyGraph) {
        let w = this.chartContainerRef.current.clientWidth;
        let h = this.chartContainerRef.current.clientHeight;
        this.chart.current.applyOptions({width: w, height: h});
        setTimeout(() => {
          this.chart.current.timeScale().fitContent();
        }, 0);
      }
    });

    this.loadHistorical();
  }

  treatPair = (pair) => {
    if(pair == undefined) {
      return this.pair;
    }
    return pair.indexOf(" ") > -1 ? pair.split(" ")[0].trim() : pair.trim();
  }

  handleOptionsChange = (e) => {
    this.props.changePair(this.state.allPairs[e.target.value.toLowerCase()][0], e.target.value.toLowerCase());
  };

  setNewPairData = (e) => {
    this.props.changePair(e.target.value, this.state.selectedOption);
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

  plotGraph = (data) => {
    if (typeof data === 'object' && this.treatPair(data.pair) === this.treatPair(this.pair)) {
      let plot_data = data;
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

  showDropdown = function (_d) {
    let d = "#"+_d;
    if($(d).hasClass("_active")) {
      $(d).removeClass("_active");
    } else {
      $(d).addClass("_active");
    }
  }

  render() {
    let sop = this.props.selectedOption;
    let stocks = [];

    if(window.hotStockData) {
      for (const [key, value] of Object.entries(window.hotStockData)) {
        stocks[value.pair] = value.name;
      }
    }

    return this.destroyGraph ? null : (
      <div className={'col-md-'+(this.props.ki > 1 ? '6' : this.props.col)+' chart-section multiple-chart-section chart-section-'+this.props.ki} uniqueId={this.props.chartKey}>
        <div className='chart-section-top'>
          <div className='chart-section-top-left'>
            <select className='blue-select' onChange={this.setNewPairData} value={this.state.selectedPair}> 
              {this.state.allPairs[sop].map((data, key) => (<option key={key} value={data}>{(stocks[data] || "").length ? stocks[data] : data}</option>))}
            </select>
            {this.props.ki === 1 ?
              <button onClick={this.props.addComparism} className="a-comp">Add Comparison</button> :
              <button
                onClick={() => this.props.closeComparism(this.props.ki)}
                style={{border: "1px solid rgb(197 0 0)", color: "#fff", background: "rgb(255, 30, 30)", width: "100px"}}
              >Close</button>
            }
          </div>
          <div className='chart-section-top-right'>
            <select className='green-select' onChange={this.handleOptionsChange} value={sop.toUpperCase()}>
              {this.state.instruments.map((instr, key) => (
                <option key={key}>{instr.toUpperCase()}</option>
              ))}
            </select>
            <ul className="instrument-icons">
              <li className="one" id={"gr-one-"+this.props.ki} onClick={() => this.showDropdown("gr-one-"+this.props.ki)}>
                <img style={{opacity: this.currentGrpahType == "candle" ? "1" : "1"}} src={
                  this.currentGrpahType == "candle" ? candleGrf:
                  this.currentGrpahType == "line" ? lineGrf:
                  this.currentGrpahType == "area" ? areaGrf:
                  this.currentGrpahType == "bar" ? barGrf:
                  this.currentGrpahType == "hist" ? histGrf : Wave}
                  alt='' className='icon' />
                <img src={Tarrow} alt='' className='t-arrow' />
                <div className="gr-dropdown">
                  <span onClick={(e) => this.switchGraphTypeTo("candle")} className={"cgt"+(this.currentGrpahType == "candle" ? " _active" : "")}><img src={candleGrf} /> Candle</span>
                  <span onClick={(e) => this.switchGraphTypeTo("line")} className={"cgt"+(this.currentGrpahType == "line" ? " _active" : "")}><img src={lineGrf} /> Line</span>
                  <span onClick={(e) => this.switchGraphTypeTo("area")} className={"cgt"+(this.currentGrpahType == "area" ? " _active" : "")}><img src={areaGrf} /> Area</span>
                  <span onClick={(e) => this.switchGraphTypeTo("bar")} className={"cgt"+(this.currentGrpahType == "bar" ? " _active" : "")}><img src={barGrf} /> Bar</span>
                  <span onClick={(e) => this.switchGraphTypeTo("hist")} className={"cgt"+(this.currentGrpahType == "hist" ? " _active" : "")}><img src={histGrf} /> Histogram</span>
                </div>
              </li>
              <li className="two" id={"gr-two-"+this.props.ki} onClick={() => this.showDropdown("gr-two-"+this.props.ki)}>
                <img src={Tarrow} alt='' className='t-arrow' /> {this.state.historyLevel}
                <div className="gr-dropdown">
                  {this.props.ki == 1 ?
                    <span onClick={(e) => this.props.changeLevel("1D")} className={"cgt"+(this.state.historyLevel == "1D" ? " _active" : "")}> 1D </span>
                  : null}
                  <span onClick={(e) => this.props.changeLevel("1W")} className={"cgt"+(this.state.historyLevel == "1W" ? " _active" : "")}> 1W </span>
                  <span onClick={(e) => this.props.changeLevel("1M")} className={"cgt"+(this.state.historyLevel == "1M" ? " _active" : "")}> 1M </span>
                  <span onClick={(e) => this.props.changeLevel("6M")} className={"cgt"+(this.state.historyLevel == "6M" ? " _active" : "")}> 6M </span>
                  <span onClick={(e) => this.props.changeLevel("1Y")} className={"cgt"+(this.state.historyLevel == "1Y" ? " _active" : "")}> 1Y </span>
                  <span onClick={(e) => this.props.changeLevel("2Y")} className={"cgt"+(this.state.historyLevel == "2Y" ? " _active" : "")}> 2Y </span>
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
    );
  }
}

export default ChartModule;