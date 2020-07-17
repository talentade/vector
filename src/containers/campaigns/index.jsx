import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import btnPlus from "../../themes/images/btn-plus.png";
import TableFilters from '../../components/tablefilters/index';

import '../../components/standard/standard.scss';
import './index.scss';

class Campaigns extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navi: 0
    }

  }

  selectList = (e) => {

  }

  render() {
    const { navi } = this.state;

    return (
      <Container>
      <div className="col-12" id="campaigns-container">
        {navi ? (
          <div className="campaigns-section-right">
            <Breadcrumbs breads="Home, Campaigns" />
            <h1 className="page-title" style={{justifyContent: "center", fontWeight: "500", fontSize: "42px", lineHeight: "63px", marginBottom: "1em"}}>New Campaigns</h1>
            <Ptab tabs="START, RECIPIENTS, COMPOSE, PREVIEW, OPTIONS, SEND" handleClick={() => {}} active="START" type="center" />

            <div className="campaigns-content">
              <h2 className="intro">Get Started!</h2>
              <p className="intro">Your team needs to connect a mail account</p>
              <button className="create-list" style={{marginTop: "25px"}}><img src={btnPlus}/> <span>Connect Mail</span></button>
              <button className="create-list imp">Skip this process</button>
            </div>
          </div>
        ) : (
        <div className="campaigns-section-right">
            <Breadcrumbs breads="Home, Campaigns" />
            
            <h1 className="page-title" style={{marginBottom: "1em"}}>Campaigns</h1>

            <TableFilters table="campaigns" handleClick={() => this.setState({navi: 1})}/>

            <ul className="table-header">
              <li>NAME {this.Thesvg()}</li>
              <li>CREATED {this.Thesvg()}</li>
              <li>ASSIGNED {this.Thesvg()}</li>
              <li>RECIPIENTS {this.Thesvg()}</li>
              <li>SENT {this.Thesvg()}</li>
              <li>LEADS {this.Thesvg()}</li>
              <li>REPLIES {this.Thesvg()}</li>
              <li>OPENS {this.Thesvg()}</li>
              <li>BOUNCES {this.Thesvg()}</li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>

            <ul className="table-body">
              <li><span className="txt-light">May 12 Outreach</span></li>
              <li><span className="txt-light">May, 12</span></li>
              <li><span className="txt-light">Melbul</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>
            <ul className="table-body">
              <li><span className="txt-light">April 8 Outreach</span></li>
              <li><span className="txt-light">April 5</span></li>
              <li><span className="txt-light">Melbul</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>
            <ul className="table-body">
              <li><span className="txt-light">November 13 Outreach</span></li>
              <li><span className="txt-light">November 13</span></li>
              <li><span className="txt-light">Melbul</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <li><span className="txt-light">0</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>
        </div>
        )}
      </div>
      </Container>
    );
  }

  Thesvg = () => {
    return (null);
    // (
    //   <>
    //   <svg className="fil-u" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M6 0L11.1962 6H0.803848L6 0Z" fill="#C4C4C4"/>
    //   </svg>
    //   <svg className="fil-d" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    //     <path d="M6 6L0.803849 -9.78799e-07L11.1962 -7.02746e-08L6 6Z" fill="#C4C4C4"/>
    //   </svg>
    // </>
    // )
  }
};

export default Campaigns;
