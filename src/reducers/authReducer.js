import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    BUSINESS_SUCCESS,
    BUSINESS_FAILURE,
    OTP_CONFIRMATION_SUCCESS,
    OTP_RESENT_SUCCESS,
    OTP_SENT_SUCCESS,
    OTP_CONFIRMATION_FAILED,
    PASSWORD_RESET_SUCCESS,
    PLAN_CHOSEN
} from '../actions/types';


// Initial state of the auth reducer. By default, all fields are set to null/false.
const initialState = {

    // Checks and grabs the token from localstorage(if any).
    token: localStorage.getItem('token'),
    isEmailVerified: null,
    isAuthenticated: null,
    isLoading: false,
    isPlanSelected: null,
    planSelected: {},
    isPaymentVerified: null,
    user: null,
    loggedInUser: {},
    data: {},
    err: {},
    loginErrorData: {}
}

export default function (state = initialState, action) {

    // Fires up according to the actions dispatched from authActions
    switch (action.type) {

        // User is still in loading state
        case USER_LOADING:
<<<<<<< HEAD

=======
            console.log('USER LOADING REDUCER HAS BEEN HIT!');
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                // Returns original state
                ...state,
                isLoading: true
            };

        // User has been loaded
        case USER_LOADED:
<<<<<<< HEAD

=======
            console.log('Load User Reducer Hit!! ==> ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                // The user's authentication has been set to true
                isAuthenticated: true,
                // isLoading: false,
                // It contains the user data
                user: action.payload
            };

        // If registeration/login succeedes!
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:

<<<<<<< HEAD
=======
            console.log('Testing Register Reducer Payload --> ', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            const { token, user } = action.payload;

            // Fetching & setting the token from server to localstorage for future requests!
            localStorage.setItem('token', token);

            // Setting session storage for persisting the login state.
            sessionStorage.setItem('loginState', JSON.stringify(action.payload));

            return {

                ...state,
                ...action.payload,
                isAuthenticated: true,
                isEmailVerified: user.isEmailVerified,
                isPlanSelected: action.payload.user.isPlanChosen,
                planSelected: user.plan,
                isPaymentVerified: user.isPaymentVerified,
                loggedInUser: action.payload

                // isLoading: false
            };

        // In case authentication/login/registeration process fails!
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:

<<<<<<< HEAD
=======
            console.log('Logout Reducer Has been Hit!', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            // Removing/destroying the token in localstorage so that it couldn't be used further!
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loginErrorData: action.payload
                // isPlanSelected: false
                // isLoading: false
            };

        // If the email(OTP) has been verified.
        case OTP_CONFIRMATION_SUCCESS:
<<<<<<< HEAD

=======
            console.log('Otp conf reducer hit ==> ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                data: action.payload,
                isEmailVerified: true
            }

        // If the OTP has been resent to the server successfully.
        case OTP_RESENT_SUCCESS:
        case OTP_SENT_SUCCESS:
        case PASSWORD_RESET_SUCCESS:
<<<<<<< HEAD

=======
            console.log('Password reset success Reducer --> ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }

        case OTP_CONFIRMATION_FAILED:
<<<<<<< HEAD

=======
            console.log('Inside OTP conf failed reducer ==> ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                err: action.payload
            }

        case BUSINESS_SUCCESS:
<<<<<<< HEAD

=======
            console.log('Business Success Reducer Hit! ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                businessData: action.payload
            }

        case BUSINESS_FAILURE:
<<<<<<< HEAD

=======
            console.log('Business Failure Reducer Hit! ==> ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state
            }

        case PLAN_CHOSEN:
<<<<<<< HEAD

=======
            console.log('Testing Plan Chosen In Auth Reducer ==> ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                isPlanSelected: true,
                planSelected: action.payload
            }

        // By default, the original state would be returned.
        default:
            return state;
    }
}