import React, { Component } from 'react';
import moment from 'moment';
import pencil from '../../themes/images/notes/pencil.png';
import { Note } from '../../components/popups/index';
import deleteIcon from '../../themes/images/notes/delete.png';
import server from '../../services/server';
import app from '../../services/app';
import eye from '../../themes/images/notes/eye.png';
import './usernotes.scss';

class AddNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: false,
      data: null,
      nid: 0,
      type: 'new',
      filter: 'all',
      showNote: true,
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
          funnel={true}
          note={this.state.data}
          type={this.state.type}
          show={this.state.showNote}
          action={(t, n) => this.saveNote(t, n)}
          cancel={(e) => this.setState({showNote: false})}
        />

      </div>
	 )
	}

}

export default AddNote;
