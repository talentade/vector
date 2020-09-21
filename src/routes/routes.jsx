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

import Users from '../containers/users/index';
import Admins from '../containers/admins/index';
import Forms from '../containers/forms/index';
import UsersProfileList from '../containers/usersprofile/index';
import Lists from '../containers/lists/index';
import MailAccounts from '../containers/mailaccounts/index';
import Unsubscribers from '../containers/unsubscribers/index';
import TeamSettings from '../containers/teamsettings/index';
import Campaigns from '../containers/campaigns/index';
import Instruments from '../containers/instruments/index';
import Documents from '../containers/documents/index';
import app from '../services/app';

export default props => (
    app.isAdmin() ? (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/Login' component={Login} />
        <Route path='/Accounts' exact component={Accounts} />
        <Route path='/News' exact component={News} />
        <Route path='/PostNews' exact component={PostNews} />

        <Route path='/Restrictions' exact component={Restrictions} />
        <Route path='/Transactions' exact component={Transactions} />
        <Route path='/MailAccounts' exact component={MailAccounts} />
        <Route path='/Unsubscribers' exact component={Unsubscribers} />

        <Route path='/Users' exact component={Users} />
        <Route path='/Admins' exact component={Admins} />
        <Route path='/TeamSettings' exact component={TeamSettings} />
        <Route path='/Forms' exact component={Forms} />
        <Route path='/UsersProfile/:user_id' exact component={UsersProfileList} />
        <Route path='/Lists' exact component={Lists} />
        <Route path='/Campaigns' exact component={Campaigns} />
        <Route path='/Instruments' exact component={Instruments} />
        <Route path='/Documents' exact component={Documents} />
      </Switch>
    ) : (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Register' component={Register} />
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
)
