import React, { Component } from 'react';
import app from '../../services/app';
import Container from '../container/index';
import calendar from "../../themes/images/calendar-search.png";
import dash0 from '../../themes/images/dash0.PNG';
import $ from 'jquery';
import moment from 'moment';
import './canvasjs.min.js';
import './utils.js';
import './analyser.js';
import './index.scss';



class Dashboard extends Component {
	constructor(props) {		
		super(props);
	}
	componentDidMount() {
		var presets = window.chartColors;
		var utils = window.Samples.utils;
		var inputs = {
			min: -100,
			max: 100,
			count: 8,
			decimals: 2,
			continuity: 1
		};

		function generateData(config) {
			return utils.numbers(Chart.helpers.merge(inputs, config || {}));
		}

		function generateLabels(config) {
			return utils.months(Chart.helpers.merge({
				count: inputs.count,
				section: 3
			}, config || {}));
		}

		var options = {
			maintainAspectRatio: false,
			spanGaps: false,
			elements: {
				line: {
					tension: 0.4
				}
			},
			plugins: {
				filler: {
					propagate: false
				}
			},
			scales: {
				xAxes: [{
					display: false,
					ticks: {
						autoSkip: false,
						maxRotation: 0
					}
				}],
				yAxes: [{
					display: false
				}]
			}
		};

		utils.srand(8);

		new Chart('canvas', {
			type: 'line',
			data: {
				labels: generateLabels(),
				datasets: [{
					backgroundColor: utils.transparentize(presets.yellow),
					borderColor: presets.yellow,
					data: generateData(),
					label: 'Trades',
					fill: 'start'
				}]
			},
			options: Chart.helpers.merge(options, {
				title: {
					text: '',
					display: false
				},
				elements: {
					line: {
						tension : 0.4
					}
				}
			})
		});

		// eslint-disable-next-line no-unused-vars
		function randomize() {
			var seed = utils.rand();
			Chart.helpers.each(Chart.instances, function(chart) {
				utils.srand(seed);

				chart.data.datasets.forEach(function(dataset) {
					dataset.data = generateData();
				});

				chart.update();
			});
		}
















		var lineChartData = {
			labels: ['', '', '', '', '', '', ''],
			datasets: [{
				label: 'Online',
				borderColor: window.chartColors.green,
				backgroundColor: window.chartColors.green,
				fill: true,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID: 'y-axis-1',
			}, {
				label: 'Offline',
				borderColor: window.chartColors.red,
				backgroundColor: window.chartColors.red,
				fill: true,
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor()
				],
				yAxisID: 'y-axis-2'
			}]
		};

		var ctx = document.getElementById('ooff').getContext('2d');
		window.myLine = Chart.Line(ctx, {
			data: lineChartData,
			options: {
				responsive: true,
				hoverMode: 'index',
				stacked: false,
				title: {
					display: false,
					text: 'Chart.js Line Chart - Multi Axis'
				},
				scales: {
					yAxes: [{
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: false,
						position: 'left',
						id: 'y-axis-1',
					}, {
						type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: false,
						position: 'right',
						id: 'y-axis-2',

						// grid line settings
						gridLines: {
							drawOnChartArea: false, // only want the grid lines for one axis to show up
						},
					}],
				}
			}
		});


		function randomScalingFactor () {
			return Math.round(Math.random() * 100);
		};

		var config = {
			type: 'pie',
			data: {
				datasets: [{
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
					backgroundColor: [
						window.chartColors.red,
						window.chartColors.orange,
						window.chartColors.yellow,
						window.chartColors.green,
						window.chartColors.blue,
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Red',
					'Orange',
					'Yellow',
					'Green',
					'Blue'
				]
			},
			options: {
				responsive: true
			}
		};
		var ctx = document.getElementById('chart-area').getContext('2d');
		window.myPie = new Chart(ctx, config);

	}
	render() {
		return (
	      <Container>
		      <div className="col-12" id="dash-container">

				
				<div className="can-tab">
					<ul>
						<li>Transactions</li>
						<li>Users</li>
						<li>Sales</li>
						<li>Leads</li>
						<li className="active">Trades</li>
					</ul>
				</div>

				<div id="mcanvas">
					<img src={calendar} className="cdar" />
					<canvas id="canvas"></canvas>
				</div>

				<div id="section-2">
					<div className="mcan-1">
						<img src={calendar} className="cdar" />
						<canvas id="ooff"></canvas>
					</div>
					<div className="mcan-2">
						<img src={calendar} className="cdar" />
						<canvas id="chart-area"></canvas>
					</div>
				</div>
				
				{/*
					<br />
					<br />
					<button id="randomizeData">Randomize Data</button>
					<button id="addDataset">Add Dataset</button>
					<button id="removeDataset">Remove Dataset</button>
					<button id="addData">Add Data</button>
					<button id="removeData">Remove Data</button>
				*/}
			</div>
	      </Container>
	    )
	}
}
export default Dashboard;