import {
    combineReducers
} from 'redux';
import client from './clientReducer';
import owner from './ownerReducer';
// likewise import 
const rootReducer = combineReducers({
    client,
    owner
});

export default rootReducer;