import {
    REFUNDS_FETCH_SUCCESS,
    REFUNDS_FETCH_FAILURE
} from '../actions/types';

// Initial state of the profile reducer. By default, all fields are set to null/false.
const initialState = {
    data: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case REFUNDS_FETCH_SUCCESS:

<<<<<<< HEAD
=======
            console.log('Refunds Success Reducer ==> ', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                data: action.payload
            }

        case REFUNDS_FETCH_FAILURE:

<<<<<<< HEAD
=======
            console.log('Refunds Failure Reducer ==> ', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                data: action.payload
            }

        default:
            return state;
    }
}