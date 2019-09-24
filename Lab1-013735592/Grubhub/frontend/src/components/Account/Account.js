import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Profile from './Profile';
import Address from './Address';
import './Account.css';

class Account extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div className='layout'>
                        <div className='sidebar'>
                            <div className="card">
                                <h5 className="card-title">Your Account</h5>
                                <ul className="list-group list-group-flush">
                                    <Link to={`/account/profile`}>
                                        <li className="list-group-item">Profile</li>
                                    </Link>
                                    <Link to={`/account/address`}>
                                        <li className="list-group-item">Address and Phone</li>
                                    </Link>
                                    <Link to={`/account/pastOrder`}>
                                        <li className="list-group-item">Past orders</li>
                                    </Link>
                                    <Link to={`/account/upcomingOrder`}>
                                        <li className="list-group-item">Upcoming orders</li>
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