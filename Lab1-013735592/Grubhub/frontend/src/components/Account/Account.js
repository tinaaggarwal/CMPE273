import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Profile from './Profile';
import Address from './Address';
import Navbar from '../Navbar/Navbar';
import './Account.css';

class Account extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <BrowserRouter>
                    <div className='layout'>
                        <div className='sidebar'>
                            <div class="card">
                                <h3 class="card-title">Your Account</h3>
                                <ul class="list-group list-group-flush">
                                    <Link to={`/account/profile`}>
                                        <li class="list-group-item">Profile</li>
                                    </Link>
                                    <Link to={`/account/address`}>
                                        <li class="list-group-item">Address and Phone</li>
                                    </Link>
                                    <Link to={`/account/pastOrder`}>
                                        <li class="list-group-item">Past orders</li>
                                    </Link>
                                    <Link to={`/account/upcomingOrder`}>
                                        <li class="list-group-item">Upcoming orders</li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                        <Route exact path="/account" component={Profile} />
                        <Route path='/account/profile' component={Profile} />
                        <Route path='/account/address' component={Address} />


                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default Account;