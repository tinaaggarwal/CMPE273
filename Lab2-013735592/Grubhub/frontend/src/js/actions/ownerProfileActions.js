import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";

export const ownerUpdate = () => {
    return dispatch => {
        return axios.get(`${ROOT_URL}/ownerUpdate`)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_DETAILS_FOR_UPDATE,
                        payload: response.data
                    });
                }
            });
    }
}

export const ownerUpdateProfile = (payload) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post(`${ROOT_URL}/ownerUpdateProfile`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.OWNER_UPDATE_PROFILE,
                        payload: response.data
                    });
                } 
            });

    }
}