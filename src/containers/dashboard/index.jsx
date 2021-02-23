import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import App from '../../services/app';
import v1 from './v1.png';
import v2 from './v2.png';
import v3 from './v3.png';
import './index.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render () {
  	return (
    <section className="section1">
        <div className="well p-3 px-5 bg-white mb-5">
            <div className="container">
                <div className="text-right">
                    <span className="mr-3">User</span>
                    <img src={v1} alt="" />
                </div>
            </div>
        </div>
        <div className="container mt-5 p-5">
            <div className="row">
                <Link to="Support" className="col-md-5 col-lg-5 col-12 box px-4 py-3">
                    <img src={v2} alt="" />
                    <p className="mt-5">
                        Open Support Ticket
                        <span className="float-right">
                            <i className="fa fa-long-arrow-right fa-2x"></i>
                        </span>
                    </p>
                </Link>
                <div className="col-md-2 col-lg-2 col-12"></div>
                <Link to="Viewsupport" className="col-md-5 col-lg-5 col-12 box px-4 py-3">
                    <img src={v3} alt="" />
                    <p className="mt-5">
                        View Support Ticket
                        <span className="float-right">
                            <i className="fa fa-long-arrow-right fa-2x"></i>
                        </span>
                    </p>
                </Link>
            </div>
        </div>
        <div className="row bg-white h-100 logout position-relative">
            <div onClick={() => App.logout()} style={{cursor: "pointer"}} className="container p-5">
                <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i> <span style={{position: "relative", top: "-6px"}}>Log Out</span>
            </div>
        </div>
    </section>
	 );
	}

}

export default Dashboard;
