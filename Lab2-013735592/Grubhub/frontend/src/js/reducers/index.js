import {
    combineReducers
} from 'redux';
import client from './clientReducer';
import owner from './ownerReducer';
import homePage from './homePageReducer';

const rootReducer = combineReducers({
    client,
    owner,
    homePage
});

export default rootReducer;