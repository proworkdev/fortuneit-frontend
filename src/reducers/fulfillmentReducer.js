import {
    FULFILLMENT_ORDERS_SUCCESS,
    FULFILLMENT_ORDERS_FAILURE,
    FULFILLMENT_DETAILS_SUCCESS,
    FULFILLMENT_DETAILS_FAILURE,
    FULFILLMENT_TRACKING_SUCCESS,
    FULFILLMENT_TRACKING_FAILURE
} from '../actions/types';

// Initial state of the auth reducer. By default, all fields are set to null/false.
const initialState = {
    fulfillmentData: {},
    error: {},
    fulfillmentDetails: {},
    trackingData: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case FULFILLMENT_ORDERS_SUCCESS:

            return {
                ...state,
                fulfillmentData: action.payload
            }

        case FULFILLMENT_ORDERS_FAILURE:

            return {
                ...state,
                error: action.payload
            }

        case FULFILLMENT_DETAILS_SUCCESS:

            return {
                ...state,
                fulfillmentDetails: action.payload
            }

        case FULFILLMENT_DETAILS_FAILURE:

            return {
                ...state,
                error: action.payload
            }

        case FULFILLMENT_TRACKING_SUCCESS:

            return {
                ...state,
                trackingData: action.payload
            }

        case FULFILLMENT_TRACKING_FAILURE:

            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}