import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
// import axios from "axios";
// import cookie from "js-cookie";
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import setAuthToken from '../../setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentClient, logoutClient } from '../actions/clientActions';
import { setCurrentOwner, logoutOwner } from '../actions/ownerActions';


const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const reducer = storage.reducer(rootReducer);
const reducer = rootReducer;
const engine = createEngine('current-session-key');
const middleware = storage.createMiddleware(engine);
const store = createStore(reducer, storeEnhancers(applyMiddleware(thunk, middleware)));
const load = storage.createLoader(engine);

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentClient(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        store.dispatch(logoutClient(this.history));
        window.location.href = '/'
    }
}

if (localStorage.jwtToken1) {
    setAuthToken(localStorage.jwtToken1);
    const decoded1 = jwt_decode(localStorage.jwtToken1);
    store.dispatch(setCurrentOwner(decoded1));

    const currentTime = Date.now() / 1000;
    if (decoded1.exp < currentTime) {
        store.dispatch(logoutOwner());
        window.location.href = '/'
    }
}

load(store).then(newState =>
    console.log("Loaded state:", newState))
    .catch(() => console.log("Failed to load previous state"))
export default store;