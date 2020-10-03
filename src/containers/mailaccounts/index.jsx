import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import Ptab from '../../components/ptabs/index';
import btnPlus from "../../themes/images/btn-plus.png";
import TableFilters from '../../components/tablefilters/index';

import '../../components/standard/standard.scss';
import './index.scss';

class MailAccounts extends Component {
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
      <div className="col-12" id="mailaccounts-container">
        <div className="mailaccounts-section-right">
            <Breadcrumbs breads="Home, Mail Accounts" />

            <h1 className="page-title" style={{marginBottom: "1em"}}>Mail Accounts</h1>

            <ul className="table-header">
              <li>EMAIL {this.Thesvg()}</li>
              <li>ASSIGNED LEADS {this.Thesvg()}</li>
              <li>ASSIGNED DATE {this.Thesvg()}</li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>

            <ul className="table-body">
              <li><span className="txt-light">social@melbul.com</span></li>
              <li><span className="txt-light">Melbul LLC</span></li>
              <li><span className="txt-light">11. 06. 2020</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>
            <ul className="table-body">
              <li><span className="txt-light">social@melbul.com</span></li>
              <li><span className="txt-light">Melbul LLC</span></li>
              <li><span className="txt-light">11. 06. 2020</span></li>
              <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
            </ul>

            <div className="plus">
              <button>+</button>
            </div>
        </div>
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

export default MailAccounts;
