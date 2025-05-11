import { 
    CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, 
    GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, 
    GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE 
} from "./ActionType";

const initialState = {
    order: null,
    orders: [], // Added for storing multiple orders
    error: null,
    loading: false,
};

export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return { ...state, loading: true, error: null };

        case CREATE_ORDER_SUCCESS:
            return { ...state, loading: false, success: true, order: action.payload, error: null };

        case CREATE_ORDER_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case GET_ORDER_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, loading: false, order: action.payload, error: null };

        case GET_ORDER_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload };

        // Handle all orders
        case GET_ORDERS_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_ORDERS_SUCCESS:
            return { ...state, loading: false, orders: action.payload, error: null };

        case GET_ORDERS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
