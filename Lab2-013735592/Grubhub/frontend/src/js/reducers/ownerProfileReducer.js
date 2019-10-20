import actionTypes from '../constants/index';

const initialState = {
    updated: true,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    restName: "",
    cuisine: "",
    rest_image: [],
    profile_image: [],
    profileUpdated: false
};

const ownerProfileReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.OWNER_DETAILS_FOR_UPDATE:
            return Object.assign({}, state, {
                updated: true,
                firstName: (action.payload[0]).first_name,
                lastName: (action.payload[0]).last_name,
                email: (action.payload[0]).owner_email,
                phone: (action.payload[0]).phone,
                restName: (action.payload[0]).rest_name,
                cuisine: (action.payload[0]).cuisine,
                rest_image: (action.payload[0]).rest_image,
                profile_image: (action.payload[0]).profile_image
            });

        case actionTypes.OWNER_UPDATE_PROFILE:
            return Object.assign({}, state, {
                updated: true,
                profileUpdated: true
            });

        default:
            break;
    }
    return state;
};

export default ownerProfileReducer;