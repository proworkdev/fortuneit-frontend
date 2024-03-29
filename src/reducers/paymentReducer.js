import {
    PAYMENT_SUCCESS_DONE,
    PAYMENT_SUCCESS_ERROR,
    PAYMENT_FAILED_DONE,
    PAYMENT_FAILED_ERROR
} from '../actions/types';

// Initial state of the auth reducer. By default, all fields are set to null/false.
const initialState = {
    isPaymentVerified: null
}

export default function (state = initialState, action) {

    switch (action.type) {

        case PAYMENT_SUCCESS_DONE:
        case PAYMENT_FAILED_DONE:
            return {
                ...state,
                ...action.payload,
                isPaymentVerified: action.payload.isPaymentVerified
            }

        case PAYMENT_SUCCESS_ERROR:
        case PAYMENT_FAILED_ERROR:
            
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}