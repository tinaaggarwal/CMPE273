import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://34.221.70.150:3001";

export const restaurantList = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/restaurantList`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.RESTAURANT_LIST,
                        payload: response.data
                    });
                }
            });
    }
}

export const nextOrderId = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/nextOrderId`)
            .then(response => {
                console.log("for next id Status Code : ", response.status);
            });
    }
}

export const distinctCuisines = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/distinctCuisines`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.DISTINCT_CUISINES,
                        payload: response.data
                    });
                }
            });
    }
}

export const searchItem = (payload) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/searchItem`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.SEARCH_ITEM,
                        payload: response.data
                    });
                } 
            });

    }
}