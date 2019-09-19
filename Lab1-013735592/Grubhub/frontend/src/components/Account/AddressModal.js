import React, { Component } from 'react';
import './AddressModal.css';
import PropTypes from 'prop-types';
import States from './States';

class AddressModal extends Component {

    render() {
        console.log(this.props)
        return (
            <div className="modalLayout">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">Add new address</h5>
                    <button onClick={this.props.showAddressModal} type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="container">
                    <div class="modal-body">

                        <form onSubmit={this.props.submitAddress}>
                            <div style={{ width: '30%' }} className="form-group">
                                <label>Street Address</label>
                                <input type="text" class="form-control" value={this.props.street_address} name="streetAddress" onChange={this.props.streetAddressChangeHandler} required />
                            </div>
                            <div style={{ width: '100%' }} className="form-group">
                                <label>Apt, suite, floor</label>
                                <input type="text" class="form-control" value={this.props.apt} name="apt" onChange={this.props.aptChangeHandler} />
                            </div>
                            <div className="cityState">
                                <div style={{ width: '49%' }} className="form-group">
                                    <label>City</label>
                                    <input type="text" class="form-control" value={this.props.city} name="city" onChange={this.props.cityChangeHandler} required />
                                </div>
                                <States
                                    stateChangeHandler={this.props.stateChangeHandler} state={this.props.state}/>
                            </div>
                            <div style={{ width: '49%' }} className="form-group">
                                <label>Zip code</label>
                                <input type="text" class="form-control" value={this.props.zip_code} name="zip_code" onChange={this.props.zipCodeChangeHandler} required />
                            </div>
                            <div style={{ width: '49%' }} className="form-group">
                                <label>Phone</label>
                                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="e.g. 555-555-1212" class="form-control" value={this.props.phone} name="phone" onChange={this.props.phoneChangeHandler} required />
                            </div>
                            <div style={{ width: '49%' }} className="form-group">
                                <label>Cross Street</label>
                                <input type="text" class="form-control" value={this.props.cross_street} name="cross_street" placeholder="Main Street and Second Avenue" onChange={this.props.crossStreetChangeHandler} />
                            </div>
                            <div style={{ width: '100%' }} className="form-group">
                                <label>Delivery Instructions</label>
                                <input type="text" class="form-control" value={this.props.delivery_instructions} name="delivery_instructions" placeholder="e.g. Check in with the doorman" onChange={this.props.deliveryInstructionsChangeHandler} />
                            </div>
                            <div style={{ width: '49%' }} className="form-group">
                                <label>Address Name</label>
                                <input type="text" class="form-control" value={this.props.address_name} name="address_name" placeholder="e.g. Home" onChange={this.props.addressNameChangeHandler} required />
                            </div>
                            <div className="footerBtns">
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <button onClick={this.props.showAddressModal} type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>

                    
                </div>
            </div>
        );
    }
}

AddressModal.propTypes = {
    street_address: PropTypes.string,
    apt: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip_code: PropTypes.string,
    phone: PropTypes.string,
    cross_street: PropTypes.string,
    delivery_instructions: PropTypes.string,
    address_name: PropTypes.string,
    streetAddressChangeHandler: PropTypes.func,
    aptChangeHandler: PropTypes.func,
    cityChangeHandler: PropTypes.func,
    stateChangeHandler: PropTypes.func,
    zipCodeChangeHandler: PropTypes.func,
    phoneChangeHandler: PropTypes.func,
    crossStreetChangeHandler: PropTypes.func,
    deliveryInstructionsChangeHandler: PropTypes.func,
    addressNameChangeHandler: PropTypes.func,
    submitAddress: PropTypes.func,
    showAddressModal: PropTypes.func
}

export default AddressModal;