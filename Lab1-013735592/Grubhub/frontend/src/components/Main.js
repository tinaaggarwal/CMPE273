import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FirstPage from './FirstPage/FirstPage';
import ClientLogin from './ClientLogin/ClientLogin';
import ClientSignup from './ClientSignup/ClientSignup';
import OwnerLogin from './OwnerLogin/OwnerLogin';
import OwnerSignup from './OwnerSignup/OwnerSignup';
import UserProfile from './UserProfile/UserProfile';
import Account from './Account/Account';
import OwnerAccount from './OwnerAccount/OwnerAccount';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/FirstPage" component={ FirstPage } />
                <Route path="/ClientLogin" component={ ClientLogin } />
                <Route path="/ClientSignup" component={ ClientSignup } />
                <Route path="/OwnerLogin" component={ OwnerLogin } />
                <Route path="/OwnerSignup" component={ OwnerSignup }/>
                <Route path= "/UserProfile" component = { UserProfile }/>
                <Route path="/Account/" component={ Account } />
                <Route path="/OwnerAccount/" component={ OwnerAccount } />
            </div>
        );
    }
}

export default Main;