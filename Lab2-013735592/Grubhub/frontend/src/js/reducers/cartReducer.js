import actionTypes from '../constants/index';

const initialState = {
    emptyCart: false,
    items: [],
    orderId: '',
    cart_totalPrice: 0,
    orderSubmitted: false
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CART_EMPTY:
            return Object.assign({}, state, {
                emptyCart: true
            });

        case actionTypes.CART_ITEMS:
            return Object.assign({}, state, {
                items: action.payload,
                orderId: action.payload[0].order_id,
                emptyCart: false
            });

        case actionTypes.CART_TOTAL:
            return Object.assign({}, state, {
                cart_totalPrice: action.payload
            });

        case actionTypes.SUBMIT_ORDER:
            return Object.assign({}, state, {
                orderSubmitted: true
            });

        default:
            break;
    }
    return state;
};

export default cartReducer;