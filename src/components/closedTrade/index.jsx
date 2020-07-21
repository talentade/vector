import React, { Component } from 'react';
import server from '../../services/server';
import TradeHistory from '../tradeHistory/index';

class OpenTrade extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: []
    }
    this.realTimeListener = true;
  }

  async componentDidMount () {
    this.realTimeListener = true;
    this.getHistory();
  }

  componentWillUnmount () {
    this.realTimeListener = false;
  }

  getHistory = async () => {
    setInterval(async () => {
      if(this.realTimeListener) {
        try {
          const { data : { data: { results } } } = await server.tradeHistory("closed", 10, 1);
          if(results) {
            if(results.length) {
              this.setState({history: results});
            }
          }
        } catch (error) {
          return error;
        }
      }
    }, 3000);
  }

  render () {
    const { type, filterOptions } = this.props;
    return (
      <TradeHistory type="closed" filterOptions={filterOptions} history={this.state.history}/>
    );
};
}

export default OpenTrade;
