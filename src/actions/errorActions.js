import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return Errors
export const returnErrors = (message, status, id = null) => { // Fetching "message","status","id" from server

    return {
        type: GET_ERRORS,
        payload: { message, status, id } // Returning message,status,id if error occurs.
    };
};

// Clear Errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}