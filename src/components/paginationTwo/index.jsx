import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.scss';
import FilterIcon from '../../themes/images/filter.svg';


class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render () {

    let { length, max_rows, page_no, paginationChange } = this.props;

    length     = parseInt(length);
    max_rows   = parseInt(max_rows);
    page_no    = parseInt(page_no);

    let prev  = page_no - 1;
        prev  = prev < 1 ? 1 : prev;
    let last  = Math.ceil(max_rows / length);
    let next  = page_no + 1;
        next  = next > last ? last : next;

    return (
      max_rows > length ? (
        <div className="pagination-2">
          <button className="pg-p" onClick={() => paginationChange(prev)}>
            <svg width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6.37424L3.39332 7L6.11959e-07 3.5L3.39332 1.07014e-06L4 0.625759L1.21337 3.5L4 6.37424Z" fill="white"/></svg> Previous
          </button>
          {/*<button className="pg-no"><b>{page_no+" "}</b>/<b>{" "+length}</b></button>*/}
          <button className="pg-no"><b>{page_no}</b></button>
          <button className="pg-n" onClick={(e) => paginationChange(next)}>
            Next <svg width="4" height="7" viewBox="0 0 4 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0.625758L0.606684 0L4 3.5L0.606684 7L0 6.37424L2.78663 3.5L0 0.625758Z" fill="white"/></svg>
          </button>
        </div>
      ) : null
    );

  }

}

export default Pagination;