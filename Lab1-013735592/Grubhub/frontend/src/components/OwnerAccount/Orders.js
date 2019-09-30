import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Orders.css';

class Orders extends Component {

    constructor(props) {
        super(props);
    }


    render() {

        const statuses = ['New', 'Preparing', 'Ready', 'Delivered']
        var options = statuses.map(status => {
            return (
                <option value={status} key={status}>{status}</option>
            )
        })

        const listItems = this.props.orders.map(order => {
            return (
                <div className="card mb-3" key={order.order_id}>
                    <h3>{order.order_id}</h3>
                    <p>{order.client_first_name} {order.client_last_name}</p>
                    <p>{order.client_address}</p>
                    <p>{order.rest_name}</p>
                    <p>{order.order_bill}</p>
                    <p>{order.status}</p>
                    {this.props.type === 'Upcoming orders' ?
                        <select id={order.order_id} name="selectStatus"
                            value={order.status}
                            className="form-control"
                            onChange={this.props.statusChangeHandler}>
                            {options}
                        </select>
                        : null}
                    {this.props.order_details.map((item) => {
                        if (item.order_id === order.order_id) {
                            return (
                                <div key={item.item_id}>
                                    <div className="itemLayout">
                                        <img className="itemImage" src={item.item_image} />
                                        <div className="itemDetails">
                                            <h5>{item.item_name}</h5>
                                            <h6>{item.item_quantity}</h6>
                                            <p>{item.item_total_price}</p>
                                        </div>
                                    </div>
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
    order_details: PropTypes.array,
    status: PropTypes.string,
    statusChangeHandler: PropTypes.func
};

export default Orders;