import React, { Component } from 'react';
import './index.scss';
import $ from 'jquery';
import CancelIcon from '../../themes/images/cancel.svg';
import CancelImage from '../../themes/images/cancel.png';
import arrowBuyIcon from '../../themes/images/arrow-buy.png';
import arrowSellIcon from '../../themes/images/arrow-sell.png';
import upVlv from '../../themes/images/up.png';
import downVlv from '../../themes/images/down.png';
import server from '../../services/server';
import app from '../../services/app';


class Assign extends Component {
  constructor(props) {

    super(props);

    this.state = {
      errorMessage: '',
      active: true
    };

  }

  popupOut = (e) => {
    if($(e.target).hasClass("overlay") && $(e.target).hasClass("ass")) {
      $(e.target).find(".modal-cancel").click();
    }
  }

  componentDidMount () {

  }

  btnSave = async () => {
    let aid = $("#assaid").val();
    try {
      let ass = await server.assignAdmin(this.props.data.user_id, aid);
      this.props.cancel();
      window.location.href = "";
    } catch (e) {
      return e;
    }
  }

  render () {
    const { cancel, data, admins } = this.props;
    const { active } = this.state;
    let assto = "an account manager at this moment";

    if(data.aid.length) {
      assto = admins.filter((o) => {
        return o.user_id == data.aid
      })[0];
      assto = (<strong>{(assto.first_name+" "+assto.last_name).ucwords()}</strong>);
    }

    return (
      <div className='overlay ass' onClick={this.popupOut}>
        <div className='modal-section'>
          <div className='bsell-modal'>
            <img src={CancelImage} alt='' className='modal-cancel' onClick={cancel} />
            <div className='bsell-modal-content'>

              <ul className="imarket">
                <li className={active ? '_active' : ''} onClick={() => this.setState({active: true})}><span>Assign</span></li>
                <li className={active ? '' : '_active'} onClick={() => this.setState({active: false})}><span>Re-assign</span></li>
              </ul>

              {(this.state.active && !data.aid.length) || (!this.state.active && data.aid.length) ?
                <p className="inps" style={{marginTop: "5px"}}>
                  <span><b>User ID</b>:&nbsp;&nbsp;&nbsp;{app.uid(data.user_id)}</span>
                  <span><b>Name</b>:&nbsp;&nbsp;&nbsp;{data.first_name+" "+data.last_name}</span>
                  <span><b>Phone</b>:&nbsp;&nbsp;&nbsp;{data.phone_number}</span>
                  <span><b>Email</b>:&nbsp;&nbsp;&nbsp;{data.email}</span>

                  <br />
                  <br />

                  <span><b>Admin</b>: 
                    <select className="sel" id="assaid">
                    {admins.map((option) => (
                      <option key={`${option.user_id}-1`} value={option.user_id}>
                        {(option.first_name+" "+option.last_name).ucwords()}
                      </option>
                    ))}
                    </select>
                  </span>

                  <br />
                  <br />
                  
                  <span><b>Restrictions:</b></span>
                  <span>
                    <div className="check-row">Edit Profile <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                    <div className="check-row">Accounts <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                    <div className="check-row">Payments <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                  </span>
                  <span>
                    <div className="check-row">Trading Activity <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                    <div className="check-row">Files <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                    <div className="check-row">Notes <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                  </span>
                  <span>
                    <div className="check-row">Calls <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                    <div className="check-row">Emails <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                    <div className="check-row">Tasks <label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
                  </span>

                  {this.state.errorMessage.length ? <span className='err'>{this.state.errorMessage}</span> : null}

                  <button className="sacc" onClick={this.btnSave}>Assign</button>
                </p>
                : <p className="inps txt-success" style={{marginTop: "5px"}}>
                Sorry <strong>{(data.first_name+" "+data.last_name).ucwords()}</strong> {!this.state.active ? "has not been" : "has been"} asssigned to {assto}. Please click <strong onClick={() => this.setState({active: !this.state.active})} style={{cursor: "pointer"}}>here</strong> to {!this.state.active ? "" : "re-"}assign user.
                </p>
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Assign;