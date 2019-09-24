import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            items: []
        }
    }


    render() {
        
        return (
            <div>
                <h1>cart</h1>
            </div>
        );
    }

}

export default Cart;