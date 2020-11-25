import React, { Component } from 'react';
import $ from 'jquery';
import EditLogo from "../../../themes/images/tradeDashboard/edit.svg";
import Verified from "../../../themes/images/tradeDashboard/verifiedOne.svg";

import "./index.scss";

export default class UserInfo extends Component {
  	constructor(props) {
		super(props);

		let editable = !!this.props.editable;
		if(typeof this.props.editable == "string") {
		  	editable = this.props.editable == "true";
		}
		this.state = {
			editable: editable,
			value: this.props.value
		}
	}

	toggleEdit = (e) => {
		$(e.target).parents(".ikvd").find(".data-value").focus();
	 	this.setState({ editable: !this.state.editable });
	}

	handleChange = (e) => {
		this.setState({value : e.target.value});
	 	if(this.props["alt"]) {
			this.props.handleChange(this.props.name, e.target.value);
		}
	}

	render () {
	  let { dataKey, value, alt, name, fixed } = this.props;
	  let editable = !!this.state.editable;
	  // let value = this.state.value;

	  return (
	    <div className={"information"+(alt ? ' alt' : '')}>
	      <p className="key">{dataKey}</p>
	      <div className="ikvd">
	        <p className="value"><input className="data-value" name={name} spellcheck="false" onChange={this.handleChange} defaultValue={value} /></p>
	        <img src={EditLogo} alt="" className={fixed ? "ed" : ""} style={{cursor: "pointer"}} onClick={(e) => !fixed&&this.toggleEdit(e)} />
	      </div>
	    </div>
	  );
	}
}
