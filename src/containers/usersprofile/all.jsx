import React, { Component } from 'react';
import moment from 'moment';
import TableFilters from '../../components/tablefilters/index';
import folder from '../../themes/images/folder.png';
import pencil from '../../themes/images/notes/pencil.png';
import { Note } from '../../components/popups/index';
import deleteIcon from '../../themes/images/notes/delete.png';
import server from '../../services/server';
import app from '../../services/app';
import check from '../../themes/images/check-circle.png';
import calendar from '../../themes/images/calendar-search.png';
import eye from '../../themes/images/notes/eye.png';
import './usernotes.scss';

class All extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: false,
      data: null,
      nid: 0,
      type: 'new',
      filter: 'all',
      showNote: false,
    }
  }

  saveNote = async (title, note) => {
    this.props.load();
    try {
      let _note =  this.state.type == 'new'
                   ? await server.saveNote(this.props.uid, title, note)
                   : await server.updateNote(this.state.nid, title, note);
      this.setState({showNote: false});
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  deleteNote = async (id) => {
    this.props.load();
    try {
      let _note = await server.deleteNote(this.props.uid, id);
    } catch (e) {
      return e;
    }
    this.props.refresh();
  }

  render () {
    let active = parseInt(this.props.active);
    let notes = this.props.notes;

    if(this.state.filter != 'all') {
      notes = notes.filter((note) => {
        let m = note.create_time.split("/")[0];
        let t = app.time().split("/")[0];
        if(this.state.filter == 'this month') {
          return m == t;
        } else {
          return m != t;
        }
    });
  }

  	return (
      <div className={"tab-row profile-notes"+(active ? ' _active' : '')} id="tab-row-notes">

        <Note
          note={this.state.data}
          type={this.state.type}
          show={this.state.showNote}
          action={(t, n) => this.saveNote(t, n)}
          cancel={(e) => this.setState({showNote: false})}
        />

        <ul className="for-notes">
          <li style={{width: "94%"}} className="upc">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="8" fill="white" fill-opacity="0.2"/>
            </svg>
            <div className="d-note upc">
              <h4>Task for Deen</h4>
              <h6><img src={check} /> The last title should be written here</h6>
              <h6><img src={calendar} /> Dec 12 2020, 2:00 PM</h6>
              <div className="d-act">
                <img src={pencil} />
                <img src={deleteIcon} />
                <img src={eye} />
              </div>
            </div>
          </li>
          {
            notes.map((n) => (
              <li key={Math.random()+" "+Math.random()} style={{width: "94%"}}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" fill="white" fill-opacity="0.2"/>
                </svg>
                <div className="d-note">
                  <h4>{n.title}</h4>
                  <p>{n.note}</p>
                </div>
                <div className="d-act">
                  <img src={pencil} onClick={() => this.setState({nid: n.id, data: n, type: 'update', showNote: true})} />
                  <img src={deleteIcon} onClick={() => this.deleteNote(n.id)} />
                  <img src={eye} onClick={() => this.setState({nid: n.id, data: n, type: 'view', showNote: true})} />
                </div>
                <div className="d-foot">
                  <p>
                    <span className="creator"><i>created by:</i>&nbsp;&nbsp;<b>{n.creator}&nbsp;({app.uid(n.creator_id)})</b></span>
                    <span className="modified">Last modified {moment(n.create_time).calendar()}</span>
                  </p>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
	 )
	}

}

export default All;