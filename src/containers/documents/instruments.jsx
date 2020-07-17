import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination2 from '../../components/pagination2/index';
import '../../components/standard/table.scss';
import download from '../../themes/images/download-doc.png';
import view from '../../themes/images/view-doc.png';

class DocumentsTable extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
          <>

            <table border="0">
              <thead>
                <tr>
                  <th style={{width: "45px"}}></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Proof of ID</th>
                  <th>Proof of Residency</th>
                  <th>CC1</th>
                  <th>CC2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na r">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na y">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na g">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na p">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na r">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na y">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na g">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na p">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na r">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na y">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na g">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
                <tr>
                  <td style={{width: "45px"}}><span className="dc-na p">A.T.</span></td>
                  <td><span>Adeoye Talent</span></td>
                  <td><span className="txt-light">adeoyetalent@gmail.com</span></td>
                  <td><span className="txt-info">T834104</span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                  <td><span className="txt-default">Download <img src={download} className="d-file"/> <img src={view} className="v-file" /></span></td>
                </tr>
              </tbody>
            </table>
            <Pagination2 />
          </>
        );
  }
}

export default DocumentsTable;