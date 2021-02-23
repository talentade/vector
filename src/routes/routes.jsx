import React from 'react'
import { Switch, Route } from 'react-router-dom';
import App from '../services/app';
import Login from '../containers/login/index.jsx';
import Dashboard from '../containers/dashboard/index.jsx';
import Support from '../containers/support/index.jsx';
import Viewsupport from '../containers/viewsupport/index.jsx';
import Detailed from '../containers/detailed/index.jsx';

export default props => (
    App.loggedIn() ?
    <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Support' component={Support} />
        <Route exact path='/Dashboard' component={Dashboard} />
        <Route exact path='/Viewsupport' component={Viewsupport} />
        <Route exact path='/Detailed' component={Detailed} />
    </Switch>
        :
    <Switch>
        <Route path='/' component={Login} />
        <Route exact path='/Login' component={Login} />
    </Switch>
)
