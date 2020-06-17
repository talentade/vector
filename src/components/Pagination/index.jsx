import React, { Component } from 'react';
import previousImg from './svg/previous.svg';
import prevImg from './svg/prev.svg';
import nextImg from './svg/next.svg';
import lastImg from './svg/last.svg';
import lineImg from './svg/line.svg';
import './index.scss';

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render () {

	  const { length, max_rows, page_no, paginationChange } = this.props;
	  let prev  = page_no - 1;
	  	  prev  = prev < 1 ? 1 : prev;
	  let last  = Math.ceil(max_rows / length);
	  let next  = page_no + 1;
	  	  next  = next > last ? last : next;

	  let text_1 = page_no > 1 ? page_no-1 : 1;
	  let text_2 = page_no > 2 ? page_no : 2;
	  let text_3 = max_rows > length*2 ? text_2+1 : 3;

	  if(last == 3) {
	  	text_1 = 1;
	  	text_2 = 2;
	  	text_3 = 3;
	  }

	  return (
		max_rows > length ? (
			<div className="pagination-div">
				<ul className="pagination-ul">
					{max_rows > length*2 ? ( <li onClick={() => paginationChange(1)}><img src={previousImg} /></li> ) : null }
					<li onClick={() => paginationChange(prev)}><img src={prevImg} /></li>
					<li className={'one'+(page_no == text_1 ? ' _active' : '')} onClick={() => paginationChange(text_1)}><span>{text_1}</span></li>
					<li className={'two'+(page_no == text_2 ? ' _active' : '')} onClick={() => paginationChange(text_2)}><span>{text_2}</span></li>
					{ max_rows > length*2 && text_3 <= last ? (
						<li className={'three'+(page_no == text_3 ? ' _active' : '')} onClick={() => paginationChange(text_3)}><span>{text_3}</span></li>
					) : null }
					<li onClick={(e) => paginationChange(next)}><img src={nextImg} /></li>
					{ max_rows > length*2 ? ( <li onClick={(e) => paginationChange(last)}><img src={lastImg} /></li> ) : null }
				</ul>
			</div>
		) : null
	  );

	}

}

export default Pagination;
