import React, { Component } from 'react';
import moment from 'moment';
import Container from '../container/index';
import { Link } from 'react-router-dom';
import TableFilters from '../../components/tablefilters/index';
import meeting from '../../themes/images/meeting.png';
import eye from '../../themes/images/eye.png';
import play from '../../themes/images/play.png';
import check from '../../themes/images/check-mark.png';
import deleteIcon from '../../themes/images/notes/delete.png';
import { Task } from '../../components/popups/index';
import server from '../../services/server';
import app from '../../services/app';
import Breadcrumbs from '../../components/breadcrumbs/index';
import SearchIcon from "../../themes/images/tradeDashboard/search.svg";
import '../../components/standard/table.scss';
import './index.scss';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: 0,
      logs: [],
      data: null,
      filter: '',
      type: 'new',
      showLoader: true,
    }
  }

  async componentDidMount () {
    this.getCalls();
  }

  getCalls = async () => {
    try {
      let calls = await server.getCalls();
      this.setState({logs: calls.data.stats, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  getRecord = async (cid, pbx)  => {
    try {
      let record = await axios.request({
        method: 'GET',
        url: "https://api.zadarma.com/v1/pbx/record/request/?call_id="+cid+"&pbx_call_id="+pbx
      });
      // console.log(record.data);
      // this.setState({logs: calls.data.stats, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  render () {
    let logs = this.state.filter.length ? this.state.logs.filter((c) => {
      return (
        String(c.destination).match(this.state.filter.toLowerCase()) ||
        c.disposition.toLowerCase().match(this.state.filter.toLowerCase())
      );
    }) : this.state.logs;

  	return (
      <Container>
      <div className="col-12" id="document-container">
      <div className="users-section-right tab-row profile-tasks _active">
        
        <Breadcrumbs breads="Home, Call Logs" />

        <h1 className="page-title">Call Logs
          <div className="search-container" style={{width: "280px"}}>
            <input type="text" placeholder="Search" onChange={(e) => this.setState({filter: e.target.value})}/>
            <img src={SearchIcon} className="search-img" alt="" />
          </div>
        </h1>

        <ul className="table-header for-tasks" style={{marginTop: "4em"}}>
          <li style={{width: "100px"}}>S/N</li>
          <li className="len">PHONE</li>
          <li className="len">TIME</li>
          <li className="len">STATUS</li>
          <li className="len">EXTENSION</li>
          <li className="len">CALL ID</li>
          <li className="len">ACTIONS</li>
        </ul>

        <div
          className='loader-container'
          style={{ display: this.state.showLoader ? 'block' : 'none' }}
        >
          <div className='loader'></div>
        </div>
        
        {
          logs.map((l, idx) => (
            <ul className="table-body for-tasks">
              <li style={{width: "100px"}}>{idx + 1}</li>
              <li className="len"><span className="txt-light">+{l.destination}</span></li>
              <li className="len"><span className="txt-light">{l.callstart}</span></li>
              <li className="len"><span className="txt-light">{l.disposition.ucwords()}</span></li>
              <li className="len"><span className="txt-light">{l.clid}</span></li>
              <li className="len"><span className="txt-light">{l.call_id}</span></li>
              <li className="len"><img disabled={true} className="i-cdb" src={play} onClick={(e) => this.getRecord(l.call_id, l.pbx_call_id)} style={{cursor: "pointer"}}/></li>
            </ul>
          ))
        }

      </div>
      </div>
      </Container>
	 )
	}

}

export default Activities;
