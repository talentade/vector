import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import Container from '../container/index';
import { Link } from 'react-router-dom';
import Pagination from '../../components/paginationTwo/index';
import TableFilters from '../../components/tablefilters/index';
import meeting from '../../themes/images/meeting.png';
import Spinner from '../../components/spinner/index';
import eye from '../../themes/images/eye.png';
import check from '../../themes/images/check-mark.png';
import deleteIcon from '../../themes/images/notes/delete.png';
import { Task } from '../../components/popups/index';
import server from '../../services/server';
import app from '../../services/app';
import { ConfirmModal, CallBack } from '../../components/popups/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import SearchIcon from "../../themes/images/tradeDashboard/search.svg";

import '../../components/standard/table.scss';

class Activities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmID: 0,
      confirmUID: 0,
      confirmModal: false,
      tid: 0,
      tasks: [],
      page_no: 1,
      callback: false,
      callbackTxt: '',
      page_size: app.maxrow,
      data: null,
      filter: '',
      type: 'new',
      showLoader: true,
      showTask: false,
    }

    this.uid = 'f26bb8f5-ee2e-4a33-9a8e-7c8d68b17fee';
  }

  async componentDidMount () {
    this.getAllTask();

    window.NO_AUTO_PAGER = true;

    $(window).on("resetPager", () => {
      this.setState({page_size: app.page_size(), page_no: 1});
    });
  }

  getAllTask = async () => {
    this.setState({showLoader: true});
    try {
      let t = await server.getAllTask();
      this.setState({tasks: t.data.data, showLoader: false});
    } catch(e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  saveTask = async (data) => {
    if(this.state.type == 'new') {
      this.setState({showLoader: true});
    } else {
      this.setState({showLoader: true, showTask: false});
    }
    try {
      let _task =  this.state.type == 'new'
                   ? await server.saveTask(this.uid, data)
                   : await server.updateTask(this.state.tid, data);
      this.setState({showTask: false, showLoader: false, callback: true, callbackTxt: this.state.type == 'new' ? "Task saved" : "Task updated"});
      this.getAllTask();
    } catch (e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  checkTask = async (id, e) => {
    this.setState({showLoader: true});
    try {
      let stat = await server.changeTaskStatus(this.uid, id, e.target.checked ? 1 : 0);
      this.setState({showLoader: false, callback: true, callbackTxt: 'Task updated'});
      this.getAllTask();
    } catch (e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  checkTask2 = async (tid, id) => {
    this.setState({showLoader: true});
    try {
      let stat = await server.changeTaskStatus(tid, id, 1);
      this.setState({showLoader: false, callback: true, callbackTxt: 'Task Completed'});
      this.getAllTask();
    } catch (e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  deleteTask = async (tid, id) => {
    this.setState({showLoader: true, confirmModal: false});
    try {
      let _task = await server.deleteTask(tid, id);
      this.setState({showLoader: false, callback: true, callbackTxt: 'Task deleted'});
      this.getAllTask();
    } catch (e) {
      return e;
    }
    this.setState({showLoader: false});
  }

  render () {
    let { page_no, page_size, tasks, filter } = this.state;

    filter = filter.toLowerCase();
    tasks = filter.length ? tasks.filter((c) => {
      return (
        c.assigned.toLowerCase().match(filter) ||
        c.title.toLowerCase().match(filter) ||
        app.uid(c.user_id).toLowerCase().match(filter)
      );
    }) : tasks;

    let max_rows = tasks.length;
    let stt = (page_no-1)*page_size;
    let max = stt+page_size;
        max = max > max_rows ? max_rows : max;
      tasks = tasks.slice(stt, max > max_rows ? max_rows : max);

  	return (
      <Container>
      <Spinner showSpinner={this.state.showLoader} />
      <div className="col-12" id="document-container">
      <div className="users-section-right tab-row profile-tasks _active">
        <Breadcrumbs breads="Home, Activities" />
        <h1 className="page-title">Activities</h1>
        <TableFilters table="activities" search={(e) => this.setState({filter: e.target.value})} />

        {/*<TableFilters table="tasks" addTask={() => this.setState({type: 'new', data: null, showTask: true})} />*/}

      <ConfirmModal
        head={"Delete this activity?"}
        text="Click YES to confirm"
        show={this.state.confirmModal}
        cancel={() => this.setState({confirmModal: false})}
        confirm={() => { this.setState({confirmModal: false}); this.deleteTask(this.state.confirmUID, this.state.confirmID); }}
      />

      <CallBack
        head="Success"
        show={this.state.callback}
        text={this.state.callbackTxt}
        cancel={(e) => this.setState({callback: false})}
      />

        {this.state.showTask ?
          <Task
            data={this.state.data}
            type={this.state.type}
            show={this.state.showTask}
            action={(data) => { this.setState({showTask: false}); this.saveTask(data); }}
            cancel={(e) => this.setState({showTask: false})}
          />
        : null}

        <ul className="table-header for-tasks" style={{marginTop: "10px"}}>
          <li style={{width: "100px"}}>S/N</li>
          <li className="len">TITLES</li>
          <li className="len">USER ID</li>
          <li className="len">ASSIGNED</li>
          <li className="len">CREATED</li>
          <li className="len">SCHEDULED TIME</li>
          <li className="short">STATUS</li>
          <li className="short short2">ACTIONS</li>
          {/*<div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>*/}
        </ul>


        {/*<div
          className='loader-container'
          style={{ display: this.state.showLoader ? 'block' : 'none' }}
        >
          <div className='loader'></div>
        </div>*/}
        
        
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
              <li className="short short2">
                <img onClick={() => this.setState({tid: t.id, type: 'view', showTask: true, data: t})} src={eye} style={{cursor: 'pointer'}} />
                {t.status > 0 ? null : (
                  <>
                    <svg onClick={() => this.setState({tid: t.id, type: 'edit', showTask: true, data: t})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}>
                      <path d="M14.9243 4.04436L19.8064 8.92646L7.44837 21.2845L2.569 16.4024L14.9243 4.04436ZM23.511 2.86691L21.3338 0.689667C20.4923 -0.151764 19.126 -0.151764 18.2817 0.689667L16.1962 2.77525L21.0783 7.65739L23.511 5.22467C24.1636 4.57201 24.1636 3.51953 23.511 2.86691ZM0.0140741 23.2646C-0.0747746 23.6645 0.286247 24.0228 0.686157 23.9255L6.12649 22.6064L1.24711 17.7243L0.0140741 23.2646Z" fill="#A09F9F"/>
                    </svg>
                    <img src={check} onClick={(e) => this.checkTask2(t.user_id, t.id)} style={{height: "19px", width: "20px", cursor: "pointer"}} />
                  </>
                )}
                <img src={deleteIcon} onClick={() => this.setState({confirmUID: t.user_id, confirmID: t.id, confirmModal: true})} style={{cursor: 'pointer'}}/>
              </li>
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
