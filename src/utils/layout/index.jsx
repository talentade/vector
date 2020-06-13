import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import Footer from '../../components/footer'

export default props => {
  return (
    <>
      {/* this component handles setting the title and dynamically injecting head specific tags */}
      <Helmet>
        <meta charSet='utf-8' />
        <link href='assets/css/loader.css' rel='stylesheet' type='text/css' />
        <script src='assets/js/loader.js' />
        {/** BEGIN PAGE LEVEL PLUGINS/CUSTOM STYLES */}

        <style type='text/css'>{
          `
              .layout-px-spacing {
                  min-height: calc(100vh - 166px)!important;
              }
              `
        }
        </style>
        {/***
              <script src='plugins/perfect-scrollbar/perfect-scrollbar.min.js' />
        <script src='assets/js/app.js' />
        <script>{`
            $(document).ready(function() {
                App.init();
            });`}
        </script>
        <script src='assets/js/custom.js' />
         */}
        {/** END PAGE LEVEL PLUGINS/CUSTOM STYLES */}
    
      </Helmet>
      {/** * <!--  BEGIN NAVBAR  --> */}

      <Navbar />

      {/** * <!--  END NAVBAR  --> */}
      <div className='main-container' id='container'>

        <div className='overlay' />
        <div className='search-overlay' />
        {/** * <!--  BEGIN SIDEBAR  --> */}
        <Sidebar />
        {/** * <!--  END SIDEBAR  --> */}
        {/** * <!--  BEGIN CONTENT PART  --> */}

        <div id='content' className='main-content'>
        
          <div className='layout-px-spacing'>

            <div className='row layout-top-spacing'>
              {props.children}
            </div>

          </div>
          {/** * <!--  BEGIN FOOTER  --> */}
          <Footer />
          {/** * <!--  END FOOTER  --> */}
        </div>
      </div>
      {/** * <!--  END CONTENT PART  --> */}

    </>
  )
}
