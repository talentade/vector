import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import TableFilters from '../../components/tablefilters/index';
import Pagination from '../../components/Pagination/index';
import server from '../../services/server';
import Spinner from '../../components/spinner/index';
import news1 from '../../themes/images/news1.png';
import ss1 from '../../themes/images/ss1.png';
import ss2 from '../../themes/images/ss2.png';
import ss3 from '../../themes/images/ss3.png';
import tn from '../../themes/images/tn.png';
import addstory from '../../themes/images/addstory.png';
import todays_news from '../../themes/images/todays_news.png';
import './index.scss';

class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNews: null,
      showSpinner: false,
      showLoader: false,
      hotStocks: [],
      news: [],
      activeNews: null
    }
  }

  async componentDidMount () {

    this.fetchStock();

  }


  fetchStock = async () => {
    this.setState({ showLoader: true });
    const userId = localStorage.getItem('id');
    try {
      const {
        data: {
          data: { news },
        },
      } = await server.getMarketAndNewsData(userId);
      // console.log(news);
      this.setState({ news: news, activeNews: news[0], showLoader: false });
    } catch (error) {
      this.setState({ showLoader: false });
      if (!error.response) {
        return error.message;
      }
    }
  }

  readNews = (i) => {
    this.setState({ activeNews: this.state.news[i] });
  }

  readMore = async (link) => {
    // console.log(link);
    this.setState({ showLoader: true });
    const userId = localStorage.getItem('id');
    try {
      let fulltext = await server.loadCore(userId, link);
      if(fulltext.status == 200) {
        let news = this.state.activeNews;
        news["readMore"] = fulltext.data.replace('href="http', 'target="_blank" href="http');
        this.setState({ activeNews : news });
      }
      this.setState({ showLoader: false });
    } catch (error) {
      this.setState({ showLoader: false });
      if (!error.response) {
        return error.message;
      }
    }
  }

  render() {
    return (
      <Container>
      <Spinner showSpinner={this.state.showLoader} />
      <div className="col-12" id="news-container">
          {(this.state.activeNews) ? (
          <div className="news-section-left">
            <TableFilters table="news" />
            <img src={this.state.activeNews.image_mini.url} className="ifm" />
            <h1 className="news-header">{this.state.activeNews.title}</h1>
            {
              (this.state.activeNews.readMore) ?
              <p className="news-content" dangerouslySetInnerHTML={{__html: this.state.activeNews.readMore}} /> :
              <p className="news-content">{this.state.activeNews.summary}</p>
            }
            {(this.state.activeNews.readMore) ? (null) : (
            <a className="read-more" style={{float: "right", cursor: "pointer"}} onClick={() => this.readMore(this.state.activeNews.fulltext)}>Read more&nbsp;
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.893939 -3.90753e-08L-2.2249e-07 0.910026L5 6L10 0.910026L9.10606 -3.98039e-07L5 4.17995L0.893939 -3.90753e-08Z" fill="#1FCF65"/>
              </svg>
            </a>
            )}

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
          </div>) : (null)}
          <div className="news-section-right">
            <h1 className="news-header">Today’s News</h1>
            <img src={todays_news} className="fti" />
            <ul className="todays-ul">
            {
              this.state.news.map((news, key) => (
                <li className="todays-li">
                  <img src={news.image_mini.url} style={{width: "auto"}} />
                  <span>{news.title}<button className="read btn btn-primary btn-bottom" onClick={() => this.readNews(key)}>Read</button>
                  </span>
                </li>
              ))
            }
              {/*<li className="todays-li">
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
              </li>*/}
            </ul>
            {/*<Link to="/PostNews" className="publish-btn">Post News <img src={addstory} /></Link>*/}
            <Pagination length="4" max_rows="20" page_no="1" paginationChange={() => {}}/>
          </div>
        </div>
      </Container>
    );
  }
};

export default News;
