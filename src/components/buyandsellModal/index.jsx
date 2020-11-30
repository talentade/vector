import React, { Component } from 'react';
import $ from 'jquery';
import './index.scss';
import CancelIcon from '../../themes/images/cancel.svg';
import CancelImage from '../../themes/images/cancel.png';
import arrowBuyIcon from '../../themes/images/arrow-buy.png';
import server from '../../services/server';
import app from '../../services/app';
import loader from "./loader.svg";
import arrowSellIcon from '../../themes/images/arrow-sell.png';
import upVlv from '../../themes/images/up.png';
import downVlv from '../../themes/images/down.png';
import Spinner from '../../components/spinner/index';
import { Insufficient } from '../../components/popups/index';

class BuyandsellModal extends Component {
  constructor(props) {

    super(props);

    let info = false;

    if(props.information) {
      info = props.information;
    }

    this.state = {
      information : info,
      mode: "buy",
      pair: '',
      base1: '',
      base2: '',
      volume: 0.01,
      lot_str: "",
      pip_str: "",
      required_margin_str: "",
      conversion_1: 0,
      conversion_2: 0,
      delimeter: "",
      lots: 0,
      units: 0,


      counter: 0,
      counter2: 1,
      counter3: 3,
      changedLot: 0.01,
      changed_lot: 0.01,
      showLoader: false,
      live: 0,
      stl_val: 0,
      tkp_val: 0,
      estimated_price1: 0,
      estimated_price2: 0,
      lot_val: 0.01,
      stop_loss: 0.01,
      showInssufficient: false,
      take_profit: 0.03,
      analysis: false,
      errorMessage: "",
    };

    this.prev_buy = 0;
    this.prev_sell = 0;

    this.retryCounter = 0;
    this.realTimeListener = true;
  }

  async componentDidMount() {
    window.BuyandsellModalPopup = true;
    $(window).on("renewSocket", () => this.socketInit());
    if(window.WebSocketPlugged) {
      $(window).trigger("renewSocket");
    }
    this.initLoader();

    let d = this;

    $("#tkp_val_1").keyup(function () {
      if(Number($(this).val()) <= Number($(this).data("rate"))) {
        $(this).val($(this).data("valu"));
        d.setState({tkp_val: Number($(this).data("valu"))});
      } else {
        d.setState({tkp_val: Number($(this).val())});
      }
    });

    $("#tkp_val_0").keyup(function () {
      if(Number($(this).val()) >= Number($(this).data("rate"))) {
        $(this).val($(this).data("valu"));
        d.setState({tkp_val: Number($(this).data("valu"))});
      } else {
        d.setState({tkp_val: Number($(this).val())});
      }
    });

    $("#stl_val_1").keyup(function () {
      if(Number($(this).val()) >= Number($(this).data("rate"))) {
        $(this).val($(this).data("valu"));
        d.setState({stl_val: Number($(this).data("valu"))});
      } else {
        d.setState({stl_val: Number($(this).val())});
      }
    });

    $("#stl_val_0").keyup(function () {
      if(Number($(this).val()) <= Number($(this).data("rate"))) {
        $(this).val($(this).data("valu"));
        d.setState({stl_val: Number($(this).data("valu"))});
      } else {
        d.setState({stl_val: Number($(this).val())});
      }
    });
  }

  componentWillUnmount () {
    window.BuyandsellModalPopup = false;
  }

  socketInit = () => {
    window.WebSocketPlug.addEventListener('message', ({data}) => {
      try {
        let message = JSON.parse(`${data}`);
        let payload = message.payload;
        switch(message.event) {
          case "GET_CONVERSION":
          if(payload.user == app.id() && payload.account == app.account()) {
            this.setState({
              analysis:     true,
              conversion_1: payload.conversion_1,
              conversion_2: payload.conversion_2
            });
            this.pip_margin();
          }
          break;
          case "ANALYSIS":
          if(payload.user == app.id() && payload.account == app.account() && payload.lots == this.state.volume) {
            this.setState({
              analysis: true,
              pip_str: payload.pip.toFixed(2),
              required_margin_str: payload.margin.toFixed(2)
            });
          }
          break;
        }
      } catch (e) {
        throw e;
      }
    });
  }

