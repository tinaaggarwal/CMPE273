import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FirstPage from './FirstPage/FirstPage';
import ClientLogin from './ClientLogin/ClientLogin';
import ClientSignup from './ClientSignup/ClientSignup';
import OwnerLogin from './OwnerLogin/OwnerLogin';
import OwnerSignup from './OwnerSignup/OwnerSignup';
import UserProfile from './UserProfile/UserProfile';
import Sidebar from './Sidebar/Sidebar';
import Account from './Account/Account';

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
                <Route path="/Sidebar" component={ Sidebar } />
                <Route path="/Account/" component={ Account } />
            </div>
        );
    }
}

export default Main;