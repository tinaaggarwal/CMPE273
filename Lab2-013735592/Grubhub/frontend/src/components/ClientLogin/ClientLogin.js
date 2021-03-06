import React, { Component } from 'react';
// import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { clientActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class ClientLogin extends Component {

    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
            // authFlag: false
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
        const payload = {
            email: this.state.email,
            password: this.state.password,
            // authFlag: this.state.authFlag
        }

        this.props.loginClient(payload);

    }
    componentDidMount() {
        console.log("in component did mount");
        if(this.props.authFlag.isAuthenticated) {
            this.props.history.push('/home');
        }      
            
     } 

    render() {

        let redirectVar = null;
        if (this.props.authFlag.isAuthenticated) {
            redirectVar = <Redirect to="/home" />
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
                                    <h2>Sign in with your Grubhub account</h2>
                                </div>
                                <br/>
                                <form onSubmit={this.submitLogin}>
                                    <div className="form-group">
                                        <input onChange={this.emailChangeHandler} type="email" className="form-control" name="email" placeholder="Email address" required />
                                    </div>
                                    <div className="form-group">
                                        <input onChange={this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password" required />
                                    </div>
                                    <button className="btn btn-primary">Login</button>
                                    <br></br><br />
                                    <Link to='/signup'>Signup</Link>
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
        //authFlag: state.client.authFlag
        authFlag: state.auth

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    loginClient: payload => dispatch(clientActions.loginClient(payload, ownProps))
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientLogin);