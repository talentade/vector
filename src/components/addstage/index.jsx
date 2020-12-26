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

class AddStage extends Component {
  constructor(props) {

    super(props);

    this.state = {
      errorMessage: ''
    };

  }

  popupOut = (e) => {
    if($(e.target).hasClass("overlay") && $(e.target).hasClass("fun")) {
      $(e.target).find(".modal-cancel").click();
    }
  }

  componentDidMount () {

  }

  btnSave = async () => {

    let fid  = $("#tr-fid").val();
    let name = $("#tr-name").val();
    let code = $("#tr-code").val();

    if(name.length && code.length) {
      try {
        this.setState({errorMessage: ""});
        let sf = await server.newStage({fid: fid, stage: name, code: code});
        this.props.cancel();
        window.location.href = "";
      } catch (e) {
        return e;
      }
    } else {
      this.setState({errorMessage: "Please fill both fields"});
    }

  }

  render () {
    const { cancel, funnels, sid } = this.props;
    return (
      <div className='overlay fun' onClick={this.popupOut}>
        <div className='modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancel} />
            <div className='bsell-modal-content'>
              <h6 align="center">Add new funnel stage</h6>
              <p className="inps" style={{marginTop: "5px"}}>
                <label>Select Funnel</label>
                <select className="accs" id="tr-fid" value={sid}>
                  {
                    funnels.map((f) => (
                      <option value={f.id} key={f.id}>{f.funnel}</option>
                    ))
                  }
                </select>
                <label>Funnel Stage Name</label>
                <input className="accs" id="tr-name" type="text" />
                <label>Color code</label>
                <input className="accs" id="tr-code" type="text" />

                {this.state.errorMessage.length ? <span className='err'>{this.state.errorMessage}</span> : null}

                <button className="sacc" onClick={this.btnSave}>Add Stage</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default AddStage;