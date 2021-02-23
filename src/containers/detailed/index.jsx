import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import v2 from './v2.png';
import v3 from './v3.png';
import './index.css';

class Detailed extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render () {
  	return (
    <section class="section1">
        <div class="well p-3 px-5 bg-white mb-5">
            <div class="container">
                <div class="text-right">
                    <span class="mr-3">User</span>
                    <img src={v2} alt="" />
                </div>
            </div>
        </div>
        <div class="container">
            <h3> Tickets Information</h3>
            <p class="text-muted">Home  /  View Support Tickets  /  Detailed Ticket</p>
        </div>
        <div class="container mt-5">
            <div class="row p-5 box">
                <div class="col-md-12 col-lg-12 col-12 ">
                    <div class="form-group border-bottom">
                        <h5 for="email">#UAM-216-40579 - Flex-cloud Restoration.
                            <span class="online"> &nbsp;Open</span>
                        </h5>
                        <div class="row mt-4">
                            <div class="col-md-4 col-12">
                                <p class="text-muted">Last Updated: 2hours ago</p>
                            </div>
                            <div class="col-md-4 col-12">
                                <p class="text-muted">Dapartment: Tech</p>
                            </div>
                            <div class="col-md-4 col-12">
                                <p class="text-muted">Priority: Medium</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
        <div class="container mt-5">
            <form action="" method="post">
                <div class="row p-5 box">
                    <div class="col-md-6 col-12">
                        <div class="form-group mb-5">
                          <label for="email" class="text-muted">Name:</label>
                          <input type="text" class="form-control" id="message" />
                        </div>
                    </div>
                    <div class="col-md-6 col-12 ">
                        <div class="form-group mb-5">
                          <label for="email" class="text-muted">Enter Email Address:</label>
                          <input type="text" class="form-control" id="message" />
                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="form-group mb-5">
                          <label for="pwd" class="text-muted">Message:</label>
                          <textarea name="" class="form-control"  cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="input-group mb-3 position-relative">
                            <div class="input-group-prepend">
                              <span class="input-group-text p-3" id="basic-addon1">Select File</span>
                            </div>
                            <input type="file" id="file" onchange="" class="form-control d-none" placeholder="" required aria-label="Username" aria-describedby="basic-addon1" style={{border: "2px solid"}} />
                            <div class="input-group-append">
                                <button  type="submit" class="btn btn-primary btn-lg mx-4 but" style={{position: "absolute", right: "0px"}}> 
                                    <span style={{fontSize: "16px"}}>+</span>&nbsp; ADD MORE
                                </button>
                            </div>
                            <label for="file" class="myfile" id="fileLabel"> No File Selected</label>
                          </div>
                    </div>
                   <div class="col-12">
                    Allowed File Extensions: .jpg, .gif, .jpeg, .png, .pdf, zip, .doc, .docx
                   </div>
                </div>

                
                <div class="row p-5 ">
                    <div class="col-12 text-center">
                        <button  type="submit" class="btn btn-primary btn-lg mx-4 but" >Submit</button>
                    </div>
                </div>
            </form>

            

            <div class="container mt-5">
                <div class="row p-5 box">
                    <div class="col-md-12 col-lg-12 col-12 ">
                        <div class="form-group">
                            <h5 for="email"> 
                                <img src={v3} alt="" /> &nbsp; User. 
                            </h5>
                                <span>Service Agent</span>
                            <hr />
                            <div class="row mt-4">
                                <p style={{lineHeight: "3em"}}>Dear User,<br />

                                    I'm pleased to inform you that your Flex-Secure has been restored successfully, and your invoice has been marked as paid.
                                    
                                    Thank you for choosing Flex-Secure! <br />
                                    
                                    --<br />
                                    Adeniyi A<br />
                                    Ticket  Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container mt-5">
                <div class="row p-5 box">
                    <div class="col-md-12 col-lg-12 col-12 ">
                        <div class="form-group">
                            <h5 for="email">
                                <img src={v3} alt="" /> &nbsp;
                                Adeniyi A. 
                            </h5>
                            <span>Client</span>
                            <hr />
                            <div class="row mt-4">
                                <p style={{lineHeight: "3em"}}>Hello,<br />

                                    

                                    I'm having issues with my Flex-Secure, i just renew and i’m unable to access it
                                     <br />
                                    
                                    --<br /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


          <div className="row bg-white h-100 logout position-relative">
              <Link to="/" className="container p-5">
                  <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i> <span style={{position: "relative", top: "-6px"}}>Log Out</span>
              </Link>
          </div>
        </div>
    </section>
	 );
	}

}

export default Detailed;
