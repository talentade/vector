import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Register from '../containers/register/index';
import VerifyEmail from '../containers/verifyEmail/index';
import VerifyPhone from '../containers/verifyPhone/index';
import Trade from '../containers/trade/index';
import Login from '../components/signin/index';
import Profile from '../containers/profile/index';
import ForgotPassword from '../containers/forgotPassword/index';
import ChangePassword from '../containers/resetPassword/index';
import Market from '../containers/market/index';
import News from '../containers/news/index';
import PostNews from '../containers/postnews/index';
import Accounts from '../containers/accounts/index';
import BookCall from '../containers/book/index';
import Restrictions from '../containers/restrictions/index';
import Transactions from '../containers/transactions/index';

export default props => (
  <Switch>
    <Route exact path='/' component={Register} />
    <Route exact path='/Register' component={Register} />
    <Route exact path='/Login' component={Login} />
    <Route exact path='/VerifyEmail' component={VerifyEmail} />
    <Route exact path='/VerifyPhone' component={VerifyPhone} />
    <Route path='/Book' exact component={BookCall} />
    <Route path='/Trade' exact component={Trade} />
    <Route path='/Accounts' exact component={Accounts} />
    <Route path='/Profile' exact component={Profile} />
    <Route path='/ForgotPassword' exact component={ForgotPassword} />
    <Route path='/ChangePassword' exact component={ChangePassword} />
    <Route path='/Market' exact component={Market} />
    <Route path='/News' exact component={News} />
    <Route path='/Transactions' exact component={Transactions} />
  </Switch>
)
