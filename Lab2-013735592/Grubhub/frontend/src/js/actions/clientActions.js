import actionTypes from '../constants/index';
import axios from 'axios';

const loginClient = (payload, ownProps) => {
    return dispatch => {
        console.log('payload', payload)
        return axios.post('http://localhost:3001/clientLogin', payload)
        .then(response => {
            console.log("Status Code : ", response.status);
            let data = {
                client_email: payload.email         
           }
           console.log(data)
            if (response.status === 200) {
                data.loginFlag = true;
                dispatch({
                    type: actionTypes.LOGIN_USER,
                    payload: data
                });
                // history.push(`/home`);
                // ownProps.history.push(`/home`);
            } else {
                data.loginFlag = false;
                dispatch({
                    type: actionTypes.LOGIN_USER,
                    payload: data
                })
            }
        });
        
    }
}

export {
    loginClient,
};