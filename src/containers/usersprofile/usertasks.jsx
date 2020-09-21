import React, { Component } from 'react';
import TableFilters from '../../components/tablefilters/index';
import meeting from '../../themes/images/meeting.png';
import eye from '../../themes/images/eye.png';
import { Task } from '../../components/popups/index';
import './usertasks.scss';
import '../../components/standard/table.scss';

class UserTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTask: false,
    }
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

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-tasks"+(active ? ' _active' : '')} id="tab-row-tasks">

        <TableFilters table="tasks" addTask={() => this.setState({showTask: true})} />

        <Task show={this.state.showTask} cancel={(e) => this.setState({showTask: false})} />

        <ul className="table-header for-tasks">
          <li>TITLES</li>
          <li className="len">ATTENDEES</li>
          <li className="len">CREATED</li>
          <li className="len">SCHEDULED TIME</li>
          <li className="short">STATUS</li>
          <li className="short">ACTIONS</li>
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
        </ul>

        <ul className="table-body for-tasks">
          <li><span className="txt-light">Workflow</span></li>
          <li className="len"><span className="txt-light">Adetona Seun(A321218)</span></li>
          <li className="len"><span className="txt-light">05. 04. 2020 12:43pm</span></li>
          <li className="len"><span className="txt-light">05. 04. 2020 12:43pm</span></li>
          <li className="short"><span className="txt-light">Active</span></li>
          {this.TaskAction()}
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
        </ul>

        <ul className="table-body for-tasks">
          <li><span className="txt-light">Workflow</span></li>
          <li className="len"><span className="txt-light">Adetona Seun(A321218)</span></li>
          <li className="len"><span className="txt-light">05. 04. 2020 12:43pm</span></li>
          <li className="len"><span className="txt-light">05. 04. 2020 12:43pm</span></li>
          <li className="short"><span className="txt-light">Overdue</span></li>
          {this.TaskAction()}
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" checked /><span class="checkmark"></span></label></div>
        </ul>

      </div>
	 )
	}

}

export default UserTasks;