import actionTypes from '../constants/index';

const initialState = {
    items: [],
    sections: [],
    addToCartSuccessful: false,
    cart: []
};

const restaurantMenuReducer = (state = initialState, action) => {
    let cartItem = initialState.cart;
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
            cartItem.push(action.payload)
            return Object.assign({}, state, {
                addToCartSuccessful: true,
                cart: cartItem
            });

        default:
            break;
    }
    return state;
};

export default restaurantMenuReducer;