import React, { Component } from 'react';
import bread from '../../themes/images/bread.svg';
import './index.scss';

class Breadcrumbs extends Component {
  constructor(props) {
    super(props);
  }

  render () {
  	let breads = this.props.breads.split(",");
	return (
        <ul className="breadcrumbs">
          <li>
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.33317 13.8334V9.66676H9.6665V13.8334C9.6665 14.2918 10.0415 14.6668 10.4998 14.6668H12.9998C13.4582 14.6668 13.8332 14.2918 13.8332 13.8334V8.0001H15.2498C15.6332 8.0001 15.8165 7.5251 15.5248 7.2751L8.55817 1.0001C8.2415 0.716764 7.75817 0.716764 7.4415 1.0001L0.474838 7.2751C0.191504 7.5251 0.366504 8.0001 0.749838 8.0001H2.1665V13.8334C2.1665 14.2918 2.5415 14.6668 2.99984 14.6668H5.49984C5.95817 14.6668 6.33317 14.2918 6.33317 13.8334Z" fill="#C4C4C4"/>
            </svg>
          </li>
          {breads.map((b, c) => (
          	<li key={`${Math.random() * 1000000}`}>{b} {c === breads.length - 1 ? '' : <img src={bread} />}</li>
          ))}
        </ul>
	)
	}

}

export default Breadcrumbs;