  initLoader = async () => {
    let base = this.props.pair.trim(), base1, base2;
    let delimeter = "";
    if(base.indexOf("/") > -1) {
      base  = base.split("/");
      base1 = base[0];
      base2 = base[1] || "USD";
      delimeter = "/";
    } else if(base.indexOf("-") > -1) {
      base  = base.split("-");
      base1 = base[0];
      base2 = base[1] || "USD";
      delimeter = "-";
    } else {
      base  = base;
      base1 = "USD";
      base2 = base;
      delimeter = "/";
    }
    this.setState({
      pair:  this.props.pair,
      base1: base1.trim(),
      base2: base2.trim()
    });

    if(this.props.act == "buy") {
      this.btnBsell("btnBuy", "btnSell");
    } else {
      this.btnBsell("btnSell", "btnBuy");
    }
    
    if(window.WebSocketPlugged && (
        this.props.type.toLowerCase() == "forex" ||
        this.props.type.toLowerCase() == "crypto"
      )) {
      if(!!this.props.analysis) {
        this.setState({
          analysis:     true,
          conversion_1: this.props.analysis.conversion_1,
          conversion_2: this.props.analysis.conversion_2
        });
        let _a = this.props.analysis; _a.base2 = base2
        this.pip_margin(null, _a);
        this.vlvChange();
      } else {
        window.WebSocketPlug.send(JSON.stringify({"event": "GET_CONVERSION", "payload": {
          user:      app.id(),
          account:   app.account(),
          type:      this.props.type,
          base1:     base1.trim(),
          base2:     base2.trim(),
          delimeter: delimeter
        }}));
      }
    } else if(!(this.props.type.toLowerCase() == "forex" || this.props.type.toLowerCase() == "crypto")) {
      this.pip_margin(null);
      this.vlvChange();
    }
  }

  handleClick = (p) => {
    this.setState({ information : p});
  }

  popupOut = (e) => {
    if($(e.target).hasClass("overlay") && $(e.target).hasClass("bs")) {
      $(e.target).find(".modal-cancel").click();
    }
  }

  changeVolume = async (e) => {
    this.setState({ volume : e.target.value });
    this.vlvChange();
  }

  _vlvChange = (u = "", i) => {
    let lots = Number(i > 0 ? this.state.take_profit : this.state.stop_loss); // Number($("#vlv_"+i).val());

    if(u.length) {
      if(u === "up") {
        lots += 0.01;
      } else {
        lots -= 0.01;
      }
    }

    lots = lots.toFixed(2);
    // $("#vlv_"+i).val(lots);

    if(i > 0) {
      this.setState({ take_profit : lots });
    } else {
      this.setState({ stop_loss : lots });
    }
    // alert(lots);
    // this.pip_margin(lots);
  }

  vlvChange = (u = "") => {
    let lots = Number($("#vlv").val());

    if(u.length) {
      if(u === "up") {
        lots += 0.01;
      } else {
        lots -= 0.01;
      }
      lots = lots.toFixed(2);
      $("#vlv").val(lots);
    }

    this.setState({ volume : lots });
    this.pip_margin(lots);
  }

