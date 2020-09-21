import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
// import Error from './tools/Error/errorHandling'
import Routes from './routes/routes.jsx'
import './themes/sass/App.sass';

String.prototype.ucwords = function() {
  let str = this.toLowerCase();
  return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
    function(s){
      return s.toUpperCase();
  });
}

export default () => {
  return (
    <div id="App">
        <Router>
            <Routes />
        </Router>
    </div>
  );
}
