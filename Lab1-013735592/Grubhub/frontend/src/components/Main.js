import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ClientLogin from './ClientLogin/ClientLogin';
import ClientSignup from './ClientSignup/ClientSignup';
import OwnerLogin from './OwnerLogin/OwnerLogin';
import OwnerSignup from './OwnerSignup/OwnerSignup';
import ClientHomePage from './ClientHomePage/ClientHomePage';
import Account from './Account/Account';
import OwnerAccount from './OwnerAccount/OwnerAccount';
import AddItem from './OwnerAccount/AddItem';
import Navbar from './Navbar/Navbar';

class Main extends Component {
    render() {
        return (
            <div>
                <Route path="/" component={ Navbar }/>
                <Route path="/ClientLogin" component={ ClientLogin } />
                <Route path="/ClientSignup" component={ ClientSignup } />
                <Route path="/OwnerLogin" component={ OwnerLogin } />
                <Route path="/OwnerSignup" component={ OwnerSignup }/>
                <Route path= "/ClientHomePage" component = { ClientHomePage }/>
                <Route path="/Account/" component={ Account } />
                <Route path="/OwnerAccount/" component={ OwnerAccount } />
                <Route path="/AddItem" component={AddItem}/>
            </div>
        );
    }
}

export default Main;