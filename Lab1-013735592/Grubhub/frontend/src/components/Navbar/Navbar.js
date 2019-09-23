import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove('cookie', { path: '/' })
  }
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load('cookie')) {
      console.log("Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/" onClick={this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Login
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/clientLogin">Client Login</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/ownerLogin">Owner Login</a>
                </div>
              </li>
            </ul>
      )
    }
    
    // let redirectVar = null;
    // if (!cookie.load('cookie')) {
    //   redirectVar = <Redirect to="/" />
    // }

    return (
      <div>
        {/* {redirectVar} */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">GRUBUHB</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {navLogin}
          </div>
      </nav>
      </div>
    )
  }
}

export default Navbar;