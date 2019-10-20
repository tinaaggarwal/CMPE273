import {
    combineReducers
} from 'redux';
import client from './clientReducer';
// likewise import 
const rootReducer = combineReducers({
    client,
});

export default rootReducer;