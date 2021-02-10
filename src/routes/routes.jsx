import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Register from '../containers/register/index';
import VerifyEmail from '../containers/verifyEmail/index';
import VerifyPhone from '../containers/verifyPhone/index';
import Trade from '../containers/trade/index';
import Login from '../components/signin/index';
import Profile from '../containers/profile/index';
import Dashboard from '../containers/dashboard/index';
import ForgotPassword from '../containers/forgotPassword/index';
import ChangePassword from '../containers/resetPassword/index';
import Market from '../containers/market/index';
import News from '../containers/news/index';
import PostNews from '../containers/postnews/index';
import Accounts from '../containers/accounts/index';
import BookCall from '../containers/book/index';
import CreateAdmin from '../containers/createadmin/index';
import Restrictions from '../containers/restrictions/index';
import Chats from '../containers/chats/index';
import Transactions from '../containers/transactions/index';
import AllTranasactions from '../containers/allTranasactions/index';
import Salesfunnel from '../containers/salesfunnel/index';

import Users from '../containers/users/index';
import Withdrawals from '../containers/withdrawals/index';
import Deposits from '../containers/deposits/index';

import Activities from '../containers/activities/index';
import Admins from '../containers/admins/index';
import AdminsProfile from '../containers/adminsprofile/index';

import Finance from '../containers/finance/index';
import Calllogs from '../containers/calllogs/index';

import Forms from '../containers/forms/index';
import UsersProfileList from '../containers/usersprofile/index';
import Lists from '../containers/lists/index';
import MailAccounts from '../containers/mailaccounts/index';
import Unsubscribers from '../containers/unsubscribers/index';
import TeamSettings from '../containers/teamsettings/index';
import Campaigns from '../containers/campaigns/index';
import Instruments from '../containers/instruments/index';
import Documents from '../containers/documents/index';
import Trades from '../containers/trades/index';
import app from '../services/app';

export default props => (
    app.isAdmin() ? (
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/Login' component={Login} />
        <Route path='/Accounts' exact component={Accounts} />
        <Route path='/News' exact component={News} />
        <Route path='/PostNews' exact component={PostNews} />
        <Route path='/Dashboard' exact component={Dashboard} />

        {app.super() ? <Route path='/CreateAdmin' exact component={CreateAdmin} /> : null}
        
        <Route path='/Restrictions' exact component={Restrictions} />


        <Route path='/Chats' exact component={Chats} />
        <Route path='/Trades' exact component={Trades} />

        <Route path='/Transactions' exact component={AllTranasactions} />
        <Route path='/MailAccounts' exact component={MailAccounts} />
        <Route path='/Unsubscribers' exact component={Unsubscribers} />

        <Route path='/Users' exact component={Users} />
        <Route path='/Withdrawals' exact component={Withdrawals} />
        <Route path='/Deposits' exact component={Deposits} />

        <Route path='/Salesfunnel' exact component={Salesfunnel} />

        <Route path='/Calllogs' exact component={Calllogs} />
        
        {app.super() ? <Route path='/Admins' exact component={Admins} /> : null}

        <Route path='/AdminsProfile/:user_id' exact component={AdminsProfile} />
        <Route path='/Activities' exact component={Activities} />
        <Route path='/Finance' exact component={Finance} />
        <Route path='/TeamSettings' exact component={TeamSettings} />
        <Route path='/Forms' exact component={Forms} />
        <Route path='/UsersProfile/:user_id' exact component={UsersProfileList} />
        <Route path='/Lists' exact component={Lists} />
        <Route path='/Campaigns' exact component={Campaigns} />
        <Route path='/Instruments' exact component={Instruments} />
        <Route path='/Documents' exact component={Documents} />
        <Route path='/Profile' exact component={Profile} />
      </Switch>
    ) : app.isVerified() ? (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Register' component={Register} />
            <Route exact path='/VerifyEmail' component={VerifyEmail} />
            <Route exact path='/VerifyPhone' component={VerifyPhone} />
            <Route exact path='/Book' component={BookCall} />
            <Route exact path='/Trade' component={Trade} />
            <Route exact path='/Accounts' component={Accounts} />
            <Route exact path='/Profile' component={Profile} />
            <Route exact path='/ForgotPassword' component={ForgotPassword} />
            <Route exact path='/ChangePassword' component={ChangePassword} />
            <Route exact path='/Market' component={Market} />
            <Route exact path='/News' component={News} />
            <Route exact path='/Transactions' component={Transactions} />
        </Switch>
    ) : (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Register' component={Register} />
            <Route exact path='/VerifyEmail' component={VerifyEmail} />
            <Route exact path='/VerifyPhone' component={VerifyPhone} />
            <Route exact path='/Book' component={BookCall} />
            <Route exact path='/Profile' component={Profile} />
        </Switch>
    )
)
