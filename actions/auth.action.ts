import axios from "axios";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  SET_CURRENT_USER,
} from "./types";
import { ATME_APP_API_ENDPOINT, ATME_APP_TOKEN } from "../config";
import { setAxiosConfig } from "../config";
import { handleError } from "../utils/handles";

// Login - Get user's token
export const loginUser = params => dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });

  axios
    .post(ATME_APP_API_ENDPOINT + "/login", params, {
      cancelToken: params.cancelToken
    })
    .then(res => {
      // Save to localStorage
      const { token } = res.data;

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set token to ls
      localStorage.setItem(ATME_APP_TOKEN, token);

      // Set token to Auth header
      setAxiosConfig(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      console.log("err: ", err);

      dispatch({
        type: GET_ERRORS,
        payload: err.response ? err.response.data : { errors: err.message }
      });
    });
};

// Change password & redirect to Logout
export const changePassword = (params) => async dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });

  try {
    const res = await axios.post(ATME_APP_API_ENDPOINT + "/change-password", params, {
      cancelToken: params.cancelToken
    });
    
    dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data.success
    });
  } catch (err) {
    handleError(err, dispatch, logoutUser, GET_ERRORS);
  }
};

// Forgot password & back to login
export const forgotPassword = (params) => async dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });

  try {
    const res = await axios.post(ATME_APP_API_ENDPOINT + "/forgot-password", params, {
      cancelToken: params.cancelToken
    });
    
    dispatch({
      type: FORGOT_PASSWORD,
      payload: res.data.success
    });
  } catch (err) {
    handleError(err, dispatch, logoutUser, GET_ERRORS);
  }
};

// Logout
export const logoutUser = history => async dispatch => {
  dispatch({
    type: GET_ERRORS,
    payload: {}
  });

  try {
    await axios.get(ATME_APP_API_ENDPOINT + "/logout");
  } catch (err) {
    console.log("err: ", err);
  } finally {
    // Remove token from localStorage
    localStorage.removeItem(ATME_APP_TOKEN);

    // Clear current profile
    // clearCurrentProfile();

    // Remove auth header for future reuqests
    setAxiosConfig(false);

    // Set curent user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

    // Redirect to Logout page
    if (history) history.push("/");
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
