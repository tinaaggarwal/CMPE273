import React, { Component } from 'react';
import axios from 'axios';
import './OwnerProfile.css';
import EditProfile from './EditProfile';
import ImageUploader from 'react-images-upload';
import Image from 'react-bootstrap/Image';
import { ownerProfileActions } from '../../js/actions/index';
import { imageActions } from '../../js/actions/index';
import { connect } from 'react-redux';

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
            showEdit: false,
            rest_image: [],
            profile_image: [],
            imageUrl: ""

        }

        this.showEdit = this.showEdit.bind(this);
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.restNameChangeHandler = this.restNameChangeHandler.bind(this);
        this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
        this.submitUpdate = this.submitUpdate.bind(this);
        this.onDropProfileImage = this.onDropProfileImage.bind(this);
        this.uploadProfileImage = this.uploadProfileImage.bind(this);
        this.onDropRestImage = this.onDropRestImage.bind(this);
        this.uploadRestImage = this.uploadRestImage.bind(this);
    }

    componentDidMount() {
        this.props.ownerUpdate();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updated) {
            this.setState({
                firstName: nextProps.firstName,
                lastName: nextProps.lastName,
                email: nextProps.email,
                phone: nextProps.phone,
                restName: nextProps.restName,
                cuisine: nextProps.cuisine,
                rest_image: nextProps.rest_image,
                profile_image: nextProps.profile_image
            })
        }
    }

    uploadProfileImage = () => {
        const uploaders = this.state.pictures.map(picture => {
            const data = new FormData();
            data.append("image", picture, picture.name);
            console.log(data)

            this.props.upload(data)
                .then(() => {
                    const data = {
                        profile_image: this.props.imageUrl
                    }
                    this.props.ownerUpdateProfileImage(data);

                }).then(() => {
                    window.location.reload();
                });
        });
    }


    onDropProfileImage(picture) {
        this.setState({
            pictures: picture
        },
            this.uploadProfileImage
        );
    }

    uploadRestImage = () => {
        const uploaders = this.state.pictures.map(picture => {
            const data = new FormData();
            data.append("image", picture, picture.name);
            console.log(data)

            this.props.upload(data)
                .then(() => {
                    const data = {
                        rest_image: this.props.imageUrl
                    }
                    this.props.ownerUpdateRestImage(data);

                }).then(() => {
                    window.location.reload();
                });;
        });
    }


    onDropRestImage(picture) {
        this.setState({
            pictures: picture
        },
            this.uploadRestImage
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
            restaurant_name: this.state.restName,
            cuisine: this.state.cuisine
        }

        this.props.ownerUpdateProfile(data);

        this.showEdit()

    };

    render() {

        let redirectVar = null;
        // if (!cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/" />
        // }

        let profile_image = null;
        if (this.props.profile_image === null) {
            profile_image =
                (
                    <div className="imageUploadPlaceholder">
                        <ImageUploader
                            withIcon
                            buttonText='Upload image'
                            onChange={this.onDropProfileImage}
                            imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
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

        let rest_image = null;
        if (this.props.rest_image === null) {
            rest_image =
                (
                    <ImageUploader
                        withIcon
                        buttonText='Upload image'
                        onChange={this.onDropRestImage}
                        imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                        maxFileSize={5242880}
                        label='Upload a high quality restaurant photo'
                        withPreview
                        singleImage
                        fileContainerStyle={{ borderRadius: '50%', width: '25%' }}
                    />
                )
        } else {
            rest_image = <img src={this.props.rest_image} className="restImage" alt={"Restaurant"} />
        }

        return (
            <div className="divStyle">
                {redirectVar}
                <div className="card">
                    {rest_image}
                    <div className="card-header">
                        <h2>Your Account</h2>
                        {profile_image}
                    </div>
                    <div className="card-body">
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

const mapStateToProps = state => {
    return {
        updated: state.ownerProfile.updated,
        firstName: state.ownerProfile.firstName,
        lastName: state.ownerProfile.lastName,
        email: state.ownerProfile.email,
        phone: state.ownerProfile.phone,
        restName: state.ownerProfile.restName,
        cuisine: state.ownerProfile.cuisine,
        rest_image: state.ownerProfile.rest_image,
        profile_image: state.ownerProfile.profile_image,
        imageUrl: state.image.imageUrl,
    };
};

const mapDispatchToProps = (dispatch) => ({
    ownerUpdate: () => dispatch(ownerProfileActions.ownerUpdate()),
    ownerUpdateProfile: data => dispatch(ownerProfileActions.ownerUpdateProfile(data)),
    upload: data => dispatch(imageActions.upload(data)),
    ownerUpdateProfileImage: data => dispatch(ownerProfileActions.ownerUpdateProfileImage(data)),
    ownerUpdateRestImage: data => dispatch(ownerProfileActions.ownerUpdateRestImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OwnerProfile);