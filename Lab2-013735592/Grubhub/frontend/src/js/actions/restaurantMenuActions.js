import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://34.221.70.150:3001";

export const menuItems = (payload) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/menuItems`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.MENU_ITEMS,
                        payload: response.data
                    });
                }
            });
    }
}

export const menuSections = (payload) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/menuSections`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.MENU_SECTIONS,
                        payload: response.data
                    });
                }
            });
    }
}

export const addItemToCart = (payload) => {
    return dispatch => {
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload
        });
    }
}