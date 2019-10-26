import React, { Component } from 'react';
import Orders from './Orders';
import { clientOrderActions } from '../../js/actions/index';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";

class UpcomingOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order_ids: [],
            order_details: [],
            authFlag: false,
            itemsPerPage: 4,
            activePage: 1
        }

        this.cancelBtnHandler = this.cancelBtnHandler.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {

        this.props.upcomingOrdersForClient().then(() => {
            this.props.itemsInOrders(this.props.order_ids)
        });

    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({
            activePage: pageNumber
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

        // Logic for displaying items
        const indexOfLastItem = this.state.activePage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = this.props.orders.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <div className="container">
                <Orders
                    orders={currentItems}
                    order_details={this.props.order_details}
                    type="Upcoming orders"
                    cancelBtnHandler={this.cancelBtnHandler}
                />
                <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={this.props.orders.length}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>
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