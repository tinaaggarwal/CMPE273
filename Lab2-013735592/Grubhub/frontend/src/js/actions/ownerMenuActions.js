import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";

export const ownerSections = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/ownerSections`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_SECTIONS,
                        payload: response.data
                    });
                }
            });
    }
}

export const ownerItemsList = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/ownerItemsList`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_ITEMS,
                        payload: response.data
                    });
                }
            });
    }
}

export const ownerAddItem = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/ownerAddItem`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_ADD_ITEM_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: actionTypes.OWNER_ADD_ITEM_FAIL,
                    });
                } 
            });

    }
}

export const ownerDeleteItem = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/ownerDeleteItem`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_DELETE_ITEM_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: actionTypes.OWNER_DELETE_ITEM_FAIL,
                    });
                } 
            });

    }
}

export const ownerAddSection = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/ownerAddSection`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_ADD_SECTION_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: actionTypes.OWNER_ADD_SECTION_FAIL,
                    });
                } 
            });

    }
}

export const ownerUpdateSection = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/ownerUpdateSection`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_UPDATE_SECTION_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: actionTypes.OWNER_UPDATE_SECTION_FAIL,
                    });
                } 
            });

    }
}

export const ownerDeleteSection = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/ownerDeleteSection`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_DELETE_SECTION_SUCCESS,
                    });
                } else {
                    dispatch({
                        type: actionTypes.OWNER_DELETE_SECTION_FAIL,
                    });
                } 
            });

    }
}