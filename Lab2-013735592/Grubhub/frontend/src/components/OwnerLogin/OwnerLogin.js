import React, { Component } from 'react';
import axios from 'axios';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { ownerActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class OwnerLogin extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginOwner(data);
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.props.authFlag) {
            redirectVar = <Redirect to="/ownerAccount" />
        }
        return (
            <div>
                {redirectVar}
                <br />
                <br />
                <br />
                <div className="container">

                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>Grubhub for Restaurants</h2>
                            </div>
                            <br />
                            <form onSubmit={this.submitLogin}>
                                <div className="form-group">
                                    <input onChange={this.emailChangeHandler} type="email" className="form-control" name="email" placeholder="Email" required />
                                </div>
                                <div className="form-group">
                                    <input onChange={this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" required />
                                </div>
                                <button className="btn btn-primary">Login</button>

                                <br></br><br />
                                <Link to='/ownerSignup'>Signup</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        authFlag: state.owner.authFlag
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    loginOwner: payload => dispatch(ownerActions.loginOwner(payload, ownProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnerLogin);