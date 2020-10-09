import React, { Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
import folder from '../../themes/images/folder.png';
import file from '../../themes/images/file.png';
import down from '../../themes/images/profile/down.svg';
import view from '../../themes/images/view.png';
import { ImageView } from '../../components/popups/index';
import './userfiles.scss';

class UserFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: false,
      iview: false,
      src: null,
      folder: null,
      format: {profile_image: "Profile pictures", dod: "DOD", identity_proof: "Identity proof", residence_proof: "Residence proof", bank_card: "Card"},
      formatt: {profile_image: "Profile image", dod: "Declaration of deposit", identity_proof: "Proof of Identity", residence_proof: "Proof of Residence", bank_card: "Bank Card"}
    }
  }

  componentDidMount () {
    $(window).on("appBack", () => {
      this.setState({files: false});
    });
  }

  render () {
    let active = parseInt(this.props.active);
    let docs = this.props.files;

  	return (
      <div className={"tab-row profile-files"+(active ? ' _active' : '')} id="tab-row-files">

      <ImageView
        src={this.state.src}
        show={this.state.iview}
        cancel={() => this.setState({iview: false})}
      />

      {this.state.files ? (

        <ul className="for-files">
          <li><h1>{this.state.format[this.state.folder]}</h1></li>
          {
            docs.map((d) => (
              d.source == this.state.folder ? <li>
                <img src={file} />
                <div className="f-det">
                  <span className="f-name">{this.state.formatt[this.state.folder]}</span>
                  <span className="f-date">Uploaded {moment(d.create_time).calendar()}</span>
                </div>
                <a href={d.path} download className="down-btn"><img src={down} style={{position: "relative", top: "-1px", left: "-5px"}} /> Download</a>
                <button className="view-btn" onClick={() => this.setState({iview: true, src: d.path})}><img src={view} style={{position: "relative", top: "-1px", left: "-5px"}} /> View</button>
              </li> : null
            ))
          }
        </ul>
      ) : (
        <ul className="for-folders">
          {
            Object.keys(this.state.format).map((f) => (
              <li onClick={() => this.setState({files: !this.state.files, folder: f})}><img src={folder} /><span>{this.state.format[f]}</span></li>
            ))
          }
          {/*<li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>Profile pictures</span></li>
          <li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>Cards</span></li>
          <li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>DOD</span></li>
          <li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>07. 03. 2020</span></li>*/}
        </ul>
      )}
      </div>
	 )
	}

}

export default UserFiles;