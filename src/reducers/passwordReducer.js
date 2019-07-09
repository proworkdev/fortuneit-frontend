import {
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILURE
} from '../actions/types';

// Initial state of the password reducer. By default, all fields are set to null/false.
const initialState = {
    data: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case PASSWORD_RESET_SUCCESS:

<<<<<<< HEAD
=======
            console.log('Password reset success Reducer Hit ==> ', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                data: action.payload
            }

        case PASSWORD_RESET_FAILURE:
<<<<<<< HEAD
            
=======

            console.log('Password reset failed Reducer Hit ==> ', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                data: action.payload
            }

        default:
            return state;
    }
}