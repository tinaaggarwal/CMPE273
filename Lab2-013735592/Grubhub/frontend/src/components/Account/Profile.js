import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';
import EditName from './EditProfile/EditName';
import EditEmail from './EditProfile/EditEmail';
import EditPassword from './EditProfile/EditPassword';
import ImageUploader from 'react-images-upload';
import Image from 'react-bootstrap/Image'
import { clientProfileActions } from '../../js/actions/index';
import { imageActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class Profile extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            password: "",
            newPassword: "",
            confirmPassword: "",
            authFlag: false,
            showEditName: false,
            showEditEmail: false,
            showEditPassword: false,
            profile_image: [],
            imageUrl: ""
        }

        this.showEditName = this.showEditName.bind(this);
        this.showEditEmail = this.showEditEmail.bind(this);
        this.showEditPassword = this.showEditPassword.bind(this);
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.newPasswordChangeHandler = this.newPasswordChangeHandler.bind(this);
        this.confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.confirmEmailChangeHandler = this.confirmEmailChangeHandler.bind(this);
        this.submitUpdateName = this.submitUpdateName.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount() {

        this.props.userUpdate();
        
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.updated) {
          this.setState({ 
              firstName: nextProps.firstName,
              lastName: nextProps.lastName,
              profile_image: nextProps.profile_image,
              email: nextProps.email
            })
        }
      }

    uploadImage = () => {
        const uploaders = this.state.pictures.map(picture => {
            const data = new FormData();
            data.append("image", picture, picture.name);
            console.log(data)
            
            this.props.upload(data)
                .then(() => {
                    const data = {
                        profile_image: this.props.imageUrl
                    }
                    this.props.userUpdateProfileImage(data);
                }).then(() => {
                    window.location.reload();
                });
        });
    }


    onDrop(picture) {
        this.setState({
            pictures: picture
        },
            this.uploadImage
        );
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

    newPasswordChangeHandler = (e) => {
        this.setState({
            newPassword: e.target.value
        })
    }

    confirmPasswordChangeHandler = (e) => {
        this.setState({
            confirmPassword: e.target.value
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

        this.props.userUpdateName(data);
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

        this.props.userUpdateEmail(data);

        this.showEditEmail()

    };

    //submit Login handler to send a request to the node backend
    submitUpdatePassword = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            password: this.state.password,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword
        }
        this.props.userUpdatePassword(data);

        this.showEditPassword()

    };

    render() {

        console.log(this.props.profile_image);
        let profile_image = null;
        if (this.props.profile_image === null) {
            profile_image =
                (
                    <div className="imageUploadPlaceholder">
                        <ImageUploader
                            withIcon
                            buttonText='Upload image'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            label='Upload a high quality profile photo'
                            withPreview
                            singleImage
                            fileContainerStyle={{ borderRadius: '50%', width: '25%' }}
                        />
                    </div>)
        } else {
            profile_image = <Image src={this.props.profile_image} roundedCircle className="profileImage" />
        }

        return (
            <div className="divStyle">
                <div className="card">
                    <div className="card-header">
                        <h2>Your Account</h2>
                        {profile_image}
                    </div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
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
                            <li className="list-group-item">
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
                            <li className="list-group-item">
                                {this.state.showEditPassword ?
                                    <EditPassword
                                        password={this.state.password}
                                        newPassword={this.state.newPassword}
                                        confirmPassword={this.state.confirmPassword}
                                        passwordChangeHandler={this.passwordChangeHandler}
                                        newPasswordChangeHandler={this.newPasswordChangeHandler}
                                        confirmPasswordChangeHandler={this.confirmPasswordChangeHandler}
                                        submitUpdatePassword={this.submitUpdatePassword}
                                        showEditPassword={this.showEditPassword}
                                    />
                                    :
                                    <div>
                                        Password
                                        <p>************</p>
                                        <button onClick={this.showEditPassword} className="btn btn-link" type="submit">Edit</button>
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

const mapStateToProps = state => {
    return { 
        updated: state.clientProfile.updated,
        firstName: state.clientProfile.firstName,
        lastName: state.clientProfile.lastName,
        email: state.clientProfile.email,
        profile_image: state.clientProfile.profile_image,
        imageUrl: state.image.imageUrl
    };
};

const mapDispatchToProps = (dispatch) => ({
    userUpdate: () => dispatch(clientProfileActions.userUpdate()),
    userUpdateName: data => dispatch(clientProfileActions.userUpdateName(data)),
    userProfileImage: () => dispatch(clientProfileActions.userProfileImage()),
    userUpdateProfileImage: data => dispatch(clientProfileActions.userUpdateProfileImage(data)),
    userUpdateEmail: data => dispatch(clientProfileActions.userUpdateEmail(data)),
    userUpdatePassword: data => dispatch(clientProfileActions.userUpdatePassword(data)),
    upload: data => dispatch(imageActions.upload(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);