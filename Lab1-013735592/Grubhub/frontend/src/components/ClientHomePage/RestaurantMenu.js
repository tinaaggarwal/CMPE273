import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

class RestaurantMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            items: [],
            item_quantity: "",
            item_id: "",
            item_name: "",
            item_price: "",
            authFlag: false,
            addToCartSuccessful: false
        }

        this.quantityChangeHandler = this.quantityChangeHandler.bind(this);
        this.addItemToCart = this.addItemToCart.bind(this);

    }

    componentDidMount() {

        const data = {
            r_id: this.props.match.params.restaurantId
        }

        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/menuItems', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        items: response.data,
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });

        axios.post('http://localhost:3001/menuSections', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data);
                    this.setState({
                        sections: response.data,
                        authFlag: true
                    })
                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            });

    }

    quantityChangeHandler = (e) => {


        let item = JSON.parse(e.target.id);

        this.setState({
            item_quantity: e.target.value,
            item_id: item.item_id,
            item_name: e.target.name,
            item_price: item.item_price
        })
    }

    addItemToCart = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            item_quantity: this.state.item_quantity,
            item_id: this.state.item_id,
            item_name: this.state.item_name,
            item_price: this.state.item_price
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        // make a post request with the user data
        axios.post('http://localhost:3001/addItemToCart', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        addToCartSuccessful: true
                    })
                } else {
                    this.setState({
                        addToCartSuccessful: false
                    })
                }
            });
    };

    render() {

        // redirect based on successful addition to cart
        let redirectVar = null;
        if (this.state.addToCartSuccessful) {
            redirectVar = <Redirect to="/cart" />
        }

        console.log(this.state.authFlag);

        console.log(this.props.match.params.restaurantId);

        const listItems = this.state.sections.map((section) =>
            <div className="card mb-3">
                <h3>{section.section_name}</h3>
                <p>{section.section_description}</p>
                {this.state.items.map((item) => {
                    if (item.section_id === section.section_id) {
                        return (
                            <div className="card">
                                <h5 className="card-title">{item.item_name}</h5>
                                <h6 className="card-subtitle">{item.item_description}</h6>
                                <p className="card-text">{item.item_price}</p>
                                <br />
                                <div style={{ width: '7%' }} className="form-group">
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="form-control"
                                        name={item.item_name}
                                        min="0"
                                        onChange={this.quantityChangeHandler}
                                        id={JSON.stringify(item)}
                                    />
                                </div>
                                <div>
                                    <button type="button" onClick={this.addItemToCart} className="btn btn-success">Add to cart</button>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );

        return (
            <div>
                {redirectVar}
                <div className="container">
                    {listItems}
                </div>
            </div>

        );
    }

}

export default RestaurantMenu;