import actionTypes from '../constants/index';

const initialState = {
    updated: false,
    firstName: "",
    lastName: "",
    email: "",
    nameUpdated: false,
    profile_image: [],
    emailUpdated: false,
    passwordUpdated: false,
    street_address: "",
    apt: "",
    city: "",
    state: "",
    zip_code: "",
    phone: "",
    cross_street: "",
    delivery_instructions: "",
    address_name: "",
    addressUpdated: false,
    addressAdded: false,
    imageUpdated: false
};

const clientProfileReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.USER_DETAILS_FOR_UPDATE:
            return Object.assign({}, state, {
                updated: true,
                firstName: (action.payload[0]).first_name,
                lastName: (action.payload[0]).last_name,
                email: (action.payload[0]).client_email
            });

        case actionTypes.USER_UPDATE_NAME:
            return Object.assign({}, state, {
                updated: true,
                nameUpdated: true
            });

        case actionTypes.USER_PROFILE_IMAGE:
            return Object.assign({}, state, {
                updated: true,
                profile_image: (action.payload[0]).profile_image
            });

        case actionTypes.USER_UPDATE_PROFILE_IMAGE:
            return Object.assign({}, state, {
                updated: true,
                imageUpdated: true
            });

        case actionTypes.USER_UPDATE_EMAIL:
            return Object.assign({}, state, {
                updated: true,
                emailUpdated: true
            });

        case actionTypes.USER_UPDATE_PASSWORD:
            return Object.assign({}, state, {
                updated: true,
                passwordUpdated: true
            });

        case actionTypes.USER_ADDRESS_FOR_UPDATE:
            return Object.assign({}, state, {
                updated: true,
                street_address: (action.payload[0]).street_address,
                apt: (action.payload[0]).apt,
                city: (action.payload[0]).city,
                state: (action.payload[0]).state,
                zip_code: (action.payload[0]).zip_code,
                phone: (action.payload[0]).phone,
                cross_street: (action.payload[0]).cross_street,
                delivery_instructions: (action.payload[0]).delivery_instructions,
                address_name: (action.payload[0]).address_name
            });

        case actionTypes.USER_UPDATE_ADDRESS:
            return Object.assign({}, state, {
                updated: true,
                addressUpdated: true,
            });

        case actionTypes.USER_ADD_ADDRESS:
            return Object.assign({}, state, {
                updated: true,
                addressAdded: true
            });

        default:
            break;
    }
    return state;
};

export default clientProfileReducer;