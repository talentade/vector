import React, { Component } from 'react';
import $ from 'jquery';
import '../../utils/cursor.js';
import Container from '../container/index';
import Pagination from '../../components/Pagination/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import DummyImage from '../../themes/images/dummy.jpg';

import server from '../../services/server';
import app from '../../services/app';

import addstory from "../../themes/images/addstory.png";
import addfile from "../../themes/images/addfile.png";
import addvideo from "../../themes/images/addvideo.png";
import addimage from "../../themes/images/addimage.png";
import publish from "../../themes/images/publish.png";

import '../../components/standard/standard.scss';
import './index.scss';

function getCaretPosition(editableDiv) {
  var caretPos = 0, sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}


class PostNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cover: "",
      showLoader: false,
    }

  }

  componentDidMount () {
    var update = function() {
      getCaretPosition(this) && $('#caretposition').html(getCaretPosition(this));
    };

    $('.story, .story *').on("mousedown mouseup keydown keyup focus", update);

    $(document).delegate(".story-thumbnail", "click", () => {
      $("#file").trigger("click");
    });
  }

  pasteLink = () => {
    let html = $(".story").html().replace(/(&nbsp;)/g, " ");
    $(".story").html(html.substr(0, Number($('#caretposition').text()))+"&nbsp;<a>link</a>&nbsp;"+html.substr(Number($('#caretposition').text())));
    $(".story").focus().setCursorPosition(Number($('#caretposition').text())+6);
  }

  pasteImage = (src = null) => {
    let html = $(".story").html();
    if(src) {
      $(".story").html(html+ '<img src="'+src+'">').focus();
    } else {
      $(".story").html(
        html.substr(0, Number($('#caretposition').text()))+
        '<img class="new-source" src="'+(src ? src : DummyImage)+'">'+
        html.substr(Number($('#caretposition').text()))
      ).focus();
    }
  }

  btnSave = async () => {
    this.setState({ showLoader: true });
    try {
      let title = $(".n-title").text();
      $(".story a, .story font").each((k, v) => {
        let href = $(v).text().trim();
        console.log(href.substr(0, 4));
        if(href.substr(0, 4) != "http") {
          href = "http://"+href;
        }
        $(v).replaceWith('<a href="'+href+'">'+href+'</a>');
      });
      let story = $(".story").html();
      if(
        title.length && story.length && this.state.cover.length
      ) {
        let news = await server.saveNews({title, story, cover: this.state.cover});
        window.location.href = "/News";
      } else {

      }
    } catch (e) {
      return e;
    }
    this.setState({ showLoader: false });
  }

  handleFileChange = async (e) => {
    const current = e.target.files[0];
    if(e.target.files[0]) {
      const fd = new FormData();
      fd.append('profile_doc.png', current, current.name);
      this.setState({ showLoader: true });
      try {
        let new_img = await server.newsImage(fd);
        this.setState({cover: new_img.data.path});
        $(".story-thumbnail").attr("src", new_img.data.path);
        this.setState({ showLoader: false });
        // this.pasteImage(new_img.data.path);
      } catch (error) {
        this.setState({ showLoader: false });
        return error.message;
      }
    }
  };


  render() {
    return (
      <Container>
      <div className="col-12" id="postnews-container">
        <div className='loader-container' style={{ display: this.state.showLoader ? 'block' : 'none' }}>
          <div className='loader'></div>
        </div>
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
              <h6 contentEditable="true" spellCheck="false" className="n-title" data-placeholder="Title"></h6>
            </div>

            <img class="story-thumbnail" src={DummyImage} />

            <div className="post-story">

              <div className="story" spellCheck="false" contentEditable="true" data-placeholder="Story"></div>
              <div className="story-actions">
                {/*<img src={addstory} className="_active"/>*/}
                <img src={addfile} onClick={this.pasteLink} />
                {/*<img src={addvideo} />*/}
                {/*<img src={addimage} className="pasteImage" />*/}
              </div>

              {this.state.cover.length ? <button className="publish-btn" onClick={this.btnSave}>Publish <img src={publish} /></button> : null}

            </div>
          </div>


          <div id="caretposition">0</div>
          <input
            type='file'
            name='myImage'
            id='file'
            accept='image/x-png,image/gif,image/jpeg'
            onChange={this.handleFileChange}
          />

        </div>
      </div>
      </Container>
    );
  }
};

export default PostNews;
