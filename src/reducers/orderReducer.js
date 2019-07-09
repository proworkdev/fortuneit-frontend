import {
    ORDERS_FETCH_SUCCESS,
    ORDERS_FETCH_FAIL,
    ORDERS_BY_DURATION_SUCCESS,
    ORDERS_BY_DURATION_FAILURE
} from '../actions/types';

// Initial state of the profile reducer. By default, all fields are set to null/false.
const initialState = {
    orders: {},
    data:{}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case ORDERS_FETCH_SUCCESS:

            return {
                ...state,
                orders: action.payload
            }

        case ORDERS_FETCH_FAIL:

            return {
                ...state,
                orders: action.payload
            }

        case ORDERS_BY_DURATION_SUCCESS:

        return{
            ...state,
            data: action.payload
        }

        case ORDERS_BY_DURATION_FAILURE:
        
        return{
            ...state,
            data: action.payload
        }

        default:
            return state;
    }
}