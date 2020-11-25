import React, { Component } from 'react';
import "./index.scss";
import app from '../../../services/app';
import server from '../../../services/server';
import Information from '../information/index';

export default class AccountDetails extends Component {
    constructor(props) {
    super(props);

    this.profile = app.profile();
    this.state = {
      account_name: this.profile["account_name"] || "",
      account_number: this.profile["account_number"] || "",
      bank_name: this.profile["bank_name"] || "",
      bank_address: this.profile["bank_address"] || "",
      bank_SWIFT_code: this.profile["bank_SWIFT_code"] || "",
      bank_IBAN: this.profile["bank_IBAN"] || "",
      saveD: false
    };
  }

  componentDidMount () {}

  handleChange = (name, val) => {
    this.setState({[name]: val, saveD: true});
  }

  saveDetails = async (e) => {
    e.preventDefault();
    this.props.showSpinner();
    try {
      let bd = this.state;
      delete bd.saveD;
      await server.setBankingDetails(bd);
      const gp = await server.getProfile();
      app.profile(gp.data.profile);
      this.props.showSpinner();
      this.props.done();
    } catch (err) {
      this.props.showSpinner();
      return err;
    }
  }

  render () {
    return (
    <div className="account-details" style={{marginTop: "2em"}}>
      <div className="account-info">
        <div className="wallet-section" style={{justifyContent: "space-between"}}>
          <h4>Banking Details</h4>
          {this.state.saveD ? <button onClick={this.saveDetails} type="button">Save Details</button> : null}
        </div>
        <div className='user-information-section'>
          <Information dataKey="ACCOUNT NAME"     value={this.state.account_name} handleChange={this.handleChange} name="account_name"        editable={this.state.account_name.length || false} alt/>
          <Information dataKey="ACCOUNT NUMBER"   value={this.state.account_number} handleChange={this.handleChange} name="account_number"    editable={this.state.account_number.length || false} alt/>
          <Information dataKey="BANK NAME"        value={this.state.bank_name} handleChange={this.handleChange} name="bank_name"              editable={this.state.bank_name.length || false} alt/>
          <Information dataKey="BANK ADDRESS"     value={this.state.bank_address} handleChange={this.handleChange} name="bank_address"        editable={this.state.bank_address.length || false} alt/>
          <Information dataKey="BANK SWIFT CODE"  value={this.state.bank_SWIFT_code} handleChange={this.handleChange} name="bank_SWIFT_code"  editable={this.state.bank_SWIFT_code.length || false} alt/>
          <Information dataKey="BANK IBAN"        value={this.state.bank_IBAN} handleChange={this.handleChange} name="bank_IBAN"              editable={this.state.bank_IBAN.length || false} alt/>
        </div>
      </div>
    </div>
  );
};

}
