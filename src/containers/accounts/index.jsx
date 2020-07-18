import React, { Component } from 'react';
import Container from '../container/index';
import Spinner from '../../components/spinner/index';
import server from '../../services/server';
import ins_up from '../../themes/images/ins-up.png';
import ins_down from '../../themes/images/ins-down.png';
import ai_n from '../../themes/images/ai-normal.png';
import sp from '../../themes/images/circle-plus.png';
import ai_b from '../../themes/images/ai-bookmark.png';
import '../../components/standard/standard.scss';
import AddAccount from '../../components/addAccount/index';
import './index.scss';

class Accounts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNews: null,
      showSpinner: false,
      addAcc: false,
      accounts: [],
      email: localStorage.getItem("email")
    }
  }

  async componentDidMount () {
    this.accountList();
    let that = this;
    if(document.getElementById("account-container")) {
       document.getElementById("account-container").addEventListener('refreshAccList', async (e) => {
        that.accountList();
      });
    }
  }

  accountList = async () => {
    this.setState({showSpinner: true});
    const { data: { data: { profile } } } = await server.getProfile(localStorage.getItem("id"), localStorage.getItem("email"));
    localStorage.setItem('email', localStorage.getItem("email"));
    localStorage.setItem('id', profile.user_id);
    localStorage.setItem('profile', JSON.stringify(profile));

    let accs = [];
    // let profile = JSON.parse(localStorage.getItem("profile"));
    const { data: { data: { accounts } } } = await server.getAccounts(localStorage.getItem("id"));
    Object.entries(accounts).forEach(([key, val]) => {
      let append;
      if(val.toLowerCase() == "demo" || val.toLowerCase() == "live") {
        append = profile[val];
        let name = append[(val.toLowerCase() == "demo" ? "demo" : "live")+"_account_id"].split("-");
        append["account_id"] = name[1];
        append["account_type"] = name[0].toLowerCase();
        append["account_id_val"] = val;
        append["account_balance"] = append[append["account_type"]+"_balance"];
        // accs.push(append);
      } else {
        console.log(profile[val]);
        append = val.split("-")[0].toLowerCase() == "demo" ? profile[val]["demo"] : profile[val]["live"];
        append["account_id"] = val.split("-")[1];
        append["account_type"] = val.split("-")[0].toLowerCase();
        append["account_id_val"] = val;
        append["account_balance"] = append[append["account_type"]+"_balance"];
        accs.push(append);
      }
    });

    this.setState({accounts: accs, showSpinner: false});
  }

  handleClick = (e, i) => {
    document.querySelectorAll(".t-history-record").forEach(function(el) {
      el.classList.remove("_active");
    });
    document.getElementById(i).classList.add("_active");
  }

  render() {
    return (
      <Container>
      <Spinner showSpinner={this.state.showSpinner} />
      { this.state.addAcc ? <AddAccount confirmClick={(e) => this.setState({addAcc: false})} cancelClick={(e) => this.setState({addAcc: false})} /> : null }
        <div className="col-12" id="account-container">

          <h1 className="page-title">Accounts
            <div className="btn-list">
              <button className="add_account" onClick={(e) => this.setState({addAcc: true})}><img src={sp} /> Add account</button>
            </div>
          </h1>
          
          <ul className='t-history-header'>
            <li className="acc-name">TRADING ACCOUNT</li>
            <li>BALANCE</li>
            <li>CREDIT</li>
            <li>LEVERAGE</li>
            <li>ACTIONS</li>
          </ul>

          {this.state.accounts.map((acc, key) => (
              <ul className={"t-history-record"+(key == 0 ? " _active" : "")} id={"t-history-record-"+key} onClick={(e) => this.handleClick(e, 't-history-record-'+key)}>
                <li className="acc-name">
                <img src={ins_down} className="ins_down" />
                <img src={ins_up} className="ins_up" />
                <span className="th">TRADING ACCOUNT</span>
                <span className="td"><button className={"acc_type"+(acc.account_type.toLowerCase() == "live" ? " live" : "")}>{acc.account_type.toUpperCase()}</button>{this.state.email}<br /><small className="inf">{acc.account_id}</small></span></li>
                <li className=""><span className="th">BALANCE</span><span className="td">{acc.account_balance} USD</span></li>
                <li className=""><span className="th">CREDIT</span><span className="td">{acc.credit} USD</span></li>
                <li className=""><span className="th">LEVERAGE</span><span className="td">{acc.leverage}</span></li>
                <li>
                  <span className="th">ACTIONS</span>
                  <span className="td">
                    <button className="deposit">Deposit</button>
                    <svg className="acc-gra" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.25 5.5H4V17.75H0.25V5.5ZM7.25 0.25H10.75V17.75H7.25V0.25ZM14.25 10.25H17.75V17.75H14.25V10.25Z" fill="#1FCF65"/>
                    </svg>
                  </span>
                </li>
              </ul>
            ))
          }

          {/*<ul className='t-history-record nofw' id={"t-history-record-"+this.state.accounts.length} onClick={(e) => this.handleClick(e, 't-history-record-'+this.state.accounts.length)}>
            <li className="acc-name">
              <svg className="arr_down" width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.86061 1.94146e-06L1.82092e-07 2.73008L16 18L32 2.73008L29.1394 2.25483e-06L16 12.5398L2.86061 1.94146e-06Z" fill="#03CF9E"/>
              </svg>
              <span className="capital">Account statistics</span>
              <ul className="accs">
                <li>
                  <button className="acc_type inside">DEMO</button> 4392923924204784
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
                  <th>Max drawdown</th>
                </tr>
                <tr>
                  <td className="text-success">$6258.05</td>
                  <td>$723.05</td>
                  <td>$0</td>
                </tr>
              </table>
            </li>
            <div id="account-graph">
              
            </div>
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
          </ul>*/}
        </div>
      </Container>
    );
  }
};

export default Accounts;
