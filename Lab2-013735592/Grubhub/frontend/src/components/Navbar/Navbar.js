import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { clientActions } from '../../js/actions/index';
import { ownerActions } from '../../js/actions/index';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeOfUser: ""
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogoutOwner = this.handleLogoutOwner.bind(this);
    }
    //handle logout to remove token
    handleLogout = () => {
        // cookie.remove('cookie', { path: '/' })

            console.log("history1:"+this.props.history);
            console.log("history1:"+this.props.history.object);
            this.props.logoutClient(this.props.history);
    }

    handleLogoutOwner = () => {
        // cookie.remove('cookie', { path: '/' })

            console.log("history1:"+this.props.history);
            console.log("history1:"+this.props.history.object);
            this.props.logoutOwner(this.props.history);
    }

    render() {
        let navLogin = null;
        if (this.props.auth && this.props.auth.isAuthenticated) {

            let homeLink = ""
            let accountLink = null

                homeLink = "/home";
                accountLink =
                    <li className="nav-item ">
                        <a className="nav-link" href="/account">Account</a>
                    </li>

            navLogin = (
                <>
                    <li className="nav-item active">
                        <a className="nav-link" href={homeLink}>Home</a>
                    </li>
                    {accountLink}
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={this.handleLogout}>
                            <span className="glyphicon glyphicon-user"></span>
                            Logout
                    </a>
                    </li>
                </>
            );
        } else if (this.props.auth1 && this.props.auth1.isAuthenticated){
            
            let homeLink = ""
            homeLink = "/ownerAccount";

            navLogin = (
                <>
                    <li className="nav-item active">
                        <a className="nav-link" href={homeLink}>Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/" onClick={this.handleLogoutOwner}>
                            <span className="glyphicon glyphicon-user"></span>
                            Logout
                    </a>
                    </li>
                </>
            );

        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Login
                </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link to='/login'>
                            <div className="dropdown-item">
                                Client Login
                            </div>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link to='/ownerLogin'>
                            <div className="dropdown-item">
                                Restaurant Login
                            </div>
                        </Link>
                    </div>
                </li>
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
                    <img src="GrubhubLogo.png" className="logoSize" />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {navLogin}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    auth1: state.auth1
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    logoutClient: () => dispatch(clientActions.logoutClient()),
    logoutOwner: () => dispatch(ownerActions.logoutOwner())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));