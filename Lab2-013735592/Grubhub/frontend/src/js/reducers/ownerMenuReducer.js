import actionTypes from '../constants/index';

const initialState = {
    sections: [],
    items: [],
    deletedMessage: false,
    errorMessage: false,
    authFlag: false,
    updatedMessage: false,
};

const ownerMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.OWNER_SECTIONS:
            return Object.assign({}, state, {
                sections: action.payload.menu
            });

        case actionTypes.OWNER_ITEMS:
            return Object.assign({}, state, {
                items: action.payload
            });

        case actionTypes.OWNER_ADD_ITEM_SUCCESS:
            return Object.assign({}, state, {
                authFlag: true
            });

        case actionTypes.OWNER_ADD_ITEM_FAIL:
            return Object.assign({}, state, {
                errorMessage: true
            });

        case actionTypes.OWNER_DELETE_ITEM_SUCCESS:
            return Object.assign({}, state, {
                deletedMessage: true
            });

        case actionTypes.OWNER_DELETE_ITEM_FAIL:
            return Object.assign({}, state, {
                errorMessage: true
            });

        case actionTypes.OWNER_ADD_SECTION_SUCCESS:
            return Object.assign({}, state, {
                authFlag: true
            });

        case actionTypes.OWNER_ADD_SECTION_FAIL:
            return Object.assign({}, state, {
                errorMessage: true
            });

        case actionTypes.OWNER_UPDATE_SECTION_SUCCESS:
            return Object.assign({}, state, {
                updatedMessage: true
            });

        case actionTypes.OWNER_UPDATE_SECTION_FAIL:
            return Object.assign({}, state, {
                errorMessage: true
            });

        case actionTypes.OWNER_DELETE_SECTION_SUCCESS:
            return Object.assign({}, state, {
                deletedMessage: true
            });

        case actionTypes.OWNER_DELETE_SECTION_FAIL:
            return Object.assign({}, state, {
                errorMessage: true
            });

        default:
            break;
    }
    return state;
};

export default ownerMenuReducer;