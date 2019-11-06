import actionTypes from '../constants/index';
import isEmpty from '../../is-empty';

const initialState = {
    isAuthenticated: false,
    client: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CLIENT:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                client: action.payload
            }
        default:
            return state;
    }
}