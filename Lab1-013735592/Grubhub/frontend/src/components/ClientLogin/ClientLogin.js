import React, {Component} from 'react';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';

class ClientLogin extends Component {

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
       axios.defaults.withCredentials = true;
        //make a post request with the user data
         axios.post('http://localhost:3001/clientLogin',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            }); 
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if(this.state.authFlag){
            redirectVar = <Redirect to= "/ClientHomePage"/>
        }
        return(
            <div>
                {redirectVar}
            <div className="container">
                
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Sign in with your Grubhub account</h2>
                        </div>
                        <form onSubmit={this.submitLogin}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input onChange = {this.emailChangeHandler} type="email" className="form-control" name="email" required/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" required/>
                            </div>
                            <button className="btn btn-primary">Login</button>  
                            <br></br><br/>
                            <Link to = '/ClientSignup'>Signup</Link>     
                            </form>            
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default ClientLogin;