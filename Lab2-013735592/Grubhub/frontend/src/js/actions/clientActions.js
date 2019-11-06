import actionTypes from '../constants/index';
import axios from 'axios';
import setAuthToken from '../../setAuthToken';
import jwt_decode from 'jwt-decode';

const ROOT_URL = "http://34.221.70.150:3001";

export const loginClient = (payload, ownProps) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/clientLogin`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                let data = {
                    client_email: payload.email
                }
                var decoded;
                const { token } = response.data;
                if (token !== "undefined") {
                    console.log("token:", token);
                    localStorage.setItem('jwtToken', token);
                    setAuthToken(token);
                    decoded = jwt_decode(token);
                }
                dispatch(setCurrentClient(decoded));

            });

    }
}

export const setCurrentClient = decoded => {
    return {
        type: actionTypes.SET_CURRENT_CLIENT,
        payload: decoded
    }
}


export const logoutClient = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentClient({}));
    console.log("history:" + history);
    history.push('/');
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