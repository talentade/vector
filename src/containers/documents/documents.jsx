import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../components/paginationTwo/index';
import '../../components/standard/table.scss';
import download from '../../themes/images/download-doc.png';
import view from '../../themes/images/view-doc.png';
import server from '../../services/server';
import app from '../../services/app';
import { ImageView } from '../../components/popups/index';

class DocumentsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page_no: 1,
      page_size: app.maxrow,
      iview: false,
      src: null,
      showLoader: true
    }
  }

  async componentDidMount () {
    this.getAllDoc();
  }

  getAllDoc = async () => {
    try {
      let users = await server.getAllUsers();
      this.setState({users: users.data, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  render () {
    let { page_no, page_size } = this.state;
    let users = this.props.filter.length ? this.state.users.filter((c) => {
      return (
        c.first_name.toLowerCase().match(this.props.filter.toLowerCase()) ||
        c.last_name.toLowerCase().match(this.props.filter.toLowerCase()) ||
        c.email.toLowerCase().match(this.props.filter.toLowerCase()) ||
        app.uid(c.user_id).toLowerCase().match(this.props.filter.toLowerCase()) ||
        (c.first_name + " " + c.last_name).toLowerCase().match(this.props.filter.toLowerCase()) ||
        (c.last_name + " " + c.first_name).toLowerCase().match(this.props.filter.toLowerCase())
      );
    }) : this.state.users;


  let max_rows = users.length;
  let stt = (page_no-1)*page_size;
  let max = stt+page_size;
      max = max > max_rows ? max_rows : max;
    users = users.slice(stt, max > max_rows ? max_rows : max);

    return (
          <>

          <ImageView
            src={this.state.src}
            show={this.state.iview}
            cancel={() => this.setState({iview: false})}
          />

            <table border="0">
              <thead>
                <tr>
                  <th style={{width: "45px"}}></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Proof of ID</th>
                  <th>Proof of Residency</th>
                  <th>DOD</th>
                  <th>Bank Card</th>
                </tr>
              </thead>
              <tbody>
                {users.map((doc) => (
                  <tr>
                    <td style={{width: "45px"}}>
                    {doc.profile_image.length ?
                      <img src={doc.profile_image} className="dc-na" style={{padding: "0px"}}/> :
                      <span className="dc-na r">{doc.first_name.charAt(0).toUpperCase()+"."+doc.last_name.charAt(0).toUpperCase()+"."}</span>
                    }
                    </td>
                    <td><span>{(doc.first_name+" "+doc.last_name).ucwords()}</span></td>
                    <td><span className="txt-light">{doc.email}</span></td>
                    <td><span className="txt-info">{app.uid(doc.user_id)}</span></td>
                    <td style={{opacity: doc.identity_proof.length ? "1" : "0.5"}}><span className="txt-default">Download {doc.identity_proof.length ? <a href={doc.identity_proof} download><img src={download} className="d-file"/></a> : <img src={download} className="d-file"/> } <img onClick={() => doc.identity_proof.length && this.setState({iview: true, src: doc.identity_proof})} src={view} className="v-file" /></span></td>
                    <td style={{opacity: doc.residence_proof.length ? "1" : "0.5"}}><span className="txt-default">Download {doc.residence_proof.length ? <a href={doc.residence_proof} download><img src={download} className="d-file"/></a> : <img src={download} className="d-file"/> } <img onClick={() => doc.residence_proof.length && this.setState({iview: true, src: doc.residence_proof})} src={view} className="v-file" /></span></td>
                    <td style={{opacity: doc.dod.length ? "1" : "0.5"}}><span className="txt-default">Download {doc.dod.length ? <a href={doc.dod} download><img src={download} className="d-file"/></a> : <img src={download} className="d-file"/> } <img onClick={() => doc.dod.length && this.setState({iview: true, src: doc.dod})} src={view} className="v-file" /></span></td>
                    <td style={{opacity: doc.bank_card.length ? "1" : "0.5"}}><span className="txt-default">Download {doc.bank_card.length ? <a href={doc.bank_card} download><img src={download} className="d-file"/></a> : <img src={download} className="d-file"/> } <img onClick={() => doc.bank_card.length && this.setState({iview: true, src: doc.bank_card})} src={view} className="v-file" /></span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className='loader-container'
              style={{ display: this.state.showLoader ? 'block' : 'none' }}
            >
              <div className='loader'></div>
            </div>

            <Pagination length={page_size} max_rows={max_rows} page_no={page_no} paginationChange={(p) => { this.setState({page_no: p}); }}/>
          </>
        );
  }
}

export default DocumentsTable;
