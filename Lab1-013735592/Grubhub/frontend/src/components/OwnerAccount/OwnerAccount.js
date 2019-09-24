import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './OwnerAccount.css';
import Sections from './Sections';
import AddItem from './AddItem';
import OwnerProfile from './OwnerProfile';
import Menu from './Menu';

class OwnerAccount extends Component {
    render() {
        return (
            <div>
                {/* <Navbar /> */}
                <BrowserRouter>
                    <div className='layout'>
                        <div className='sidebar'>
                            <div className="card">
                                <h5 className="card-title">Your Account</h5>
                                <ul className="list-group list-group-flush">
                                    <Link to={`/owneraccount/profile`}>
                                        <li className="list-group-item">Profile</li>
                                    </Link>
                                    <Link to={`/owneraccount/menu`}>
                                    <li className="list-group-item">Menu</li>
                                    </Link>
                                    <Link to={`/owneraccount/sections`}>
                                        <li className="list-group-item">Sections</li>
                                    </Link>
                                    <Link to={`/owneraccount/addItem`}>
                                    <li className="list-group-item">Add Item</li>
                                    </Link>
                                    
                                    {/* <Link to={`/account/pastOrder`}> */}
                                    <li className="list-group-item">Past orders</li>
                                    {/* </Link> */}
                                    {/* <Link to={`/account/upcomingOrder`}> */}
                                    <li className="list-group-item">Upcoming orders</li>
                                    {/* </Link> */}
                                </ul>
                            </div>
                        </div>
                        <Route exact path="/owneraccount" component={OwnerProfile} />
                        <Route path="/owneraccount/profile" component={OwnerProfile} />
                        <Route path='/owneraccount/menu' component={Menu}/>
                        <Route path='/owneraccount/sections' component={Sections} />
                        <Route path='/owneraccount/addItem' component={AddItem} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default OwnerAccount;