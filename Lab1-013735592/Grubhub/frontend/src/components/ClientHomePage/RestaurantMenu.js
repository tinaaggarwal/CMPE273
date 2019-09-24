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
            items: []
        }
    }

    componentDidMount() {

        const data = {
            r_id: this.props.match.params.restaurantId
        }
        console.log(data.r_id)
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


    render() {

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
                                    <input type="number" placeholder="0" class="form-control" name="quantity" min="0" />
                                </div>
                                <div>
                                    <button type="button" class="btn btn-success">Add to cart</button>
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );

        return (
            <div className="container">
                {listItems}
            </div>

        );
    }

}

export default RestaurantMenu;