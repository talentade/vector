import React, { Component } from 'react';
import moment from 'moment';
import Container from '../container/index';
import { Link } from 'react-router-dom';
import Pagination from '../../components/paginationTwo/index'
import TableFilters from '../../components/tablefilters/index';
import meeting from '../../themes/images/meeting.png';
import eye from '../../themes/images/eye.png';
import check from '../../themes/images/check-mark.png';
import deleteIcon from '../../themes/images/notes/delete.png';
import { Task } from '../../components/popups/index';
import server from '../../services/server';
import app from '../../services/app';
import Breadcrumbs from '../../components/breadcrumbs/index';
import SearchIcon from "../../themes/images/tradeDashboard/search.svg";

import '../../components/standard/table.scss';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: 0,
      tasks: [],
      page_no: 1,
      page_size: app.maxrow,
      data: null,
      type: 'new',
      showLoader: true,
      showTask: false,
    }

    this.uid = 'f26bb8f5-ee2e-4a33-9a8e-7c8d68b17fee';
  }

  async componentDidMount () {
    this.getAllTask();
  }

  getAllTask = async () => {
    try {
      let t = await server.getAllTask();
      this.setState({tasks: t.data.data, showLoader: false});
    } catch(e) {
      return e;
    }
  }

  saveTask = async (data) => {
    try {
      let _task =  this.state.type == 'new'
                   ? await server.saveTask(this.uid, data)
                   : await server.updateTask(this.state.tid, data);
      this.setState({showTask: false});
    } catch (e) {
      return e;
    }
    window.location.href = "";
  }

  checkTask = async (id, e) => {
    try {
      let stat = await server.changeTaskStatus(this.uid, id, e.target.checked ? 1 : 0);
    } catch (e) {
      return e;
    }
    window.location.href = "";
  }

  checkTask2 = async (tid, id) => {
    try {
      let stat = await server.changeTaskStatus(tid, id, 1);
    } catch (e) {
      return e;
    }
    window.location.href = "";
  }

  deleteTask = async (tid, id) => {
    try {
      let _task = await server.deleteTask(tid, id);
    } catch (e) {
      return e;
    }
    window.location.href = "";
  }

  render () {
    let { page_no, page_size, tasks } = this.state;

    let max_rows = tasks.length;
    let stt = (page_no-1)*page_size;
    let max = stt+page_size;
        max = max > max_rows ? max_rows : max;
      tasks = tasks.slice(stt, max > max_rows ? max_rows : max);

  	return (
      <Container>
      <div className="col-12" id="document-container">
      <div className="users-section-right tab-row profile-tasks _active">
        <Breadcrumbs breads="Home, Activities" />
        <h1 className="page-title">Activities
          <div className="search-container" style={{width: "280px"}}>
            <input type="text" placeholder="Search activities" />
            <img src={SearchIcon} className="search-img" alt="" />
          </div>
        </h1>

        {/*<TableFilters table="tasks" addTask={() => this.setState({type: 'new', data: null, showTask: true})} />*/}

        {this.state.showTask ?
          <Task
            data={this.state.data}
            type={this.state.type}
            show={this.state.showTask}
            action={(data) => this.saveTask(data)}
            cancel={(e) => this.setState({showTask: false})}
          />
        : null}

        <ul className="table-header for-tasks" style={{marginTop: "4em"}}>
          <li style={{width: "100px"}}>S/N</li>
          <li className="len">TITLES</li>
          <li className="len">USER ID</li>
          <li className="len">ASSIGNED</li>
          <li className="len">CREATED</li>
          <li className="len">SCHEDULED TIME</li>
          <li className="short">STATUS</li>
          <li className="short">ACTIONS</li>
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
        </ul>


        <div
          className='loader-container'
          style={{ display: this.state.showLoader ? 'block' : 'none' }}
        >
          <div className='loader'></div>
        </div>
        
        
        {
          tasks.map((t, idx) => (
            <ul className="table-body for-tasks">
              <li style={{width: "100px"}}>{idx + 1}</li>
              <li><span className="txt-light">{t.title.length > 25 ? t.title.substr(0, 25)+"..." : t.title}</span></li>
              <li className="len"><Link className="txt-info">{app.uid(t.user_id)}</Link></li>
              <li className="len"><span className="txt-light">{t.assigned}</span></li>
              <li className="len"><span className="txt-light">{moment(t.create_time).calendar()}</span></li>
              <li className="len"><span className="txt-light">{moment(t.due_date).calendar()}</span></li>
              <li className="short"><span className="txt-light">{t.status > 0 ? 'Completed' : 'Pending'}</span></li>
              <li className="short">
                <img onClick={() => this.setState({tid: t.id, type: 'view', showTask: true, data: t})} src={eye} style={{cursor: 'pointer'}} />&nbsp;
                <svg onClick={() => this.setState({tid: t.id, type: 'edit', showTask: true, data: t})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}>
                  <path d="M14.9243 4.04436L19.8064 8.92646L7.44837 21.2845L2.569 16.4024L14.9243 4.04436ZM23.511 2.86691L21.3338 0.689667C20.4923 -0.151764 19.126 -0.151764 18.2817 0.689667L16.1962 2.77525L21.0783 7.65739L23.511 5.22467C24.1636 4.57201 24.1636 3.51953 23.511 2.86691ZM0.0140741 23.2646C-0.0747746 23.6645 0.286247 24.0228 0.686157 23.9255L6.12649 22.6064L1.24711 17.7243L0.0140741 23.2646Z" fill="#A09F9F"/>
                </svg>&nbsp;
                <img src={check} onClick={(e) => this.checkTask2(t.user_id, t.id)} style={{height: "19px", width: "20px", cursor: "pointer"}} />&nbsp;
                <img src={deleteIcon} onClick={() => this.deleteTask(t.user_id, t.id)} style={{cursor: 'pointer'}}/>
              </li>
              <div className="check-row"><label class="checkbox-container">
              <input type="checkbox" key={Math.random()+"_"+t.id} checked={t.status > 0} />
              <span class="checkmark"></span></label></div>
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
