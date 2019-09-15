import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditEmail extends Component {
    render() {
        return (
            <div class="card-body">
                <h3 class="card-title">Edit Email</h3>
                <form>
                    <div style={{ width: '30%' }} className="form-group">
                        <label>New Email</label>
                        <input value={this.props.firstName} type="text" class="form-control" name="firstName" onChange={this.props.emailChangeHandler} />
                    </div>
                    <div style={{ width: '30%' }} className="form-group">
                        <label>Confirm Email</label>
                        <input value={this.props.lastName} type="text" class="form-control" name="lastName" onChange={this.props.confirmEmailChangeHandler} />
                    </div>
                    <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <button onClick={this.props.submitUpdateEmail} className="btn btn-primary" type="submit">Update Email</button>
                        <button onClick={this.props.showEditEmail} className="btn btn-primary" type="submit">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

EditEmail.propTypes = {
    email: PropTypes.string,
    emailChangeHandler: PropTypes.func,
    confirmEmailChangeHandler: PropTypes.func,
    submitUpdateEmail: PropTypes.func,
    showEditEmail: PropTypes.func
};

export default EditEmail;