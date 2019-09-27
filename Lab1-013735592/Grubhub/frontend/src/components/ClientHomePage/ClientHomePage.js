import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect, withRouter } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';


class ClientHomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/restaurantList')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    restaurants: response.data
                });
            });

        axios.get('http://localhost:3001/nextOrderId')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    nextOrderId: response.data
                });
            });
    }

    render() {

        //if not logged in go to login page
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/" />
        }

        const restaurantsList = this.state.restaurants.map((restaurant) =>
            <Link to={`/home/${restaurant.r_id}`} key={restaurant.r_id} className="nav-link">
                <div className="card mb-3" >
                    <img className="card-img-top" src="..." alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{restaurant.rest_name}</h5>
                        <p className="card-text">{restaurant.cuisine}</p>
                        <p className="card-text"><small className="text-muted">{restaurant.rest_zip_code}</small></p>
                    </div>
                </div>
            </Link>
        );

        return (
            <div className="container">
                {redirectVar}
                {restaurantsList}
            </div>
        );
    }
}

export default withRouter(ClientHomePage);

