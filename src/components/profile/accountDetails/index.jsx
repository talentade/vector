import React, { Component } from 'react';
import "./index.scss";
import server from '../../../services/server';
import Information from '../information/index';

export default class AccountDetails extends Component {
    constructor(props) {
    super(props);

    this.state = {
      details: [],
      addCard: false
    }
  }

  componentDidMount () {
    // { handleClick, details}
    // const { account_name, account_number, bank_name, bank_address, bank_SWIFT_code, bank_IBAN } = details[0];

    let details = this.props.details;
    if(!details.length) {
      details = [{account_name: "", account_number: "", bank_name: "", bank_address: "", bank_SWIFT_code: "", bank_IBAN: ""}];
    }
    this.setState({details: details});
  }

  handleChange = (ind, field, val) => {
    let details = this.state.details;
    details[ind][field] = val;
    this.setState({details: details});
  }

  saveDetails = async (e, ind) => {
    e.preventDefault();
    try {
      let result = await server.addBankingDetails(this.state.details[ind]);
      const { data: { data: { profile } } } = await server.getProfile();
      localStorage.setItem('profile', JSON.stringify(profile));
      console.log(result, ind, this.state.details[ind]);
    } catch (err) {
      return err;
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
            <div className='user-information-section'>
              <Information dataKey="ACCCOUNT NAME"    value={det.account_name} handleChange={this.handleChange} index={ind} field="account_name" alt/>
              <Information dataKey="ACCOUNT NUMBER"   value={det.account_number} handleChange={this.handleChange} index={ind} field="account_number" alt/>
              <Information dataKey="BANK NAME"        value={det.bank_name} handleChange={this.handleChange} index={ind} field="bank_name" alt/>
              <Information dataKey="BANK ADDRESS"     value={det.bank_address} handleChange={this.handleChange} index={ind} field="bank_address" alt/>
              <Information dataKey="BANK SWIFT CODE"  value={det.bank_SWIFT_code} handleChange={this.handleChange} index={ind} field="bank_SWIFT_code" alt/>
              <Information dataKey="BANK IBAN"        value={det.bank_IBAN} handleChange={this.handleChange} index={ind} field="bank_IBAN" alt/>
            </div>
            <p align="center">
              <button onClick={(e) => this.saveDetails(e, ind)} type="button">Save Changes</button>
            </p>
          </>
        )) : (null)}

      </div>
    </div>
  );
};

}
