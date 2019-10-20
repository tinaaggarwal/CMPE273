import React, { Component } from 'react';
import Orders from './Orders';
import axios from 'axios';
import { clientOrderActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class PastOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order_ids: [],
            order_details: [],
            authFlag: false
        }

    }

    componentDidMount() {

        this.props.pastOrdersForClient().then(() => 
        {
            this.props.itemsInOrders(this.props.order_ids)
        });

    }


    render() {
        return (
            <div className="container">
                <Orders
                    orders={this.props.orders}
                    order_details={this.props.order_details}
                    type="Past orders" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        orders: state.clientOrder.orders,
        order_ids: state.clientOrder.order_ids,
        order_details: state.clientOrder.order_details
    };
};

const mapDispatchToProps = (dispatch) => ({
    pastOrdersForClient: () => dispatch(clientOrderActions.pastOrdersForClient()),
    itemsInOrders: data => dispatch(clientOrderActions.itemsInOrders(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);