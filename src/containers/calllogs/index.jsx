import React, { Component } from 'react';
import moment from 'moment';
import $ from 'jquery';
import Container from '../container/index';
import { Link } from 'react-router-dom';
import Pagination from '../../components/paginationTwo/index';
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
      page_no: 1,
      callback: false,
      callbackTxt: '',
      page_size: app.maxrow,
    }
  }

  async componentDidMount () {
    this.getCalls();

    window.NO_AUTO_PAGER = true;

    $(window).on("resetPager", () => {
      this.setState({page_size: app.page_size(), page_no: 1});
    });
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
    let { page_no, page_size, logs, filter } = this.state;

    filter = filter.toLowerCase();

    logs = filter.length ? logs.filter((c) => {
      return (
        String(c.destination).match(filter.toLowerCase()) ||
        c.disposition.toLowerCase().match(filter.toLowerCase())
      );
    }) : logs;

    let max_rows = logs.length;
    let stt = (page_no-1)*page_size;
    let max = stt+page_size;
        max = max > max_rows ? max_rows : max;
      logs = logs.slice(stt, max > max_rows ? max_rows : max);

  	return (
      <Container>
      <div className="col-12" id="document-container">
      <div className="users-section-right">
        
        <Breadcrumbs breads="Home, Call Logs" />

        <h1 className="page-title">Call Logs</h1>
        <TableFilters table="calls" search={(e) => this.setState({filter: e.target.value})} />

        <ul className="table-header for-tasks" style={{marginTop: "10px"}}>
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

        <Pagination length={page_size} max_rows={max_rows} page_no={page_no} paginationChange={(p) => { this.setState({page_no: p}); }}/>

      </div>
      </div>
      </Container>
	 )
	}

}

export default Activities;
