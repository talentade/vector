import React, { Component } from 'react'
import {Helmet} from "react-helmet";
import LoginForm from '../../components/register'

export default class index extends Component {
  render() {
    return (
      <>
      {/*this component handles setting the title and dynamically injecting head specific tags */}
      <Helmet>
      <meta charSet="utf-8" />
          <title>FCDB Login Page</title>
          <link href="assets/css/authentication/form-2.css" rel="stylesheet" type="text/css" />
          <script src="assets/js/authentication/form-2.js"></script>
      </Helmet>
      <div id="page_register">
          <LoginForm/>
      </div>
      </>
    )
  }
}
