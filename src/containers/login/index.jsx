import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from "../../services/api";
import App from "../../services/app";
import './index.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: ''}
  }

  login = async () => {
    try {
      let login = await Api.login({email: this.state.email, password: this.state.password});
      console.log(login.data.access_token);
      App.access_token(login.data.access_token);
      window.location.href = "/Dashboard";
      // this.props.history.push("/Dashboard");
    } catch (e) {
      alert("Invalid Credential");
    }
  }

  render () {
  	return (
      <section className="section1">
          <div className="well p-3 bg-white">
          </div>
          <div className="container mt-5 ">
              <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8">
                      <div className="box bg-white p-5">
                          <h3 className="text-center signin">Sign In</h3>
                          <form action="" className="mt-5" onsubmit={() => {return false}}>
                              <div className="form-group mb-5">
                                <label for="email" className="text-muted">Email address:</label>
                                <input type="email" className="form-control" onChange={(e) => this.setState({email: e.target.value})} id="email" />
                              </div>
                              <div className="form-group mb-5">
                                <label for="pwd" className="text-muted">Password:</label>
                                <input type="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})} id="pwd" />
                              </div>
                              <div className="form-group form-check">
                                <label className="form-check-label">
                                  <input className="form-check-input" type="checkbox" /> Remember me
                                </label>
                                <a href="" className="float-right">Forgot Password</a>
                              </div>
                              <div className="text-center">
                                  <button type="button" onClick={() => this.login()} className="btn btn-primary px-5 py-3">Submit</button>
                                  {/*<Link to="Dashboard" className="btn btn-primary px-5 py-3">Submit</Link>*/}
                                  <p className="mt-4">Dont have an Account? Sign Up Instead</p>
                              </div>
                            </form>
                      </div>
                  </div>
              </div>
          </div>
      </section>
	 );
	}

}

export default Login;
