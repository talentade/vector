import React, { Component } from 'react';
import './index.scss';

class Ptab extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let { handleClick, active, tabs, type } = this.props;
    let actv = active;
    tabs = tabs.split(",");

  	return (
        <ul className={"p-tabs"+(type ? " center" : "")}>
          {tabs.map((b, c) => (
            <li
            key={`${Math.random() * 1000000}`}
            className={b.toLowerCase().trim() === actv.toLowerCase().trim() ? '_active' : ''}
            onClick={handleClick}
            name={b.trim()}
            >
              {b}
              <svg width="30" height="3" viewBox="0 0 30 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3C0 1.34315 1.34315 0 3 0H27C28.6569 0 30 1.34315 30 3H0Z" fill="#03CF9E"/>
              </svg>
            </li>
          ))}
        </ul>
	 )
	}

}

export default Ptab;
