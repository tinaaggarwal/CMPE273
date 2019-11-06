import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://34.221.70.150:3001";

export const pastOrdersForClient = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/pastOrdersForClient`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.PAST_ORDERS_FOR_CLIENT,
                        payload: response.data
                    });
                }
            });
    }
}

export const upcomingOrdersForClient = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/upcomingOrdersForClient`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.UPCOMING_ORDERS_FOR_CLIENT,
                        payload: response.data
                    });
                }
            });
    }
}

export const itemsInOrders = (payload) => {
    return dispatch => {
        const data = {
            order_ids: payload
        }
        return axios.post(`${ROOT_URL}/itemsInOrders`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.ITEMS_IN_ORDER,
                        payload: response.data
                    });
                } 
            });
    }
}

export const updateOrderStatus = (payload) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/updateOrderStatus`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.UPDATE_ORDER_STATUS,
                        payload: response.data
                    });
                } 
            });
    }
}
