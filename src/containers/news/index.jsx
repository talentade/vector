import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import news1 from '../../themes/images/news1.png';
import ss1 from '../../themes/images/ss1.png';
import ss2 from '../../themes/images/ss2.png';
import ss3 from '../../themes/images/ss3.png';
import tn from '../../themes/images/tn.png';
import todays_news from '../../themes/images/todays_news.png';
import './index.scss';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNews: null,
    }
  }

  render() {
    return (
      <Container>
      <div className="col-12" id="news-container">
          <div className="news-section-left">
            <img src={news1} className="ifm" />
            <h1 className="news-header">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </h1>
            <p className="news-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed<br />do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Tincidunt lobortis feugiat vivamus at. Diam sollicitudin tempor<br />id eu 
              nisl nunc mi ipsum faucibus. Facilisi cras fermentum odio eu<br />feugiat 
              pretium nibh. Viverra ipsum nunc aliquet bibendum.
            </p>
            <p className="news-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
             eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Tincidunt lobortis feugiat vivamus at. Diam sollicitudin tempor id eu 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Tincidunt lobortis feugiat vivamus at. Diam sollicitudin tempor id eu </p>

            <a className="read-more" style={{float: "right"}}>Read more&nbsp;
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.893939 -3.90753e-08L-2.2249e-07 0.910026L5 6L10 0.910026L9.10606 -3.98039e-07L5 4.17995L0.893939 -3.90753e-08Z" fill="#1FCF65"/>
              </svg>
            </a>

            <div className="similar-stories">
              <h1 className="news-header">
               Similar Stories
              </h1>

              <ul className="stories">
                <li>
                  <img src={ss1} className="ss-thumbnail"/>
                  <p>Breaking: Soldiers on rampage in Bomadi over shooting of colleague by police</p>
                  <button className="read btn btn-primary">Read</button>
                </li>
                <li>
                  <img src={ss2} className="ss-thumbnail"/>
                  <p>Breaking: Soldiers on rampage in Bomadi over shooting of colleague by police</p>
                  <button className="read btn btn-primary">Read</button>
                </li>
                <li>
                  <img src={ss3} className="ss-thumbnail"/>
                  <p>Breaking: Soldiers on rampage in Bomadi over shooting of colleague by police</p>
                  <button className="read btn btn-primary">Read</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="news-section-right">
            <h1 className="news-header">Today’s News</h1>
            <img src={todays_news} className="fti" />
            <ul className="todays-ul">
              <li className="todays-li">
                <img src={tn} />
                <span>
                  Lorem ipsum dolor sit amet, consectetur amet sirlobo...
                  <button className="read btn btn-primary btn-bottom">Read</button>
                </span>
              </li>
              <li className="todays-li">
                <img src={tn} />
                <span>
                  Lorem ipsum dolor sit amet, consectetur amet sirlobo...
                  <button className="read btn btn-primary btn-bottom">Read</button>
                </span>
              </li>
              <li className="todays-li">
                <img src={tn} />
                <span>
                  Lorem ipsum dolor sit amet, consectetur amet sirlobo...
                  <button className="read btn btn-primary btn-bottom">Read</button>
                </span>
              </li>
              <li className="todays-li">
                <img src={tn} />
                <span>
                  Lorem ipsum dolor sit amet, consectetur amet sirlobo...
                  <button className="read btn btn-primary btn-bottom">Read</button>
                </span>
              </li>
            </ul>
            <Pagination length="4" max_rows="20" page_no="1" paginationChange={() => {}}/>
          </div>
        </div>
      </Container>
    );
  }
};

export default News;
