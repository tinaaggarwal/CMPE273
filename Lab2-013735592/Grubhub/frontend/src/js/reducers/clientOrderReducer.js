import actionTypes from '../constants/index';

const initialState = {
    order_ids: [],
    orders: [],
    order_details: [],
    orderCancelled: false
};

const clientOrderReducer = (state = initialState, action) => {
    
    let newState;
    let orderIds;
    
    switch (action.type) {

        case actionTypes.PAST_ORDERS_FOR_CLIENT:
            newState = action.payload;
            orderIds = newState.map(obj => {
                return obj.order_id;
            });
            newState.orders = action.payload;
            newState.order_ids = orderIds;
            return Object.assign({}, state, newState);

        case actionTypes.ITEMS_IN_ORDER:
            return Object.assign({}, state, {
                items: action.payload,
                order_details: action.payload
            });

        case actionTypes.UPCOMING_ORDERS_FOR_CLIENT:
            newState = action.payload;
            orderIds = newState.map(obj => {
                return obj.order_id;
            });
            newState.orders = action.payload;
            newState.order_ids = orderIds;
            return Object.assign({}, state, newState);

        case actionTypes.UPDATE_ORDER_STATUS:
            return Object.assign({}, state, {
                orderCancelled: true
            });

        default:
            break;
    }
    return state;
};

export default clientOrderReducer;