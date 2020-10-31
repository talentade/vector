import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Container from '../container/index';
import TableFilters from '../../components/tablefilters/index';
import Pagination from '../../components/Pagination/index';
import server from '../../services/server';
import app from '../../services/app';
import Spinner from '../../components/spinner/index';
import news1 from '../../themes/images/news1.png';
import ss1 from '../../themes/images/ss1.png';
import ss2 from '../../themes/images/ss2.png';
import ss3 from '../../themes/images/ss3.png';
import tn from '../../themes/images/tn.png';
import { ConfirmModal } from '../../components/popups/index';
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
      inews: [],
      searchR: [],
      news: [],
      max_rows: 1,
      page_no: 1,
      similar: [],
      activeNews: null,
      confirmID: 0,
      confirmModal: false
    }
  }

  async componentDidMount () {

    this.fetchNews();

  }


  fetchNews = async () => {
    this.setState({ showLoader: true });
    try {
      let {
        data: {
          data: { news },
        },
      } = await server.fetchNews();
      let news_2 = await server.getNews();
      let _news2 = news_2.data.news;
      if(_news2 && _news2.length) {
        news = _news2.concat(news);
      }
      this.setState({ showLoader: false });
      if(news) {
        news = this.processNews(news);
        if(news[0]["image_mini"]) {
          this.setState({ inews: news, news: news.length > 5 ? news.slice(0, 5) : news, max_rows: news.length, page_no: 1 });
          this.readNews(0);
        }
      }
    } catch (error) {
      this.setState({ showLoader: false });
      if (!error.response) {
        return error.message;
      }
    }
  }

  deleteNews = async (nid) => {
    this.setState({ showLoader: true });
    try {
      let del = await server.deleteNews(nid);
      window.location.href = "";
    } catch (e) {
      return e;
    }
    this.setState({ showLoader: false });
  }

  showNews = (p) => {
    let stt = (p-1)*5;
    let max = stt+5;
        max = max > this.state.max_rows ? this.state.max_rows : max;
    this.setState({news: this.state.inews.slice(stt, max > this.state.max_rows ? this.state.max_rows : max), page_no: p});
  }

  searchNews = val => {
    let results = [];
    val = val.trim();
    if(val.length) {
      this.state.inews.forEach((news, i) => {
        let pos = news.title.toLowerCase().search(val.trim().toLowerCase());
        news["i"] = i;
        if(pos > -1 && results.length < 7) results.push(news);
      });
    }
    this.setState({searchR: results});
  }

  showSearchedNews = () => {
    return this.state.searchR;
  }

  processNews = (news) => {
    let _news = [];
    news.forEach((val, key) => {
      val["i"] = key;
      if(val["image_original"]) {
        val["image_mini"] = val["image_original"];
      } else if(val["image_thumbnail"]) {
        val["image_mini"] = val["image_thumbnail"];
      } else if(val["cover"]) {
        val["image_mini"] = {url: val["cover"]};
        val["fulltext"] = val["content"];
        val["summary"] = val["content"].length > 50 ? val["content"].substr(0, 50)+"..." : val["content"];
      }
      _news.push(val);
    });
    return _news;
  }

  readNews = (i, h = -1) => {
    $("#news-container").scrollTop(0);
    this.setState({searchR: []});
    if(h > -1) {
      this.setState({ activeNews: this.state.inews[i] });
      return;
    } else if(this.state.inews.length) {
      let similar = [];
      this.setState({ activeNews: this.state.inews[i] });
      if(this.state.inews[i]["category"]) {
        let cat = this.state.inews[i].category;
        for(let j = 0; j < this.state.inews.length; j++) {
          if(this.state.inews[j].category == cat && similar.length < 3 && j != i) {
            similar[similar.length] = this.state.inews[j];
          }
        }
      } else if(this.state.news.length > 3) {
        // similar = [
        //   this.state.news[0],
        //   this.state.news[1],
        //   this.state.news[2]
        // ];
      }
      this.setState({similar: similar});
    }
  }

  readMore = async (link) => {
    this.setState({ showLoader: true });
    try {
      if(this.state.activeNews.category == "all") {
        let news = this.state.activeNews;
        news["readMore"] = news.fulltext.replace(/(href="http)/g, 'style="color: #1FCF65 !important;" target="_blank" href="http');
        this.setState({ activeNews : news, showLoader: false });
      } else {
        let fulltext = await server.loadLink(link);
        if(fulltext.status == 200 && fulltext.data.length) {
          let news = this.state.activeNews;
          news["readMore"] = fulltext.data.replace(/(href="http)/g, 'style="color: #1FCF65 !important;" target="_blank" href="http');
          this.setState({ activeNews : news });
        }
        this.setState({ showLoader: false });
      }
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
      {/*<Spinner showSpinner={this.state.showLoader} />*/}
      <ConfirmModal
        head="Delete this news?"
        text="Click YES to confirm"
        show={this.state.confirmModal}
        cancel={() => this.setState({confirmModal: false})}
        confirm={() => this.deleteNews(this.state.confirmID)}
      />
      <div className="col-12" id="news-container">
          <div className='loader-container' style={{ display: this.state.showLoader ? 'block' : 'none' }}>
            <div className='loader'></div>
          </div>

          {(this.state.activeNews) ? (
          <div className="news-section-left">
            <TableFilters
              table="news"
              keyUp={(e) => this.searchNews(e.target.value)}
              results={this.state.searchR}
              showSearchedNews={this.showSearchedNews}
              readNews={this.readNews}
            />
            <img src={this.state.activeNews.image_mini.url} className="ifm" />
            <h1 className="news-header">{this.state.activeNews.title}</h1>
            {
              (this.state.activeNews.readMore) ?
              <p className="news-content" dangerouslySetInnerHTML={{__html: this.state.activeNews.readMore}} /> :
              (this.state.activeNews.category == "all") ?
              <p className="news-content" dangerouslySetInnerHTML={{__html: this.state.activeNews.summary}} /> :
              <p className="news-content">{this.state.activeNews.summary}</p>
            }
            {(this.state.activeNews.readMore) ? (null) : (
            <a className="read-more" style={{float: "right", cursor: "pointer"}} onClick={() => this.readMore(this.state.activeNews.fulltext)}>Read more&nbsp;
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.893939 -3.90753e-08L-2.2249e-07 0.910026L5 6L10 0.910026L9.10606 -3.98039e-07L5 4.17995L0.893939 -3.90753e-08Z" fill="#1FCF65"/>
              </svg>
            </a>
            )}

            {this.state.similar.length ? (
              <div className="similar-stories">
                <h1 className="news-header">
                 Similar Stories
                </h1>

                <ul className="stories">
                {
                  this.state.similar.map((news, key) => (
                    <li className="todays-li">
                      <img src={news.image_mini.url} style={{width: "auto"}} className="ss-thumbnail"/>
                      <p className="n-title">{news.title}</p>
                      <button className="read btn btn-primary" onClick={() => this.readNews(news.i, 0)}>Read</button>
                    </li>
                  ))
                }
                </ul>
              </div>
            ) : (null)
          }
          </div>) : (null)}
          {this.state.news.length ? (
            <div className="news-section-right">
              <h1 className="news-header">Today’s News</h1>
              <ul className="todays-ul">
              {
                this.state.news.map((news, key) => (
                  <li className="todays-li">
                    <img src={news.image_mini.url} style={{width: "auto"}} />
                    <span>{news.title}
                    {app.isAdmin() && news.category == "all" ? <button className="del btn btn-primary" onClick={() => this.setState({confirmID: news.id, confirmModal: true})}>Delete</button> : null}
                    <button className="read btn btn-primary btn-bottom" onClick={() => this.readNews(news.i)}>Read</button>
                    </span>
                  </li>
                ))
              }
              </ul>
              {app.isAdmin() ? <Link to="/PostNews" className="publish-btn">Post News <img src={addstory} /></Link> : null}
              <Pagination length="5" max_rows={this.state.max_rows} page_no={this.state.page_no} paginationChange={(p) => { this.showNews(p); }}/>
            </div>
          ): null}
          </div>
      </Container>
    );
  }
};

export default News;
