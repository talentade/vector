import React, { Component } from 'react';
import moment from 'moment';
import TableFilters from '../../components/tablefilters/index';
import meeting from '../../themes/images/meeting.png';
import eye from '../../themes/images/eye.png';
import deleteIcon from '../../themes/images/notes/delete.png';
import { Task } from '../../components/popups/index';
import server from '../../services/server';
import app from '../../services/app';
import './usertasks.scss';
import '../../components/standard/table.scss';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: 0,
      data: null,
      type: 'new',
      showTask: false,
    }
  }

  async componentDidMount () {}

  saveTask = async (data) => {
    console.log(data);
    this.props.load();
    try {
      let _task =  this.state.type == 'new'
                   ? await server.saveTask(this.props.uid, data)
                   : await server.updateTask(this.state.tid, data);
      this.setState({showTask: false});
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  checkTask = async (id, e) => {
    this.props.load();
    try {
      let stat = await server.changeTaskStatus(this.props.uid, id, e.target.checked ? 1 : 0);
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  deleteTask = async (id) => {
    this.props.load();
    try {
      let _task = await server.deleteTask(this.props.uid, id);
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  render () {
    let active = parseInt(this.props.active);
    let tasks = this.props.tasks;

  	return (
      <div className={"tab-row profile-tasks"+(active ? ' _active' : '')} id="tab-row-tasks">

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

        <ul className="table-header for-tasks">
          <li>TITLES</li>
          <li className="len">ASSIGNED</li>
          <li className="len">CREATED</li>
          <li className="len">SCHEDULED TIME</li>
          <li className="short">STATUS</li>
          {/*<li className="short">ACTIONS</li>*/}
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
        </ul>

        {
          tasks.map((t) => (
            <ul className="table-body for-tasks">
              <li><span className="txt-light">{t.title.length > 25 ? t.title.substr(0, 25)+"..." : t.title}</span></li>
              <li className="len"><span className="txt-light">{t.assigned}</span></li>
              <li className="len"><span className="txt-light">{moment(t.create_time).calendar()}</span></li>
              <li className="len"><span className="txt-light">{moment(t.due_date).calendar()}</span></li>
              <li className="short"><span className="txt-light">{t.status > 0 ? 'Completed' : 'Pending'}</span></li>
              {/*<li className="short">
                <img onClick={() => this.setState({tid: t.id, type: 'view', showTask: true, data: t})} src={eye} style={{cursor: 'pointer'}} />&nbsp;
                <svg onClick={() => this.setState({tid: t.id, type: 'edit', showTask: true, data: t})} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: 'pointer'}}>
                  <path d="M14.9243 4.04436L19.8064 8.92646L7.44837 21.2845L2.569 16.4024L14.9243 4.04436ZM23.511 2.86691L21.3338 0.689667C20.4923 -0.151764 19.126 -0.151764 18.2817 0.689667L16.1962 2.77525L21.0783 7.65739L23.511 5.22467C24.1636 4.57201 24.1636 3.51953 23.511 2.86691ZM0.0140741 23.2646C-0.0747746 23.6645 0.286247 24.0228 0.686157 23.9255L6.12649 22.6064L1.24711 17.7243L0.0140741 23.2646Z" fill="#A09F9F"/>
                </svg>&nbsp;
                <img src={deleteIcon} onClick={() => this.deleteTask(t.id)} style={{cursor: 'pointer'}}/>
              </li>*/}
              <div className="check-row"><label class="checkbox-container">
              <input type="checkbox" onClick={(e) => this.checkTask(t.id, e)} key={Math.random()+"_"+t.id} checked={t.status > 0} />
              <span class="checkmark"></span></label></div>
            </ul>
          ))
        }

      </div>
	 )
	}

  TaskAction = () => {
    return (
      <li className="short">
        <img src={eye} />&nbsp;
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.9243 4.04436L19.8064 8.92646L7.44837 21.2845L2.569 16.4024L14.9243 4.04436ZM23.511 2.86691L21.3338 0.689667C20.4923 -0.151764 19.126 -0.151764 18.2817 0.689667L16.1962 2.77525L21.0783 7.65739L23.511 5.22467C24.1636 4.57201 24.1636 3.51953 23.511 2.86691ZM0.0140741 23.2646C-0.0747746 23.6645 0.286247 24.0228 0.686157 23.9255L6.12649 22.6064L1.24711 17.7243L0.0140741 23.2646Z" fill="#A09F9F"/>
        </svg>&nbsp;
        <svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.67 3.86961L9.9 2.09961L0 11.9996L9.9 21.8996L11.67 20.1296L3.54 11.9996L11.67 3.86961Z" fill="#03CF9E"/>
          <path d="M32.33 20.1304L34.1 21.9004L44 12.0004L34.1 2.10039L32.33 3.87039L40.46 12.0004L32.33 20.1304Z" fill="#03CF9E"/>
          <path d="M42.0005 12H25.5005" stroke="#03CF9E" stroke-width="2"/>
          <path d="M18 12H1.5" stroke="#03CF9E" stroke-width="2"/>
        </svg>
      </li>
    )
  }

}

export default Activity;
