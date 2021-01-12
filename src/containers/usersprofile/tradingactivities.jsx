import React, { Component } from 'react';
import $ from 'jquery';
import TableFilters from '../../components/tablefilters/index';
import TradeHistory from '../../components/tradeHistory/index';
import ai_n from '../../themes/images/ai-normal.png';
import ai_b from '../../themes/images/ai-bookmark.png';
import './tradingactivities.scss';
import '../../components/standard/table.scss';

class TradingActivities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: ["ALL TYPES", "FOREX", "CRYPTO", "STOCK", "COMMODITIES", "INDICES"],
      trade: this.props.trade,
      type: 1,
      page_no: 1,
      filterPair: '',
      filterType: ''
    }
  }

  async componentDidMount () {

    $(window).on("refreshMod", () => {
      window.showCallback = false;
      this.props.refresh();
    })
  }

  changeType = (e) => {
    this.setState({type: parseInt(e.target.value)});
  }

  handleChange = (e) => {
    this.setState({filterPair: e.target.value.trim().toLowerCase(), page_no: 1});
  }

  onChange = (e) => {
    this.setState({filterType: e.target.value.split(" ")[0].trim().toLowerCase(), page_no: 1});
  }

  render () {
    let type   = parseInt(this.state.type);
    let trade  = this.state.trade.filter((p) => parseInt(p.order_status) === type);

  	return (
      <div className="tab-row profile-trading _active" id="tab-row-trading">
        
        <TableFilters
          table="trade"
          filterOptions={this.state.filterOptions}
          handleChange={this.handleChange}
          changeType={this.changeType}
          onChange={this.onChange}
        />

        <TradeHistory
          admin={true}
          type={["pending", "open", "closed"][type]}
          filterPair={this.state.filterPair}
          filterType={this.state.filterType}
          page_no={this.state.page_no}
          userprofile={true}
          history={trade}
        />
      </div>
	 )
	}

}

export default TradingActivities;