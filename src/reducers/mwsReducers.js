import {
    MWS_VERIFICATION_SUCCESS,
    MWS_VERIFICATION_FAILED
} from '../actions/types';

// Initial state of the auth reducer. By default, all fields are set to null/false.
const initialState = {
    mwsVerified: null,
    mwsData: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case MWS_VERIFICATION_SUCCESS:

            // Setting session storage for persisting the login state.
            localStorage.setItem('loginState', JSON.stringify(action.payload));

            return {
                ...state,
                mwsVerified: action.payload.mwsVerified,
                mwsData: action.payload
            }

        case MWS_VERIFICATION_FAILED:

            return {
                ...state,
                mwsVerified: action.payload.mwsVerified,
                mwsData: action.payload
            }

        default:
            return state;
    }
}