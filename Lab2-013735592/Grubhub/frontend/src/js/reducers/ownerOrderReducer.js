import actionTypes from '../constants/index';

const initialState = {
    order_ids: [],
    orders: [],
    order_details: [],
    orderUpdated: false
};

const ownerOrderReducer = (state = initialState, action) => {
    
    let newState;
    let orderIds;
    
    switch (action.type) {

        case actionTypes.PAST_ORDERS_FOR_OWNER:
            newState = action.payload;
            orderIds = newState.map(obj => {
                return obj.order_id;
            });
            newState.orders = action.payload;
            newState.order_ids = orderIds;
            return Object.assign({}, state, newState);

        case actionTypes.ITEMS_IN_ORDER_FOR_OWNER:
            return Object.assign({}, state, {
                items: action.payload,
                order_details: action.payload
            });

        case actionTypes.UPCOMING_ORDERS_FOR_OWNER:
            newState = action.payload;
            orderIds = newState.map(obj => {
                return obj.order_id;
            });
            newState.orders = action.payload;
            newState.order_ids = orderIds;
            return Object.assign({}, state, newState);

        case actionTypes.UPDATE_ORDER_STATUS_OWNER:
            return Object.assign({}, state, {
                orderUpdated: true
            });

        default:
            break;
    }
    return state;
};

export default ownerOrderReducer;