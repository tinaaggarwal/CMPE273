import React, { Component } from 'react';
import Orders from './Orders';
import { ownerOrderActions } from '../../js/actions/index';
import { connect } from 'react-redux';

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

        this.props.pastOrdersForOwner().then(() => {
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
        orders: state.ownerOrder.orders,
        order_ids: state.ownerOrder.order_ids,
        order_details: state.ownerOrder.order_details
    };
};

const mapDispatchToProps = (dispatch) => ({
    pastOrdersForOwner: () => dispatch(ownerOrderActions.pastOrdersForOwner()),
    itemsInOrders: data => dispatch(ownerOrderActions.itemsInOrders(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(PastOrders);