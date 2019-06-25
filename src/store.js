import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

// Defining the original state which should be a null object by default.
const initialState = {};

// Initializing middleware to use throughout the project.
const middleware = [thunk];

// To use Redux DevTools that would help watching actions/reducers in action!
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Initializing the store
const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);

// "proxy": "http://ec2-54-183-146-39.us-west-1.compute.amazonaws.com:4000"

export default store;

