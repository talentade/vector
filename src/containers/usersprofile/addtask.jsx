import React, { Component } from 'react';
import moment from 'moment';
import meeting from '../../themes/images/meeting.png';
import eye from '../../themes/images/eye.png';
import deleteIcon from '../../themes/images/notes/delete.png';
import { Task } from '../../components/popups/index';
import server from '../../services/server';
import app from '../../services/app';
import './usertasks.scss';
import '../../components/standard/table.scss';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tid: 0,
      data: null,
      type: 'new',
      showTask: true,
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

        <Task
          funnel={true}
          data={this.state.data}
          type={this.state.type}
          show={this.state.showTask}
          action={(data) => this.saveTask(data)}
          cancel={(e) => this.setState({showTask: false})}
        />

      </div>
	 )
	}

}

export default AddTask;