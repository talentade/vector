import React, { Component } from 'react';
import app from '../../services/app';
import Container from '../container/index';
import $ from 'jquery';
import './index.scss';

class CanvasJSChart extends Component {
	static _cjsContainerId = 0
	constructor(props) {		
		super(props);
	}
	componentDidMount() {
		var CanvasJS = require('./canvasjs.min.js');
		CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;

		const options = {
			theme: "dark1",
			animationEnabled: true,
			// title:{
			// 	text: "Units Sold VS Profit"
			// },
			// subtitles: [{
			// 	text: "Click Legend to Hide or Unhide Data Series"
			// }],
			// axisX: {
			// 	title: "States"
			// },
			axisY: {
				// title: "Units Sold",
				// titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#6D78AD",
				tickColor: "#6D78AD"
			},
			axisY2: {
				// title: "Profit in USD",
				// titleFontColor: "#51CDA0",
				lineColor: "#51CDA0",
				labelFontColor: "#51CDA0",
				tickColor: "#51CDA0"
			},
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "Units Sold",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "#,##0 Units",
				dataPoints: [
					{ x: new Date(2017, 0, 1), y: 120 },
					{ x: new Date(2017, 1, 1), y: 135 },
					{ x: new Date(2017, 2, 1), y: 144 },
					{ x: new Date(2017, 3, 1), y: 103 },
					{ x: new Date(2017, 4, 1), y: 93 },
					{ x: new Date(2017, 5, 1), y: 129 },
					{ x: new Date(2017, 6, 1), y: 143 },
					{ x: new Date(2017, 7, 1), y: 156 },
					{ x: new Date(2017, 8, 1), y: 122 },
					{ x: new Date(2017, 9, 1), y: 106 },
					{ x: new Date(2017, 10, 1), y: 137 },
					{ x: new Date(2017, 11, 1), y: 142 }
				]
			},
			{
				type: "spline",
				name: "Profit",
				axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: [
					{ x: new Date(2017, 0, 1), y: 19034.5 },
					{ x: new Date(2017, 1, 1), y: 20015 },
					{ x: new Date(2017, 2, 1), y: 27342 },
					{ x: new Date(2017, 3, 1), y: 20088 },
					{ x: new Date(2017, 4, 1), y: 20234 },
					{ x: new Date(2017, 5, 1), y: 29034 },
					{ x: new Date(2017, 6, 1), y: 30487 },
					{ x: new Date(2017, 7, 1), y: 32523 },
					{ x: new Date(2017, 8, 1), y: 20234 },
					{ x: new Date(2017, 9, 1), y: 27234 },
					{ x: new Date(2017, 10, 1), y: 33548 },
					{ x: new Date(2017, 11, 1), y: 32534 }
				]
			}]
		};

		var chart = new CanvasJS.Chart("chartContainer", options);
		chart.render();
		// $("#chartContainer").removeClass("full-width");
		setTimeout(() => {
			// $("#chartContainer").addClass("full-width");
			$("#chartContainer .canvasjs-chart-canvas").css("width", "calc(100% - 5em)");
			$(".top-nav").css("background", "#004044");
			$(".right.smaller-right").css("background", "#2a2a2a");
		}, 100);
	}
	render() {
		return (
	      <Container>
	      	<div id="chartContainer" className="full-width" style={{height: "370px", margin: "2em", border: '1px solid #006066'}}></div>
			{/*<div id = {this.chartContainerId} style = {this.containerProps} />*/}
	      </Container>
	    )
	}	
}
export default CanvasJSChart;