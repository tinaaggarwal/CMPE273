import actionTypes from '../constants/index';
import isEmpty from '../../is-empty';

const initialState = {
    isAuthenticated: false,
    owner: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_CURRENT_OWNER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                owner: action.payload
            }
        default:
            return state;
    }
}