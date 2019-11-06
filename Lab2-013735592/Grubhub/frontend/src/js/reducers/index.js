import {
    combineReducers
} from 'redux';
import client from './clientReducer';
import owner from './ownerReducer';
import homePage from './homePageReducer';
import restaurantMenu from './restaurantMenuReducer';
import cart from './cartReducer';
import clientProfile from './clientProfileReducer';
import clientOrder from './clientOrderReducer';
import ownerProfile from './ownerProfileReducer';
import ownerOrder from './ownerOrderReducer';
import ownerMenu from './ownerMenuReducer';
import image from './imageReducer';
import auth from './authReducer';
import auth1 from './authReducer1';

const rootReducer = combineReducers({
    client,
    owner,
    homePage,
    restaurantMenu,
    cart,
    clientProfile,
    clientOrder,
    ownerOrder,
    ownerProfile,
    ownerMenu,
    image,
    auth,
    auth1
});

export default rootReducer;