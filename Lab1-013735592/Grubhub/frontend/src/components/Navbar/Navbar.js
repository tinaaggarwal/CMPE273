import React,{Component} from 'react';
//import {Link} from 'react-router-dom';
//import cookie from 'react-cookies';
//import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
       // this.handleLogout = this.handleLogout.bind(this);
    }
    render(){
        return(
<nav class="navbar navbar-expand-lg">
  <a class="brand" href="/FirstForm">GRUBHUB</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav ml-auto">
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Login
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="/ClientLogin">Client Login</a>
          <a class="dropdown-item" href="/OwnerLogin">Owner Login</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/OwnerLogin">List your property</a>
      </li>

    </ul>
  </div>
</nav>
        )
    }
}

export default Navbar;
