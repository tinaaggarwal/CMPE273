import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import './SectionsModal.css';
import Modal from 'react-modal';

class SectionsModal extends Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                >
                    <div>
                        <div class="modal-header">
                            <h5 class="modal-title">Add Section</h5>
                            <button onClick={this.props.showSectionsModal} type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="container">
                            <div class="modal-body">
                                <form onSubmit={this.props.submitAddress}>
                                    <div style={{ width: '30%' }} className="form-group">
                                        <label>Section Name</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            value={this.props.sectionName}
                                            name="sectionName"
                                            onChange={this.props.sectionNameChangeHandler}
                                            required />
                                    </div>
                                    <div style={{ width: '100%' }} className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            type="text"
                                            class="form-control"
                                            value={this.props.sectionDescription}
                                            name="sectionDescription"
                                            onChange={this.props.sectionDescriptionChangeHandler}
                                            placeholder="Describe the types of menu items that will be found in this section" />
                                    </div>
                                    <div className="footerBtns">
                                        <button type="submit" class="btn btn-primary">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

SectionsModal.propTypes = {
    isOpen: PropTypes.bool,
    sectionName: PropTypes.string,
    sectionDescription: PropTypes.string,
    showSectionsModal: PropTypes.func,
    sectionNameChangeHandler: PropTypes.func,
    sectionDescriptionChangeHandler: PropTypes.func
}

export default SectionsModal;