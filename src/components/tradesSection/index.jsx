import React, { Component } from "react";
import Search from "../search/index";
import Filter from "../filter/index";
import Table from "../table/index";
import TradeNotFound from "../tradeNotFound/index";
import "./index.scss";

class Trades extends Component {
  render() {
    const { filterOptions, theaderData, tbodyData, text } = this.props;
    return (
      <div className="open-trades-container">
        <div className="open-trades-container-top">
          <Search name="keyword" placeholder="Search here" />
          <Filter selectOptions={filterOptions} />
        </div>
        <div className="open-trades-container-bottom">
          {theaderData && tbodyData ? (
            <Table theaderData={theaderData} tbodyData={tbodyData} />
          ) : (
            <TradeNotFound text={text} />
          )}
        </div>
      </div>
    );
  }
}

export default Trades;
