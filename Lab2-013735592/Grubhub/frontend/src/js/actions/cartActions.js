import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://34.221.70.150:3001";

export const cartItems = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/cartItems`)
            .then(response => {
                // console.log("Status Code : ", response.status);
                if (response.data === 'Cart is empty') {
                    dispatch({
                        type: actionTypes.CART_EMPTY,
                    });
                } else {
                    dispatch({
                        type: actionTypes.CART_ITEMS,
                        payload: response.data
                    });
                }
            });
    }
}

export const cartTotal = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/cartTotal`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.CART_TOTAL,
                        payload: response.data
                    });
                }
            });
    }
}

export const submitOrder = (payload) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/submitOrder`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SUBMIT_ORDER,
                        payload: response.data
                    });
                } 
            });

    }
}