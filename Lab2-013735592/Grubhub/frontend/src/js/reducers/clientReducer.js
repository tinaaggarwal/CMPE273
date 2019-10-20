import actionTypes from '../constants/index';

const initialState = {
    client_email: '',
    password: '',
    authFlag: false,
    signupClient: false
};

const clientReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.LOGIN_USER:
            // newState = action.payload;
            // // let authFlag = action.payload;
            // newState.authFlag = true;
            // console.log(action.payload)
            // return Object.assign({}, state, newState);
            return Object.assign({}, state, {
                authFlag: action.payload.loginFlag
            });

        case actionTypes.SIGNUP_CLIENT:
            return Object.assign({}, state, {
                signupClient: true
            });
            
        default:
            break;
    }
    return state;
};

export default clientReducer;