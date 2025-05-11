import { api } from "../../config/apiConfig";
import {
  FETCH_PAYMENT_GRAPH_REQUEST,
  FETCH_PAYMENT_GRAPH_SUCCESS,
  FETCH_PAYMENT_GRAPH_FAILURE,
} from "./ActionType";

// Action Creators
export const fetchPaymentGraphRequest = () => ({ type: FETCH_PAYMENT_GRAPH_REQUEST });
export const fetchPaymentGraphSuccess = (data) => ({
  type: FETCH_PAYMENT_GRAPH_SUCCESS,
  payload: data,
});
export const fetchPaymentGraphFailure = (error) => ({
  type: FETCH_PAYMENT_GRAPH_FAILURE,
  payload: error,
});

// Thunk for Fetching Payment Graph Data
export const fetchPaymentGraph = () => async (dispatch) => {
  dispatch(fetchPaymentGraphRequest());
  try {
    const response = await api.get("/api/payment-graph");
    dispatch(fetchPaymentGraphSuccess(response.data));
  } catch (error) {
    dispatch(fetchPaymentGraphFailure(error.message));
  }
};
