import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import us from '../../themes/images/flags/us.png';
import sa from '../../themes/images/flags/sa.png';
import server from '../../services/server';
import app from '../../services/app';
import { ConfirmModal } from '../../components/popups/index';

class InstrumentsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      confirmID: 0,
      confirmPAIR: '',
      confirmModal: false,
      instruments: {forex: [], crypto: [], stock: [], commodities: [], indices: []},
      showLoader: true,
      showSpinner: false,
    };
    this.realTimeListener = true;
    this.retryCounter = 0;

    this.fireFavRef = new CustomEvent('refreshFav', {
      detail: {
        code: 200
      }
    });

    this.refresHistory = null;
  }

  componentWillUnmount() {
    this.realTimeListener = false;
    clearInterval(this.refresHistory);
  }

  async componentDidMount() {
    await this.getAllInstrument();
    $(window).on("renewSocket", () => this.socketInit());
    if(window.WebSocketPlugged) {
      $(window).trigger("renewSocket");
    }
    this.realTimeListener = true;
  }

  socketInit = () => {
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        switch(message.event) {
          case "PAIR_DATA":
            this.getAllInstrument(payload);
          break;
        }
      } catch (e) {
        throw e;
      }
    });
  }

  getAllInstrument = async (hot = null) => {
    try {
      let data = hot ? {data: hot} : await server.getAllInstrument();
      let rows = data.data;
      let instruments = {forex: [], crypto: [], stock: [], commodities: [], indices: []};
      for(var i = 0; i < rows.length; i++) {
        let type = rows[i]["type"].toLowerCase();
        instruments[type].push(rows[i]);
      }
      this.setState({instruments: instruments, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  deleteInstrument = async (id, s) => {
    this.setState({ showLoader: true });
    try {
      let del = await server.deleteInstrument(id, s);
      window.location.href = "";
    } catch (e) {
      return e;
    }
    this.setState({ showLoader: false });
  }

  render () {
    let instruments = this.state.instruments;
    return (
        <>
      <ConfirmModal
        head={"Delete "+this.state.confirmPAIR+"?"}
        text="Click YES to confirm"
        show={this.state.confirmModal}
        cancel={() => this.setState({confirmModal: false})}
        confirm={() => this.deleteInstrument(this.state.confirmID, this.state.confirmPAIR)}
      />

            <table border="0" style={{marginBottom: "1em"}}>
              <thead>
                <tr>
                  <th>CURRENCY PAIR</th>
                  <th>BUY</th>
                  <th>SELL</th>
                  <th>MARKET PRICE</th>
                  <th>HIGH</th>
                  <th>LOW</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
              {instruments[this.props.active].map((ins) => (
                <tr key={`${Math.random()} ${Math.random()} ${ins.id}`} style={{opacity: ins.state.toLowerCase() == "closed" ? "0.4" : "1"}}>
                  <td className="ins-td">
                    <span className="td-ins" title={ins.name}>{ins.pair}</span>
                  </td>
                  <td><span className="td-buy">{app.floatFormat(ins.ask) || "loading.."}</span></td>
                  <td><span className="td-sell">{app.floatFormat(ins.bid) || "loading.."}</span></td>
                  <td><span className="td-rate">{app.floatFormat(ins.price) || "loading.."}</span></td>
                  <td><span className="td-high">{app.floatFormat(ins.high) || "loading.."}</span></td>
                  <td><span className="td-low">{app.floatFormat(ins.low) || "loading.."}</span></td>
                  <td>                    
                    <svg onClick={() => this.props.edit(ins)} className="tb-action" style={{position: "relative", top: "-2px"}} width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.99967 0.75C5.83301 0.75 2.27467 3.34167 0.833008 7C2.27467 10.6583 5.83301 13.25 9.99967 13.25C14.1663 13.25 17.7247 10.6583 19.1663 7C17.7247 3.34167 14.1663 0.75 9.99967 0.75ZM9.99967 11.1667C7.69967 11.1667 5.83301 9.3 5.83301 7C5.83301 4.7 7.69967 2.83333 9.99967 2.83333C12.2997 2.83333 14.1663 4.7 14.1663 7C14.1663 9.3 12.2997 11.1667 9.99967 11.1667ZM9.99967 4.5C8.61634 4.5 7.49967 5.61667 7.49967 7C7.49967 8.38333 8.61634 9.5 9.99967 9.5C11.383 9.5 12.4997 8.38333 12.4997 7C12.4997 5.61667 11.383 4.5 9.99967 4.5Z" fill="#03CF9E"/>
                    </svg>&nbsp;&nbsp;&nbsp;
                    <svg onClick={() => this.setState({confirmID: ins.id, confirmPAIR: ins.pair, confirmModal: true})} className="tb-action" width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#FFE602"/>
                    </svg>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
        <div
          className='loader-container'
          style={{ display: this.state.showLoader ? 'block' : 'none' }}
        >
          <div className='loader'></div>
        </div>
            {/*<Pagination2 />*/}
          </>
        );
  }
}

export default InstrumentsTable;