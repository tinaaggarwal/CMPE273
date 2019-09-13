import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class OwnerSignup extends Component{
        //call the constructor method
        constructor(props){
            //Call the constrictor of Super class i.e The Component
            super(props);
            //maintain the state required for this component
            this.state = {
                firstName : "",
                lastName : "",
                email : "",
                restaurantName : "",
                restaurantZipCode : "",
                password: "",
                authFlag : false
            }
            //Bind the handlers to this class
            this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
            this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
            this.emailChangeHandler = this.emailChangeHandler.bind(this);
            this.restaurantNameChangeHandler = this.restaurantNameChangeHandler.bind(this);
            this.restaurantZipCodeChangeHandler = this.restaurantZipCodeChangeHandler.bind(this);
            this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
            this.submitCreate = this.submitCreate.bind(this);
        }
        //Call the Will Mount to set the auth Flag to false
        componentWillMount(){
            this.setState({
                authFlag : false
            })
        }
        //first name change handler to update state variable with the text entered by the user
        firstNameChangeHandler = (e) => {
            this.setState({
                firstName : e.target.value
            })
        }
        //last name change handler to update state variable with the text entered by the user
        lastNameChangeHandler = (e) => {
            this.setState({
                lastName : e.target.value
            })
        }
        //email change handler to update state variable with the text entered by the user
        emailChangeHandler = (e) => {
            this.setState({
                email : e.target.value
            })
        }

        //restaurant name change handler to update state variable with the text entered by the user
        restaurantNameChangeHandler = (e) => {
            this.setState({
                restaurantName : e.target.value
            })
        }

        //restaurant zip code change handler to update state variable with the text entered by the user
        restaurantZipCodeChangeHandler = (e) => {
            this.setState({
                restaurantZipCode : e.target.value
            })
        }

        //password change handler to update state variable with the text entered by the user
        passwordChangeHandler = (e) => {
            this.setState({
                password : e.target.value
            })
        }
        //submit Login handler to send a request to the node backend
        submitCreate = (e) => {
            //prevent page from refresh
            e.preventDefault();
            const data = {
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                email : this.state.email,
                restaurantName : this.state.restaurantName,
                restaurantZipCode : this.state.restaurantZipCode,
                password: this.state.password
            }
            //set the with credentials to true
           axios.defaults.withCredentials = true;
            //make a post request with the user data
             axios.post('http://localhost:3001/ownerSignup',data)
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
        };

    render(){
         let redirectvar;
        if(this.state.authFlag){
            redirectvar= <Redirect to = "/OwnerLogin"/>;
        } 
        return(
            <div>
                {redirectvar}
                <br/>
                <br/>
            <br/>
                <div class = "container">
                <h2>Owner Signup</h2>
                <form>
                        <div style={{width: '30%'}} className="form-group">
                            <input onChange = {this.firstNameChangeHandler} type="text" class="form-control" name="firstName" placeholder="First Name"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                            <input onChange = {this.lastNameChangeHandler} type="text" class="form-control" name="lastName" placeholder="Last Name" />
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                                <input  onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="Email"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                                <input  onChange = {this.restaurantNameChangeHandler} type="text" class="form-control" name="restaurantName" placeholder="Restaurant Name"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                                <input  onChange = {this.restaurantZipCodeChangeHandler} type="text" class="form-control" name="restaurantZipCode" placeholder="Restaurant Zip Code"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                                <input  onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                        </div>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitCreate} className="btn btn-success" type="submit">Create</button>
                        </div> 
                        </form>
                       
                </div>
            </div>

        )
    }
        }
    

export default OwnerSignup;
