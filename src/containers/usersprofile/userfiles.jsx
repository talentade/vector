import React, { Component } from 'react';
import folder from '../../themes/images/folder.png';
import file from '../../themes/images/file.png';
import down from '../../themes/images/profile/down.svg';
import view from '../../themes/images/view.png';
import './userfiles.scss';

class UserFiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: false,
    }
  }

  render () {
    let active = parseInt(this.props.active);
  	return (
      <div className={"tab-row profile-files"+(active ? ' _active' : '')} id="tab-row-files">

      {this.state.files ? (

        <ul className="for-files">
          <li><h1>KYC</h1></li>
          <li>
            <img src={file} />
            <div className="f-det">
              <span className="f-name">Proof of Identity</span>
              <span className="f-date">Uploaded 12. 05. 2020</span>
            </div>
            <button className="down-btn"><img src={down} style={{position: "relative", top: "-1px", left: "-5px"}} /> Download</button>
            <button className="view-btn"><img src={view} style={{position: "relative", top: "-1px", left: "-5px"}} /> View</button>
          </li>
          <li>
            <img src={file} />
            <div className="f-det">
              <span className="f-name">Proof of Identity</span>
              <span className="f-date">Uploaded 12. 05. 2020</span>
            </div>
            <button className="down-btn"><img src={down} style={{position: "relative", top: "-1px", left: "-5px"}} /> Download</button>
            <button className="view-btn"><img src={view} style={{position: "relative", top: "-1px", left: "-5px"}} /> View</button>
          </li>
          <li>
            <img src={file} />
            <div className="f-det">
              <span className="f-name">Proof of Identity</span>
              <span className="f-date">Uploaded 12. 05. 2020</span>
            </div>
            <button className="down-btn"><img src={down} style={{position: "relative", top: "-1px", left: "-5px"}} /> Download</button>
            <button className="view-btn"><img src={view} style={{position: "relative", top: "-1px", left: "-5px"}} /> View</button>
          </li>
          <li>
            <img src={file} />
            <div className="f-det">
              <span className="f-name">Proof of Identity</span>
              <span className="f-date">Uploaded 12. 05. 2020</span>
            </div>
            <button className="down-btn"><img src={down} style={{position: "relative", top: "-1px", left: "-5px"}} /> Download</button>
            <button className="view-btn"><img src={view} style={{position: "relative", top: "-1px", left: "-5px"}} /> View</button>
          </li>
        </ul>
      ) : (
        <ul className="for-folders">
          <li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>KYC</span></li>
          <li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>Profile pictures</span></li>
          <li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>Cards</span></li>
          <li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>DOD</span></li>
          {/*<li onClick={() => this.setState({files: !this.state.files})}><img src={folder} /><span>07. 03. 2020</span></li>*/}
        </ul>
      )}
      </div>
	 )
	}

}

export default UserFiles;