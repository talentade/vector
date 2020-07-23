import React, { Component } from 'react';
import "./index.scss";
import Information from '../information/index';

export default class AccountDetails extends Component {
    constructor(props) {
    super(props);

    this.state = {
      details: []
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
    console.log(details);
  }

  saveDetails () {
    
  }

  render () {
  return (
    <div className="account-details" style={{marginTop: "2em"}}>
      <div className="account-info">
        <div className="wallet-section" style={{justifyContent: "space-between"}}>
          <h4>Banking Details</h4>
          {/*<button>Add Bank Details</button>*/}
        </div>

        {this.state.details.map((det, ind) => (
          <div className='user-information-section'>
            <Information dataKey="ACCCOUNT NAME"    value={det.account_name} editable="false" handleChange={this.handleChange} index={ind} field="account_name" alt/>
            <Information dataKey="ACCOUNT NUMBER"   value={det.account_number} editable="false" handleChange={this.handleChange} index={ind} field="account_number" alt/>
            <Information dataKey="BANK NAME"        value={det.bank_name} editable="false" handleChange={this.handleChange} index={ind} field="bank_name" alt/>
            <Information dataKey="BANK ADDRESS"     value={det.bank_address} editable="false" handleChange={this.handleChange} index={ind} field="bank_address" alt/>
            <Information dataKey="BANK SWIFT CODE"  value={det.bank_SWIFT_code} editable="false" handleChange={this.handleChange} index={ind} field="bank_SWIFT_code" alt/>
            <Information dataKey="BANK IBAN"        value={det.bank_IBAN} editable="false" handleChange={this.handleChange} index={ind} field="bank_IBAN" alt/>
          </div>
        ))}

        <p align="center">
          <button onClick={this.save}>Save Changes</button>
        </p>
      </div>
    </div>
  );
};

}