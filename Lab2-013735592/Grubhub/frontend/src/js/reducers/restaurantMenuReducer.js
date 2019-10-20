import actionTypes from '../constants/index';

const initialState = {
    items: [],
    sections: [],
    addToCartSuccessful: false
};

const restaurantMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MENU_ITEMS:
            return Object.assign({}, state, {
                items: action.payload
            });

        case actionTypes.MENU_SECTIONS:
            return Object.assign({}, state, {
                sections: action.payload
            });

        case actionTypes.ADD_TO_CART:
            return Object.assign({}, state, {
                addToCartSuccessful: true
            });

        default:
            break;
    }
    return state;
};

export default restaurantMenuReducer;