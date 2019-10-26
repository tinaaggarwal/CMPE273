import React, { Component } from 'react';
import Orders from './Orders';
import { ownerOrderActions } from '../../js/actions/index';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";

class PastOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            order_ids: [],
            order_details: [],
            authFlag: false,
            itemsPerPage: 3,
            activePage: 1
        }
        this.handlePageChange = this.handlePageChange.bind(this);

    }

    componentDidMount() {

        this.props.pastOrdersForOwner().then(() => {
            this.props.itemsInOrders(this.props.order_ids)
        });

    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({
            activePage: pageNumber
        });
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
                    type="Past orders" />
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