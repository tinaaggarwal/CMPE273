import actionTypes from '../constants/index';

const initialState = {
    owner_email: '',
    password: '',
    authFlag: false
};

const ownerReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_OWNER:
            return Object.assign({}, state, {
                authFlag: action.payload.loginFlag
              });
        default:
            break;
    }
    return state;
};

export default ownerReducer;