import {
    combineReducers
} from 'redux';
import client from './clientReducer';
import owner from './ownerReducer';
import homePage from './homePageReducer';
import restaurantMenu from './restaurantMenuReducer';

const rootReducer = combineReducers({
    client,
    owner,
    homePage,
    restaurantMenu
});

export default rootReducer;