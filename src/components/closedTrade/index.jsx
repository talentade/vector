import React, { Component } from 'react';
import server from '../../services/server';
import TradeHistory from '../tradeHistory/index';

class ClosedTrade extends Component {
  constructor(props) {
    
    super(props);
    this.state = {}

  }

  async componentDidMount () {}
  
  componentWillUnmount() {}

  render () {
    const { type, filterOptions, history } = this.props;
    return (
      <TradeHistory type="closed" filterOptions={filterOptions} history={history} />
    );
};
}

export default ClosedTrade;