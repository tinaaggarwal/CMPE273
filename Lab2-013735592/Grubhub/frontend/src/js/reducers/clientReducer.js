import actionTypes from '../constants/index';

const initialState = {
    client_email: '',
    password: '',
    authFlag: false
};

const clientReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case actionTypes.LOGIN_USER:
            // newState = action.payload;
            // // let authFlag = action.payload;
            // newState.authFlag = true;
            // console.log(action.payload)
            // return Object.assign({}, state, newState);
            console.log(action.payload)
            return Object.assign({}, state, {
                authFlag: action.payload.loginFlag
              });
        default:
            break;
    }
    return state;
};

export default clientReducer;