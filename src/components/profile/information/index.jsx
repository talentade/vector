import React, { Component } from 'react';
import EditLogo from "../../../themes/images/tradeDashboard/edit.svg";
import "./index.scss";

export default class UserInfo extends Component {
  	constructor(props) {
		super(props);

		this.state = {
			editable: this.props.editable,
			value: this.props.value
		}
	}

	toggleEdit = (e) => {
	 	this.setState({ editable: !this.state.editable });
	}

	handleChange = (e) => {
		this.setState({value : e.target.value});
	 	if(this.props["alt"]) {
			this.props.handleChange(this.props.index, this.props.field, e.target.value);
		}
	}

	render () {
	  const { dataKey, alt } = this.props;

	  let editable = this.state.editable;
	  let value = this.state.value;

	  return (
	    <div className={"information"+(alt ? ' alt' : '')}>
	      <p className="key">{dataKey}</p>
	      <div>
	        <p className="value">{!editable ? <input className="data-value" spellcheck="false" onChange={this.handleChange} defaultValue={value} autoFocus /> : value}</p>
	        <img src={EditLogo} alt="" style={{cursor: "pointer", opacity: editable ? '1' : '0.3'}} onClick={(e) => this.toggleEdit()} />
	      </div>
	    </div>
	  );
	}
}