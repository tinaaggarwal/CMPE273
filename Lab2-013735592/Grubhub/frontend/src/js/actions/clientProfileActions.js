import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";

export const userUpdate = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/userUpdate`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_DETAILS_FOR_UPDATE,
                        payload: response.data
                    });
                }
            });
    }
}

export const userUpdateName = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/userUpdateName`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_UPDATE_NAME,
                        payload: response.data
                    });
                } 
            });

    }
}

export const userProfileImage = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/userProfileImage`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_PROFILE_IMAGE,
                        payload: response.data
                    });
                }
            });
    }
}

export const userUpdateProfileImage = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/userUpdateProfileImage`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_UPDATE_PROFILE_IMAGE,
                        payload: response.data
                    });
                } 
            });

    }
}

export const userUpdateEmail = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/userUpdateEmail`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_UPDATE_EMAIL,
                        payload: response.data
                    });
                } 
            });

    }
}

export const userUpdatePassword = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/userUpdatePassword`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_UPDATE_PASSWORD,
                        payload: response.data
                    });
                } 
            });

    }
}

export const addressUpdate = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/addressUpdate`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_ADDRESS_FOR_UPDATE,
                        payload: response.data
                    });
                }
            });
    }
}

export const userUpdateAddress = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/userUpdateAddress`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_UPDATE_ADDRESS,
                        payload: response.data
                    });
                } 
            });

    }
}

export const userAddAddress = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/userAddAddress`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.USER_ADD_ADDRESS,
                        payload: response.data
                    });
                } 
            });

    }
}