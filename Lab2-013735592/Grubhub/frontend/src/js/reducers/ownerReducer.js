import actionTypes from '../constants/index';

const initialState = {
    owner_email: '',
    password: '',
    authFlag: false
};

const ownerReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case actionTypes.LOGIN_OWNER:
            // newState = action.payload;
            // // let authFlag = action.payload;
            // newState.authFlag = true;
            // console.log(action.payload)
            // return Object.assign({}, state, newState);
            return Object.assign({}, state, {
                authFlag: action.payload.loginFlag
              });
        default:
            break;
    }
    return state;
};

export default ownerReducer;