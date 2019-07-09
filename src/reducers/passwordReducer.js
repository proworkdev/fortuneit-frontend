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

            return {
                ...state,
                data: action.payload
            }

        case PASSWORD_RESET_FAILURE:
            
            return {
                ...state,
                data: action.payload
            }

        default:
            return state;
    }
}