import {
    PLANS_RECEIVED_SUCCESS,
    PLANS_RECEIVED_FAILED,
    PLAN_CHOSEN
} from '../actions/types';

// Initial state of the auth reducer. By default, all fields are set to null/false.
const initialState = {
    plansReceived: null,
    currentPlan: null,
    chosenPlan: {},
    isPlanSelected: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case PLANS_RECEIVED_SUCCESS:
<<<<<<< HEAD

=======
            console.log('Plan success reducer hit ==> ', action.payload);
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                ...action.payload,
                currentPlan: action.payload
            }

        case PLANS_RECEIVED_FAILED:
<<<<<<< HEAD

=======
            console.log('Plan failed reducer hit.');
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state
            }

        case PLAN_CHOSEN:

<<<<<<< HEAD
=======
            console.log('Plan Chosen Reducer Hit! ==> ', action.payload);

>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
            return {
                ...state,
                chosenPlan: action.payload,
                isPlanSelected: true
            }

        default:
            return state;
    }
}