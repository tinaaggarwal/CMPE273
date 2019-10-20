import React, { Component } from 'react';
import cookie from 'react-cookies';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RestaurantMenu.css';
import { restaurantMenuActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

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

        this.props.menuItems(data);
        this.props.menuSections(data);

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

        this.props.addItemToCart(data);
    };

    render() {

        const cart = '/cart.jpg'

        const r_id = this.props.match.params.restaurantId;

        const listItems = this.props.sections.map((section) => {
            return (
                <div className="card mb-3" key={section.section_id}>
                    <div className="sectionsLayout">
                        <h3>{section.section_name}</h3>
                        <p>{section.section_description}</p>
                    </div>
                    {this.props.items.map((item) => {
                        if (item.section_id === section.section_id) {
                            return (
                                <div className="card" key={item.item_id}>
                                    <div className="itemLayout">
                                        <img className="itemImageLayout" src={item.item_image} title={item.item_name} alt={item.item_name}/>
                                        <div className="itemDetails">
                                            <h5 className="card-title">{item.item_name}</h5>
                                            <h6 className="card-subtitle">{item.item_description}</h6>
                                            <p className="card-text">${item.item_price}</p>
                                            <div style={{ width: '150px' }} className="form-group">
                                                Qty:
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
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
            )
        });

        return (
            <div>
                <div className="container">
                    <div className="menuLayout">
                        <div className="goToCart">
                            <Link to={`/home/${r_id}/cart`}>
                                <img className="cartIcon" src={cart} alt="Go to cart" />
                            </Link>
                            <br />
                            Go to cart
                        </div>
                        {listItems}
                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return { 
        items: state.restaurantMenu.items,
        sections: state.restaurantMenu.sections
    };
};

const mapDispatchToProps = (dispatch) => ({
    menuItems: data => dispatch(restaurantMenuActions.menuItems(data)),
    menuSections: data => dispatch(restaurantMenuActions.menuSections(data)),
    addItemToCart: data => dispatch(restaurantMenuActions.addItemToCart(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RestaurantMenu));