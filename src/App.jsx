import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes/routes.jsx';

export default () => {
  return (
    <div id="App">
        <Router>
            <Routes />
        </Router>
    </div>
  );
}
