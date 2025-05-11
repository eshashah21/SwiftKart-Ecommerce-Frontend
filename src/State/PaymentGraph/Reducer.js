import {
    FETCH_PAYMENT_GRAPH_REQUEST,
    FETCH_PAYMENT_GRAPH_SUCCESS,
    FETCH_PAYMENT_GRAPH_FAILURE,
  } from "./ActionType";
  
  const initialState = {
    loading: false,
    graphData: [], // Initialize as an empty array
    error: null,
  };
  
  
  export const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PAYMENT_GRAPH_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_PAYMENT_GRAPH_SUCCESS:
        return { ...state, loading: false, graphData: action.payload };
      case FETCH_PAYMENT_GRAPH_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  