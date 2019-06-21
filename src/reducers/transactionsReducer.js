import {
    TRANSACTIONS_FETCH_SUCCESS,
    TRANSACTIONS_FETCH_FAILURE
} from '../actions/types';

// Initial state of the profile reducer. By default, all fields are set to null/false.
const initialState = {
    data: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case TRANSACTIONS_FETCH_SUCCESS:

            console.log('Transactions Success Reducer ==> ', action.payload);

            return {
                ...state,
                data: action.payload
            }

        case TRANSACTIONS_FETCH_FAILURE:

            console.log('Transactions Failure Reducer ==> ', action.payload);

            return {
                ...state,
                data: action.payload
            }

        default:
            return state;
    }
}