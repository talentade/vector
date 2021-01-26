import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Container from '../container/index';
import Spinner from '../../components/spinner/index';
import server from '../../services/server';
import app from '../../services/app';
import ins_up from '../../themes/images/ins-up.png';
import ins_down from '../../themes/images/ins-down.png';
import '../../components/standard/standard.scss';
import './index.scss';
import anychart from './anychart-base.min.js';

class AccountStat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spinner: false,
      astat : {total: 0, average: 0}
    }
  }

  getAstat = async () => {
    this.setState({spinner: true});
    try {
      let astat = await server.getAstat(this.props.account);
      this.setState({astat: astat.data.astat})
    } catch (e) {
      // return e;
    }
    this.setState({spinner: false});
  }

  async componentDidMount () {
    await this.getAstat();

    let that = this;

    anychart.onDocumentReady(function() {
 
      // set the data
      var data = {
          header: ["Stat", "Stat"],
          rows: [
            ["Sun", 50000],
            ["Mon", 1500],
            ["Tue", 87000],
            ["Wed", 175000],
            ["Thur", 10000],
            ["Fri", 242000],
            ["Sat", 25000],
      ]};

      // create the chart
      var chart = anychart.column();

      // add the data
      chart.data(data);

      // set the chart title
      chart.title("");

      // draw
      setTimeout(() => {
        chart.container("account-graph-"+that.props.altid);
        chart.draw();
      }, 500);
    });
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

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    let id = this.props.id; // "t-history-record-"+this.state.accounts.length;

    return (
          <ul className='t-history-record nofw hide' id={id}>
            <li className="acc-name">
              <svg className="arr_down" width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.86061 1.94146e-06L1.82092e-07 2.73008L16 18L32 2.73008L29.1394 2.25483e-06L16 12.5398L2.86061 1.94146e-06Z" fill="#03CF9E"/>
              </svg>
              <span className="capital">Account statistics</span>
              <ul className="accs">
                <li>
                  <button className="acc_type inside">{this.props.type}</button> {this.props.label}
                  <svg className="drop_arr" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.25151 -5.47055e-08L-2.96653e-07 1.21337L7 8L14 1.21337L12.7485 -5.57254e-07L7 5.57326L1.25151 -5.47055e-08Z" fill="white"/>
                  </svg>
                </li>
              </ul>
              <select className="filter">
                <option>All Time</option>
                <option>Today</option>
                <option>One Week</option>
                <option>One Month</option>
                <option>One Year</option>
              </select>
            </li>
            <li className="acc-stat-row">
              <table>
                <tr>
                  <th>Total P/L:</th>
                  <th>Average P/L:</th>
                  {/*<th>Max drawdown</th>*/}
                </tr>
                <tr>
                  <td className="text-success">{this.showPrice(this.state.astat.total)}</td>
                  <td>{this.showPrice(this.state.astat.total > 0 ? (this.state.astat.total / this.state.astat.average) : 0)}</td>
                  {/*<td>$0</td>*/}
                </tr>
              </table>
            </li>
            <div id={"account-graph-"+this.props.altid}></div>
            <li className="acc-stat-row-2">
              <table>
                <tr>
                  <th>
                    <span className="thr">Total trades:</span>
                    <div>
                      <span className="text-success l">100.00 % <b>(8)</b><br /><small>Profit</small></span>
                      <span className="text-danger r">0<br /><small>Loss</small></span>
                    </div>
                  </th>
                  <th>
                    <span className="thr">Sum of trades:</span>
                    <div>
                      <span className="text-success l">100.00 % <b>(8)</b><br /><small>Profit</small></span>
                      <span className="text-danger r">0<br /><small>Loss</small></span>
                    </div>
                  </th>
                  <th>
                    <span className="thr">Average profit/loss per trade:</span>
                    <div>
                      <span className="text-success l">100.00 % <b>(8)</b><br /><small>Profit</small></span>
                      <span className="text-danger r">0<br /><small>Loss</small></span>
                    </div>
                  </th>
                  <th>
                    <span className="thr">Profitable trades rate:</span>
                    <div>
                      <span className="text-success l">100.00 % <b>(8)</b><br /><small>Profit</small></span>
                      <span className="text-danger r">0<br /><small>Loss</small></span>
                    </div>
                  </th>
                </tr>
              </table>
            </li>
          </ul>
    );
  }
};

export default AccountStat;