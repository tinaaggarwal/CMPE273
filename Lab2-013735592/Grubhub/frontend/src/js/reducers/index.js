import {
    combineReducers
} from 'redux';
import client from './clientReducer';
import owner from './ownerReducer';
import homePage from './homePageReducer';
import restaurantMenu from './restaurantMenuReducer';
import cart from './cartReducer';

const rootReducer = combineReducers({
    client,
    owner,
    homePage,
    restaurantMenu,
    cart
});

export default rootReducer;