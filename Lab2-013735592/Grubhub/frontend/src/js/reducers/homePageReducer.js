import actionTypes from '../constants/index';

const initialState = {
    restaurants: [],
    cuisines: [],
    filterCuisine: "",
    searchItem: "",
};

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESTAURANT_LIST:
            return Object.assign({}, state, {
                restaurants: action.payload
            });

        case actionTypes.DISTINCT_CUISINES:
            return Object.assign({}, state, {
                cuisines: action.payload
            });

        case actionTypes.SEARCH_ITEM:
            console.log(action.payload)
            return Object.assign({}, state, {
                restaurants: action.payload
            });

        default:
            break;
    }
    return state;
};

export default homePageReducer;