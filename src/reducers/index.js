import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import planReducer from './planReducer';
import paymentReducer from './paymentReducer';
import mwsReducer from './mwsReducers';
import profileReducer from './profileReducer';
import passwordReducer from './passwordReducer';
import productReducer from './productReducer';
import orderReducer from './orderReducer';
import transactionsReducer from './transactionsReducer';
import refundsReducer from './refundsReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    plans: planReducer,
    payment: paymentReducer,
    mws: mwsReducer,
    profile: profileReducer,
    password: passwordReducer,
    product: productReducer,
    order: orderReducer,
    transact: transactionsReducer,
    refund: refundsReducer
})