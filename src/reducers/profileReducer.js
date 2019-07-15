import {
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_FAIL
} from '../actions/types';

// Initial state of the profile reducer. By default, all fields are set to null/false.
const initialState = {
    data: {}
}

export default function (state = initialState, action) {

    switch (action.type) {

        case PROFILE_UPDATE_SUCCESS:
            // console.log('Profile Edit Success Reducer ==> ', action.payload);
            return {
                ...state,
                data: action.payload
            }

        case PROFILE_UPDATE_FAIL:

            return {
                ...state,
                data: action.payload
            }

        default:
            return state;
    }
}