import React, { Component } from 'react';
import axios from 'axios';
import './OwnerProfile.css';
import EditProfile from './EditProfile';

class OwnerProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            restName: "",
            cuisine: "",
            authFlag: false,
            showEdit: false

        }

        this.showEdit = this.showEdit.bind(this);
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.restNameChangeHandler = this.restNameChangeHandler.bind(this);
        this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/ownerUpdate')
            .then((response) => {
                console.log((response.data))
                this.setState({
                    firstName: (response.data[0]).first_name,
                    lastName: (response.data[0]).last_name,
                    email: (response.data[0]).owner_email,
                    phone: (response.data[0]).phone,
                    restName: (response.data[0]).restName,
                    cuisine: (response.data[0]).cuisine,
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

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    restNameChangeHandler = (e) => {
        this.setState({
            restName: e.target.value
        })
    }

    cuisineChangeHandler = (e) => {
        this.setState({
            cuisine: e.target.value
        })
    }

    showEdit() {
        this.setState({
            showEdit: !this.state.showEdit
        })
    }


    // submit Login handler to send a request to the node backend
    submitUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            owner_email: this.state.email,
            phone: this.state.phone,
            rest_name: this.state.restName,
            cuisine: this.state.cuisine
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/ownerUpdateProfile', data)
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
        this.showEdit()

    };

    render() {
        return (
            <div className="divStyle">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Your Account</h3>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                {this.state.showEdit ?
                                    <EditProfile
                                        firstName={this.state.firstName}
                                        lastName={this.state.lastName}
                                        email={this.state.email}
                                        phone={this.state.phone}
                                        restName={this.state.restName}
                                        cuisine={this.state.cuisine}
                                        firstNameChangeHandler={this.firstNameChangeHandler}
                                        lastNameChangeHandler={this.lastNameChangeHandler}
                                        emailChangeHandler={this.emailChangeHandler}
                                        phoneChangeHandler={this.phoneChangeHandler}
                                        restNameChangeHandler={this.restNameChangeHandler}
                                        cuisineChangeHandler={this.cuisineChangeHandler}
                                        submitUpdate={this.submitUpdate}
                                        showEdit={this.showEdit}
                                    />
                                    :
                                    <div>
                                        Name
                                        <p>{this.state.firstName} {this.state.lastName}</p>
                                        Email
                                        <p>{this.state.email}</p>
                                        Phone
                                        <p>{this.state.phone}</p>
                                        Restaurant Name
                                        <p>{this.state.restName}</p>
                                        Cuisine
                                        <p>{this.state.cuisine}</p>
                                        <button onClick={this.showEdit} className="btn btn-link" type="submit">Edit</button>
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

export default OwnerProfile;