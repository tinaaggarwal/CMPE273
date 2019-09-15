import React, { Component } from 'react';

const divStyle = {
    float: 'right',
    width: '75%',
    marginTop: '50px',
    marginLeft: '10px'
  };

class Address extends Component {
    render() {
        return (
            <div style={divStyle}>
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Addresses</h6>
                        <p class="card-text">You don't have any saved addresses.</p>
                        <a href="#">Add a new address</a>
                    </div>
                </div>
            </div>

        );
    }
}

export default Address;