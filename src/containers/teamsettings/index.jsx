import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/index';
import Breadcrumbs from '../../components/breadcrumbs/index';
import teamCover from "../../themes/images/team-cover.png";
import teamPhone from "../../themes/images/team-phone.png";
import teamImg from "../../themes/images/team-img.png";
import '../../components/standard/standard.scss';
import './index.scss';

class TeamSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navi: 0
    }

  }

  selectList = (e) => {

  }

  render() {
    const { navi } = this.state;

    return (
      <Container>
      <div className="col-12" id="team-container">
          <div className="team-section-right">
            <Breadcrumbs breads="Home, Team settings, Teammates" />
            <h1 className="page-title" style={{marginBottom: "1em"}}>Teammates</h1>


            <ul className="team-list">
              <li>
                <div className="team-card">
                  <img src={teamCover} className="tc"/>
                  <img src={teamImg} className="tdp"/>
                  <div className="team-info">
                    <b>Phil Jones</b>
                    <span className="em">pjones@gmail.com</span>
                    <span className="ph"><img src={teamPhone} className="tp" />+2349031900410</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="team-card">
                  <img src={teamCover} className="tc"/>
                  <img src={teamImg} className="tdp"/>
                  <div className="team-info">
                    <b>Phil Jones</b>
                    <span className="em">pjones@gmail.com</span>
                    <span className="ph"><img src={teamPhone} className="tp" />+2349031900410</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="team-card">
                  <img src={teamCover} className="tc"/>
                  <img src={teamImg} className="tdp"/>
                  <div className="team-info">
                    <b>Phil Jones</b>
                    <span className="em">pjones@gmail.com</span>
                    <span className="ph"><img src={teamPhone} className="tp" />+2349031900410</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="team-card">
                  <img src={teamCover} className="tc"/>
                  <img src={teamImg} className="tdp"/>
                  <div className="team-info">
                    <b>Phil Jones</b>
                    <span className="em">pjones@gmail.com</span>
                    <span className="ph"><img src={teamPhone} className="tp" />+2349031900410</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="team-card">
                  <img src={teamCover} className="tc"/>
                  <img src={teamImg} className="tdp"/>
                  <div className="team-info">
                    <b>Phil Jones</b>
                    <span className="em">pjones@gmail.com</span>
                    <span className="ph"><img src={teamPhone} className="tp" />+2349031900410</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="team-card">
                  <img src={teamCover} className="tc"/>
                  <img src={teamImg} className="tdp"/>
                  <div className="team-info">
                    <b>Phil Jones</b>
                    <span className="em">pjones@gmail.com</span>
                    <span className="ph"><img src={teamPhone} className="tp" />+2349031900410</span>
                  </div>
                </div>
              </li>
            </ul>

            <section className="add-team">
              <div>
                <h3>Add Teammate</h3>
                <input type="text" className="tf" placeholder="Full name" />
                <input type="text" className="tf" placeholder="Email" />
                <input type="text" className="tf" placeholder="Phone number" />
                <input type="password" className="tf" placeholder="Password" />
                <input type="password" className="tf" placeholder="Repeat Password" />
                <button className="create-btn">SEND INVITE</button>
              </div>
            </section>

          </div>
      </div>
      </Container>
    );
  }

};

export default TeamSettings;
