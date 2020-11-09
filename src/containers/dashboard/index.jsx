import React, { Component } from 'react';
import app from '../../services/app';
import Container from '../container/index';
import dash0 from '../../themes/images/dash0.PNG';
import $ from 'jquery';
import './index.scss';

class CanvasJSChart extends Component {
	static _cjsContainerId = 0
	constructor(props) {		
		super(props);
	}
	componentDidMount() {
	}
	render() {
		return (
	      <Container>
	      	<img  className="full-width" src={dash0} />
	      </Container>
	    )
	}	
}
export default CanvasJSChart;