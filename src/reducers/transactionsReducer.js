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

<<<<<<< HEAD
=======
            console.log('Transactions Success Reducer ==> ', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                data: action.payload
            }

        case TRANSACTIONS_FETCH_FAILURE:

<<<<<<< HEAD
=======
            console.log('Transactions Failure Reducer ==> ', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                data: action.payload
            }

        default:
            return state;
    }
}