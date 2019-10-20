import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";

export const loginClient = (payload, ownProps) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/clientLogin`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                let data = {
                    client_email: payload.email
                }
                if (response.status === 200) {
                    data.loginFlag = true;
                    dispatch({
                        type: actionTypes.LOGIN_USER,
                        payload: data
                    });
                    // history.push(`/home`);
                    // ownProps.history.push(`/home`);
                } else {
                    data.loginFlag = false;
                    dispatch({
                        type: actionTypes.LOGIN_USER,
                        payload: data
                    })
                }
            });

    }
}

export const signupClient = (user, ownProps) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/clientSignup`, user)
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.SIGNUP_CLIENT,
                    });
                }
                ownProps.history.push('/login');
            });
    }
}