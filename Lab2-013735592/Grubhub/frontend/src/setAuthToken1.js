import axios from 'axios';

const setAuthToken1 = token => {
    if (token) {
        axios.defaults.headers.common['Authorization1'] = token;
    }
    else {
        delete axios.defaults.headers.common['Authorization1'];
    }
}

export default setAuthToken1;