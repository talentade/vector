import React, { Component } from 'react';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';

import addstory from "../../themes/images/addstory.png";
import addfile from "../../themes/images/addfile.png";
import addvideo from "../../themes/images/addvideo.png";
import addimage from "../../themes/images/addimage.png";
import publish from "../../themes/images/publish.png";

import '../../components/standard/standard.scss';
import './index.scss';

class PostNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }

  }

  render() {
    return (
      <Container>
      <div className="col-12" id="postnews-container">
        <div className="news-section-right">
          <Breadcrumbs breads="Home, News, Post News" />
          <h1 className="page-title">Post News</h1>

          <div className="post-container">

            <div className="post-header">
              <svg width="20" height="17" viewBox="0 0 20 17" fill="none">
                <rect y="7" width="20" height="2" rx="1" fill="#00A880"/>
                <rect x="4" width="12" height="2" rx="1" fill="#00A880"/>
                <rect x="4" y="15" width="12" height="2" rx="1" fill="#00A880"/>
              </svg>
              <h6 contentEditable="true" className="n-title" data-placeholder="Title"></h6>
            </div>
            <div className="post-story">

              <p className="story" contentEditable="true" data-placeholder="Story"></p>
              <div className="story-actions">
                <img src={addstory} className="_active"/>
                <img src={addfile} />
                <img src={addvideo} />
                <img src={addimage} />
              </div>

              <button className="publish-btn">Publish <img src={publish} /></button>

            </div>
          </div>

        </div>
      </div>
      </Container>
    );
  }
};

export default PostNews;
