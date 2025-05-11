import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT,
} from "./ActionType";

const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});
const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("user: ", user);
    dispatch(registerSuccess(user.jwt));
  } catch (error) {
    let errorMessage = error.message; // Default to the error message

    // If the error is due to an existing user, update the error message
    if (error.response && error.response.data.error === "User already exists with this emailId") {
      errorMessage = "User already exists with this email address.";
    }

    dispatch(registerFailure(errorMessage));
  }
};

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});
const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest()); // Dispatching login request action

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch(loginSuccess(user.jwt)); // Dispatch login success
    }
  } catch (error) {
    let errorMessage = "Invalid email or password"; // Default message

    // Check if there is a response from the server
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = "Invalid email or password"; // Unauthorized (wrong credentials)
      } else if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error; // Use backend-provided message if available
      }
    }

    dispatch(loginFailure(errorMessage)); // Dispatch login failure with user-friendly message
  }
};

const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});
const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log("user: ", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: null,
  });
  localStorage.clear();
};
