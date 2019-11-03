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
    profileUpdated: false,
    imageUpdated: false,
    restImageUpdated: false
    
};

const ownerProfileReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.OWNER_DETAILS_FOR_UPDATE:
            return Object.assign({}, state, {
                updated: true,
                firstName: action.payload.first_name,
                lastName: action.payload.last_name,
                email: action.payload.owner_email,
                phone: action.payload.phone,
                restName: action.payload.restaurant_name,
                cuisine: action.payload.cuisine,
                rest_image: action.payload.rest_image,
                profile_image: action.payload.profile_image
            });

        case actionTypes.OWNER_UPDATE_PROFILE:
            return Object.assign({}, state, {
                updated: true,
                profileUpdated: true
            });

        case actionTypes.OWNER_UPDATE_PROFILE_IMAGE:
            return Object.assign({}, state, {
                updated: true,
                imageUpdated: true
            });

        case actionTypes.OWNER_UPDATE_REST_IMAGE:
            return Object.assign({}, state, {
                updated: true,
                restImageUpdated: true
            });
            
        default:
            break;
    }
    return state;
};

export default ownerProfileReducer;