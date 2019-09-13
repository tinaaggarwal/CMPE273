import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ClientLogin from './ClientLogin/ClientLogin';
import ClientSignup from './ClientSignup/ClientSignup';
import OwnerLogin from './OwnerLogin/OwnerLogin';
import OwnerSignup from './OwnerSignup/OwnerSignup';
import UserProfile from './UserProfile/UserProfile';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/ClientLogin" component={ ClientLogin } />
                <Route path="/ClientSignup" component={ ClientSignup } />
                <Route path="/OwnerLogin" component={ OwnerLogin } />
                <Route path="/OwnerSignup" component={ OwnerSignup }/>
                <Route path= "/UserProfile" component = { UserProfile }/>
            </div>
        );
    }
}

export default Main;