  pip_margin = (lots = null, conversion = null) => {
    let volume = lots ? lots : this.state.volume;
    let market_price = (this.state.mode.toLowerCase() == "buy" ? this.props.buy : this.props.sell);
    let { conversion_1, conversion_2, base2 } = this.state;

    if(conversion) {
      conversion_1 = conversion.conversion_1;
      conversion_2 = conversion.conversion_2;
      base2        = conversion.base2;
    }

    if(!(
        this.props.type.toLowerCase() == "forex" ||
        this.props.type.toLowerCase() == "crypto"
      )) {

      let info    = this.props.info;
      let vol     = volume;
      let lev     = parseFloat(this.props.info.leverage) || 1;
      let ppl     = parseFloat(info.unit_per_lot);
      let unit    = parseFloat(info.pip_size);
      let cntr    = parseFloat(info.contract);
      let pip_str = ppl * (vol / 0.1);
      let lot_str = unit * (vol / 0.1);
      let margin  = vol * cntr * market_price / lev;

      if(ppl > 0 && lev > 0 && cntr > 0) {} else {
        return false;
      }

      this.setState({
        analysis: true,
        pip_str: pip_str.toFixed(2),
        lot_str: lot_str.toFixed(2),
        required_margin_str: margin.toFixed(2)
      });
    } else if(conversion_1 > 0 && conversion_2 > 0) {
      if(this.props.type.toLowerCase() === "forex") {
        let lev     = 1 / app.leverage();
        let pips    = conversion_2 * (base2.toUpperCase() == "JPY" ? 1000 : 10) * volume;
        let units   = volume * 100000;
        let margin  = conversion_1 * units * lev;
        this.setState({
          pip_str: pips.toFixed(2),
          lot_str: units.toFixed(2),
          required_margin_str: margin.toFixed(2)
        });
      } else if(this.props.type.toLowerCase() === "crypto") {
        let lev     = parseInt(this.props.info.leverage);
        let dpl     = Number(this.props.info.dollar_per_lot);
        let pips    = volume * dpl;
        let upl     = String(this.props.info.unit_per_lot).trim()
        let units   = volume * (upl.length ? Number(upl) : dpl);
        let margin  = market_price * conversion_2 * units / lev;
        this.setState({
          pip_str: pips.toFixed(2),
          lot_str: units.toFixed(2),
          required_margin_str: margin.toFixed(2)
        });
      }
    }
  }


  estimate = () => {
    this.setState({
      estimated_price1: parseFloat(this.state.live - (this.state.pip_val * this.state.stop_loss)).toFixed(5),
      estimated_price2: parseFloat(this.state.live - (this.state.pip_val * this.state.take_profit)).toFixed(5)
    });
  }

  vlvChange2 = (u) => {
    let cnt = this.state.counter2;
    let sum = this.state.stop_loss;
    if(u == "up") {
      if(cnt > -1) cnt +=1;
      this.setState({counter2: cnt, stop_loss: sum + (cnt * 0.01)});
      setTimeout(() => {
        this.tradeAnalysis();
      }, 10);
    } else {
      if(cnt > 0) cnt -=1;
      this.setState({counter2: cnt, stop_loss: sum + (cnt * 0.01)});
      setTimeout(() => {
        this.tradeAnalysis();
      }, 10);
    }
  }

  btnBsell = async (i, r) => {
    if(document.getElementById(i)) {
      document.getElementById(i).classList.add("_active");
      document.getElementById(r).classList.remove("_active");
      document.getElementById(i+"-order").classList.add("_active");
      document.getElementById(r+"-order").classList.remove("_active");
      document.getElementById(i+"-price").classList.add("_active");
      document.getElementById(r+"-price").classList.remove("_active");
      this.setState({mode: i == "btnSell" ? "sell" : "buy"})
      this.tradeAnalysis();
    }
  }

  tradeAnalysis = async () => {
    // window.WebSocketPlug.send(JSON.stringify({"event": "GET_ANALYSIS", "payload": {
    //   lots:      lots,
    //   user:      app.id(),
    //   account:   app.account(),
    //   leverage:  app.leverage(),
    //   base1:     this.state.base,
    //   base2:     this.state.base2
    // }}));
  }

