import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { cartActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            orderId: "",
            cart_total: 0,
            r_id: 0,
            authFlag: false,
            emptyCart: false
        }

        this.submitOrder = this.submitOrder.bind(this);

    }

    componentDidMount() {

        this.setState({
            r_id: this.props.match.params.restaurantId
        });

        let cartTotal = 0;
        for (var item of this.props.cart) {
            cartTotal += (item.item_price * item.item_quantity)
        }
        this.setState({
            cart_total: cartTotal
        })
        // this.props.cartItems();

        // this.props.cartTotal();

    }

    submitOrder = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            // order_id: this.props.orderId,
            item: this.props.cart,
            r_id: this.state.r_id,
            // cart_totalPrice: this.props.cart_totalPrice
            cart_totalPrice: this.state.cart_total
        }
        this.props.submitOrder(data);
    };

    render() {
        
        let redirectVar = null;

        if(this.props.emptyCart) {
            redirectVar = <Redirect to={{
                pathname: "/orderPlaced",
                state: {
                    emptyCart: this.props.emptyCart
                }
            }}
            />
        }

        if (this.props.orderSubmitted) {
            redirectVar = <Redirect to={{
                pathname: "/orderPlaced",
                state: {
                    // order_id: this.props.orderId,
                    cart_totalPrice: this.state.cart_total
                }
            }}
            />
        }

        return (
            <div className="container">
                {redirectVar}
                <div className="card text-center">
                    <div className="card-header">
                        Review order
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Order items</h5>
                        {
                            this.props.cart.map((item) => {
                                return (
                                    <li className="list-group-item" key={item.item_name}>
                                        {/* <div className="card"> */}
                                        {/* <img className="card-img-top" src="..." alt="Card image cap"> */}
                                        <h5 className="card-text">{item.item_name}</h5>
                                        <h6 className="card-text">Quantity: {item.item_quantity}</h6>
                                        <p className="card-text">Total Price: {item.item_price * item.item_quantity}</p>
                                        {/* </div> */}
                                    </li>
                                );
                            }
                            )}
                    </div>
                    <div className="card-footer text-muted">
                        Total: {this.state.cart_total}
                        <br />
                        <button onClick={this.submitOrder} className="btn btn-success" type="button" name="Order">Place Order</button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return { 
        items: state.cart.items,
        orderId: state.cart.orderId,
        cart_totalPrice: state.cart.cart_totalPrice,
        emptyCart: state.cart.emptyCart,
        orderSubmitted: state.cart.orderSubmitted,
        cart: state.restaurantMenu.cart
    };
};

const mapDispatchToProps = (dispatch) => ({
    cartItems: () => dispatch(cartActions.cartItems()),
    cartTotal: () => dispatch(cartActions.cartTotal()),
    submitOrder: data => dispatch(cartActions.submitOrder(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);