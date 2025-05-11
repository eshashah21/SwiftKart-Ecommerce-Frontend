import {
    CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS,
    GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDERS_FAILURE
} from "./ActionType";
import { api } from "../../config/apiConfig";

export const createOrder = (reqData) => async (dispatch) => {
    dispatch({
        type: CREATE_ORDER_REQUEST
    });

    console.log("Request Data for Order:", reqData.address); // Log the request data

    try {
        const { data } = await api.post(`/api/orders`, reqData.address);
        console.log("Response from Order Creation:", data); // Log the response

        if (data._id) {
            reqData.navigate({ search: `step=3&order_id=${data._id}` });
        }

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Error creating order:", error); // Log the error for debugging
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.message,
        });
    }
};

export const getOrderById = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/api/orders/${orderId}`);
        console.log("Order by ID:", data);
        dispatch({
            type: GET_ORDER_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDER_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};

export const getOrders = () => async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
        const { data } = await api.get(`/api/orders`);
        dispatch({
            type: GET_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDERS_FAILURE,
            payload: error.message,
        });
    }
};