  placeOrder = async () => {
    let isBuy = this.state.mode == "buy" ? 1 : 0;
    let order = {
        "mode"            : this.state.mode,
        "type"            : this.props.type,
        "instrument"      : this.state.pair,
        "rate"            : this.state.mode == "buy" ? app.floatFormat(this.props.buy) : app.floatFormat(this.props.sell),
        "pip"             : this.state.pip_str,
        "lots"            : this.state.lot_str,
        "volume"          : this.state.volume,
        "margin"          : this.state.required_margin_str,
        "commission"      : Number((Number(this.props.info.commission) / 100) * this.state.required_margin_str),
        "stop_loss"       : document.getElementById("stop_loss").checked ? Number($("#stl_val_"+isBuy).val().trim()) : "",
        "take_profit"     : document.getElementById("take_profit").checked ? Number($("#tkp_val_"+isBuy).val().trim()) : "",
        "trade_when"      : document.getElementById("only_buy_when").checked ? Number($(".only_buy_when_actual.for-"+this.state.mode).val()) : "",
        "time"            : new Date().toLocaleString("en-US", {timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone})
      }

    this.setState({showSpinner: true, analysis: false});
    try {
      const place_order = await server.placeOrder(order);
      if(place_order.status == 200) {
        const gp = await server.getProfile();
        app.profile(gp.data.profile);
        $(".balance").trigger("refresh");
        this.props.confirmClick("Your have successfully placed a "+this.state.mode+" order for "+this.props.pair);
      } else {
        this.setState({showInssufficient: true});
      }
      this.setState({showSpinner: false, analysis: true});
    } catch (e) {
      this.setState({showSpinner: false, analysis: true});
      return e;
    }
  }

  handleChange = (e) => {
    var cl;
    document.querySelectorAll(".switch-ctxt").forEach(function(el) {
      el.classList.remove("_active");
    });
    let switch_ctxt = e.target.parentNode.parentNode.children[1];
    if(e.target.checked) {
      switch_ctxt.classList.remove("hide");
      switch_ctxt.classList.add("_active");
    } else {
      switch_ctxt.classList.add("hide");
      switch_ctxt.classList.remove("_active");
      document.querySelectorAll(".switch-ctxt:not(.hide)").forEach(function(el, k, l) {
        k == (l.length - 1) && el.classList.add("_active");
      });
    }
  }

