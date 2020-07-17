import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import us from '../../themes/images/flags/us.png';
import sa from '../../themes/images/flags/sa.png';

class InstrumentsTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
          <>

            <table border="0">
              <thead>
                <tr>
                  <th>CURRENCY PAIR</th>
                  <th>BUY</th>
                  <th>SELL</th>
                  <th>SPECIFIC RATE</th>
                  <th>HIGH</th>
                  <th>LOW</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
                <tr>
                  <td className="ins-td"><img src={us} className="flag"/><span className="td-ins">USD/ZAR</span><img src={sa} className="flag"/></td>
                  <td><span className="td-buy">1.3748</span></td>
                  <td><span className="td-sell">1.3748</span></td>
                  <td><span className="td-rate">1.3748</span></td>
                  <td><span className="td-high">1.0654</span></td>
                  <td><span className="td-low">1.0654</span></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <Pagination2 />
          </>
        );
  }
}

export default InstrumentsTable;