import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import v2 from './v2.png';
import './index.css';

class Viewsupport  extends Component {
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
                    <img src={v2} alt="" />
                </div>
            </div>
        </div>
        <div className="container">
            <h3>View Support Tickets</h3>
            <p className="text-muted">Home  /  View Support Tickets</p>
        </div>
        <div className="container mt-5">
            <div className="row p-5 box">
                <div className="col-md-12 col-lg-12 col-12 ">

                {
                  "1,2,3,4,5,5,6,7".split(",").map((u, k) => (
                  <div className="form-group border-bottom" key={k+'-dgp'}>
                      <h5 for="email"><Link to="Detailed">#UAM-216-40579 - Flex-cloud Restoration.</Link>
                          <span className={"online"+(k > 1 ? "3" : k > 0 ? "2" : "")}> &nbsp;{(k > 1 ? "Closed" : k > 0 ? "Replied" : "Opened")}</span>
                      </h5>
                      <div className="row mt-4">
                          <div className="col-md-4 col-12">
                              <p className="text-muted">Last Updated: 2hours ago</p>
                          </div>
                          <div className="col-md-4 col-12">
                              <p className="text-muted">Dapartment: Tech</p>
                          </div>
                          <div className="col-md-4 col-12">
                              <p className="text-muted">Priority: Medium</p>
                          </div>
                      </div>
                    </div>
                  ))
                }
                    {/*<div className="form-group border-bottom">
                        <h5 for="email">#UAM-216-40579 - Flex-cloud Restoration.
                            <span className="online"> &nbsp;Open</span>
                        </h5>
                        <div className="row mt-4">
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Last Updated: 2hours ago</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Dapartment: Tech</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Priority: Medium</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group border-bottom">
                        <h5 for="email">#UAM-216-40579 - Flex-cloud Restoration.
                            <span className="online2"> &nbsp;Replied</span>
                        </h5>
                        <div className="row mt-4">
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Last Updated: 2hours ago</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Dapartment: Tech</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Priority: Medium</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group border-bottom">
                        <h5 for="email">#UAM-216-40579 - Flex-cloud Restoration.
                            <span className="online3"> &nbsp;Closed</span>
                        </h5>
                        <div className="row mt-4">
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Last Updated: 2hours ago</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Dapartment: Tech</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Priority: High</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group border-bottom">
                        <h5 for="email">#UAM-216-40579 - Flex-cloud Restoration.
                            <span className="online3"> &nbsp;Closed</span>
                        </h5>
                        <div className="row mt-4">
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Last Updated: 2hours ago</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Dapartment: Tech</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Priority: Medium</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group border-bottom">
                        <h5 for="email">#UAM-216-40579 - Flex-cloud Restoration.
                            <span className="online3"> &nbsp;Closed</span>
                        </h5>
                        <div className="row mt-4">
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Last Updated: 2hours ago</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Dapartment: Tech</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Priority: Low</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <h5 for="email">#UAM-216-40579 - Flex-cloud Restoration.
                            <span className="online3"> &nbsp;Closed</span>
                        </h5>
                        <div className="row mt-4">
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Last Updated: 2hours ago</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Dapartment: Tech</p>
                            </div>
                            <div className="col-md-4 col-12">
                                <p className="text-muted">Priority: High</p>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>
            
        </div>
    </section>

	 );
	}

}

export default Viewsupport;
