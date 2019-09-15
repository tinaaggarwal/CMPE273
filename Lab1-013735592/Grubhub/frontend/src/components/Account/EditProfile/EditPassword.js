import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditPassword extends Component {
    render() {
        return (
            <div class="card-body">
                <h3 class="card-title">Edit Password</h3>
                <form>
                    <div style={{ width: '30%' }} className="form-group">
                        <label>Current Password</label>
                        <input value={this.props.password} type="password" class="form-control" name="firstName" onChange={this.props.passwordChangeHandler} required/>
                    </div>
                    <div style={{ width: '30%' }} className="form-group">
                        <label>New Password</label>
                        <input value={this.props.newPassword} type="password" class="form-control" name="lastName" onChange={this.props.newPasswordChangeHandler} required/>
                    </div>
                    <div style={{ width: '30%' }} className="form-group">
                        <label>Confirm Password</label>
                        <input value={this.props.confirmPassword} type="password" class="form-control" name="lastName" onChange={this.props.confirmPasswordChangeHandler} required/>
                    </div>
                    <div style={{ width: '30%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                        <button onClick={this.props.submitUpdatePassword} className="btn btn-primary" type="submit">Update Password</button>
                        <button onClick={this.props.showEditPassword} className="btn btn-primary" type="submit">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}

EditPassword.propTypes = {
    password: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
    passwordChangeHandler: PropTypes.func,
    newPasswordChangeHandler: PropTypes.func,
    confirmPasswordChangeHandler: PropTypes.func,
    submitUpdatePassword: PropTypes.func,
    showEditPassword: PropTypes.func
};

export default EditPassword;