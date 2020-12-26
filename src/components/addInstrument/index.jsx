import React, { Component } from 'react';
import './index.scss';
import $ from 'jquery';
import CancelIcon from '../../themes/images/cancel.svg';
import CancelImage from '../../themes/images/cancel.png';
import arrowBuyIcon from '../../themes/images/arrow-buy.png';
import arrowSellIcon from '../../themes/images/arrow-sell.png';
import upVlv from '../../themes/images/up.png';
import server from '../../services/server';
import downVlv from '../../themes/images/down.png';

class AddInstrument extends Component {
  constructor(props) {

    super(props);

    this.state = {
      loading: false,
      antiForex: true,
      errorMessage: '',
      forex: 0,
    };

  }

  popupOut = (e) => {
    if($(e.target).hasClass("overlay") && $(e.target).hasClass("ain")) {
      $(e.target).find(".modal-cancel").click();
    }
  }

  componentDidMount () {
    if(this.props.data) {
      this.setState({forex: this.props.data.type.toLowerCase() == "forex" ? 1 : 0});
    } else {
      this.setState({forex: 1});
    }
  }

  btnSave = async () => {
    let ain = {
      "name":     $("#i-name").val(),
      "symbol":   $("#i-symbol").val(),
      "com":      $("#i-com").val(),
      "lev":      $("#i-lev").val(),
      "type":     $("#i-type").val(),
      "cont":     $("#i-contract").val() || "",
      "pips":     $("#i-pip-size").val() || "",
      "pip":      $("#i-pip").val(),
      "min":      $("#i-min").val(),
      "max":      $("#i-max").val(),
      "short":    $("#i-short").val(),
      "long":     $("#i-long").val()
    }

    let err = 0, _val = "";
    Object.keys(ain).forEach((v, k) => {
      if(!ain[v].length) {
        if(
          (ain.type.toLowerCase() == "forex" && (v == "cont" || v == "lev"))
          || (v == "min") || (v == "max") || (v == "short") || (v == "long")
        ) {} else {
          err += 1;
          _val += v+", ";
        }
      }
    });

    if(err) {
      console.log(_val);
      return this.setState({errorMessage: "Please fill all necessary fields"});
    } this.setState({loading: true});

    // this.props.sending();
    try {
      const ai_n = this.props.data ? await server.updateInstrument(this.props.data.id, ain) : await server.addInstrument(ain);
      // this.props.unsending();
      if(ai_n.status == 200 && ai_n.data.success) {
        window.location.href = "";
      } else {
        this.setState({errorMessage: ai_n.data.message});
      }
    } catch (error) {
      // this.props.unsending();
      return error.message;
    }
    this.setState({loading: false});
  }

  cpip = (e) => {
    let v = e.target.value.toLowerCase();
    this.setState({forex: v == "forex" ? 1 : 0});
    if(v == "forex" || v == "crypto") {
      this.setState({antiForex: true});
    } else {
      this.setState({antiForex: false});
    }
  }

  render () {
    let antiForex;
    const { cancel, data } = this.props;

    if(data) {
      antiForex = data.type.toLowerCase() == "forex" || data.type.toLowerCase() == "crypto" ? true : false;
    } else {
      antiForex = this.state.antiForex;
    }

    return (
      <div className='overlay ain' onClick={this.popupOut}>
        <div className='modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancel} />
            <div className='bsell-modal-content'>
              <h6 align="center">{data ? "Edit" : "Add new"} Instrument</h6>
              <p className="inps" style={{marginTop: "5px"}}>
                <div className="i-col">
                  <label>Name<span className="requ">*</span></label>
                  <input className="" id="i-name" type="text" defaultValue={data ? data.name : ""}/>
                </div>
                <div className="i-col">
                  <label>Symbol(i.e. <b>AUD/USD</b>)<span className="requ">*</span></label>
                  <input className="" id="i-symbol" type="text" readOnly={!!data} defaultValue={data ? data.pair : ""}/>
                </div>
                <div className="i-col">
                  <label>Percentage Commission<span className="requ">*</span></label>
                  <input className="" id="i-com" type="text" defaultValue={data ? data.commission : ""}/>
                </div>
                <div className="i-col">
                  <label>Leverage{this.state.forex > 0 ? null : <span className="requ">*</span>}</label>
                  <input className="" id="i-lev" type="text" defaultValue={data ? data.leverage : ""}/>
                </div>
                <div className="i-col">
                  <label>Type<span className="requ">*</span></label>
                  <select className="select-box" id="i-type" onChange={this.cpip} defaultValue={data ? data.type.toUpperCase() : "FOREX"}>
                    <option>FOREX</option>
                    <option>CRYPTO</option>
                    <option>STOCK</option>
                    <option>COMMODITIES</option>
                    <option>INDICES</option>
                  </select>
                </div>
                <div className="i-col">
                  <label>Pip per <b>0.1</b> Volume (lots)<span className="requ">*</span></label>
                  <input className="" id="i-pip" type="text" defaultValue={data ? data.unit_per_lot : ""} />
                </div>
                {!antiForex
                   ?
                    <div className="i-col">
                      <label>Contract Size<span className="requ">*</span></label>
                      <input className="" id="i-contract" type="text" defaultValue={data ? data.contract : ""} />
                    </div>
                  : null
                }
                {!antiForex
                  ?
                    <div className="i-col">
                      <label>Units per <b>0.1</b> Volume (lots)<span className="requ">*</span></label>
                      <input className="" id="i-pip-size" type="text" defaultValue={data ? data.pip_size : ""} />
                    </div>
                  : null
                }
                <div className="i-col">
                  <label>MIN Volume</label>
                  <input className="" id="i-min" type="text" defaultValue={data ? data._min : ""} />
                </div>
                <div className="i-col">
                  <label>MAX Volume</label>
                  <input className="" id="i-max" type="text" defaultValue={data ? data._max : ""} />
                </div>
                <div className="i-col">
                  <label>Swap Long</label>
                  <input className="" id="i-short" type="text" defaultValue={data ? data._long : ""} />
                </div>
                <div className="i-col">
                  <label>Swap Short</label>
                  <input className="" id="i-long" type="text" defaultValue={data ? data._short : ""} />
                </div>

                {this.state.errorMessage.length ? <span className='err'>{this.state.errorMessage}</span> : null}

                {data ? <button disabled={this.state.loading} className="sacc" onClick={this.btnSave}>Update Instrument</button> : <button disabled={this.state.loading} className="sacc" onClick={this.btnSave}>Add Instrument</button>}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default AddInstrument;
