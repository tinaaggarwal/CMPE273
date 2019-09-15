import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';
import EditName from './EditProfile/EditName';
import EditEmail from './EditProfile/EditEmail';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            street_address: "",
            apt: "",
            city: "",
            state: "",
            zip_code: "",
            phone: "",
            cross_street: "",
            delivery_instructions: "",
            address_name: "",
            password: "",
            authFlag: false,
            showEditName: false,
            showEditEmail: false,
            showEditPassword: false

        }

        this.showEditName = this.showEditName.bind(this);
        this.showEditEmail = this.showEditEmail.bind(this);
        this.showEditPassword = this.showEditPassword.bind(this);
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitUpdateName = this.submitUpdateName.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/userUpdate')
            .then((response) => {
                console.log((response.data))
                this.setState({
                    firstName: (response.data[0]).first_name,
                    lastName: (response.data[0]).last_name,
                    email: (response.data[0]).client_email,
                    street_address: (response.data[0]).street_address,
                    apt: (response.data[0]).apt,
                    city: (response.data[0]).city,
                    state: (response.data[0]).state,
                    zip_code: (response.data[0]).zip_code,
                    phone: (response.data[0]).phone,
                    cross_street: (response.data[0]).cross_street,
                    delivery_instructions: (response.data[0]).delivery_instructions,
                    address_name: (response.data[0]).address_name
                });
            })
    }

    //username change handler to update state variable with the text entered by the user
    firstNameChangeHandler = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }

    lastNameChangeHandler = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    confirmEmailChangeHandler = (e) => {
        this.setState({
            confirmEmail: e.target.value
        })
    }

    showEditName() {
        this.setState({
            showEditName: !this.state.showEditName
        })
    }

    showEditEmail() {
        this.setState({
            showEditEmail: !this.state.showEditEmail
        })
    }

    showEditPassword() {
        this.setState({
            showEditPassword: !this.state.showEditPassword
        })
    }


    //submit Login handler to send a request to the node backend
    submitUpdateName = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/userUpdateName', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
        this.showEditName()

    };

    //submit Login handler to send a request to the node backend
    submitUpdateEmail = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            client_email: this.state.email,
            confirmEmail: this.state.confirmEmail
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/userUpdateEmail', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });
        this.showEditEmail()

    };

    render() {
        return (
            <div className="divStyle">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">Your Account</h3>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                {this.state.showEditName ?
                                    <EditName
                                        firstName={this.state.firstName}
                                        lastName={this.state.lastName}
                                        firstNameChangeHandler={this.firstNameChangeHandler}
                                        lastNameChangeHandler={this.lastNameChangeHandler}
                                        submitUpdateName={this.submitUpdateName}
                                        showEditName={this.showEditName}
                                    />
                                    :
                                    <div>
                                        Name
                                        <p>{this.state.firstName} {this.state.lastName}</p>
                                        <button onClick={this.showEditName} className="btn btn-link" type="submit">Edit</button>
                                    </div>
                                }
                            </li>
                            <li class="list-group-item">
                                {this.state.showEditEmail ?
                                    <EditEmail
                                        email={this.state.email}
                                        confirmEmail={this.state.confirmEmail}
                                        emailChangeHandler={this.emailChangeHandler}
                                        confirmEmailChangeHandler={this.confirmEmailChangeHandler}
                                        submitUpdateEmail={this.submitUpdateEmail}
                                        showEditEmail={this.showEditEmail}
                                    />
                                    :
                                    <div>
                                        Email
                                        <p>{this.state.email}</p>
                                        <button onClick={this.showEditEmail} className="btn btn-link" type="submit">Edit</button>
                                    </div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;