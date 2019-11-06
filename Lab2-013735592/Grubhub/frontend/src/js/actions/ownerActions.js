import actionTypes from '../constants/index';
import axios from 'axios';
import setAuthToken1 from '../../setAuthToken1';
import jwt_decode from 'jwt-decode';

const ROOT_URL = "http://34.221.70.150:3001";

export const loginOwner = (payload, ownProps) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/ownerLogin`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                let data = {
                    owner_email: payload.email
                }
                var decoded;
                const { token } = response.data;
                if (token !== "undefined") {
                    console.log("token:", token);
                    localStorage.setItem('jwtToken1', token);
                    setAuthToken1(token);
                    decoded = jwt_decode(token);
                }
                dispatch(setCurrentOwner(decoded));

            });

    }
}

export const setCurrentOwner = decoded => {
    return {
        type: actionTypes.SET_CURRENT_OWNER,
        payload: decoded
    }
}

export const logoutOwner = (history) => dispatch => {
    localStorage.removeItem('jwtToken1');
    setAuthToken1(false);
    dispatch(setCurrentOwner({}));
    console.log("history:" + history);
    history.push('/');
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