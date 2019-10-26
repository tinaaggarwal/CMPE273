import React, { Component } from 'react';
import Orders from './Orders';
import { clientOrderActions } from '../../js/actions/index';
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

        this.props.pastOrdersForClient().then(() => {
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