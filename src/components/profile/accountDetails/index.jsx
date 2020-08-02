import React, { Component } from 'react';
import "./index.scss";
import server from '../../../services/server';
import Information from '../information/index';

export default class AccountDetails extends Component {
    constructor(props) {
    super(props);

    this.state = {
      details: [],
      detailID: 0,
      addCard: true
    }
  }

  componentDidMount () {
    let details = this.props.details;
    if(!details.length) {
      details = [{account_name: "", account_number: "", bank_name: "", bank_address: "", bank_SWIFT_code: "", bank_IBAN: ""}];
    } else {
      // console.log(details);
    }
    this.setState({details: details});
  }

  handleChange = (ind, field, val) => {
    let details = this.state.details;
    details[ind][field] = val;
    this.setState({details: details});
  }

  saveDetails = async (e, ind, aid = undefined) => {
    e.preventDefault();
    this.props.showSpinner();
    try {
      let result = this.state.detailID > 0 ? await server.setBankingDetails(aid ? aid : this.state.detailID, this.state.details[ind]) : await server.addBankingDetails(this.state.details[ind]);
      const { data: { data: { profile } } } = await server.getProfile();
      localStorage.setItem('profile', JSON.stringify(profile));
      this.props.showSpinner();
      window.location.href = "";
    } catch (err) {
      this.props.showSpinner();
      return err;
    }
  }

  setId = (id) => {
    if(this.state.detailID == 0 && id && id > 0) {
      this.setState({detailID: id});
    }
  }

  render () {
    const { addCard, details } = this.state;
    return (
    <div className="account-details" style={{marginTop: "2em"}}>
      <div className="account-info">
        <div className="wallet-section" style={{justifyContent: "space-between"}}>
          <h4>Banking Details</h4>
          { this.state.addCard ? (null) : <button onClick={(e) => this.setState({addCard: !this.state.addCard})}>Add Bank Details</button> }
        </div>
        {addCard ? details.map((det, ind) => (
          <>
            {det.id ? this.setId(det.id) : null}
            <div className='user-information-section'>
              <Information dataKey="ACCOUNT NAME"     value={det.account_name} handleChange={this.handleChange} index={ind} field="account_name"        editable={det.id ? "true" : "false"} alt/>
              <Information dataKey="ACCOUNT NUMBER"   value={det.account_number} handleChange={this.handleChange} index={ind} field="account_number"    editable={det.id ? "true" : "false"} alt/>
              <Information dataKey="BANK NAME"        value={det.bank_name} handleChange={this.handleChange} index={ind} field="bank_name"              editable={det.id ? "true" : "false"} alt/>
              <Information dataKey="BANK ADDRESS"     value={det.bank_address} handleChange={this.handleChange} index={ind} field="bank_address"        editable={det.id ? "true" : "false"} alt/>
              <Information dataKey="BANK SWIFT CODE"  value={det.bank_SWIFT_code} handleChange={this.handleChange} index={ind} field="bank_SWIFT_code"  editable={det.id ? "true" : "false"} alt/>
              <Information dataKey="BANK IBAN"        value={det.bank_IBAN} handleChange={this.handleChange} index={ind} field="bank_IBAN"              editable={det.id ? "true" : "false"} alt/>
            </div>
            <p align="center">
              <button onClick={(e) => this.saveDetails(e, ind, det.id)} type="button">Save{det.id ? ' Changes' : ''}</button>
            </p>
          </>
        )) : (null)}

      </div>
    </div>
  );
};

}
