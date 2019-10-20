import {
    combineReducers
} from 'redux';
import client from './clientReducer';
import owner from './ownerReducer';
import homePage from './homePageReducer';
import restaurantMenu from './restaurantMenuReducer';
import cart from './cartReducer';
import clientProfile from './clientProfileReducer';

const rootReducer = combineReducers({
    client,
    owner,
    homePage,
    restaurantMenu,
    cart,
    clientProfile
});

export default rootReducer;