import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import us from '../../themes/images/flags/us.png';
import sa from '../../themes/images/flags/sa.png';
import server from '../../services/server';
import app from '../../services/app';

class InstrumentsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instruments: {forex: [], crypto: [], stock: [], commodities: [], indices: []}
    }
  }

  async componentDidMount() {
    this.getAllInstrument();
  }

  getAllInstrument = async () => {
    try {
      let data = await server.getAllInstrument();
      let keys = Object.keys(data.data);
      let rows = data.data;

      let pairs = [];
      let instruments = this.state.instruments;
      for(var i = 0; i < rows.length; i++) {
        let type = rows[i]["type"];
        instruments[type].push(rows[i]);
      }
      this.setState({instruments: instruments});
    } catch(e) {
      return e;
    }
  }

  render () {
    return (
        <>

            <table border="0" style={{marginBottom: "1em"}}>
              <thead>
                <tr>
                  <th>CURRENCY PAIR</th>
                  <th>BUY</th>
                  <th>SELL</th>
                  <th>MARKET PRICE</th>
                  <th>HIGH</th>
                  <th>LOW</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.state.instruments[this.props.active].map(({pair, ask, bid, high, low, price}) => (
                <tr key={`${Math.random()} ${Math.random()}`}>
                  <td className="ins-td">
                    {/*<img src={us} className="flag"/>*/}
                    <span className="td-ins">{pair}</span>
                    {/*<img src={sa} className="flag"/>*/}
                  </td>
                  <td><span className="td-buy">{ask}</span></td>
                  <td><span className="td-sell">{bid}</span></td>
                  <td><span className="td-rate">{price}</span></td>
                  <td><span className="td-high">{high}</span></td>
                  <td><span className="td-low">{low}</span></td>
                  <td></td>
                </tr>
              ))}
              </tbody>
            </table>
            {/*<Pagination2 />*/}
          </>
        );
  }
}

export default InstrumentsTable;