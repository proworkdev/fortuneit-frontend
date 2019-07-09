import { GET_ERRORS, CLEAR_ERRORS } from './../actions/types';

// Initial state of the errors reducer. By default, all fields are set to null.
const initialState = {
    message: {},
    status: null,
    id: null,
    err: {}
}

// Takes initial state and action as parameters!
export default function (state = initialState, action) {
    switch (action.type) {
        // If an error occurs
        case GET_ERRORS:
<<<<<<< HEAD
            
=======
            console.log('GET ERRORS REDUCER HIT! ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                // These fields are coming from errorActions
                message: action.payload.message,
                status: action.payload.status,
                id: action.payload.id,
                err: action.payload
            };

        // In case we want to clear the errors, we set all the fields back to null again!
        case CLEAR_ERRORS:
            return {
                message: {},
                status: null,
                id: null
            };

        default:
            return state;
    }
}