  render () {
    const { info, cancelClick, confirmClick, pair, buy, sell, act } = this.props;
    const { information, analysis, base1, tkp_val, stl_val } = this.state;

    // console.log(info);
    
    let tkp, stl, etkp = 0, estl = 0, sell_when, buy_when, crate = this.state.mode == "buy" ? buy : sell;
    let isBuy = this.state.mode == "buy" ? 1 : 0;

        tkp = (108 / 100) * Number(crate);
        stl = (91 / 100) * Number(crate);

        tkp = Number(String(tkp).substr(0, String(crate).length));
        stl = Number(String(stl).substr(0, String(crate).length));

        tkp = tkp_val > 0 ? tkp_val : tkp;
        stl = stl_val > 0 ? stl_val : stl;

        if(this.state.mode != "buy") {
        let _ = tkp;
          tkp = stl;
          stl = _;
        }

        if(this.state.required_margin_str > 0) {
          if(info.type.toLowerCase() == "forex") {
            etkp = parseFloat(((Number(this.state.lot_str) * tkp / crate) - this.state.lot_str) * this.state.conversion_1).toFixed(2);
            estl = parseFloat(((Number(this.state.lot_str) * stl / crate) - this.state.lot_str) * this.state.conversion_1).toFixed(2);
          } else {
            etkp = parseFloat((((crate * Number(this.state.lot_str) * tkp) / crate)) - (crate * Number(this.state.lot_str))).toFixed(2);
            estl = parseFloat((((crate * Number(this.state.lot_str) * stl) / crate)) - (crate * Number(this.state.lot_str))).toFixed(2);
          }

          if(this.state.mode != "buy") {
            etkp = etkp * -1;
            estl = estl * -1;
          }

          etkp = (etkp < 0 ? '-' : '')+"$"+(etkp < 0 ? etkp * -1 : etkp);
          estl = (estl < 0 ? '-' : '')+"$"+(estl < 0 ? estl * -1 : estl);
        }

        sell_when = (95 / 100) * Number(crate);
        buy_when = (105 / 100) * Number(crate);

        sell_when = Number(String(sell_when).substr(0, String(crate).length));
        buy_when = Number(String(buy_when).substr(0, String(crate).length));

    return (
      <>
      <div className='overlay bs' onClick={this.popupOut}>
        <div className='deposit-modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancelClick} />
            <ul className="imarket">
              <li className={information ? '_active' : ''} onClick={() => this.handleClick(true)}><span>Information</span></li>
              <li className={information ? '' : '_active'} onClick={() => { this.handleClick(false); setTimeout(() => { this.initLoader(); }, 10) }}><span>Markets</span></li>
            </ul>
            { information ? <div className='bsell-modal-content'>
              <h6>{info.name}{pair}</h6>
              {info.name.length ? <p>{info.name}</p> : null}
              <ul className="info-list">
                <li className="mt1"><span className="text-success">Quote Asset</span><span className="text-success">{base1}</span></li>
                <li><span>PIp Size:</span><span>0.01 (2digits)</span></li>
                <li><span>Lot Size:</span><span></span></li>
                {/*<li><span>MIN Price Change:</span><span>0.001</span></li>*/}
                <li className="mt1"><span className="text-primary">MIN Volume:</span><span className="text-primary">{info._min}</span></li>
                <li><span className="text-primary">MAX Volume:</span><span className="text-primary">{info._max}</span></li>
                <li className="mt1"><span>Stops Level:</span><span>0.0</span></li>
                <li className="mt1"><span className="text-success">Swaps Long:</span><span className="text-success">{info._long}</span></li>
                <li><span className="text-success">Swaps Short:</span><span className="text-success">{info._short}</span></li>
                <li className="mt1"><span>Leverage</span><span>1:{app.leverage()}</span></li>
              </ul>
              <p align="center">
                <span className="buy-pos"><img src={arrowBuyIcon} />SELL Positions<span>{app.floatFormat(sell)}</span></span>
                <span className="sell-pos"><img src={arrowSellIcon} />BUY Positions<span>{app.floatFormat(buy)}</span></span>
              </p>
            </div> : null }

            { !this.state.information ? <div className='bsell-modal-content'>
              <h6>{pair}</h6>
              <p>{this.state.errorMessage}</p>
              <ul className="info-list">
                <li style={{height: "50px", marginBottom: "2em"}}>
                  <span className="text-success">
                    <button className="btn btn-sell _active" id="btnSell" onClick={(e) => this.btnBsell("btnSell", "btnBuy")}>SELL</button>
                    <button className="btn btn-buy" id="btnBuy" onClick={(e) => this.btnBsell("btnBuy", "btnSell")}>BUY</button>
                  </span>
                  <span style={{paddingTop: "1em"}}>Current Price:&nbsp;
                    <font className="text-success" id="btnSell-price">{app.floatFormat(sell)}</font>
                    <font className="text-success" id="btnBuy-price">{app.floatFormat(buy)}</font>
                  </span>
                </li>
              </ul>
              <p>Volume (lots)</p>
              <p className="mt1 nolot" style={{position: "relative"}}>
                <input type="number" id="vlv" placeholder="0.01" defaultValue={this.state.volume} onKeyUp={this.changeVolume} />
                <img src={upVlv} className="uvlv" onClick={(e) => this.vlvChange("up")} />
                <img src={downVlv} className="dvlv" onClick={(e) => this.vlvChange("down")} />
              </p>
              <ul className="info-list">
                <li className=""><span className="text-success">Pip Value:</span><span className="text-success">{this.state.pip_str} $</span></li>
                <li className=""><span className="text-success">{this.state.volume} lots:</span><span className="text-success">{this.state.lot_str} {this.props.type.toLowerCase() == "forex" ? this.state.base1 : "units"}</span></li>
                <li className=""><span className="text-success">Required Margin:</span><span className="text-success">{this.state.required_margin_str} USD</span></li>
                <li className=""><span className="text-success">Commission:</span><span className="text-success">{Number((Number(info.commission) / 100) * this.state.required_margin_str)} USD</span></li>
              </ul>
              <div className="phr">
                <span>
                  Set stop loss
                  <label className="switch"><input type="checkbox" id="stop_loss" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <p className="stop_loss">
                      <input type="number" placeholder="0.01" className={"stl_val"+(isBuy ? "" : " hide")} id="stl_val_1" defaultValue={stl} data-valu={stl} data-rate={crate} />
                      <input type="number" placeholder="0.01" className={"stl_val"+(isBuy ? " hide" : "")} id="stl_val_0" defaultValue={tkp} data-valu={tkp} data-rate={crate} />
                      {/*<img src={upVlv} className="uvlv" id="vlv_0" onClick={(e) => { this._vlvChange("up", 0); }} />
                      <img src={downVlv} className="dvlv" id="vlv_0" onClick={(e) => { this._vlvChange("down", 0); }} />*/}
                    </p>
                    <small className="">Estimated Price</small>
                    <input className="num" type="text" readOnly placeholder="" value={estl} />
                  </span>
                </span>
                <span>
                  Only buy/sell when <label className="switch"><input type="checkbox" id="only_buy_when" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <p className="trade_when">
                      <input type="number" className={"only_buy_when_actual for-sell"+(this.state.mode == "sell" ? "" : " hide")} defaultValue={sell_when} />
                      <input type="number" className={"only_buy_when_actual for-buy"+(this.state.mode == "buy" ? "" : " hide")} defaultValue={buy_when} />
                    </p>
                  </span>
                </span>
                <span>
                  Set take profit <label className="switch"><input type="checkbox"id="take_profit" onChange={this.handleChange} /><span className="slider round"></span></label>
                  <span className="switch-ctxt hide">
                    <p className="take_profit">
                      <input type="number" placeholder="0.01" className={"tkp_val"+(isBuy ? "" : " hide")} id="tkp_val_1" defaultValue={tkp} data-valu={tkp} data-rate={crate} />
                      <input type="number" placeholder="0.01" className={"tkp_val"+(isBuy ? " hide" : "")} id="tkp_val_0" defaultValue={stl} data-valu={stl} data-rate={crate} />
                      {/*<img src={upVlv} className="uvlv" id="vlv_1" onClick={(e) => { this._vlvChange("up", 1); }} />
                      <img src={downVlv} className="dvlv" id="vlv_1" onClick={(e) => { this._vlvChange("down", 1); }} />*/}
                    </p>
                    <small className="">Estimated Price</small>
                    <input className="num" type="text" readOnly placeholder="" value={etkp} />
                  </span>
                </span>
              </div>
              <p align="center">
                <button className="btn place_order _active" id="btnSell-order"  disabled={!analysis} style={analysis ? {opacity: 1} : {opacity: 0.6}} onClick={this.placeOrder}>{ analysis ? null : <img src={loader} style={{width: "16px", marginRight: "5px"}} /> }Place Sell Order</button>
                <button className="btn place_order" id="btnBuy-order" disabled={!analysis} style={analysis ? {opacity: 1} : {opacity: 0.6}} onClick={this.placeOrder}>{ analysis ? null : <img src={loader} style={{width: "16px", marginRight: "5px"}} /> }Place Buy Order</button>
              </p>
            </div> : null }
          </div>
        </div>
        <Spinner showSpinner={this.state.showSpinner} />
      </div>
      <Insufficient show={this.state.showInssufficient} cancel={(e) => this.setState({showInssufficient: false})} />
    </>
    );
  };
}

export default BuyandsellModal;
