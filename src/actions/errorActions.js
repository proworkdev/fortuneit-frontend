import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return Errors
export const returnErrors = (message, status, id = null) => { // Fetching "message","status","id" from server
<<<<<<< HEAD

=======
    console.log('Testing Return Errors Func ==> ', message, status, id)
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
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