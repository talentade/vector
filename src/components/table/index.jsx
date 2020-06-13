import React, { Component } from "react";
import "./index.scss";
import UpArrow from "../../themes/images/tradeDashboard/up.svg";
import TableRow from "../tableRow/index";

class Table extends Component {

  render() {
    const { theaderData, tbodyData } = this.props;

    return (
      <div className="table">
        <div className="header-row">
          {theaderData.map((data) => (
            <div key={`${data}-${Math.random() * 1000000}`}>{data}</div>
          ))}
        </div>
        {tbodyData.map((data, idx) => (
          <div className="table-container" label={idx} id={idx} key={`${Math.random() * 100000}-w`}>
            <a href={`#${idx}`}><img
              src={UpArrow} alt=""
            /></a>
            <div key={`${data.time}-1`} className="body-row">
              <TableRow
                textLabel="INSTRUMENT"
                data={data.instrument}
                classOne="hide-desktop"
              />
              <TableRow
                textLabel="TYPE"
                className="sub-menu"
                classOne="hide-desktop"
                data={data.type}
              />

              <div className="mv-left sub-menu">
                <p className="hide-desktop">TIME</p>
                <div>
                  <p>{`${data.time.split(" ")[0]}`}</p>
                  <p className="l-gold">{`${data.time.split(" ")[1]}`}</p>
                </div>
              </div>
              <TableRow
                classOne="hide-desktop"
                className="sub-menu"
                classTwo="order-piece"
                data={data.orderPiece}
                textLabel="ORDER PRICE"
              />
              <TableRow
                classOne="hide-desktop"
                className="sub-menu"
                classTwo="order-rate"
                data={data.orderRate}
                textLabel="ORDER RATE"
              />
              <TableRow
                classOne="hide-desktop"
                className="sub-menu"
                textLabel="S/L"
                data={data.sl}
              />
              <TableRow
                classOne="hide-desktop"
                className="sub-menu"
                textLabel="T/P"
                data={data.tp}
              />
              {data.closeRate ? (
                <TableRow
                  classOne="hide-desktop"
                  className="sub-menu"
                  textLabel="CLOSE RATE"
                  data={data.closeRate}
                  classTwo="close-rate"
                />
              ) : null}

              {data.closePrice ? (
                <TableRow
                  classOne="hide-desktop"
                  className="sub-menu"
                  textLabel="CLOSE PRICE"
                  data={data.closePrice}
                  classTwo="close-price"
                />
              ) : null}

              {data.currentRate ? (
                <TableRow
                  classOne="hide-desktop"
                  textLabel="CURRENT PRICE"
                  className="sub-menu"
                  data={data.currentRate}
                  classTwo="close-rate"
                />
              ) : null}

              {data.profit ? (
                <TableRow
                  classOne="hide-desktop"
                  className="sub-menu"
                  textLabel="PROFIT"
                  data={data.profit}
                />
              ) : null}

              {data.details ? (
                <div
                  className={data.detail === "Buy" ? "buy-color sub-menu " : "sell-color sub-menu"}
                >
                  <p className="hide-desktop white">DETAILS</p>
                  <p>{data.details}</p>
                </div>
              ) : null}

              {data.action ? (
                <TableRow
                  classOne="hide-desktop"
                  className="sub-menu"
                  textLabel="ACTION"
                  data={data.action}
                  classTwo="action-p"
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Table;
