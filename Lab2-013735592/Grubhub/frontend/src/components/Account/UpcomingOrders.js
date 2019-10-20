import React, { Component } from 'react';
import Orders from './Orders';
import { clientOrderActions } from '../../js/actions/index';
import  { connect } from 'react-redux';

class UpcomingOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order_ids: [],
            order_details: [],
            authFlag: false
        }

        this.cancelBtnHandler = this.cancelBtnHandler.bind(this);
    }

    componentDidMount() {

        this.props.upcomingOrdersForClient().then(() => 
        {
            this.props.itemsInOrders(this.props.order_ids)
        });

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
                    cancelBtnHandler={this.cancelBtnHandler}/>
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
    upcomingOrdersForClient: () => dispatch(clientOrderActions.upcomingOrdersForClient()),
    itemsInOrders: data => dispatch(clientOrderActions.itemsInOrders(data)),
    updateOrderStatus: data => dispatch(clientOrderActions.updateOrderStatus(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingOrders);