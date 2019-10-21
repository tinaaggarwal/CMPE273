import actionTypes from '../constants/index';
import axios from 'axios';

const ROOT_URL = "http://localhost:3001";

export const upload = (payload) => {
    return dispatch => {
        return axios.post(`${ROOT_URL}/upload`, payload)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    dispatch({
                        type: actionTypes.UPLOAD_IMAGE,
                        payload: response.data
                    });
                }
            });
    }
}