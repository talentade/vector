import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  favouritePairs,
  balanceItemData,
  marginData,
} from "../../utils/dummyData";
import SideBar from "../../components/sideBar2/index";
import Balance from "../../components/balance/index";
import Demo from "../../components/demo/index";
import Margin from "../../components/margin/index";
import Favourites from "../../components/favourites/index";
import TradeSection from "../../components/tradesSection/index";
import Trade from "../../components/chart/index";
import {
  theaderDataClosed,
  tbodyDataClosed,
  tbodyDataOpen,
  theaderDataOpen,
} from "../../utils/dummyData";
import "./index.scss";

class Dashboard1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
    };
  }

  toggleSideBar = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <Router>
        <div className="trade-section">
          <SideBar
            clickHandler={this.toggleSideBar}
            hideText={this.state.clicked}
          />
          <div
            className="right"
            style={{ width: this.state.clicked ? "calc(100% - 50px)" : null }}
          >
            <div className="trade-comp-container">
              <div className="trade-overview-row">
                <div className="balance-margin">
                  <div className="balance-demo">
                    <Balance
                      balance="$106,273.05"
                      balanceItemData={balanceItemData}
                    />
                    <Demo demoOptions={["Demo-67568666889"]} />
                  </div>
                  <div className="margin-stuff">
                    {marginData.map((data) => (
                      <Margin {...data} />
                    ))}
                  </div>
                </div>
                <Favourites favouritePairs={favouritePairs} />
              </div>
            </div>
            <Switch>
              <Route path="/Dashboard/Trading/Trade" component={Trade} />
              <Route
                path="/Dashboard/Trading/ClosedTrades"
                component={() => (
                  <TradeSection
                    filterOptions={["All Types"]}
                    theaderData={theaderDataClosed}
                    tbodyData={tbodyDataClosed}
                    text="No Open Trades Found"
                  />
                )}
              />
              <Route
                path="/Dashboard/Trading/OpenTrades"
                component={() => (
                  <TradeSection
                    filterOptions={["All Types"]}
                    theaderData={theaderDataOpen}
                    tbodyData={tbodyDataOpen}
                    text="No Open Trades Found"
                  />
                )}
              />
              <Route
                path="/Dashboard/Trading/PendingTrades"
                component={() => (
                  <TradeSection
                    filterOptions={["All Types"]}
                    // theaderData={theaderDataOpen}
                    // tbodyData={tbodyDataOpen}
                    text="No Pending Trades Found"
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default Dashboard1;
