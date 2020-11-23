import React, { Component } from 'react';
import server from '../../services/server';
import TradeHistory from '../tradeHistory/index';

class PendingTrade extends Component {
  constructor(props) {
    
    super(props);
    this.state = {}

  }

  async componentDidMount () {}
  
  componentWillUnmount() {}

  render () {
    const { type, filterOptions, admin, history } = this.props;
    return (
      <TradeHistory type="pending" filterOptions={filterOptions} admin={admin} history={history} />
    );
};
}

export default PendingTrade;