import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Orders extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const listItems = this.props.orders.map(order => {
            return(
            <div className="card mb-3" key={order.order_id}>
                <h3>{order.order_id}</h3>
                <p>{order.client_address}</p>
                <p>{order.rest_name}</p>
                <p>{order.order_bill}</p>
                <p>{order.status}</p>
                {this.props.order_details.map((item) => {
                    if (item.order_id === order.order_id) {
                        return (
                            <div key={item.item_id}>
                                <h5>{item.item_name}</h5>
                                <h6>{item.item_quantity}</h6>
                                <p>{item.item_total_price}</p>
                            </div>
                        );
                    }
                })}
            </div>
            )
        })

        return (
            <div className="container">
                <h1>{this.props.type}</h1>
                <div>
                    <ul className="list-group list-group-flush">{listItems}</ul>
                </div>
            </div>
        );
    }
}


Orders.propTypes = {
    type: PropTypes.string,
    orders: PropTypes.array,
    order_details: PropTypes.array
};

export default Orders;