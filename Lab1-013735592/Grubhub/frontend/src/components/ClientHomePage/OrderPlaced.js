import React, { Component } from 'react';

class OrderPlaced extends Component {
    render() {
        return (
            <div className="container">
                <div class="card card-accent-success mb-3">
                    <div class="card-header">
                        Congratulations!!!!! Your Order has been placed
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Order ID : {this.props.location.state.order_id}</h5>
                        <p class="card-text">Order Total : {this.props.location.state.cart_totalPrice}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderPlaced;