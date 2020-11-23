import React, { Component } from 'react';
import server from '../../services/server';
import TradeHistory from '../tradeHistory/index';

class OpenTrade extends Component {
  constructor(props) {
    
    super(props);
    this.state = {}

  }

  async componentDidMount () {}
  
  componentWillUnmount() {}

  render () {
    const { type, filterOptions, admin, history } = this.props;
    return (
      <TradeHistory type="open" filterOptions={filterOptions} admin={admin} history={history} />
    );
};
}

export default OpenTrade;
