import React, { Component } from 'react';
import Orders from './Orders';
import { ownerOrderActions } from '../../js/actions/index';
import { connect } from 'react-redux';

class UpcomingOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order_ids: [],
            order_details: [],
            authFlag: false
        }

        this.statusChangeHandler = this.statusChangeHandler.bind(this);
        this.cancelBtnHandler = this.cancelBtnHandler.bind(this);
    }

    componentDidMount() {

        this.props.upcomingOrdersForOwner().then(() => {
            this.props.itemsInOrders(this.props.order_ids)
        });

    }

    statusChangeHandler = (e) => {

        const data = {
            status: e.target.value,
            orderIdToUpdate: e.target.id
        }

        this.props.updateOrderStatus(data);

        window.location.reload();

    }

    cancelBtnHandler = (e) => {

        const data = {
            status: 'Cancelled',
            orderIdToUpdate: e.target.id
        }

        this.props.updateOrderStatus(data);

        window.location.reload();

    }

    render() {
        return (
            <div className="container">
                <Orders
                    orders={this.props.orders}
                    order_details={this.props.order_details}
                    type="Upcoming orders"
                    statusChangeHandler={this.statusChangeHandler}
                    cancelBtnHandler={this.cancelBtnHandler}/>
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
    upcomingOrdersForOwner: () => dispatch(ownerOrderActions.upcomingOrdersForOwner()),
    itemsInOrders: data => dispatch(ownerOrderActions.itemsInOrders(data)),
    updateOrderStatus: data => dispatch(ownerOrderActions.updateOrderStatus(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingOrders);