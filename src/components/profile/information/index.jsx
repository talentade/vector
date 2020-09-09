import React, { Component } from 'react';
import EditLogo from "../../../themes/images/tradeDashboard/edit.svg";
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
	 	this.setState({ editable: !this.state.editable });
	}

	handleChange = (e) => {
		this.setState({value : e.target.value});
	 	if(this.props["alt"]) {
			this.props.handleChange(this.props.name, e.target.value);
		}
	}

	render () {
	  const { dataKey, alt, fixed } = this.props;
	  let editable = !!this.state.editable;
	  let value = this.state.value;

	  return (
	    <div className={"information"+(alt ? ' alt' : '')}>
	      <p className="key">{dataKey}</p>
	      <div>
	        <p className="value">{!editable ? <input className="data-value" spellcheck="false" onChange={this.handleChange} defaultValue={value} /> : value}</p>
	        <img src={EditLogo} alt="" style={{cursor: "pointer", opacity: editable ? '1' : '0.3'}} onClick={(e) => !fixed&&this.toggleEdit()} />
	      </div>
	    </div>
	  );
	}
}
