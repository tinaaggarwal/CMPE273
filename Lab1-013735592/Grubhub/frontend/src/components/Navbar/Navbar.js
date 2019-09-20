import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
//import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    // this.handleLogout = this.handleLogout.bind(this);
  }
  render() {

    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load('cookie')) {
      console.log("Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
        </ul>
      )
    }

    return (
      <div>
        {/* {redirectVar} */}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">GRUBHUB</a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active"><Link to="/firstPage">Home</Link></li>
              <li><Link to="/ClientLogin">Client Login</Link></li>
              <li><Link to="/OwnerLogin">Owner Login</Link></li>
            </ul>
            {navLogin}
          </div>
        </nav>
      </div>
      // <nav class="navbar navbar-expand-lg">
      //   <a class="brand" href="/FirstPage">GRUBHUB</a>
      //   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      //     <span class="navbar-toggler-icon"></span>
      //   </button>
      //   <div class="collapse navbar-collapse" id="navbarNavDropdown">
      //     <ul class="navbar-nav ml-auto">
      //       <li class="nav-item dropdown">
      //         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      //           Login
      //   </a>
      //         <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
      //           <a class="dropdown-item" href="/ClientLogin">Client Login</a>
      //           <a class="dropdown-item" href="/OwnerLogin">Owner Login</a>
      //         </div>
      //       </li>

      //     </ul>
      //   </div>
      // </nav>
    )
  }
}

export default Navbar;

