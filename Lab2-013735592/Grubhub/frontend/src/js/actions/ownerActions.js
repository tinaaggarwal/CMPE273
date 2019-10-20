import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";

export const loginOwner = (payload, ownProps) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/ownerLogin`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                let data = {
                    owner_email: payload.email
                }
                if (response.status === 200) {
                    data.loginFlag = true;
                    dispatch({
                        type: actionTypes.LOGIN_OWNER,
                        payload: data
                    });
                    // history.push(`/home`);
                    // ownProps.history.push(`/home`);
                } else {
                    data.loginFlag = false;
                    dispatch({
                        type: actionTypes.LOGIN_OWNER,
                        payload: data
                    })
                }
            });

    }
}

export const signupOwner = (user, ownProps) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/ownerSignup`, user)
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: actionTypes.SIGNUP_OWNER,
                    });
                }
                ownProps.history.push('/ownerLogin');
            });
    }
}