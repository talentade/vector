import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import v2 from './v2.png';
import './index.css';

class Support extends Component {
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
            <h3>Open Support Ticket</h3>
            <p className="text-muted">Home  /  Open Support Ticket</p>
        </div>
        <div className="container mt-5">
            <form action="/action_page.php" className="mt-5">
                <h4 className="my-4">Ticket Infomation</h4>
                <div className="row p-5 box">
                    <div className="col-md-6 col-lg-6 col-12 ">
                        <div className="form-group mb-5">
                          <label for="email" className="text-muted">Email address:</label>
                          <input type="email" className="form-control" id="email" />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-12 ">
                        <div className="form-group mb-5">
                          <label for="pwd" className="text-muted">Password:</label>
                          <input type="password" className="form-control" id="pwd" />
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-12 ">
                        <div className="form-group mb-5">
                          <label for="pwd" className="text-muted">Select Department:</label>
                          <select name=""  className="form-control">
                              <option value=""></option>
                              <option value="high">High</option>
                              <option value="low">Low</option>
                          </select>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-12 ">
                        <div className="form-group mb-5">
                          <label for="pwd" className="text-muted">Select Related Service:</label>
                         <select name=""  className="form-control">
                              <option value=""></option>
                              <option value="high">High</option>
                              <option value="low">Low</option>
                          </select>
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-12 ">
                        <div className="form-group mb-5">
                          <label for="pwd" className="text-muted">Select Priority:</label>
                         <select name=""  className="form-control">
                              <option value=""></option>
                              <option value="high">High</option>
                              <option value="low">Low</option>
                          </select>
                        </div>
                    </div>
                </div>


                <h4 className="my-4">Message</h4>
                <div className="row p-5 box">
                    <div className="col-12 ">
                        <div className="form-group mb-5">
                          <label for="email" className="text-muted">Subject:</label>
                          <input type="text" className="form-control" id="message" />
                        </div>
                    </div>
                    <div className="col-12 ">
                        <div className="form-group mb-5">
                          <label for="pwd" className="text-muted">Message:</label>
                          <textarea name="" className="form-control"  cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </div>


                <h4 className="my-4">Attachment</h4>
                <div className="row p-5 box">
                    <div className="col-12 ">
                        <div className="input-group mb-3 position-relative">
                            <div className="input-group-prepend">
                              <span className="input-group-text p-3" id="basic-addon1">Select File</span>
                            </div>
                            <input type="file" id="file" onchange="" className="form-control d-none" placeholder="" required aria-label="Username" aria-describedby="basic-addon1" style={{border: "2px solid"}} />
                            <label for="file" className="myfile" id="fileLabel"> No File Selected</label>
                          </div>
                    </div>
                     <div className="col-12">
                      Allowed File Extensions: .jpg, .gif, .jpeg, .png, .pdf, zip, .doc, .docx
                     </div>
                </div>
                <div className="row p-5 ">
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary btn-lg mx-4 but">Submit</button>
                        <button type="reset" className="btn btn-default btn-lg mx-4 but">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </section>

	 );
	}

}

export default Support;
