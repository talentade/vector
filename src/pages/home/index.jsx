import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import '../../themes/sass/pages/Home.sass'

export default class index extends Component {
  render () {
    return (
      <>
        {/*  this component handles setting the title and dynamically injecting head specific tags */}
        <Helmet>
          <meta charSet='utf-8' />
          <title>Home Page</title>
          <link href='assets/css/pages/coming-soon/style.css' rel='stylesheet' type='text/css' />
          <script src='assets/js/pages/coming-soon/coming-soon.js' />
        </Helmet>
        <div>
         welcome home
        </div>
      </>
    )
  }
}
