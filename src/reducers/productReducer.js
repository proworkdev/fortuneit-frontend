import {
    PRODUCT_FINDER_SUCCESS,
    PRODUCT_FINDER_FAIL,
    LOWEST_OFFERS_SUCCESS,
    LOWEST_OFFERS_FAIL,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILED,
    PRODUCTS_FETCH_SUCCESS,
    PRODUCTS_FETCH_FAIL,
    INVENTORY_LOWEST_PRICES_SUCCESS,
    INVENTORY_LOWEST_PRICES_FAILURE,
    PRODUCT_EVALUATOR_SUCCESS,
    PRODUCT_EVALUATOR_FAILURE,
    PRODUCT_STOCKS_SUCCESS,
<<<<<<< HEAD
    PRODUCT_STOCKS_FAILURE,
    WIZARD_DATA_SUCCESS,
    WIZARD_DATA_FAILURE
=======
    PRODUCT_STOCKS_FAILURE
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
} from '../actions/types';

// Initial state of the profile reducer. By default, all fields are set to null/false.
const initialState = {
    data: {},
    offers: {},
    products: {},
    feesData: {},
    inventoryOffers: {},
    error: {},
    evaluationData: {},
<<<<<<< HEAD
    stocksData: {},
    wizardData: {}
=======
    stocksData: {}
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
}

export default function (state = initialState, action) {

    switch (action.type) {

        case PRODUCT_FINDER_SUCCESS:

            return {
                ...state,
                data: action.payload
            }

        case PRODUCT_FINDER_FAIL:

            return {
                ...state,
                data: action.payload
            }

        case LOWEST_OFFERS_SUCCESS:

            return {
                ...state,
                offers: action.payload
            }

        case LOWEST_OFFERS_FAIL:

            return {
                ...state,
                offers: action.payload
            }

        case ADD_PRODUCT_SUCCESS:

            return {
                ...state,
                products: action.payload
            }

        case ADD_PRODUCT_FAILED:

            return {
                ...state,
                products: action.payload
            }

        case PRODUCTS_FETCH_SUCCESS:

            return {
                ...state,
                feesData: action.payload
            }

        case INVENTORY_LOWEST_PRICES_SUCCESS:

            return {
                ...state,
                inventoryOffers: action.payload
            }

        case INVENTORY_LOWEST_PRICES_FAILURE:

            return {
                ...state,
                error: action.payload
            }

        case PRODUCT_EVALUATOR_SUCCESS:

            return {
                ...state,
                evaluationData: action.payload
            }

        case PRODUCT_EVALUATOR_FAILURE:

            return {
                ...state,
                error: action.payload
            }

        case PRODUCT_STOCKS_SUCCESS:

            return {
                ...state,
                stocksData: action.payload
            }

        case PRODUCT_STOCKS_FAILURE:

            return {
                ...state,
                error: action.payload
            }

<<<<<<< HEAD
        case WIZARD_DATA_SUCCESS:

            return {
                ...state,
                wizardData: action.payload
            }

        case WIZARD_DATA_FAILURE:

            return {
                ...state,
                error: action.payload
            }

=======
>>>>>>> 33bcd08f3533ce553fb47b0c977ae790daffe2e3
        default:
            return state;
    }
}