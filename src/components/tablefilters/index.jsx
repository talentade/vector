import React, { Component } from 'react';
import $ from 'jquery';
import Breadcrumbs from '../breadcrumbs/index';
import SearchIcon from "../../themes/images/tradeDashboard/search.svg";
import downloadIcon from "../../themes/images/download.png";
import downloadWhite from "../../themes/images/down-white.png";
import refreshIcon from "../../themes/images/refresh.png";
import exportIcon from "../../themes/images/export.png";
import calendar from "../../themes/images/calendar-search.png";
import checkCircle from "../../themes/images/check-circle.png";
import deleteIcon from "../../themes/images/delete.png";
import more from "../../themes/images/more.png";
import refresh from "../../themes/images/refil.png";
import './index.scss';

class TableFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsSearchDrop: false
    }
  }

  toggleActive = (e, i) => {
    document.querySelectorAll(i+" li").forEach(function(el) {
      el.classList.remove("_active");
    });
    e.target.classList.add("_active");
  }

  componentDidMount () {
  }

  render () {
  	return (
      <>
      {this.props.table === "users" ? (
        <div className="table-filters">
          <div className="search-container select-box">
            <select>
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="search-container select-box" style={{width: "170px"}}>
            <select>
              <option>All users</option>
              <option>Deleted Users</option>
            </select>
          </div>
          <div className="search-container" style={{width: "220px"}}>
            <input type="text" placeholder="05/03/2020 - 05/03/2020" />
          </div>

          <div className="filter-actions">
            <div className="search-container" style={{width: "300px"}}>
              <input type="text" placeholder="Search" />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>

            <button className="fil-act-btn"><img src={downloadIcon} /></button>
            <button className="fil-act-btn"><img src={refreshIcon} /></button>
            <button className="fil-act-btn"><img src={exportIcon} /></button>
          </div>
        </div>
      ) : null}

      {this.props.table === "admins" ? (
        <div className="table-filters">
          <div className="search-container select-box" style={{width: "174px"}}>
            <select>
              <option>Active Admins</option>
              <option>Inactive Admins</option>
            </select>
          </div>
          <img src={calendar} className="calendar-search"/>

          <div className="filter-actions">
            <div className="search-container" style={{width: "250px"}}>
              <input type="text" placeholder="Search" />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>
            <button className="create-btn">Create Admin</button>
          </div>
        </div>
      ) : null}

      {this.props.table === "news" ? (
        <div className="table-filters" style={{marginBottom: "1em"}}>
          <Breadcrumbs breads="Home, News" />
          <div className="filter-actions">

            <div className="search-container" style={{width: "280px", overflow: "unset"}}>
              <input
                type="text"
                id="newsSearchDrop"
                spellCheck="false"
                placeholder="Search News"
                onKeyUp={(e) => { this.setState({newsSearchDrop: true}); this.props.keyUp(e) }}
                onFocus={(e) => { this.setState({newsSearchDrop: true}) }}
                onBlur={(e) => { setTimeout(() => this.setState({newsSearchDrop: false}), 500); }}
              />
              <img src={SearchIcon} className="search-img" alt="" />
              <div className={"gr-dropdown news"+(this.state.newsSearchDrop ? " _active" : "")}>
              {
                this.props.results.map((news) => (
                  <span onClick={(e) => { this.props.readNews(news.i); this.setState({newsSearchDrop: false}); $("#newsSearchDrop").val(''); }} className="cgt" key={`${Math.random()} ${Math.random()}`}>{news.title}</span>
                ))
              }
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {this.props.table === "instruments" ? (
        <div className="table-filters" style={{marginTop: "2em", marginBottom: "2em"}}>
          <ul className="borderad-menu">
            <li className="_active" onClick={(e) => { this.props.switchTo("forex"); this.toggleActive(e, '.borderad-menu')}}>Forex</li>
            <li onClick={(e) => { this.props.switchTo("crypto"); this.toggleActive(e, '.borderad-menu')}}>Crypto</li>
            <li onClick={(e) => { this.props.switchTo("commodities"); this.toggleActive(e, '.borderad-menu')}}>Commodity</li>
            <li onClick={(e) => { this.props.switchTo("indices"); this.toggleActive(e, '.borderad-menu')}}>Indices</li>
            <li onClick={(e) => { this.props.switchTo("stock"); this.toggleActive(e, '.borderad-menu')}}>Stock</li>
          </ul>

          <div className="filter-actions">
            <button className="create-btn" style={{width: "200px"}}>+ Add Instrument</button>
          </div>
        </div>
      ) : null}


      {this.props.table === "lists" ? (
        <div className="table-filters">
          <div className="filter-actions">
            <button className="clear-btn">Download Data</button>
            <div className="search-container" style={{width: "300px"}}>
              <input type="text" placeholder="Search" />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>
          </div>
      </div>) : null}


      {this.props.table === "calls" ? (
        <div className="table-filters lab">
          <small>Show :</small>
          <div className="search-container select-box">
            <select>
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
      </div>) : null}


      {this.props.table === "trade" ? (
        <div className="table-filters" style={{margin: "0 1em 1em"}}>
          <div className="search-container select-box" style={{width: "160px"}}>
            <select onChange={this.props.changeType}>
              <option value="0">Pending Trades</option>
              <option value="1">Open Trades</option>
              <option value="2">Closed Trades</option>
            </select>
          </div>
          <img src={calendar} className="calendar-search"/>

          <div className="filter-actions">
            <div className="search-container" style={{width: "300px"}}>
              <input type="text" placeholder="Search" onChange={this.props.handleChange} />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>
            <div className="search-container select-box" style={{width: "140px"}}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: "absolute", top: "9px", left: "4px"}}>
                <path d="M19.2569 0H0.820313C0.388794 0 0.0390625 0.349732 0.0390625 0.78125C0.0390625 2.95685 0.97168 5.03388 2.59781 6.47934L6.01929 9.52042C6.61255 10.0478 6.95282 10.8055 6.95282 11.5994V19.2178C6.95282 19.8404 7.64862 20.2136 8.16727 19.8677L12.7765 16.795C12.9938 16.6501 13.1244 16.4063 13.1244 16.145V11.5994C13.1244 10.8055 13.4647 10.0478 14.0579 9.52042L17.4793 6.47934C19.1054 5.03388 20.038 2.95685 20.038 0.78125C20.038 0.349732 19.6883 0 19.2569 0ZM16.4412 5.31143L13.0199 8.35266C12.0934 9.17633 11.5619 10.3597 11.5619 11.5993V15.7269L8.51517 17.758V11.5994C8.51517 10.3597 7.98371 9.17633 7.05719 8.35266L3.63587 5.31159C2.53937 4.3367 1.83945 3.00095 1.65207 1.56235H18.425C18.2376 3.00095 17.5378 4.3367 16.4412 5.31143Z" fill="#03CF9E"/>
              </svg>
              <select style={{paddingLeft: "25px"}} onChange={this.props.onChange}>
                {this.props.filterOptions.map((option) => (
                  <option key={`${option}-1`} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
      </div>) : null}


      {this.props.table === "tasks" ? (
        <div className="table-filters lab">
          <small>Show :</small>
          <div className="search-container select-box">
            <select>
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="search-container select-box" style={{width: "130px"}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: "absolute", top: "9px", left: "4px"}}>
              <path d="M19.2569 0H0.820313C0.388794 0 0.0390625 0.349732 0.0390625 0.78125C0.0390625 2.95685 0.97168 5.03388 2.59781 6.47934L6.01929 9.52042C6.61255 10.0478 6.95282 10.8055 6.95282 11.5994V19.2178C6.95282 19.8404 7.64862 20.2136 8.16727 19.8677L12.7765 16.795C12.9938 16.6501 13.1244 16.4063 13.1244 16.145V11.5994C13.1244 10.8055 13.4647 10.0478 14.0579 9.52042L17.4793 6.47934C19.1054 5.03388 20.038 2.95685 20.038 0.78125C20.038 0.349732 19.6883 0 19.2569 0ZM16.4412 5.31143L13.0199 8.35266C12.0934 9.17633 11.5619 10.3597 11.5619 11.5993V15.7269L8.51517 17.758V11.5994C8.51517 10.3597 7.98371 9.17633 7.05719 8.35266L3.63587 5.31159C2.53937 4.3367 1.83945 3.00095 1.65207 1.56235H18.425C18.2376 3.00095 17.5378 4.3367 16.4412 5.31143Z" fill="#03CF9E"/>
            </svg>
            <select style={{paddingLeft: "25px"}}>
              <option>All</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>
          <img src={calendar} className="calendar-search"/>

          <div className="filter-actions">
            <div className="search-container" style={{width: "300px"}}>
              <input type="text" placeholder="Search" />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>
            <button className="create-btn" onClick={() => this.props.addTask()}>Create Task</button>
          </div>
      </div>) : null}


      {this.props.table === "payments" ? (
        <div className="table-filters">
          <div className="search-container select-box" style={{width: "140px"}}>
            <select>
              <option>All</option>
              <option>Deposit</option>
              <option>Withdrawal</option>
              <option>Transfer</option>
            </select>
          </div>
          <div className="search-container select-box" style={{width: "140px"}}>
            <select>
              <option>Pending</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Hold</option>
              <option>Processing</option>
            </select>
          </div>
          <div className="filter-actions">
            <div className="search-container" style={{width: "230px"}}>
              <input type="text" placeholder="Search" />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>
          </div>
      </div>) : null}


      {this.props.table === "notes" ? (
        <div className="table-filters" style={{marginLeft: "2.1em", marginRight: "2.1em"}}>
          <div className="search-container select-box" style={{width: "190px"}}>
            <select onChange={(e) => this.props.change(e)}>
              <option>All</option>
              <option>Last Month</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="filter-actions">
            <button className="create-btn" onClick={() => this.props.addNote()}>Add Note</button>
          </div>
      </div>) : null}


      {this.props.table === "campaigns" ? (
        <div className="table-filters">
          <div className="search-container select-box" style={{width: "150px"}}>
            <select>
              <option>Last 30 days</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="filter-actions">
            <div className="search-container" style={{width: "250px"}}>
              <input type="text" placeholder="Search" />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>
            <button className="create-btn" style={{width: "160px"}} onClick={() => this.props.handleClick()}>Start New Campaign</button>
          </div>
      </div>) : null}


      {this.props.table === "unsubscribers" ? (
        <div className="table-filters">
          <div className="search-container" style={{width: "300px", background: "transparent", color: "#fff", marginRight: "1em", borderWidth: "0 0 1px 0", borderRadius: "0"}}>
            <input type="text" placeholder="Search" />
            <img src={SearchIcon} className="search-img" alt="" />
          </div>
          <button className="create-btn" style={{width: "130px"}}>Download <img src={downloadWhite} className="bt-i" /></button>
      </div>) : null}


      {this.props.table === "meets" ? (
        <div className="table-filters lab">
          <small>Show :</small>
          <div className="search-container select-box">
            <select>
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="search-container select-box" style={{width: "130px"}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: "absolute", top: "9px", left: "4px"}}>
              <path d="M19.2569 0H0.820313C0.388794 0 0.0390625 0.349732 0.0390625 0.78125C0.0390625 2.95685 0.97168 5.03388 2.59781 6.47934L6.01929 9.52042C6.61255 10.0478 6.95282 10.8055 6.95282 11.5994V19.2178C6.95282 19.8404 7.64862 20.2136 8.16727 19.8677L12.7765 16.795C12.9938 16.6501 13.1244 16.4063 13.1244 16.145V11.5994C13.1244 10.8055 13.4647 10.0478 14.0579 9.52042L17.4793 6.47934C19.1054 5.03388 20.038 2.95685 20.038 0.78125C20.038 0.349732 19.6883 0 19.2569 0ZM16.4412 5.31143L13.0199 8.35266C12.0934 9.17633 11.5619 10.3597 11.5619 11.5993V15.7269L8.51517 17.758V11.5994C8.51517 10.3597 7.98371 9.17633 7.05719 8.35266L3.63587 5.31159C2.53937 4.3367 1.83945 3.00095 1.65207 1.56235H18.425C18.2376 3.00095 17.5378 4.3367 16.4412 5.31143Z" fill="#03CF9E"/>
            </svg>
            <select style={{paddingLeft: "25px"}}>
              <option>All</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Overdue</option>
            </select>
          </div>
          <img src={calendar} className="calendar-search"/>

          <div className="filter-actions">
            <div className="search-container" style={{width: "300px"}}>
              <input type="text" placeholder="Search" />
              <img src={SearchIcon} className="search-img" alt="" />
            </div>
            <button className="create-btn" onClick={() => this.props.addMeet()}>Create Meeting</button>
          </div>
      </div>) : null}


      {this.props.table === "emails" ? (
        <div className="table-filters" style={{marginBottom: "1em"}}>
          <div className="check-row"><label class="checkbox-container"><input type="checkbox" /><span class="checkmark"></span></label></div>
          <div className="search-container" style={{width: "300px"}}>
              <input type="text" placeholder="Search" />
              <img src={SearchIcon} className="search-img" alt="" />
          </div>
          <img src={refresh} className="filter-img"/>
          <img src={deleteIcon} className="filter-img"/>
          <img src={checkCircle} className="filter-img" style={{position: "relative", top: "6px", width: "23.5px", height: "25.5px"}}/>
          <img src={more} className="filter-img" style={{width: "4px"}}/>
          <button className="create-btn" style={{position: "absolute", right: "0"}}>Compose</button>
      </div>) : null}

    </>
  	)
	}

}

export default TableFilters;
