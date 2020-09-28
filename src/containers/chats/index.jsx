import React, { Component } from 'react';
import Container from '../container/index';
import Spinner from '../../components/spinner/index';
import SearchIcon from '../../themes/images/micro.svg';
import Send from '../../themes/images/send.png';
import person1 from '../../themes/images/person1.png';
import ppl from '../../themes/images/paper-plane.png';
import CancelIcon from '../../themes/images/cancel.svg';
import server from '../../services/server';
import app from '../../services/app';
import './index.scss';

class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfo: false
    };

    this.profile = app.profile();
    this.id = this.profile.user_id;
  }

  async componentDidMount() {

  }

  render() {
    return (
      <Container>
        <Spinner showSpinner={this.showSpinner} />
        <div className='chat-section'>
          <div className="c-list">

            <div className='c-search'>
              <input
                type='text'
                name='search'
                placeholder='Search'
              />
              <img src={SearchIcon} alt='' />
            </div>

            <ul className="people">
              <li className="active">
                <img src={person1} />
                <div className="p-info">
                  <h4>Sola Alabi</h4>
                  <span>Okay, so what are we supposed to do...</span>
                </div>
              </li>
              <li>
                <img src={person1} />
                <div className="p-info">
                  <h4>Sola Alabi</h4>
                  <span>Okay, so what are we supposed to do...</span>
                </div>
              </li>
              <li>
                <img src={person1} />
                <div className="p-info">
                  <h4>Sola Alabi</h4>
                  <span>Okay, so what are we supposed to do...</span>
                </div>
              </li>
            </ul>
          </div>
          <div className='c-main'>

            <div className="section1">
              <img src={person1} />
              <div className="p2-info">
                <h4>Sola Alabi</h4>
                <span>Online</span>
              </div>
            </div>

            <div className="section2">

              <ul id="messageList">

                <li className="y-msg">
                  <div className="m-text">Hi, good evening</div>
                  <small className="m-time">12:00</small>
                </li>

                <li className="m-msg">
                  <small className="m-time">12:00</small>
                  <div className="m-text">Hey, Sola... What’s up</div>
                </li>

                <li className="y-msg">
                  <div className="m-text">I’m fine. How ‘bout you?</div>
                  <small className="m-time">12:00</small>
                </li>

                <li className="m-msg">
                  <small className="m-time">12:00</small>
                  <div className="m-text">I’m doing great<br /><br />I just had a call with the CEO of Melbul and he said all the team members should prepare to have a meeting by 3pm today.</div>
                </li>

                <li className="y-msg">
                  <div className="m-text">I forgot, I was supposed to send this yesterday.</div>
                  <small className="m-time">12:00</small>
                </li>

                <li className="y-msg">
                  <div className="m-text">Okay, SO what are we supposed to do to prepare for the meeting?</div>
                  <small className="m-time">12:00</small>
                </li>

              </ul>

            </div>
            <div className="section3">
              <textarea type="text" spellcheck="false" id="messageInput"></textarea>
              <button className="send"><img src={Send} /></button>
            </div>

          </div>
        </div>
      </Container>
    );
  }
}

export default Chats;
