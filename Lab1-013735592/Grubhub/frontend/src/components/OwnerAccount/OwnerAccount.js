import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './OwnerAccount.css';
import Sections from './Sections';

class OwnerAccount extends Component {
    render() {
        return (
            <div>
                {/* <Navbar /> */}
                <BrowserRouter>
                    <div className='layout'>
                        <div className='sidebar'>
                            <div class="card">
                                <h5 class="card-title">Your Account</h5>
                                <ul class="list-group list-group-flush">
                                    <Link to={`/owneraccount/sections`}>
                                        <li class="list-group-item">Sections</li>
                                    </Link>
                                    {/* <Link to={`/account/address`}> */}
                                        <li class="list-group-item">Address and Phone</li>
                                    {/* </Link> */}
                                    {/* <Link to={`/account/pastOrder`}> */}
                                        <li class="list-group-item">Past orders</li>
                                    {/* </Link> */}
                                    {/* <Link to={`/account/upcomingOrder`}> */}
                                        <li class="list-group-item">Upcoming orders</li>
                                    {/* </Link> */}
                                </ul>
                            </div>
                        </div>
                        <Route exact path="/owneraccount" component={Sections} />
                        <Route path='/owneraccount/sections' component={Sections} />
                        {/* <Route path='/account/address' component={Address} /> */}


                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default OwnerAccount;